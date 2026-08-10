import { Metadata } from 'next';
import { Suspense } from 'react';
import AboutContent from './AboutContent';
import { resolveLocale } from '@/lib/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const en = resolveLocale((await params).locale) === 'en';
  const title = en
    ? 'About - VTAX | Veterinary Biotechnology JSC'
    : 'Giới Thiệu - VTAX | BIOTECHNOLOGY VETERINARY.,J.S.C';
  const description = en
    ? 'Discover VTAX - Veterinary Biotechnology JSC, a pioneer in USA-technology veterinary pharmaceutical manufacturing in Vietnam.'
    : 'Tìm hiểu về VTAX - BIOTECHNOLOGY VETERINARY.,J.S.C, đơn vị tiên phong trong sản xuất dược thú y công nghệ USA tại Việt Nam.';
  return {
    title,
    description,
    keywords: en
      ? ['about VTAX', 'veterinary biotechnology', 'veterinary pharmaceutical factory', 'VTAX history', 'vision mission']
      : ['giới thiệu VTAX', 'công ty việt anh', 'nhà máy dược thú y', 'lịch sử VTAX', 'tầm nhìn sứ mệnh'],
    robots: 'index, follow',
    openGraph: {
      title: en ? 'About - VTAX' : 'Giới Thiệu - VTAX',
      description: en
        ? 'Discover VTAX - a pioneer in USA-technology veterinary pharmaceutical manufacturing in Vietnam.'
        : 'Tìm hiểu về VTAX - Đơn vị tiên phong sản xuất dược thú y công nghệ USA tại Việt Nam.',
      url: 'https://VTAX.com/gioi-thieu',
      images: [
        {
          url: '/images/about.svg',
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default function Page() {
  return (
    <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading...</div>}>
      <AboutContent />
    </Suspense>
  );
}
