"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Building2, Target, Heart, Factory, Users,
  ArrowRight, ShieldCheck, Quote, BadgeCheck, Sparkles, Leaf,
} from 'lucide-react';
import { PlayCircleOutlined } from '@ant-design/icons';
import PageHero from '@/components/shared/PageHero';
import SectionHeading from '@/components/shared/SectionHeading';
import MediaGallerySection from '@/components/shared/MediaGallerySection';
import { aboutDefaults, aboutDefaultsEn, mergeAbout } from './aboutDefaults';
import { useLocale } from '@/lib/i18n/LocaleProvider';
import { localePath } from '@/lib/i18n/config';

// Icons cycled across the core-value cards (order matches aboutDefaults).
const VALUE_ICONS = [BadgeCheck, Sparkles, ShieldCheck, Users, Leaf] as const;

const sectionDefs = [
  { id: 'gioi-thieu', label: 'Giới thiệu', labelEn: 'Overview', icon: Building2 },
  // { id: 'lich-su', label: 'Lịch sử', labelEn: 'History', icon: History },
  { id: 'tam-nhin', label: 'Tầm nhìn', labelEn: 'Vision', icon: Target },
  { id: 'co-so', label: 'Cơ sở', labelEn: 'Facilities', icon: Factory },
  // { id: 'thanh-tuu', label: 'Thành tựu', labelEn: 'Achievements', icon: Award },
  { id: 'co-cau', label: 'Cơ cấu', labelEn: 'Structure', icon: Users },
  { id: 'thu-vien', label: 'Thư viện', labelEn: 'Gallery', icon: PlayCircleOutlined },
];

type RevealDir = 'up' | 'down' | 'left' | 'right';

export default function AboutContent() {
  const { locale } = useLocale();
  const en = locale === 'en';

  // Directional scroll-reveal props for the inline motion blocks:
  // `up` rises, `down` drops in (trượt xuống), `left`/`right` slide sideways
  // (trượt sang). NOTE: intentionally NOT branched on `useReducedMotion()` —
  // that diverges between server (animated) and client (static) and trips a
  // hydration mismatch that can freeze content invisible. Framer Motion's
  // default keeps it playing; ambient CSS loops are calmed in globals.css.
  const anim = (direction: RevealDir = 'up', delay = 0) => {
    const distance = 48;
    const from =
      direction === 'up' ? { y: distance }
      : direction === 'down' ? { y: -distance }
      : direction === 'left' ? { x: -distance }
      : { x: distance };
    return {
      initial: { opacity: 0, ...from },
      whileInView: { opacity: 1, x: 0, y: 0 },
      viewport: { once: true, amount: 0.2 },
      transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
    };
  };
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [content, setContent] = useState(en ? aboutDefaultsEn : aboutDefaults);
  const [active, setActive] = useState(sectionDefs[0].id);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/data/settings')
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (!cancelled && data) {
          const stored = locale === 'en' ? data?.aboutPageEn : data?.aboutPage;
          setContent(mergeAbout(stored, locale));
        }
      })
      .catch(() => { });
    return () => { cancelled = true; };
  }, [locale, en]);

  // Scrollspy — highlight the section currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sectionDefs.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Deep-link support: ?tab=<id> scrolls to that section (keeps old links working).
  useEffect(() => {
    if (tabParam && sectionDefs.some((s) => s.id === tabParam)) {
      const t = setTimeout(() => {
        document.getElementById(tabParam)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 350);
      return () => clearTimeout(t);
    }
  }, [tabParam]);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="bg-white">
      <PageHero
        locale={locale}
        eyebrow={en ? 'The VTAX story' : 'Câu chuyện VTAX'}
        title={
          <>
            {en ? 'About ' : 'Về '}
            <span className="text-secondary">VTAX</span>
          </>
        }
        subtitle={
          en
            ? 'A 15-year journey alongside Vietnamese enterprises, creating sustainable value and delivering comprehensive accounting solutions.'
            : 'Hành trình 15 năm đồng hành cùng doanh nghiệp Việt Nam, kiến tạo những giá trị bền vững và mang lại giải pháp tài chính - kế toán toàn diện.'
        }
        breadcrumb={[{ label: en ? 'About' : 'Giới thiệu' }]}
        sideImage="/images/gioithieu.png"
        sideImageAlt={en ? 'About VTAX' : 'Giới thiệu VTAX'}
      />

      {/* Sticky scrollspy section nav */}
      <nav className="sticky top-0 z-30 bg-white">
        <div className="glass border-y border-line/70">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto hide-scrollbar">
              {sectionDefs.map((s) => {
                const Icon = s.icon;
                const isActive = active === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => go(s.id)}
                    className={`shrink-0 flex items-center gap-2 px-4 lg:px-6 py-4 text-[0.72rem] font-montserrat font-semibold uppercase tracking-[0.12em] border-b-2 transition-colors duration-300 ${
                      isActive
                        ? 'border-secondary text-primary'
                        : 'border-transparent text-ink-soft hover:text-ink'
                    }`}
                  >
                    <Icon size={15} /> {en ? s.labelEn : s.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* ── 1. Overview ─────────────────────────────────────────────── */}
      <section id="gioi-thieu" className="scroll-mt-32 py-20 lg:py-32 relative bg-gradient-to-b from-white to-slate-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 rounded-l-[100px] blur-3xl -z-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <motion.div {...anim('left', 0.05)} className="lg:col-span-6 lg:pr-8">
              <SectionHeading
                eyebrow={en ? 'Overview' : 'Giới thiệu'}
                title={content.gioiThieu.title}
                titleClassName="text-3xl lg:text-5xl leading-tight"
              />
              <div className="prose-editorial max-w-none mt-7">
                <p className="whitespace-pre-line text-lg text-ink-soft border-l-4 border-secondary pl-5 italic mb-6">{content.gioiThieu.paragraph1}</p>
                <p className="whitespace-pre-line text-ink">{content.gioiThieu.paragraph2}</p>
              </div>
              
              <div className="mt-10 flex flex-wrap gap-5">
                <Link href={localePath(locale, '/dich-vu')} className="btn btn-primary rounded-full px-8">
                  {en ? 'Our services' : 'Dịch vụ'} <ArrowRight size={16} />
                </Link>
                <Link href={localePath(locale, '/lien-he')} className="btn btn-outline rounded-full px-8">
                  {en ? 'Contact us' : 'Liên hệ'}
                </Link>
              </div>
            </motion.div>

            <motion.div {...anim('right', 0.15)} className="lg:col-span-6 relative mt-12 lg:mt-0">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <img
                  src="/images/about.png"
                  alt="VTAX"
                  className="w-full h-[400px] lg:h-[550px] object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-80" />
              </div>
              
              {/* Floating Stat Cards */}
              <div className="absolute -bottom-8 -left-6 lg:-left-12 glass shadow-float rounded-2xl p-6 lg:p-8 max-w-[200px] hover:-translate-y-2 transition-transform duration-500">
                <div className="font-display font-bold text-4xl lg:text-5xl text-primary mb-1">{content.gioiThieu.stat1Number}</div>
                <div className="text-xs uppercase font-montserrat font-semibold text-ink-soft tracking-wider">{content.gioiThieu.stat1Label}</div>
              </div>
              <div className="absolute -top-8 -right-6 lg:-right-8 glass shadow-float rounded-2xl p-6 lg:p-8 max-w-[200px] hover:-translate-y-2 transition-transform duration-500">
                <div className="font-display font-bold text-4xl lg:text-5xl text-secondary mb-1">{content.gioiThieu.stat2Number}</div>
                <div className="text-xs uppercase font-montserrat font-semibold text-ink-soft tracking-wider">{content.gioiThieu.stat2Label}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. Vision & Mission (dark centerpiece) ──────────────────── */}
      <section id="tam-nhin" className="scroll-mt-32 py-24 lg:py-32 bg-vtax-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/coso.png')] bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-finance opacity-60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-vtax-dark to-primary-dark/80 pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center mb-20">
            <motion.div {...anim('right')} className="lg:col-span-5">
              <SectionHeading
                theme="dark"
                eyebrow={en ? 'Vision & Mission' : 'Tầm nhìn & Sứ mệnh'}
                title={en ? 'What drives us forward' : 'Kim chỉ nam cho mọi hành động'}
                titleClassName="text-4xl lg:text-5xl"
              />
              <p className="mt-6 text-white/80 text-lg">
                {en ? 'Guided by integrity and excellence, we strive to elevate the financial landscape for veterinary businesses.' : 'Được dẫn dắt bởi sự chính trực và xuất sắc, chúng tôi nỗ lực nâng tầm bối cảnh tài chính cho các doanh nghiệp thú y.'}
              </p>
            </motion.div>
            
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              <motion.div {...anim('up', 0.1)} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors duration-300">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-yellow-600 flex items-center justify-center text-white mb-8 shadow-lg">
                  <Target size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{content.tamNhin.visionTitle}</h3>
                <p className="text-white/75 leading-relaxed whitespace-pre-line text-sm">{content.tamNhin.visionText}</p>
              </motion.div>
              
              <motion.div {...anim('up', 0.2)} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors duration-300 sm:translate-y-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-primary flex items-center justify-center text-white mb-8 shadow-lg">
                  <Heart size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{content.tamNhin.missionTitle}</h3>
                <p className="text-white/75 leading-relaxed whitespace-pre-line text-sm">{content.tamNhin.missionText}</p>
              </motion.div>
            </div>
          </div>

          {/* Core values */}
          {content.tamNhin.coreValues?.length > 0 && (
            <div className="mt-24">
              <motion.div {...anim('down')} className="text-center mb-12">
                <span className="eyebrow eyebrow--center text-secondary justify-center">
                  {content.tamNhin.coreTitle || (en ? 'Core Values' : 'Giá trị cốt lõi')}
                </span>
              </motion.div>
              
              <div className="flex flex-wrap justify-center gap-6">
                {content.tamNhin.coreValues.map((value, i) => {
                  const Icon = VALUE_ICONS[i % VALUE_ICONS.length];
                  return (
                    <motion.div
                      key={`${value.title}-${i}`}
                      {...anim('up', (i % 3) * 0.1)}
                      className="group relative w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/5 hover:border-secondary/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 group-hover:scale-150 transition-all duration-500 text-secondary pointer-events-none">
                        <Icon size={120} />
                      </div>
                      <div className="relative z-10">
                        <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                          <Icon size={24} />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-3">{value.title}</h4>
                        <p className="text-sm text-white/70 leading-relaxed whitespace-pre-line group-hover:text-white/90 transition-colors duration-300">{value.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          <motion.div {...anim('up')} className="max-w-4xl mx-auto mt-28">
            <div className="relative p-10 lg:p-14 rounded-[40px] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 text-center overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent" />
              <Quote className="w-12 h-12 text-secondary/40 mx-auto mb-6" />
              <p className="font-display text-2xl lg:text-3xl text-white leading-relaxed whitespace-pre-line font-medium italic">{content.tamNhin.quoteText}</p>
              
              <div className="mt-10 flex items-center justify-center gap-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-yellow-600 flex items-center justify-center font-montserrat font-bold text-sm text-white shadow-lg">CEO</div>
                <div className="text-left">
                  <div className="font-bold text-white text-lg">{content.tamNhin.quoteAuthor}</div>
                  <div className="text-xs uppercase font-montserrat font-semibold text-secondary tracking-widest mt-1">{content.tamNhin.quoteRole}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 4. Facilities ───────────────────────────────────────────── */}
      <section id="co-so" className="scroll-mt-32 py-20 lg:py-28 bg-slate-50 relative">
        <div className="container mx-auto px-4">
          <motion.div {...anim('down')} className="text-center max-w-3xl mx-auto mb-16">
            <SectionHeading align="center" eyebrow={en ? 'Facilities' : 'Cơ sở'} title={content.coSo.title} />
            <div className="prose-editorial mx-auto mt-6">
              <p className="whitespace-pre-line text-ink-soft">{content.coSo.intro}</p>
            </div>
          </motion.div>

          <motion.div {...anim('up')} className="relative rounded-[2rem] overflow-hidden shadow-2xl group aspect-[16/9] lg:aspect-[21/9] w-full max-w-6xl mx-auto mb-16">
            <img src="/images/coso.png" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Văn phòng VTAX" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent flex flex-col justify-end p-8 lg:p-12 text-white">
              <div className="max-w-2xl">
                <span className="w-16 h-1 bg-secondary rounded-full mb-6 block" />
                <h4 className="text-3xl lg:text-4xl text-white font-bold mb-4">{content.coSo.cardTitle}</h4>
                <p className="text-lg text-white/90 whitespace-pre-line">{content.coSo.cardText}</p>
              </div>
            </div>
          </motion.div>

          <motion.div {...anim('up', 0.2)} className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {content.coSo.stats.map((stat, i) => (
                <div key={`${stat.label}-${i}`} className="bg-white rounded-2xl p-6 lg:p-8 text-center shadow-sm border border-line hover:shadow-md hover:border-primary/20 transition-all duration-300">
                  <div className={`text-4xl lg:text-5xl font-display font-bold mb-3 ${i % 2 === 0 ? 'text-primary' : 'text-secondary'}`}>{stat.number}</div>
                  <div className="text-xs uppercase font-montserrat font-bold text-ink-soft tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 6. Organisational structure ─────────────────────────────── */}
      <section id="co-cau" className="scroll-mt-32 py-20 lg:py-28 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div {...anim('down')}>
            <SectionHeading
              align="center"
              eyebrow={en ? 'Organisation' : 'Tổ chức'}
              title={content.coCau.title}
              subtitle={content.coCau.intro}
            />
          </motion.div>

          <motion.div {...anim('up')} className="relative flex flex-col items-center mt-16 lg:mt-20">
            {/* Background connecting line */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-primary via-primary/50 to-line -z-10 rounded-full" />
            
            {content.coCau.roles.map((role, i) => {
              const isTop = i === 0;
              const isSecond = i === 1;
              const tone = isTop
                ? 'bg-gradient-to-r from-vtax-dark to-primary text-white shadow-xl shadow-primary/20 scale-105'
                : isSecond
                  ? 'bg-white text-primary border-2 border-primary shadow-lg shadow-primary/10'
                  : 'bg-white text-ink border border-line shadow-sm';
              
              return (
                <div key={`${role}-${i}`} className="relative w-full flex justify-center mb-8 last:mb-0 group">
                  {/* Decorative dot on the line */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-4 border-primary z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className={`relative z-10 w-full ${i < 2 ? 'max-w-sm' : 'max-w-xl'} rounded-full px-8 py-5 text-center font-montserrat font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${tone}`}>
                    {role}
                  </div>
                </div>
              );
            })}
          </motion.div>

          <motion.div {...anim('up')} className="max-w-4xl mx-auto mt-24">
            <div className="relative rounded-[2rem] bg-slate-50 border border-line p-10 lg:p-14 flex flex-col md:flex-row items-center gap-10 overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-0" />
              <div className="relative z-10 w-32 h-32 shrink-0 rounded-[2rem] bg-white border-2 border-primary/10 shadow-md flex items-center justify-center p-6">
                <img src="/images/logo.png" className="w-full h-full object-contain" alt="VTAX" />
              </div>
              <div className="relative z-10 flex-1">
                <Quote className="w-12 h-12 text-secondary/20 mb-4" />
                <p className="font-display text-xl lg:text-2xl text-ink font-medium leading-relaxed whitespace-pre-line italic">"{content.coCau.quoteText}"</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <MediaGallerySection />

      {/* ── Closing CTA ─────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-vtax-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-finance opacity-50 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(34rem_34rem_at_80%_-10%,rgba(217,83,31,0.18),transparent_60%),radial-gradient(36rem_36rem_at_0%_120%,rgba(10,77,140,0.42),transparent_55%)] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-2xl">
          <div className="flex justify-center mb-5">
            <span className="eyebrow eyebrow--center">{en ? 'Partner with us' : 'Hợp tác cùng chúng tôi'}</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-semibold text-white">
            {en ? 'Partner with VTAX' : 'Sẵn sàng đồng hành cùng VTAX'}
          </h2>
          <p className="text-white/75 mt-5 leading-relaxed">
            {en
              ? 'Discover our full portfolio of financial and accounting solutions, or reach out — our specialists are ready to support you.'
              : 'Khám phá danh mục giải pháp kế toán và đại lý thuế chuyên nghiệp, hoặc liên hệ ngay — đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bạn.'}
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href={localePath(locale, '/dich-vu')} className="btn btn-accent">
              {en ? 'Explore services' : 'Khám phá dịch vụ'} <ArrowRight size={16} />
            </Link>
            <Link href={localePath(locale, '/lien-he')} className="btn btn-ghost-light">
              {en ? 'Contact us' : 'Liên hệ ngay'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
