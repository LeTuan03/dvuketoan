import { Metadata } from 'next';
import { Suspense } from 'react';
import AboutContent from './AboutContent';
import { resolveLocale } from '@/lib/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const en = resolveLocale((await params).locale) === 'en';
  const title = en
    ? 'About - VTAX | Veterinary Accounting & Tax Services'
    : 'Giới Thiệu - VTAX | Dịch Vụ Kế Toán & Thuế';
  const description = en
    ? 'Discover VTAX - Veterinary Accounting & Tax Services, a professional partner in accounting and tax services for veterinary businesses in Vietnam.'
    : 'Tìm hiểu về VTAX - Dịch Vụ Kế Toán & Thuế, đối tác chuyên nghiệp về dịch vụ kế toán và thuế cho các doanh nghiệp tại Việt Nam.';
  return {
    title,
    description,
    keywords: en
      ? ['about VTAX', 'veterinary accounting', 'tax services', 'VTAX history', 'vision mission']
      : ['giới thiệu VTAX', 'dịch vụ kế toán', 'dịch vụ thuế', 'lịch sử VTAX', 'tầm nhìn sứ mệnh'],
    robots: 'index, follow',
    openGraph: {
      title: en ? 'About - VTAX' : 'Giới Thiệu - VTAX',
      description: en
        ? 'Discover VTAX - a professional partner in accounting and tax services for veterinary businesses in Vietnam.'
        : 'Tìm hiểu về VTAX - Đối tác chuyên nghiệp về dịch vụ kế toán và thuế cho các doanh nghiệp tại Việt Nam.',
      url: 'https://vtax.com/gioi-thieu',
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
