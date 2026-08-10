"use client";

import React, { useState } from 'react';
import { Search, Briefcase, ChevronRight, FileText, CheckCircle2 } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import Reveal from '@/components/shared/Reveal';
import { useLocale } from '@/lib/i18n/LocaleProvider';

// Mock data for business lines (Mã ngành nghề kinh doanh)
const businessLines = [
  { code: '6201', name: 'Lập trình máy vi tính', category: 'Công nghệ thông tin' },
  { code: '6202', name: 'Tư vấn máy vi tính và quản trị hệ thống máy vi tính', category: 'Công nghệ thông tin' },
  { code: '6209', name: 'Hoạt động dịch vụ công nghệ thông tin và dịch vụ khác liên quan đến máy vi tính', category: 'Công nghệ thông tin' },
  { code: '6920', name: 'Hoạt động kế toán, kiểm toán và tư vấn về thuế', category: 'Tài chính - Kế toán' },
  { code: '7020', name: 'Hoạt động tư vấn quản lý', category: 'Tư vấn' },
  { code: '4610', name: 'Đại lý, môi giới, đấu giá', category: 'Thương mại' },
  { code: '4690', name: 'Bán buôn tổng hợp', category: 'Thương mại' },
  { code: '4791', name: 'Bán lẻ qua bưu điện hoặc internet', category: 'Thương mại' },
  { code: '8299', name: 'Hoạt động dịch vụ hỗ trợ kinh doanh khác còn lại chưa được phân vào đâu', category: 'Dịch vụ' },
];

export default function TraCuuPage() {
  const { locale } = useLocale();
  const en = locale === 'en';
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredLines = businessLines.filter(line => 
    line.code.includes(searchTerm) || 
    line.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    line.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full bg-paper min-h-screen">
      <PageHero
        locale={locale}
        title={en ? 'Business Line Lookup' : 'Tra cứu mã ngành nghề'}
        subtitle={en ? 'Search and look up standard business line codes for company registration in Vietnam.' : 'Công cụ tra cứu mã ngành nghề kinh doanh chuẩn xác phục vụ cho việc thành lập và thay đổi giấy phép doanh nghiệp.'}
        breadcrumb={[
          { label: en ? 'Home' : 'Trang chủ', href: '/' },
          { label: en ? 'Lookup' : 'Tra cứu', href: '/tra-cuu' },
        ]}
      />

      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <Reveal direction="down">
            {/* Search Box */}
            <div className="bg-white p-6 lg:p-10 rounded-3xl shadow-elegant border border-line mb-12">
              <h2 className="font-display text-2xl lg:text-3xl font-semibold text-ink mb-6 text-center">
                {en ? 'Find Business Line Codes' : 'Tìm kiếm Mã ngành nghề'}
              </h2>
              
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder={en ? 'Enter code, keyword or category...' : 'Nhập mã ngành, từ khóa hoặc lĩnh vực...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-14 pl-14 pr-6 rounded-xl border border-line bg-paper/50 text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-lg placeholder:text-ink-soft/60"
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-ink-soft" size={24} />
              </div>
              
              <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
                <span className="text-ink-soft">{en ? 'Popular searches:' : 'Tìm kiếm phổ biến:'}</span>
                {['Kế toán', 'Thương mại', 'Công nghệ', 'Tư vấn'].map(keyword => (
                  <button 
                    key={keyword}
                    onClick={() => setSearchTerm(keyword)}
                    className="text-primary hover:text-secondary underline decoration-primary/30 underline-offset-4 transition-colors"
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="up">
            {/* Results */}
            <div className="bg-white rounded-2xl shadow-elegant border border-line overflow-hidden">
              <div className="bg-paper p-5 border-b border-line flex justify-between items-center">
                <h3 className="font-semibold text-ink">
                  {en ? 'Search Results' : 'Kết quả tìm kiếm'} ({filteredLines.length})
                </h3>
              </div>
              
              {filteredLines.length > 0 ? (
                <div className="divide-y divide-line">
                  {filteredLines.map((line, idx) => (
                    <div key={idx} className="p-6 hover:bg-paper/50 transition-colors flex flex-col md:flex-row md:items-center gap-4 group">
                      <div className="flex items-center gap-4 md:w-32 shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-primary-light/20 flex items-center justify-center text-primary font-display font-semibold text-lg">
                          {line.code}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-display font-semibold text-lg text-ink group-hover:text-primary transition-colors">
                          {line.name}
                        </h4>
                        <span className="inline-flex items-center gap-1.5 mt-2 text-xs font-montserrat uppercase tracking-wider text-secondary">
                          <Briefcase size={12} />
                          {line.category}
                        </span>
                      </div>
                      <div className="md:w-auto shrink-0 mt-2 md:mt-0">
                        <button className="btn btn-outline text-xs px-4 py-2">
                          {en ? 'Select' : 'Chọn ngành này'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-16 text-center text-ink-soft">
                  <FileText className="w-16 h-16 mx-auto text-line mb-4" />
                  <p className="text-lg">{en ? 'No business lines found matching your search.' : 'Không tìm thấy ngành nghề nào phù hợp với từ khóa của bạn.'}</p>
                </div>
              )}
            </div>
          </Reveal>
          
          <Reveal direction="up" delay={0.2} className="mt-12">
            <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20 flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                <CheckCircle2 size={32} />
              </div>
              <div>
                <h3 className="font-display font-semibold text-xl text-ink mb-2">
                  {en ? 'Need help with company registration?' : 'Bạn cần hỗ trợ thủ tục thành lập doanh nghiệp?'}
                </h3>
                <p className="text-ink-soft text-sm">
                  {en 
                    ? 'Our legal experts can help you select the most optimal business lines and handle all paperwork.' 
                    : 'Chuyên gia của VTAX sẽ hỗ trợ bạn lựa chọn mã ngành phù hợp nhất và thay mặt thực hiện toàn bộ thủ tục pháp lý.'}
                </p>
              </div>
              <button className="btn btn-primary md:ml-auto whitespace-nowrap">
                {en ? 'Get Consultation' : 'Nhận tư vấn ngay'}
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
