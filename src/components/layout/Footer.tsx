"use client";

import React from 'react';
import Link from 'next/link';
import { FacebookOutlined, YoutubeOutlined } from '@ant-design/icons';
import { useLocale } from '@/lib/i18n/LocaleProvider';
import { localePath } from '@/lib/i18n/config';
import { localize } from '@/lib/i18n/localize';
import { motion } from 'framer-motion';
import Monogram from '@/components/shared/Monogram';

export default function Footer() {
  const { locale, t } = useLocale();
  const [menus, setMenus] = React.useState<any[]>([]);
  const [settings, setSettings] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [menusRes, settingsRes] = await Promise.all([
          fetch('/api/data/menus'),
          fetch('/api/data/settings'),
        ]);
        const menusData = await menusRes.json();
        const settingsData = await settingsRes.json();

        if (Array.isArray(menusData)) {
          setMenus(menusData.filter((m: any) => m.position === 'footer' || m.position === 'both'));
        }
        setSettings(settingsData);
      } catch (error) {
        console.error('Failed to fetch footer data', error);
      }
    };
    fetchData();
  }, []);

  const heading = "text-white font-display text-lg font-semibold mb-6 relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-9 after:h-[2px] after:bg-secondary after:rounded-full tracking-tight";
  const linkClass = "text-white/70 hover:text-secondary transition-colors inline-flex items-center gap-2 group/link";

  return (
    <footer className="box-footer text-white pt-0 pb-8 text-[0.875rem] w-full relative overflow-hidden" suppressHydrationWarning>
      {/* signature motif + monogram watermark */}
      <div className="absolute inset-0 bg-finance opacity-50 pointer-events-none" />
      <div className="absolute -right-16 -bottom-16 pointer-events-none hidden lg:block">
        <Monogram size={360} withText text={locale === 'en' ? 'VTAX · ACCOUNTING SERVICES · ' : undefined} tone="light" className="opacity-[0.05]" />
      </div>

      {/* Signature top band */}
      <div className="relative z-10 border-b border-white/10">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Monogram size={52} withText={false} tone="light" className="opacity-90 shrink-0" />
            <div>
              <p className="font-display text-xl font-semibold text-white leading-tight">VTAX</p>
              <p className="text-white/55 text-xs tracking-[0.18em] uppercase font-montserrat mt-1">
                {locale === 'en' ? 'Advanced Veterinary Technology' : 'Advanced Veterinary Technology'}
              </p>
            </div>
          </div>
          <div className="divider-diamond text-secondary w-full max-w-xs"><span /></div>
          <p className="font-display italic text-white/80 text-lg text-center md:text-right">
            {t('header.slogan')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-14" suppressHydrationWarning>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Col 1 - Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            <Link href={localePath(locale, '/')} className="inline-flex mb-3">
              <img src="/images/logo.png" alt="VTAX" className="h-12 brightness-0 invert" />
            </Link>
            <p className="font-semibold text-white/90">{locale === 'en' ? (settings?.companyNameEn || settings?.companyName || 'BIOTECHNOLOGY VETERINARY.,J.S.C') : (settings?.companyName || 'BIOTECHNOLOGY VETERINARY.,J.S.C')}</p>
            <p className="text-white/70"><strong className="text-white/80 font-semibold">{t('footer.headquarters')}:</strong> {locale === 'en' ? (settings?.addressHNEn || settings?.addressHN || 'Lien Phuong Industrial Cluster, Hong Van, Thuong Tin, Hanoi') : (settings?.addressHN || 'Cụm CN Liên Phương, Xã Hồng Vân, Hà Nội')}</p>
            <p className="text-white/70"><strong className="text-white/80 font-semibold">{t('footer.phone')}:</strong> <a href={`tel:${settings?.hotline1}`} className="hover:text-secondary transition-colors">{settings?.hotline1 || '0915 999 831'}</a> | <a href={`tel:${settings?.hotline2}`} className="hover:text-secondary transition-colors">{settings?.hotline2 || '024 3371 8653'}</a></p>
            <p className="text-white/70"><strong className="text-white/80 font-semibold">{t('footer.email')}:</strong> <a href={`mailto:${settings?.email}`} className="hover:text-secondary transition-colors">{settings?.email || 'pkd.VTAX@gmail.com'}</a></p>
            <p className="text-white/70"><strong className="text-white/80 font-semibold">{t('footer.website')}:</strong> <a href={settings?.website || 'https://vtax.com/'} target="_blank" rel="noopener" className="hover:text-secondary transition-colors">{(settings?.website || 'https://vtax.com/').replace(/^https?:\/\//, '').replace(/\/$/, '')}</a></p>
            {settings?.addressHCM && (
              <p className="mt-4 pt-4 border-t border-white/10 text-white/70">
                <strong className="text-white/80 font-semibold">{t('footer.southBranch')}:</strong><br />
                {settings.addressHCM}
              </p>
            )}
          </motion.div>

          {/* Col 2 - Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className={heading}>{t('footer.productsTitle')}</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/dich-vu/dich-vu-ke-toan-tron-goi', label: locale === 'en' ? 'Full Accounting' : 'Kế toán trọn gói' },
                { href: '/dich-vu/bao-cao-thue-thang-quy', label: locale === 'en' ? 'Tax Reports' : 'Báo cáo thuế' },
                { href: '/dich-vu/quyet-toan-thue-nam', label: locale === 'en' ? 'Tax Settlement' : 'Quyết toán thuế' },
                { href: '/dich-vu/tu-van-thanh-lap-doanh-nghiep', label: locale === 'en' ? 'Business Setup' : 'Thành lập DN' },
                { href: '/dich-vu/hoan-thue', label: locale === 'en' ? 'VAT Refund' : 'Hoàn thuế GTGT' },
                { href: '/dich-vu/kiem-toan-noi-bo', label: locale === 'en' ? 'Internal Audit' : 'Kiểm toán nội bộ' },
              ].map((svc) => (
                <li key={svc.href}>
                  <Link href={localePath(locale, svc.href)} className={linkClass}>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover/link:bg-secondary transition-colors" />
                    {svc.label}
                  </Link>
                </li>
              ))}
              <li><Link href={localePath(locale, '/dich-vu')} className="text-white/70 hover:text-secondary transition-colors">{t('footer.allProducts')}</Link></li>
            </ul>
          </motion.div>

          {/* Col 3 - Technical Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className={heading}>{t('footer.techSupport')}</h3>
            <div className="mb-6">
              <p className="text-white font-semibold mb-0.5">{settings?.support?.doctorName || 'ThS.BS Phùng Thanh Sơn'}</p>
              <p className="text-white/55 text-xs uppercase tracking-[0.14em] font-montserrat mb-2">
                {locale === 'en' ? 'Technical Director' : (settings?.support?.doctorRole || 'Giám đốc Kỹ thuật')}
              </p>
              <p className="text-white/70">Email: <a href={`mailto:${settings?.support?.doctorEmail}`} className="hover:text-secondary transition-colors">{settings?.support?.doctorEmail || 'thanhson256@gmail.com'}</a></p>
              <p className="text-white/70">{t('footer.phone')}: <a href={`tel:${settings?.support?.doctorPhone}`} className="hover:text-secondary transition-colors">{settings?.support?.doctorPhone || '0984 051 798'}</a></p>
            </div>
            <div className="pt-4 border-t border-white/10">
              <h4 className="text-white/90 font-semibold mb-4 uppercase text-[0.68rem] tracking-[0.2em] font-montserrat">{t('footer.connectWithUs')}</h4>
              <div className="flex gap-3">
                <a href={settings?.social?.facebook || "https://facebook.com/ThuocThuYbiotechvet"} target="_blank" rel="noopener" className="w-10 h-10 bg-white/8 border border-white/10 hover:bg-secondary hover:border-secondary rounded-xl flex items-center justify-center text-white/70 hover:text-white transition-all text-lg">
                  <FacebookOutlined />
                </a>
                <a href={settings?.social?.youtube || "https://www.youtube.com/@Biotech-VET"} target="_blank" rel="noopener" className="w-10 h-10 bg-white/8 border border-white/10 hover:bg-secondary hover:border-secondary rounded-xl flex items-center justify-center text-white/70 hover:text-white transition-all text-lg">
                  <YoutubeOutlined />
                </a>
                <a href={`https://zalo.me/${settings?.social?.zalo || "0974999204"}`} target="_blank" rel="noopener" className="w-10 h-10 bg-white/8 border border-white/10 hover:bg-secondary hover:border-secondary rounded-xl flex items-center justify-center text-white/70 hover:text-white transition-all text-xs font-semibold">
                  Zalo
                </a>
              </div>
            </div>
          </motion.div>

          {/* Col 4 - Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className={heading}>{t('footer.quickLinks')}</h3>
            <ul className="space-y-2.5">
              {menus.filter(m => m.status && (m.parent === null || m.parent === undefined)).sort((a, b) => a.order - b.order).map((menu) => (
                <li key={menu.id}>
                  <Link href={localePath(locale, menu.link)} className={linkClass}>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover/link:bg-secondary transition-colors" />
                    {localize(menu, locale).name as string}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-white/45 text-[0.8rem]">
          <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
          <p className="font-montserrat tracking-[0.18em] uppercase text-[0.66rem]">VTAX · ACCOUNTING SERVICES</p>
        </div>
      </div>
    </footer>
  );
}
