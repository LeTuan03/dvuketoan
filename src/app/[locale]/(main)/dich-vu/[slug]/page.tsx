import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, ChevronRight, PhoneCall } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';
import { resolveLocale, localePath } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/getDictionary';

// This is the SINGLE generic template for ALL services.
// The content should dynamically load based on the `slug`, but for now we'll use placeholder content.

import { notFound } from 'next/navigation';
import { articleService } from '@/services';

export async function generateMetadata({ params }: { params: Promise<{ locale: string, slug: string }> }): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const en = locale === 'en';
  const service = await articleService.getBySlug(slug);
  
  if (!service) return { title: 'Not Found' };
  
  return {
    title: en ? (service.titleEn || service.title) : service.title,
    description: en ? (service.excerptEn || service.excerpt) : service.excerpt,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const en = locale === 'en';
  const dict = getDictionary(locale);

  const service = await articleService.getBySlug(slug);

  if (!service) {
    notFound();
  }

  const serviceName = en ? (service.titleEn || service.title) : service.title;

  return (
    <div className="w-full bg-white">
      {/* Dynamic Header Banner */}
      <div className="bg-vtax-dark text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-finance opacity-20 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <Reveal direction="down">
            <div className="flex items-center gap-2 text-sm text-white/60 mb-6 font-montserrat tracking-widest uppercase">
              <Link href={localePath(locale, '/')} className="hover:text-white transition-colors">{dict.nav.home}</Link>
              <ChevronRight size={14} />
              <Link href={localePath(locale, '/dich-vu')} className="hover:text-white transition-colors">{dict.nav.services}</Link>
              <ChevronRight size={14} />
              <span className="text-secondary truncate max-w-[200px]">{serviceName}</span>
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">
              {serviceName}
            </h1>
            <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
              {en ? (service.excerptEn || service.excerpt) : service.excerpt}
            </p>
          </Reveal>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Main Content Area */}
          <main className="w-full lg:w-2/3">
            <Reveal direction="up">
              <div className="prose prose-lg max-w-none text-ink-soft">
                <div dangerouslySetInnerHTML={{ __html: en ? (service.contentEn || service.content || '') : (service.content || '') }} />
              </div>
            </Reveal>
          </main>

          {/* Sticky Sidebar */}
          <aside className="w-full lg:w-1/3">
            <div className="sticky top-28 space-y-8">
              {/* Contact Box */}
              <div className="bg-paper p-8 rounded-2xl border border-line shadow-elegant">
                <h3 className="font-display text-xl font-semibold text-ink mb-4">
                  {en ? 'Need consultation?' : 'Bạn cần tư vấn?'}
                </h3>
                <p className="text-sm text-ink-soft mb-6">
                  {en ? 'Leave your details and our experts will get back to you shortly.' : 'Để lại thông tin, chuyên gia VTAX sẽ liên hệ tư vấn chi tiết cho bạn.'}
                </p>
                <Link href={localePath(locale, '/lien-he')} className="btn btn-primary w-full justify-center">
                  {en ? 'Contact Now' : 'Liên hệ ngay'}
                </Link>
                
                <div className="mt-6 pt-6 border-t border-line flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                    <PhoneCall size={20} />
                  </div>
                  <div>
                    <span className="block text-xs uppercase font-bold tracking-wider text-ink-soft mb-1">{en ? 'Direct Hotline' : 'Hotline trực tiếp'}</span>
                    <a href="tel:19001234" className="font-display font-bold text-lg text-ink hover:text-secondary transition-colors">
                      1900 1234
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
