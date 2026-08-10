import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, User, ChevronRight, Share2 } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';
import { resolveLocale, localePath } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/getDictionary';

import { notFound } from 'next/navigation';
import { articleService } from '@/services';

export async function generateMetadata({ params }: { params: Promise<{ locale: string, slug: string }> }): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const en = locale === 'en';
  const article = await articleService.getBySlug(slug);
  
  if (!article) return { title: 'Not Found' };
  
  return {
    title: en ? (article.titleEn || article.title) : article.title,
    description: en ? (article.excerptEn || article.excerpt) : article.excerpt,
  };
}

export default async function KnowledgeDetailPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const en = locale === 'en';
  const dict = getDictionary(locale);

  const article = await articleService.getBySlug(slug);

  if (!article) {
    notFound();
  }

  const title = en ? (article.titleEn || article.title) : article.title;

  return (
    <div className="w-full bg-white pb-24">
      {/* Article Header */}
      <div className="bg-paper border-b border-line py-16 lg:py-20 mt-[72px]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Reveal direction="down">
            <div className="flex items-center justify-center gap-2 text-xs font-montserrat uppercase tracking-widest text-ink-soft mb-6">
              <Link href={localePath(locale, '/')} className="hover:text-primary transition-colors">{dict.nav.home}</Link>
              <ChevronRight size={12} />
              <Link href={localePath(locale, '/kien-thuc')} className="hover:text-primary transition-colors">{dict.nav.knowledge}</Link>
              <ChevronRight size={12} />
              <span className="text-secondary">Thuế</span>
            </div>
            
            <h1 className="font-display text-3xl lg:text-[2.5rem] font-bold text-ink leading-tight mb-8">
              {title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-ink-soft">
              <span className="flex items-center gap-2"><User size={16} className="text-primary"/> VTAX</span>
              <span className="flex items-center gap-2"><Calendar size={16} className="text-primary"/> {article.publishDate || ''}</span>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Article Body */}
      <div className="container mx-auto px-4 mt-16 max-w-3xl">
        <Reveal direction="up">
          <div className="prose prose-lg prose-headings:font-display prose-headings:font-semibold prose-a:text-primary hover:prose-a:text-secondary max-w-none text-ink-soft">
            <div dangerouslySetInnerHTML={{ __html: en ? (article.contentEn || article.content || '') : (article.content || '') }} />
          </div>
          
          <div className="mt-16 pt-8 border-t border-line flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-ink text-sm uppercase tracking-wider">{en ? 'Share:' : 'Chia sẻ:'}</span>
              <button className="w-10 h-10 rounded-full bg-paper flex items-center justify-center text-ink-soft hover:text-primary hover:bg-primary/10 transition-colors">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
