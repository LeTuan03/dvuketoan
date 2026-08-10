import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, User, ChevronRight, Share2 } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';
import { resolveLocale, localePath } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/getDictionary';

export async function generateMetadata({ params }: { params: Promise<{ locale: string, slug: string }> }): Promise<Metadata> {
  return {
    title: 'Bài viết kiến thức - VTAX',
  };
}

export default async function KnowledgeDetailPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const en = locale === 'en';
  const dict = getDictionary(locale);

  // Mock
  const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

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
              <span className="flex items-center gap-2"><User size={16} className="text-primary"/> VTAX Expert</span>
              <span className="flex items-center gap-2"><Calendar size={16} className="text-primary"/> 10/08/2026</span>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Article Body */}
      <div className="container mx-auto px-4 mt-16 max-w-3xl">
        <Reveal direction="up">
          <div className="prose prose-lg prose-headings:font-display prose-headings:font-semibold prose-a:text-primary hover:prose-a:text-secondary max-w-none text-ink-soft">
            <p className="lead text-xl text-ink font-medium mb-8">
              {en ? 'This article provides an in-depth analysis of the topic, designed to help businesses navigate complex legal and tax landscapes.' : 'Bài viết này phân tích chuyên sâu các vấn đề, nhằm mục đích hỗ trợ doanh nghiệp vượt qua những rào cản pháp lý và thuế trong quá trình vận hành.'}
            </p>
            
            <h2>{en ? '1. Introduction' : '1. Giới thiệu chung'}</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat ante, amet.
            </p>
            
            <h2>{en ? '2. Key Changes and Impacts' : '2. Những điểm cốt lõi và tác động'}</h2>
            <p>
              Phasellus volutpat, metus eget egestas mollis, lacus lacus blandit dui, id egestas quam mauris ut lacus. Nullam non mi congue, rhoncus ex quis, rutrum eros.
            </p>
            <ul>
              <li>{en ? 'Impact on corporate income tax' : 'Tác động đến Thuế Thu nhập doanh nghiệp (TNDN)'}</li>
              <li>{en ? 'Personal income tax considerations' : 'Lưu ý về Thuế Thu nhập cá nhân (TNCN)'}</li>
              <li>{en ? 'Value added tax (VAT) updates' : 'Cập nhật về Thuế Giá trị gia tăng (GTGT)'}</li>
            </ul>

            <blockquote>
              <p>
                {en ? '"Proper tax planning is essential for the sustainable growth of any enterprise." - VTAX Advisory' : '"Hoạch định thuế hợp lý là yếu tố sống còn cho sự phát triển bền vững của doanh nghiệp." - Chuyên gia VTAX'}
              </p>
            </blockquote>

            <h2>{en ? '3. Conclusion' : '3. Kết luận'}</h2>
            <p>
              Suspendisse potenti. Aenean in ex euismod, faucibus dui sit amet, vestibulum lorem. Praesent eu fringilla massa. Morbi eleifend leo quis dui finibus congue.
            </p>
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
