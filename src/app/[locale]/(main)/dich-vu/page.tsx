import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Briefcase, FileText, CheckCircle2 } from 'lucide-react';
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

// Dummy data for the services list - could be replaced with API call
const services = [
  { id: '1', slug: 'dich-vu-ke-toan-tron-goi', title: 'Dịch vụ kế toán trọn gói', desc: 'Giải pháp kế toán toàn diện, chính xác và tuân thủ pháp luật.' },
  { id: '2', slug: 'bao-cao-thue-thang-quy', title: 'Báo cáo thuế tháng/quý', desc: 'Lập và nộp báo cáo thuế định kỳ đúng hạn, tối ưu chi phí.' },
  { id: '3', slug: 'quyet-toan-thue-nam', title: 'Quyết toán thuế năm', desc: 'Thực hiện quyết toán thuế thu nhập doanh nghiệp cuối năm chuyên nghiệp.' },
  { id: '4', slug: 'tu-van-thanh-lap-doanh-nghiep', title: 'Tư vấn thành lập doanh nghiệp', desc: 'Hỗ trợ thủ tục đăng ký kinh doanh nhanh chóng, tiết kiệm.' },
  { id: '5', slug: 'hoan-thue', title: 'Hoàn thuế GTGT', desc: 'Hỗ trợ rà soát và lập hồ sơ hoàn thuế chính xác, tỷ lệ thành công cao.' },
  { id: '6', slug: 'kiem-toan-noi-bo', title: 'Kiểm toán nội bộ', desc: 'Đánh giá độc lập hệ thống kiểm soát nội bộ và quản trị rủi ro.' },
];

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = resolveLocale((await params).locale);
  const en = locale === 'en';
  const dict = getDictionary(locale);

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
                    {service.title}
                  </h3>
                  <p className="text-ink-soft mb-6 flex-grow leading-relaxed">
                    {service.desc}
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
