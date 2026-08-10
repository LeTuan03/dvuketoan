import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Briefcase } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/shared/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/shared/Stagger';
import { resolveLocale, localePath } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/getDictionary';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const en = resolveLocale((await params).locale) === 'en';
  return {
    title: en ? 'Services - VTAX' : 'Dịch vụ - VTAX',
    description: en ? 'Professional accounting and tax services for your business.' : 'Dịch vụ kế toán và thuế chuyên nghiệp cho doanh nghiệp của bạn.',
  };
}

import { articleService } from '@/services';
import { ArticleSummary } from '@/types';
export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = resolveLocale((await params).locale);
  const en = locale === 'en';
  const dict = getDictionary(locale);

  const allArticles = await articleService.getAllSummary();
  const services = allArticles.filter((a: ArticleSummary) => a.category === 'dich-vu' && !a.isDraft);

  return (
    <div className="w-full bg-paper">
      <PageHero
        locale={locale}
        title={en ? 'Our Services' : 'Dịch vụ của chúng tôi'}
        subtitle={en ? 'Comprehensive financial solutions for businesses' : 'Giải pháp tài chính toàn diện cho doanh nghiệp'}
        breadcrumb={[
          { label: dict.nav.home, href: '/' },
          { label: dict.nav.services, href: '/dich-vu' },
        ]}
      />

      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <Reveal direction="down" className="mb-14 text-center max-w-3xl mx-auto">
            <SectionHeading
              align="center"
              eyebrow={dict.home.featured.eyebrow}
              title={dict.home.featured.titleA}
              accent={dict.home.featured.titleB}
              subtitle={dict.home.featured.sub}
            />
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.1}>
            {services.map((service) => (
              <StaggerItem key={service.id}>
                <div className="card-elegant h-full flex flex-col p-8 group hover:-translate-y-1 transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-primary-light/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <Briefcase size={28} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-ink mb-3 group-hover:text-primary transition-colors">
                    {en ? service.titleEn || service.title : service.title}
                  </h3>
                  <p className="text-ink-soft mb-6 flex-grow leading-relaxed line-clamp-3">
                    {en ? service.excerptEn || service.excerpt : service.excerpt}
                  </p>
                  <Link
                    href={localePath(locale, `/dich-vu/${service.slug}`)}
                    className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-secondary hover:text-primary transition-colors mt-auto"
                  >
                    {en ? 'View Details' : 'Xem chi tiết'} <ArrowRight size={16} />
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-line">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <Reveal direction="up">
            <h2 className="font-display text-3xl font-semibold mb-6">
              {en ? 'Need a custom solution?' : 'Bạn cần giải pháp chuyên biệt?'}
            </h2>
            <p className="text-ink-soft mb-10 text-lg">
              {en ? 'Contact our experts for a consultation tailored to your business needs.' : 'Liên hệ với chuyên gia của chúng tôi để được tư vấn lộ trình phù hợp nhất cho doanh nghiệp.'}
            </p>
            <Link href={localePath(locale, '/lien-he')} className="btn btn-primary">
              {en ? 'Contact Us' : 'Liên hệ tư vấn'} <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
