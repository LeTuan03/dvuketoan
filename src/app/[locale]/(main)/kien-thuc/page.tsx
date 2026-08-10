import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar, User } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import Reveal from '@/components/shared/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/shared/Stagger';
import { resolveLocale, localePath } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/getDictionary';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const en = resolveLocale((await params).locale) === 'en';
  return {
    title: en ? 'Knowledge - VTAX' : 'Kiến thức - VTAX',
    description: en ? 'Legal, tax, and business knowledge base.' : 'Kho kiến thức pháp lý, thuế và doanh nghiệp.',
  };
}

// Dummy data
const articles = [
  { id: '1', slug: 'nhung-thay-doi-luat-thue-2026', title: 'Những thay đổi quan trọng về Luật Thuế năm 2026', category: 'Thuế', date: '10/08/2026' },
  { id: '2', slug: 'huong-dan-quyet-toan-thue', title: 'Hướng dẫn chi tiết quyết toán thuế TNDN', category: 'Kế toán', date: '05/08/2026' },
  { id: '3', slug: 'luu-y-khi-thanh-lap-cong-ty', title: '5 lưu ý pháp lý sống còn khi thành lập công ty', category: 'Pháp lý', date: '01/08/2026' },
  { id: '4', slug: 'chinh-sach-bao-hiem-xa-hoi', title: 'Cập nhật chính sách Bảo hiểm xã hội mới nhất', category: 'Doanh nghiệp', date: '25/07/2026' },
  { id: '5', slug: 'cach-tinh-thue-tncn', title: 'Cách tính thuế thu nhập cá nhân (TNCN) chuẩn xác', category: 'Thuế', date: '20/07/2026' },
  { id: '6', slug: 'quy-trinh-hoan-thue-gtgt', title: 'Quy trình và thủ tục hoàn thuế GTGT cập nhật', category: 'Kế toán', date: '15/07/2026' },
];

export default async function KnowledgePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = resolveLocale((await params).locale);
  const en = locale === 'en';
  const dict = getDictionary(locale);

  return (
    <div className="w-full bg-paper min-h-screen">
      <PageHero
        locale={locale}
        title={dict.nav.knowledge}
        subtitle={en ? 'Insights & Updates for Your Business' : 'Chia sẻ kinh nghiệm, kiến thức pháp lý - thuế - doanh nghiệp'}
        breadcrumb={[
          { label: dict.nav.home, href: '/' },
          { label: dict.nav.knowledge, href: '/kien-thuc' },
        ]}
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.1}>
            {articles.map((article) => (
              <StaggerItem key={article.id}>
                <article className="card-elegant h-full flex flex-col group overflow-hidden bg-white">
                  <Link href={localePath(locale, `/kien-thuc/${article.slug}`)} className="block aspect-[16/10] bg-gray-100 overflow-hidden relative">
                    <div className="absolute inset-0 bg-finance opacity-10" />
                    <div className="absolute inset-0 flex items-center justify-center text-primary/20 group-hover:scale-110 transition-transform duration-700">
                      <span className="font-display text-4xl font-bold opacity-30">VTAX</span>
                    </div>
                  </Link>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 mb-4 text-xs font-montserrat uppercase tracking-wider text-ink-soft">
                      <span className="text-secondary font-bold">{article.category}</span>
                      <span className="flex items-center gap-1.5"><Calendar size={12}/> {article.date}</span>
                    </div>
                    <h3 className="font-display text-[1.1rem] font-semibold text-ink leading-snug mb-4 group-hover:text-primary transition-colors">
                      <Link href={localePath(locale, `/kien-thuc/${article.slug}`)}>{article.title}</Link>
                    </h3>
                    <p className="text-sm text-ink-soft line-clamp-2 mb-6 flex-grow">
                      {en ? 'A comprehensive guide on the latest updates and what they mean for your business operations.' : 'Bài viết cung cấp những thông tin, quy định mới nhất và hướng dẫn chi tiết áp dụng cho doanh nghiệp.'}
                    </p>
                    <Link
                      href={localePath(locale, `/kien-thuc/${article.slug}`)}
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary hover:text-secondary transition-colors mt-auto"
                    >
                      {dict.common.readMore} <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </div>
  );
}
