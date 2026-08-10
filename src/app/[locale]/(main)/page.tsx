export const dynamic = 'force-dynamic';

import Link from 'next/link';
import {
  ArrowRight, ArrowUpRight, Award, Briefcase, MapPin, Users,
  ShieldCheck, PhoneCall, Quote, CheckCircle2
} from 'lucide-react';
import BannerSlider from '@/components/home/BannerSlider';
import Reveal from '@/components/shared/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/shared/Stagger';
import CountUp from '@/components/shared/CountUp';
import SectionHeading from '@/components/shared/SectionHeading';
import Monogram from '@/components/shared/Monogram';
import { resolveLocale, localePath } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/getDictionary';

// MOCK DATA for VTAX home page
const featuredServices = [
  { slug: 'dich-vu-ke-toan-tron-goi', title: 'Dịch vụ kế toán trọn gói', desc: 'Kiểm soát số liệu kế toán minh bạch, tiết kiệm thời gian.' },
  { slug: 'bao-cao-thue-thang-quy', title: 'Báo cáo thuế tháng/quý', desc: 'Kê khai, nộp thuế đúng quy định, tránh rủi ro phạt.' },
  { slug: 'quyet-toan-thue-nam', title: 'Quyết toán thuế', desc: 'Tối ưu hóa số thuế phải nộp, hoàn thiện sổ sách năm.' },
  { slug: 'tu-van-thanh-lap-doanh-nghiep', title: 'Tư vấn thành lập', desc: 'Hỗ trợ pháp lý nhanh chóng để bắt đầu kinh doanh.' }
];

const customerReviews = [
  { name: 'Nguyễn Văn A', role: 'Giám đốc Công ty ABC', content: 'VTAX đã giúp chúng tôi giải quyết hoàn toàn nỗi lo về sổ sách và thuế. Dịch vụ rất chuyên nghiệp và tận tâm.' },
  { name: 'Trần Thị B', role: 'CEO Startup XYZ', content: 'Đội ngũ tư vấn của VTAX nắm rất rõ các luật thuế mới. Họ đã tư vấn cho chúng tôi những chiến lược tối ưu chi phí cực kỳ hiệu quả.' },
  { name: 'Lê Hoàng C', role: 'Chủ hộ kinh doanh', content: 'Tôi rất hài lòng với dịch vụ thành lập doanh nghiệp của VTAX. Rất nhanh, gọn và minh bạch chi phí.' }
];

const latestNews = [
  { slug: 'luat-doanh-nghiep-2026', title: '5 Điểm mới trong Luật Doanh nghiệp áp dụng từ năm 2026', date: '10/08/2026', excerpt: 'Những thay đổi cốt lõi tác động đến thủ tục thành lập và quản trị doanh nghiệp mà các CEO cần nắm vững.' },
  { slug: 'huong-dan-thue-gtgt', title: 'Hướng dẫn kê khai thuế GTGT theo quý mới nhất', date: '05/08/2026', excerpt: 'Chi tiết các bước thực hiện trên hệ thống thuế điện tử giúp kế toán tránh những sai sót không đáng có.' },
  { slug: 'bao-hiem-xa-hoi', title: 'Cập nhật mức đóng BHXH, BHYT năm 2026', date: '01/08/2026', excerpt: 'Chính sách bảo hiểm y tế và xã hội cho người lao động được điều chỉnh bắt đầu từ tháng 7/2026.' }
];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = resolveLocale((await params).locale);
  const en = locale === 'en';
  const dict = getDictionary(locale);
  const h = dict.home;

  const contactHref = localePath(locale, '/lien-he');

  // Hero slides
  const activeBanners = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2000&auto=format&fit=crop',
      title: en ? 'Professional Accounting Services' : 'Dịch Vụ Kế Toán Chuyên Nghiệp',
      ctaHref: localePath(locale, '/dich-vu'),
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop',
      title: en ? 'Tax Consulting Solutions' : 'Giải Pháp Tư Vấn Thuế Toàn Diện',
      ctaHref: localePath(locale, '/dich-vu'),
    }
  ];

  const stats = [
    { icon: <Award size={26} />, value: '15+', label: en ? 'Years of experience' : 'Năm kinh nghiệm' },
    { icon: <Briefcase size={26} />, value: '12+', label: en ? 'Core services' : 'Dịch vụ chuyên sâu' },
    { icon: <ShieldCheck size={26} />, value: '100%', label: en ? 'Data Security' : 'Bảo mật dữ liệu' },
    { icon: <MapPin size={26} />, value: '3', label: en ? 'Branches' : 'Chi nhánh' },
    { icon: <Users size={26} />, value: '2000+', label: en ? 'Happy Clients' : 'Khách hàng hài lòng' },
  ];

  const hotline = '1900 1234';

  return (
    <div className="w-full bg-white">
      {/* ════════ 1 · Cinematic hero ════════ */}
      <BannerSlider
        banners={activeBanners}
        eyebrow={en ? 'Corporate Financial Experts' : 'Chuyên Gia Tài Chính Doanh Nghiệp'}
        subtitle={
          en
            ? 'Providing accurate, compliant, and optimized accounting and tax solutions for your business.'
            : 'Cung cấp giải pháp kế toán, thuế và tài chính minh bạch, chuẩn xác, tối ưu hóa lợi ích cho doanh nghiệp.'
        }
        ctaLabel={en ? 'Explore services' : 'Khám phá dịch vụ'}
        secondaryLabel={en ? 'Talk to an expert' : 'Liên hệ tư vấn'}
        secondaryHref={contactHref}
        scrollLabel={en ? 'Scroll' : 'Cuộn xuống'}
        fallbackTitle={en ? 'Partnering with your Business' : 'Đồng hành cùng sự phát triển của Doanh Nghiệp'}
      />

      {/* ════════ 2 · Featured Services ════════ */}
      <section className="py-24 lg:py-28 bg-white overflow-hidden relative border-b border-line">
        <div className="container mx-auto px-4 relative z-10">
          <Reveal direction="down" className="mb-16">
            <SectionHeading
              align="center"
              divider
              eyebrow={en ? 'Outstanding Services' : 'Dịch vụ nổi bật'}
              title={en ? 'Comprehensive ' : 'Giải pháp '}
              accent={en ? 'Solutions' : 'Toàn diện'}
              subtitle={en ? 'Tailored services to fit every business scale.' : 'Các dịch vụ được tinh chỉnh phù hợp với mọi quy mô doanh nghiệp.'}
              titleClassName="text-3xl lg:text-4xl"
            />
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.1}>
            {featuredServices.map((service, i) => (
              <StaggerItem key={i}>
                <div className="card-elegant h-full flex flex-col p-8 group hover:-translate-y-1 transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-secondary-light/30 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                    <CheckCircle2 size={28} />
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
                    {en ? 'Learn more' : 'Tìm hiểu thêm'} <ArrowRight size={16} />
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <div className="text-center mt-14">
            <Link href={localePath(locale, '/dich-vu')} className="btn btn-primary">
              {en ? 'View all services' : 'Xem tất cả dịch vụ'} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════ 3 · Statistics band ════════ */}
      <section className="py-20 lg:py-24 bg-vtax-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-finance opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(40rem_40rem_at_80%_-10%,rgba(38,131,198,0.18),transparent_60%),radial-gradient(40rem_40rem_at_0%_110%,rgba(10,77,140,0.45),transparent_55%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <Reveal direction="down" className="mb-14 text-center">
            <span className="eyebrow eyebrow--center text-secondary mb-4 justify-center">{en ? 'By the numbers' : 'Những con số'}</span>
            <h2 className="font-display font-semibold text-white text-3xl lg:text-4xl">
              {en ? 'Trust built over ' : 'Niềm tin được xây dựng qua '}
              <span className="text-secondary italic">{en ? 'years' : 'năm tháng'}</span>
            </h2>
          </Reveal>
          <StaggerGroup className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6" stagger={0.1}>
            {stats.map((s) => (
              <StaggerItem key={s.label}>
                <div className="flex flex-col items-center text-center group">
                  <div className="glass-dark w-16 h-16 rounded-2xl flex items-center justify-center text-secondary mb-5 transition-transform duration-500 group-hover:-translate-y-1">
                    {s.icon}
                  </div>
                  <CountUp value={s.value} className="font-display text-4xl lg:text-5xl font-semibold text-white mb-2" />
                  <div className="text-[0.8rem] lg:text-[0.85rem] text-white/65 uppercase tracking-[0.16em] font-montserrat">{s.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ════════ 4 · Customer Reviews ════════ */}
      <section className="py-24 lg:py-28 bg-paper overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <Reveal direction="down" className="mb-16">
            <SectionHeading
              align="center"
              divider
              eyebrow={en ? 'Testimonials' : 'Đánh giá từ khách hàng'}
              title={en ? 'What they ' : 'Khách hàng '}
              accent={en ? 'say about us' : 'nói về VTAX'}
              subtitle={en ? 'Success stories from businesses we have partnered with.' : 'Những câu chuyện thành công từ các đối tác của chúng tôi.'}
              titleClassName="text-3xl lg:text-4xl"
            />
          </Reveal>
          
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.1}>
            {customerReviews.map((review, i) => (
              <StaggerItem key={i}>
                <div className="card-elegant p-8 bg-white h-full relative">
                  <Quote className="absolute top-6 right-6 text-primary/10" size={48} />
                  <p className="text-ink-soft mb-8 leading-relaxed relative z-10">"{review.content}"</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-line flex items-center justify-center text-ink-soft font-display font-semibold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-ink text-sm">{review.name}</h4>
                      <span className="text-xs text-ink-soft">{review.role}</span>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ════════ 5 · News & Promos ════════ */}
      <section className="py-24 lg:py-28 bg-white overflow-hidden relative border-t border-line">
        <div className="container mx-auto px-4 relative z-10">
          <Reveal direction="down" className="mb-16">
            <SectionHeading
              align="center"
              divider
              eyebrow={en ? 'Insights & News' : 'Tin tức & Ưu đãi'}
              title={en ? 'Latest ' : 'Cập nhật '}
              accent={en ? 'Updates' : 'Mới Nhất'}
              subtitle={en ? 'Important tax updates and knowledge to empower your business.' : 'Các quy định thuế mới và những ưu đãi dịch vụ đặc biệt.'}
              titleClassName="text-3xl lg:text-4xl"
            />
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-8" stagger={0.1}>
            {latestNews.map((news, i) => (
              <StaggerItem key={i}>
                <article className="group h-full flex flex-col">
                  <Link href={localePath(locale, `/kien-thuc/${news.slug}`)} className="block aspect-[16/10] overflow-hidden rounded-2xl shadow-elegant-lg mb-6 bg-paper relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-4xl text-primary/10 font-bold group-hover:scale-110 transition-transform duration-700">VTAX</span>
                    </div>
                  </Link>
                  <span className="font-montserrat text-[0.62rem] font-bold uppercase tracking-[0.2em] text-secondary mb-3">
                    {news.date}
                  </span>
                  <h3 className="font-display font-semibold text-xl leading-snug text-ink line-clamp-2 transition-colors group-hover:text-primary mb-3">
                    <Link href={localePath(locale, `/kien-thuc/${news.slug}`)}>{news.title}</Link>
                  </h3>
                  <p className="text-[0.95rem] leading-relaxed text-ink-soft line-clamp-3">{news.excerpt}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <div className="text-center mt-16">
            <Link href={localePath(locale, '/kien-thuc')} className="btn btn-outline">
              {en ? 'View all news' : 'Xem tất cả bài viết'} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════ 6 · Closing CTA ════════ */}
      <section className="relative overflow-hidden box-footer text-white">
        <div className="absolute inset-0 bg-finance opacity-20 pointer-events-none" />
        <div className="absolute -top-10 -right-10 text-white/[0.05] pointer-events-none select-none hidden md:block">
          <Monogram size={360} withText={false} tone="light" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-20 lg:py-24">
          <div className="max-w-3xl">
            <span className="eyebrow text-secondary mb-5">{en ? 'Partner with us' : 'Đồng hành cùng chúng tôi'}</span>
            <h2 className="font-display font-semibold text-white leading-[1.12] tracking-tight text-3xl sm:text-4xl lg:text-[3rem]">
              {en ? 'Ready to optimize ' : 'Sẵn sàng tối ưu hóa '}
              <span className="text-secondary italic">{en ? 'your taxes?' : 'tài chính doanh nghiệp?'}</span>
            </h2>
            <p className="mt-6 text-white/75 text-base lg:text-lg leading-relaxed max-w-2xl">
              {en
                ? 'Our accounting experts are ready to advise you anytime.'
                : 'Đội ngũ chuyên gia kế toán và thuế của chúng tôi luôn sẵn sàng hỗ trợ doanh nghiệp bạn.'}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-5">
              <Link href={contactHref} className="btn btn-accent">
                {en ? 'Contact us' : 'Đăng ký tư vấn ngay'} <ArrowUpRight size={16} />
              </Link>
              <a href={`tel:${hotline.replace(/\s/g, '')}`} className="flex items-center gap-4 group">
                <span className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                  <PhoneCall size={20} />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="font-montserrat text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white/55">
                    {en ? 'Hotline' : 'Tư vấn nhanh'}
                  </span>
                  <span className="font-display text-xl font-semibold text-white group-hover:text-secondary transition-colors">{hotline}</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
