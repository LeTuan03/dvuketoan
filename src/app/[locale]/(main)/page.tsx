export const dynamic = 'force-dynamic';

import Link from 'next/link';
import {
  ArrowRight, ArrowUpRight, Award, Briefcase, MapPin, Users,
  ShieldCheck, PhoneCall, CheckCircle2
} from 'lucide-react';
import BannerSlider from '@/components/home/BannerSlider';
import Reveal from '@/components/shared/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/shared/Stagger';
import CountUp from '@/components/shared/CountUp';
import SectionHeading from '@/components/shared/SectionHeading';
import Monogram from '@/components/shared/Monogram';
import { resolveLocale, localePath } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { articleService, settingService, bannerService, mediaService } from '@/services';

// Services data — accounting & tax services offered by VTAX
// Services data will be fetched from DB

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = resolveLocale((await params).locale);
  const en = locale === 'en';
  const dict = getDictionary(locale);
  const h = dict.home;

  const contactHref = localePath(locale, '/lien-he');

  // Fetch real data from DB
  const settings = await settingService.get();
  const allArticles = await articleService.getAllSummary();
  const featuredServices = allArticles
    .filter((a: any) => a.category === 'dich-vu' && a.featured && !a.isDraft)
    .slice(0, 4);

  const latestArticles = allArticles
    .filter((a: any) => a.category !== 'dich-vu' && !a.isDraft)
    .slice(0, 3);

  // Fetch Media
  const images = await mediaService.getImages();
  const videos = await mediaService.getVideos();
  const activeImages = images.filter((img: any) => img.status === 'active').slice(0, 3);
  const activeVideos = videos.filter((vid: any) => vid.status === 'active').slice(0, 3);

  // Hero slides
  const bannersData = await bannerService.getAll();
  const activeBanners = bannersData
    .filter((b) => b.status)
    .map((b) => ({
      id: b.id.toString(),
      image: b.image || '/images/about.svg',
      title: en ? (b.titleEn || b.title) : b.title,
      ctaHref: b.link || localePath(locale, '/dich-vu'),
    }));

  if (activeBanners.length === 0) {
    activeBanners.push({
      id: "fallback-1",
      image: '/images/about.svg',
      title: en ? 'Professional Accounting Services' : 'Dịch Vụ Kế Toán Chuyên Nghiệp',
      ctaHref: localePath(locale, '/dich-vu'),
    });
  }

  const stats = [
    { icon: <Award size={26} />, value: '15+', label: en ? 'Years of experience' : 'Năm kinh nghiệm' },
    { icon: <Briefcase size={26} />, value: '12+', label: en ? 'Core services' : 'Dịch vụ chuyên sâu' },
    { icon: <ShieldCheck size={26} />, value: '100%', label: en ? 'Data Security' : 'Bảo mật dữ liệu' },
    { icon: <MapPin size={26} />, value: '3', label: en ? 'Branches' : 'Chi nhánh' },
    { icon: <Users size={26} />, value: '2000+', label: en ? 'Happy Clients' : 'Khách hàng hài lòng' },
  ];

  const hotline = settings?.hotline1 || '1900 6884';

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
                    {en ? service.titleEn : service.title}
                  </h3>
                  <p className="text-ink-soft mb-6 flex-grow leading-relaxed line-clamp-3">
                    {en ? service.excerptEn || service.excerpt : service.excerpt}
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

      {/* ════════ 4 · Latest Knowledge & News ════════ */}
      <section className="py-24 lg:py-28 bg-paper overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <Reveal direction="down" className="mb-16">
            <SectionHeading
              align="center"
              divider
              eyebrow={en ? 'Insights & News' : 'Kiến thức & Tin tức'}
              title={en ? 'Latest ' : 'Cập nhật '}
              accent={en ? 'Updates' : 'Mới Nhất'}
              subtitle={en ? 'Important tax updates and knowledge to empower your business.' : 'Các quy định thuế mới và kiến thức kế toán hữu ích cho doanh nghiệp.'}
              titleClassName="text-3xl lg:text-4xl"
            />
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-8" stagger={0.1}>
            {latestArticles.map((article: any, i: number) => (
              <StaggerItem key={article.id?.toString() || i}>
                <article className="group h-full flex flex-col">
                  <Link href={localePath(locale, `/kien-thuc/${article.slug}`)} className="block aspect-[16/10] overflow-hidden rounded-2xl shadow-elegant-lg mb-6 bg-paper relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={article.thumbnail || '/images/default-article.svg'} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </Link>
                  <span className="font-montserrat text-[0.62rem] font-bold uppercase tracking-[0.2em] text-secondary mb-3">
                    {article.publishDate}
                  </span>
                  <h3 className="font-display font-semibold text-xl leading-snug text-ink line-clamp-2 transition-colors group-hover:text-primary mb-3">
                    <Link href={localePath(locale, `/kien-thuc/${article.slug}`)}>
                      {en ? (article.titleEn || article.title) : article.title}
                    </Link>
                  </h3>
                  <p className="text-[0.95rem] leading-relaxed text-ink-soft line-clamp-3">
                    {en ? (article.excerptEn || article.excerpt) : article.excerpt}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <div className="text-center mt-16">
            <Link href={localePath(locale, '/kien-thuc')} className="btn btn-outline">
              {en ? 'View all articles' : 'Xem tất cả bài viết'} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════ 5 · Closing CTA ════════ */}
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

      
      {/* ════════ 6 · Media Gallery ════════ */}
      {(activeImages.length > 0 || activeVideos.length > 0) && (
        <section className="py-24 lg:py-28 bg-white overflow-hidden relative">
          <div className="container mx-auto px-4 relative z-10">
            <Reveal direction="down" className="mb-16">
              <SectionHeading
                align="center"
                divider
                eyebrow={en ? 'Media Gallery' : 'Thư viện & Truyền thông'}
                title={en ? 'Our ' : 'Hình ảnh '}
                accent={en ? 'Moments' : 'VTAX'}
                subtitle={en ? 'Explore our activities and events.' : 'Khám phá các hoạt động và sự kiện của chúng tôi.'}
                titleClassName="text-3xl lg:text-4xl"
              />
            </Reveal>

            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8" stagger={0.1}>
              {activeImages.map((img: any, i: number) => (
                <StaggerItem key={`img-${img.id || i}`}>
                  <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-elegant-sm bg-paper cursor-pointer border border-line">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.url || '/images/default-article.svg'} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                      <h3 className="text-white font-display font-semibold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{img.title}</h3>
                    </div>
                  </div>
                </StaggerItem>
              ))}
              {activeVideos.map((vid: any, i: number) => (
                <StaggerItem key={`vid-${vid.id || i}`}>
                  <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-elegant-sm bg-paper cursor-pointer border border-line">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={vid.thumbnail || '/images/default-article.svg'} alt={vid.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-secondary/90 flex items-center justify-center text-white shadow-lg backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><polygon points="5 3 19 12 5 21 5 3" fill="currentColor"></polygon></svg>
                      </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-white font-display font-semibold text-lg">{vid.title}</h3>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
      )}
    </div>
  );
}
