import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, ChevronRight, PhoneCall } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';
import { resolveLocale, localePath } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/getDictionary';

// This is the SINGLE generic template for ALL services.
// The content should dynamically load based on the `slug`, but for now we'll use placeholder content.

export async function generateMetadata({ params }: { params: Promise<{ locale: string, slug: string }> }): Promise<Metadata> {
  const en = resolveLocale((await params).locale) === 'en';
  // In a real app, fetch the service by slug to get the title
  return {
    title: en ? 'Service Details - VTAX' : 'Chi tiết dịch vụ - VTAX',
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const en = locale === 'en';
  const dict = getDictionary(locale);

  // Mock fetching service details
  const serviceName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="w-full bg-white">
      {/* Dynamic Header Banner */}
      <div className="bg-vtax-dark text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-finance opacity-20 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <Reveal direction="down">
            <div className="flex items-center gap-2 text-sm text-white/60 mb-6 font-montserrat tracking-widest uppercase">
              <Link href={localePath(locale, '/')} className="hover:text-white transition-colors">{dict.nav.home}</Link>
              <ChevronRight size={14} />
              <Link href={localePath(locale, '/dich-vu')} className="hover:text-white transition-colors">{dict.nav.services}</Link>
              <ChevronRight size={14} />
              <span className="text-secondary truncate max-w-[200px]">{serviceName}</span>
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">
              {serviceName}
            </h1>
            <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
              {en 
                ? 'Providing professional, accurate, and fully compliant financial solutions to help your business operate with peace of mind.' 
                : 'Cung cấp giải pháp tài chính chuyên nghiệp, chính xác và tuân thủ tuyệt đối quy định pháp luật, giúp doanh nghiệp an tâm hoạt động.'}
            </p>
          </Reveal>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Main Content Area */}
          <main className="w-full lg:w-2/3">
            <Reveal direction="up">
              <div className="prose prose-lg max-w-none text-ink-soft">
                <h2 className="text-2xl font-display font-semibold text-ink mb-6">
                  {en ? 'Overview' : 'Tổng quan dịch vụ'}
                </h2>
                <p>
                  {en ? 'This is a shared template layout designed to dynamically display information for any service.' : 'Đây là giao diện dùng chung được thiết kế để hiển thị thông tin động cho bất kỳ dịch vụ nào. Thay vì thiết kế riêng lẻ, nội dung ở đây sẽ được tải dựa trên đường dẫn (slug) của dịch vụ.'}
                </p>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                </p>

                <h3 className="text-xl font-display font-semibold text-ink mt-10 mb-6">
                  {en ? 'Key Benefits' : 'Lợi ích mang lại'}
                </h3>
                <ul className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="text-secondary shrink-0 mt-1" size={20} />
                      <span>{en ? `Benefit point ${i} explaining the value of the service.` : `Điểm lợi ích ${i} giải thích giá trị cốt lõi mà dịch vụ mang lại cho doanh nghiệp.`}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-display font-semibold text-ink mt-10 mb-6">
                  {en ? 'Service Process' : 'Quy trình thực hiện'}
                </h3>
                <div className="space-y-6">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex gap-4 p-5 rounded-xl border border-line bg-paper/50">
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shrink-0">
                        {step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-ink mb-1">{en ? `Step ${step}` : `Bước ${step}`}</h4>
                        <p className="text-sm">{en ? 'Detailed explanation of this step in the process.' : 'Giải thích chi tiết các công việc thực hiện trong bước này.'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </main>

          {/* Sticky Sidebar */}
          <aside className="w-full lg:w-1/3">
            <div className="sticky top-28 space-y-8">
              {/* Contact Box */}
              <div className="bg-paper p-8 rounded-2xl border border-line shadow-elegant">
                <h3 className="font-display text-xl font-semibold text-ink mb-4">
                  {en ? 'Need consultation?' : 'Bạn cần tư vấn?'}
                </h3>
                <p className="text-sm text-ink-soft mb-6">
                  {en ? 'Leave your details and our experts will get back to you shortly.' : 'Để lại thông tin, chuyên gia VTAX sẽ liên hệ tư vấn chi tiết cho bạn.'}
                </p>
                <Link href={localePath(locale, '/lien-he')} className="btn btn-primary w-full justify-center">
                  {en ? 'Contact Now' : 'Liên hệ ngay'}
                </Link>
                
                <div className="mt-6 pt-6 border-t border-line flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                    <PhoneCall size={20} />
                  </div>
                  <div>
                    <span className="block text-xs uppercase font-bold tracking-wider text-ink-soft mb-1">{en ? 'Direct Hotline' : 'Hotline trực tiếp'}</span>
                    <a href="tel:19001234" className="font-display font-bold text-lg text-ink hover:text-secondary transition-colors">
                      1900 1234
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
