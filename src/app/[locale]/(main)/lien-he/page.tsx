import { Metadata } from 'next';
import ContactContent from './ContactContent';
import { settingService } from '@/services';
import { resolveLocale } from '@/lib/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const en = resolveLocale((await params).locale) === 'en';
  const title = en ? 'Contact - VTAX | 24/7 Technical Support' : 'Liên Hệ - VTAX | Hỗ Trợ Kỹ Thuật 24/7';
  const description = en
    ? 'Contact VTAX — we are always ready to listen and answer your questions about veterinary medicines and livestock farming techniques, 24/7.'
    : 'Liên hệ với VTAX – Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn về dược thú y và kỹ thuật chăn nuôi 24/7.';
  return {
    title,
    description,
    keywords: en
      ? ['contact VTAX', 'VTAX hotline', 'company address', 'veterinary technical support', 'veterinary consultation']
      : ['liên hệ VTAX', 'hotline VTAX', 'địa chỉ công ty việt anh', 'hỗ trợ kỹ thuật thú y', 'tư vấn dược thú y'],
    robots: 'index, follow',
    openGraph: {
      title: en ? 'Contact - VTAX' : 'Liên Hệ - VTAX',
      description: en
        ? 'Contact VTAX — technical support and consultation, 24/7.'
        : 'Liên hệ với VTAX – Hỗ trợ kỹ thuật và tư vấn 24/7.',
      url: 'https://vtax.com/lien-he',
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

export default async function Page() {
  const settings = (await settingService.get()) as any;
  return <ContactContent settings={settings} />;
}
