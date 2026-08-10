import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding VTAX accounting data…');

  // ── Settings ────────────────────────────────────────────────────────────
  const settingsData = {
    companyName: 'CÔNG TY DỊCH VỤ KẾ TOÁN VTAX',
    companyNameEn: 'VTAX ACCOUNTING SERVICES COMPANY',
    addressHN: 'Tầng 5, Tòa nhà Sông Đà, Phạm Hùng, Nam Từ Liêm, Hà Nội',
    addressHNEn: '5th Floor, Song Da Building, Pham Hung, Nam Tu Liem, Hanoi',
    addressHCM: 'Tầng 8, Tòa nhà Viettel, 285 Cách Mạng Tháng Tám, Quận 10, TP. HCM',
    hotline1: '1900 6884',
    hotline2: '024 3793 8866',
    email: 'info@vtax.com.vn',
    website: 'https://vtax.com.vn',
    intro_slogan: 'Đồng hành cùng sự phát triển bền vững của doanh nghiệp',
    intro_sloganEn: 'Partnering with your sustainable business growth',
    social: {
      facebook: 'https://www.facebook.com/vtaxketoan',
      youtube: 'https://www.youtube.com/@vtaxketoan',
      zalo: '0901234567',
    },
    support: {
      doctorName: 'ThS. Nguyễn Hoàng Minh',
      doctorRole: 'Giám đốc Tư vấn Thuế',
      doctorEmail: 'minh.nh@vtax.com.vn',
      doctorPhone: '0901 234 567',
    },
  };
  await (prisma.setting as any).upsert({
    where: { id: 1 },
    update: { data: settingsData },
    create: { id: 1, data: settingsData },
  });

  // ── Nav menus ───────────────────────────────────────────────────────────
  await prisma.navMenu.deleteMany({});

  const mk = (data: any) =>
    prisma.navMenu.create({ data: { position: 'both', status: true, ...data } });
  const child = (parentId: bigint, data: any) =>
    prisma.navMenu.create({ data: { position: 'header', status: true, parent: parentId, ...data } });

  await mk({ name: 'Trang chủ', nameEn: 'Home', link: '/', order: 1 });
  const about = await mk({ name: 'Giới thiệu', nameEn: 'About Us', link: '/gioi-thieu', order: 2 });
  const dichvu = await mk({ name: 'Dịch vụ', nameEn: 'Services', link: '/dich-vu', order: 3 });
  await mk({ name: 'Kiến thức', nameEn: 'Knowledge', link: '/kien-thuc', order: 4 });
  await mk({ name: 'Tra cứu', nameEn: 'Lookup', link: '/tra-cuu', order: 5 });
  await mk({ name: 'Tin tức', nameEn: 'News', link: '/tin-tuc', order: 6 });
  await mk({ name: 'Liên hệ', nameEn: 'Contact', link: '/lien-he', order: 7, isButton: true });

  // About submenu
  await child(about.id, { name: 'Lịch sử hình thành', nameEn: 'History', link: '/gioi-thieu?tab=lich-su', order: 1 });
  await child(about.id, { name: 'Giới thiệu chung', nameEn: 'Overview', link: '/gioi-thieu?tab=gioi-thieu', order: 2 });
  await child(about.id, { name: 'Tầm nhìn - Sứ mệnh', nameEn: 'Vision & Mission', link: '/gioi-thieu?tab=tam-nhin', order: 3 });
  await child(about.id, { name: 'Đội ngũ', nameEn: 'Our Team', link: '/gioi-thieu?tab=doi-ngu', order: 4 });

  // Services submenu
  await child(dichvu.id, { name: 'Kế toán trọn gói', nameEn: 'Full Accounting', link: '/dich-vu/dich-vu-ke-toan-tron-goi', order: 1 });
  await child(dichvu.id, { name: 'Báo cáo thuế', nameEn: 'Tax Reports', link: '/dich-vu/bao-cao-thue-thang-quy', order: 2 });
  await child(dichvu.id, { name: 'Quyết toán thuế', nameEn: 'Tax Settlement', link: '/dich-vu/quyet-toan-thue-nam', order: 3 });
  await child(dichvu.id, { name: 'Thành lập DN', nameEn: 'Company Setup', link: '/dich-vu/tu-van-thanh-lap-doanh-nghiep', order: 4 });

  // ── Articles — Kiến thức kế toán/thuế & Dịch vụ ───────────────────────────────────
  const articles = [
    {
      slug: 'dich-vu-ke-toan-tron-goi',
      title: 'Dịch vụ kế toán trọn gói',
      titleEn: 'Full Accounting Package',
      category: 'dich-vu',
      excerpt: 'Kiểm soát số liệu kế toán minh bạch, tiết kiệm thời gian.',
      excerptEn: 'Transparent accounting data management, saving you time.',
      content: '<h2>Dịch vụ kế toán trọn gói</h2><p>Giúp doanh nghiệp hoàn toàn an tâm về sổ sách kế toán, tiết kiệm tối đa thời gian và chi phí.</p>',
      contentEn: '<h2>Full Accounting Package</h2><p>Gives businesses complete peace of mind regarding accounting books, saving maximum time and costs.</p>'
    },
    {
      slug: 'bao-cao-thue-thang-quy',
      title: 'Báo cáo thuế tháng/quý',
      titleEn: 'Monthly/Quarterly Tax Reports',
      category: 'dich-vu',
      excerpt: 'Kê khai, nộp thuế đúng quy định, tránh rủi ro phạt.',
      excerptEn: 'Compliant tax filing, avoiding penalty risks.',
      content: '<h2>Báo cáo thuế định kỳ</h2><p>Đảm bảo kê khai, nộp thuế chính xác, đúng hạn theo đúng quy định pháp luật.</p>',
      contentEn: '<h2>Periodic Tax Reports</h2><p>Ensure accurate and timely tax declaration and payment according to legal regulations.</p>'
    },
    {
      slug: 'quyet-toan-thue-nam',
      title: 'Quyết toán thuế',
      titleEn: 'Annual Tax Settlement',
      category: 'dich-vu',
      excerpt: 'Tối ưu hóa số thuế phải nộp, hoàn thiện sổ sách năm.',
      excerptEn: 'Optimize tax obligations and finalize annual books.',
      content: '<h2>Quyết toán thuế năm</h2><p>Rà soát, hoàn thiện toàn bộ hệ thống sổ sách cuối năm và tối ưu hóa số thuế thu nhập doanh nghiệp.</p>',
      contentEn: '<h2>Annual Tax Settlement</h2><p>Review and finalize the entire year-end book system and optimize corporate income tax.</p>'
    },
    {
      slug: 'tu-van-thanh-lap-doanh-nghiep',
      title: 'Tư vấn thành lập',
      titleEn: 'Business Setup Consulting',
      category: 'dich-vu',
      excerpt: 'Hỗ trợ pháp lý nhanh chóng để bắt đầu kinh doanh.',
      excerptEn: 'Swift legal support to start your business.',
      content: '<h2>Tư vấn thành lập doanh nghiệp</h2><p>Hỗ trợ trọn gói từ khâu xin giấy phép, khắc dấu đến khai báo thuế ban đầu để doanh nghiệp nhanh chóng đi vào hoạt động.</p>',
      contentEn: '<h2>Business Setup Consulting</h2><p>Full package support from licensing, seal engraving to initial tax declaration so that businesses can quickly go into operation.</p>'
    },
    {
      slug: 'huong-dan-ke-khai-thue-gtgt-theo-quy',
      title: 'Hướng dẫn kê khai thuế GTGT theo quý mới nhất 2026',
      titleEn: 'Guide to quarterly VAT declaration 2026',
      category: 'kien-thuc',
      excerpt: 'Chi tiết các bước thực hiện kê khai thuế GTGT theo quý trên hệ thống thuế điện tử, tránh sai sót và nộp đúng hạn.',
      excerptEn: 'Step-by-step guide to quarterly VAT filing on the electronic tax system, avoiding errors and meeting deadlines.',
      content: '<h2>1. Đối tượng kê khai thuế GTGT theo quý</h2><p>Theo Thông tư 80/2021/TT-BTC, doanh nghiệp có tổng doanh thu bán hàng hóa và cung cấp dịch vụ của năm trước liền kề không quá 50 tỷ đồng được kê khai thuế GTGT theo quý.</p><h2>2. Thời hạn nộp tờ khai</h2><p>Chậm nhất ngày cuối cùng của tháng đầu quý tiếp theo. Ví dụ: Quý I (01-03) → nộp trước 30/04.</p><h2>3. Hồ sơ kê khai</h2><ul><li>Tờ khai thuế GTGT mẫu 01/GTGT</li><li>Bảng kê hóa đơn, chứng từ hàng hóa, dịch vụ bán ra (mẫu 01-1/GTGT)</li><li>Bảng kê hóa đơn, chứng từ hàng hóa, dịch vụ mua vào (mẫu 01-2/GTGT)</li></ul><h2>4. Thao tác trên hệ thống eTax</h2><p>Đăng nhập tại thuedientu.gdt.gov.vn → Chọn "Kê khai trực tuyến" → Chọn mẫu tờ khai → Nhập số liệu → Ký số và gửi tờ khai.</p>',
      contentEn: '<h2>1. Entities eligible for quarterly VAT filing</h2><p>Per Circular 80/2021/TT-BTC, businesses with prior-year revenue not exceeding VND 50 billion may file VAT quarterly.</p><h2>2. Filing deadline</h2><p>No later than the last day of the first month of the following quarter.</p>',
    },
    {
      slug: 'nhung-thay-doi-luat-thue-tncn-2026',
      title: 'Những thay đổi quan trọng về thuế TNCN năm 2026',
      titleEn: 'Key changes in Personal Income Tax 2026',
      category: 'kien-thuc',
      excerpt: 'Tổng hợp các điểm mới về thuế thu nhập cá nhân có hiệu lực từ 01/01/2026: mức giảm trừ gia cảnh, biểu thuế lũy tiến...',
      excerptEn: 'Summary of new PIT regulations effective from Jan 1, 2026: family deductions, progressive tax brackets...',
      content: '<h2>1. Mức giảm trừ gia cảnh mới</h2><p>Mức giảm trừ cho người nộp thuế tăng lên 13 triệu đồng/tháng (156 triệu đồng/năm). Mức giảm trừ cho mỗi người phụ thuộc là 5,2 triệu đồng/tháng.</p><h2>2. Biểu thuế lũy tiến từng phần</h2><p>Biểu thuế 7 bậc vẫn được áp dụng với các mức thuế suất từ 5% đến 35%. Tuy nhiên, ngưỡng thu nhập tính thuế ở mỗi bậc được điều chỉnh tăng.</p><h2>3. Thu nhập được miễn thuế</h2><ul><li>Thu nhập từ chuyển nhượng BĐS giữa vợ chồng, cha mẹ con cái</li><li>Tiền lương làm việc ban đêm, ngoài giờ (phần trả cao hơn)</li><li>Thu nhập từ tiền gửi tiết kiệm ngân hàng</li></ul>',
      contentEn: '<h2>1. New family deduction levels</h2><p>Taxpayer deduction increased to VND 13 million/month. Dependent deduction is VND 5.2 million/month each.</p>',
    },
    {
      slug: 'quy-trinh-thanh-lap-cong-ty-tnhh',
      title: 'Quy trình thành lập công ty TNHH từ A đến Z',
      titleEn: 'Complete guide to setting up an LLC in Vietnam',
      category: 'kien-thuc',
      excerpt: 'Hướng dẫn chi tiết 6 bước thành lập công ty TNHH: từ chuẩn bị hồ sơ, đăng ký kinh doanh đến khắc dấu và khai thuế ban đầu.',
      excerptEn: 'Detailed 6-step guide to LLC formation: from document preparation to business registration, seal engraving and initial tax filing.',
      content: '<h2>Bước 1: Chuẩn bị thông tin</h2><p>Xác định tên công ty, ngành nghề kinh doanh (mã VSIC), vốn điều lệ, địa chỉ trụ sở, thông tin thành viên góp vốn.</p><h2>Bước 2: Soạn hồ sơ đăng ký</h2><p>Giấy đề nghị đăng ký DN, Điều lệ công ty, Danh sách thành viên, Bản sao CCCD/hộ chiếu các thành viên.</p><h2>Bước 3: Nộp hồ sơ tại Sở KH&ĐT</h2><p>Nộp trực tuyến qua Cổng thông tin quốc gia về đăng ký doanh nghiệp (dangkykinhdoanh.gov.vn). Thời gian xử lý: 3-5 ngày làm việc.</p><h2>Bước 4: Nhận Giấy chứng nhận ĐKKD</h2><p>Sau khi được duyệt, nhận GCN ĐKKD gồm: Mã số thuế, Mã số DN.</p><h2>Bước 5: Khắc dấu & mở tài khoản ngân hàng</h2><p>Khắc con dấu pháp nhân, thông báo mẫu dấu lên Cổng thông tin quốc gia. Mở tài khoản ngân hàng DN.</p><h2>Bước 6: Đăng ký thuế ban đầu</h2><p>Khai thuế môn bài, đăng ký phương pháp tính thuế GTGT, mua/phát hành hóa đơn điện tử.</p>',
      contentEn: '<h2>Step 1: Prepare company information</h2><p>Determine company name, business lines (VSIC codes), charter capital, registered address, and member details.</p>',
    },
    {
      slug: 'cap-nhat-muc-dong-bhxh-bhyt-2026',
      title: 'Cập nhật mức đóng BHXH, BHYT, BHTN năm 2026',
      titleEn: 'Updated social insurance contribution rates 2026',
      category: 'tin-nganh',
      excerpt: 'Mức đóng bảo hiểm xã hội, bảo hiểm y tế và bảo hiểm thất nghiệp áp dụng từ 01/07/2026 cho người lao động và doanh nghiệp.',
      excerptEn: 'Social insurance, health insurance and unemployment insurance contribution rates effective from July 1, 2026.',
      content: '<h2>Tỷ lệ đóng BHXH bắt buộc</h2><p><strong>Doanh nghiệp đóng:</strong> 17,5% (hưu trí-tử tuất 14%, ốm đau-thai sản 3%, TNLĐ-BNN 0,5%)</p><p><strong>Người lao động đóng:</strong> 8% (hưu trí-tử tuất)</p><h2>Tỷ lệ đóng BHYT</h2><p>Doanh nghiệp: 3% | Người lao động: 1,5%</p><h2>Tỷ lệ đóng BHTN</h2><p>Doanh nghiệp: 1% | Người lao động: 1%</p><h2>Mức lương tối thiểu vùng 2026</h2><ul><li>Vùng I: 5.100.000 đ/tháng</li><li>Vùng II: 4.530.000 đ/tháng</li><li>Vùng III: 3.960.000 đ/tháng</li><li>Vùng IV: 3.540.000 đ/tháng</li></ul>',
      contentEn: '<h2>Mandatory SI contribution rates</h2><p><strong>Employer:</strong> 17.5%</p><p><strong>Employee:</strong> 8%</p>',
    },
    {
      slug: '5-diem-moi-luat-doanh-nghiep-2026',
      title: '5 Điểm mới trong Luật Doanh nghiệp áp dụng từ năm 2026',
      titleEn: '5 New points in the Enterprise Law 2026',
      category: 'tin-nganh',
      excerpt: 'Những thay đổi cốt lõi tác động đến thủ tục thành lập và quản trị doanh nghiệp mà các CEO cần nắm vững.',
      excerptEn: 'Core changes affecting business formation and governance that CEOs need to understand.',
      content: '<h2>1. Đơn giản hóa thủ tục đăng ký</h2><p>Giảm số lượng giấy tờ bắt buộc, cho phép đăng ký hoàn toàn trực tuyến qua eGov.</p><h2>2. Mở rộng quyền cổ đông thiểu số</h2><p>Cổ đông sở hữu từ 3% (trước là 5%) vốn điều lệ có quyền đề cử người vào HĐQT.</p><h2>3. Chuyển đổi loại hình DN nhanh hơn</h2><p>Thủ tục chuyển đổi từ TNHH sang Cổ phần và ngược lại được rút ngắn còn 5 ngày.</p><h2>4. Quy định mới về con dấu</h2><p>Doanh nghiệp được quyền sử dụng con dấu số (digital seal) thay cho con dấu vật lý.</p><h2>5. Minh bạch thông tin chủ sở hữu hưởng lợi</h2><p>Bắt buộc công khai thông tin chủ sở hữu hưởng lợi cuối cùng trong hồ sơ DN.</p>',
      contentEn: '<h2>1. Simplified registration</h2><p>Fewer required documents, fully online registration via eGov.</p>',
    },
    {
      slug: 'sai-lam-pho-bien-khi-quyet-toan-thue-tndn',
      title: '7 Sai lầm phổ biến khi quyết toán thuế TNDN doanh nghiệp cần tránh',
      titleEn: '7 Common CIT settlement mistakes businesses must avoid',
      category: 'kien-thuc',
      excerpt: 'Tổng hợp những lỗi thường gặp khi quyết toán thuế thu nhập doanh nghiệp và cách phòng tránh để không bị truy thu, phạt.',
      excerptEn: 'Common errors in CIT settlement and how to prevent additional taxes and penalties.',
      content: '<h2>1. Hạch toán chi phí không hợp lý</h2><p>Nhiều DN đưa các khoản chi không có hóa đơn, chứng từ hợp lệ vào chi phí được trừ, dẫn đến bị loại trừ khi thanh tra thuế.</p><h2>2. Tính khấu hao sai quy định</h2><p>Không tuân thủ Thông tư 45/2013/TT-BTC về thời gian và phương pháp trích khấu hao TSCĐ.</p><h2>3. Không lập dự phòng nợ phải thu khó đòi</h2><p>Bỏ qua việc lập dự phòng theo TT 48/2019 dẫn đến sai lệch chi phí tài chính.</p><h2>4. Hóa đơn không hợp lệ</h2><p>Sử dụng hóa đơn của DN đã ngừng hoạt động, hoặc hóa đơn không đúng thời điểm.</p><h2>5. Chênh lệch tỷ giá không xử lý</h2><p>Các khoản công nợ bằng ngoại tệ không được đánh giá lại cuối năm.</p><h2>6. Quên kê khai thu nhập khác</h2><p>Thu nhập từ thanh lý TSCĐ, lãi tiền gửi, chênh lệch tỷ giá thực hiện.</p><h2>7. Nộp chậm hoặc sai mẫu tờ khai</h2><p>Sử dụng mẫu tờ khai cũ hoặc nộp sau thời hạn quy định 90 ngày kể từ khi kết thúc năm tài chính.</p>',
      contentEn: '<h2>1. Unreasonable expense deductions</h2><p>Including expenses without valid invoices leads to disallowance during tax audits.</p>',
    },
    {
      slug: 'hoa-don-dien-tu-quy-dinh-moi-2026',
      title: 'Quy định mới về hóa đơn điện tử từ 2026',
      titleEn: 'New e-invoice regulations from 2026',
      category: 'kien-thuc',
      excerpt: 'Tổng hợp các quy định mới về hóa đơn điện tử: phân loại, đăng ký, xuất hóa đơn và xử lý sai sót.',
      excerptEn: 'Summary of new e-invoice regulations: classification, registration, issuance and error handling.',
      content: '<h2>1. Phân loại hóa đơn điện tử</h2><p>Hóa đơn điện tử có mã của cơ quan thuế và hóa đơn điện tử không có mã. DN vừa và nhỏ bắt buộc sử dụng hóa đơn có mã.</p><h2>2. Đăng ký sử dụng</h2><p>Đăng ký qua hệ thống eTax tại thuedientu.gdt.gov.vn. Thời gian xử lý: 1 ngày làm việc.</p><h2>3. Thời điểm xuất hóa đơn</h2><p>Thời điểm lập hóa đơn là thời điểm chuyển giao quyền sở hữu hàng hóa hoặc hoàn thành cung cấp dịch vụ.</p><h2>4. Xử lý sai sót</h2><p>Hóa đơn điện tử đã gửi cho người mua mà phát hiện sai sót: lập hóa đơn điều chỉnh hoặc hóa đơn thay thế.</p>',
      contentEn: '<h2>1. E-invoice classification</h2><p>E-invoices with tax authority code and without. SMEs must use coded e-invoices.</p>',
    },
    {
      slug: 'ke-toan-quan-tri-cho-doanh-nghiep-nho',
      title: 'Kế toán quản trị cho doanh nghiệp nhỏ: Bắt đầu từ đâu?',
      titleEn: 'Management accounting for SMEs: Where to start?',
      category: 'kien-thuc',
      excerpt: 'Hướng dẫn thiết lập hệ thống kế toán quản trị hiệu quả giúp chủ doanh nghiệp nhỏ ra quyết định dựa trên dữ liệu.',
      excerptEn: 'Guide to setting up an effective management accounting system for data-driven business decisions.',
      content: '<h2>1. Kế toán quản trị là gì?</h2><p>Khác với kế toán tài chính (phục vụ bên ngoài), kế toán quản trị cung cấp thông tin cho nội bộ DN để ra quyết định kinh doanh.</p><h2>2. Báo cáo cốt lõi</h2><ul><li>Báo cáo dòng tiền hàng tuần</li><li>Phân tích biên lợi nhuận theo sản phẩm/dịch vụ</li><li>Báo cáo chi phí theo bộ phận</li><li>Dự báo ngân sách quý/năm</li></ul><h2>3. Công cụ phù hợp</h2><p>Với DN nhỏ, có thể bắt đầu bằng Excel nâng cao hoặc phần mềm kế toán như MISA, Fast Accounting, hoặc các giải pháp cloud.</p><h2>4. Lộ trình áp dụng</h2><p>Tháng 1-2: Thiết lập mẫu báo cáo. Tháng 3-4: Thu thập dữ liệu và đào tạo. Tháng 5+: Vận hành và tối ưu.</p>',
      contentEn: '<h2>1. What is management accounting?</h2><p>Unlike financial accounting (external), management accounting provides internal information for business decisions.</p>',
    },
    {
      slug: 'chinh-sach-uu-dai-thue-cho-startup',
      title: 'Chính sách ưu đãi thuế cho startup và doanh nghiệp khởi nghiệp 2026',
      titleEn: 'Tax incentives for startups in Vietnam 2026',
      category: 'tin-nganh',
      excerpt: 'Tổng hợp các chính sách miễn giảm thuế, hỗ trợ tài chính dành riêng cho doanh nghiệp khởi nghiệp sáng tạo.',
      excerptEn: 'Summary of tax exemptions and financial support policies for innovative startups.',
      content: '<h2>1. Miễn thuế TNDN 2 năm đầu</h2><p>Doanh nghiệp khởi nghiệp sáng tạo được miễn thuế TNDN trong 2 năm kể từ khi có thu nhập chịu thuế và giảm 50% trong 4 năm tiếp theo.</p><h2>2. Ưu đãi thuế TNCN cho nhà đầu tư</h2><p>Cá nhân đầu tư vào startup được miễn thuế TNCN đối với khoản lợi nhuận thu được từ chuyển nhượng vốn góp trong 3 năm đầu.</p><h2>3. Hỗ trợ tiếp cận tài chính</h2><p>Quỹ Đổi mới Sáng tạo Quốc gia (NATIF) cung cấp khoản vay ưu đãi lãi suất 0% cho các dự án R&D.</p><h2>4. Miễn thuế nhập khẩu</h2><p>Miễn thuế nhập khẩu đối với thiết bị, máy móc, linh kiện mà trong nước chưa sản xuất được.</p>',
      contentEn: '<h2>1. CIT exemption for first 2 years</h2><p>Innovative startups are exempt from CIT for the first 2 years from taxable income, with 50% reduction for the next 4 years.</p>',
    },
    {
      slug: 'phan-biet-ke-toan-va-kiem-toan',
      title: 'Phân biệt kế toán và kiểm toán: Doanh nghiệp cần biết',
      titleEn: 'Accounting vs Auditing: What businesses need to know',
      category: 'kien-thuc',
      excerpt: 'Nhiều chủ doanh nghiệp nhầm lẫn giữa kế toán và kiểm toán. Bài viết phân tích rõ vai trò, nhiệm vụ và khi nào cần kiểm toán.',
      excerptEn: 'Many business owners confuse accounting and auditing. This article clarifies their roles and when auditing is required.',
      content: '<h2>1. Kế toán là gì?</h2><p>Kế toán là quá trình ghi chép, phân loại và tổng hợp các nghiệp vụ kinh tế phát sinh, lập báo cáo tài chính phục vụ quản lý và kê khai thuế.</p><h2>2. Kiểm toán là gì?</h2><p>Kiểm toán là việc kiểm tra, đánh giá tính trung thực và hợp lý của báo cáo tài chính do một đơn vị kiểm toán độc lập thực hiện.</p><h2>3. Khi nào bắt buộc kiểm toán?</h2><ul><li>Doanh nghiệp niêm yết, công ty đại chúng</li><li>Tổ chức tín dụng, ngân hàng, bảo hiểm</li><li>DN có vốn FDI</li><li>DN nhà nước theo quy định</li></ul><h2>4. Lợi ích của kiểm toán tự nguyện</h2><p>Tăng uy tín với đối tác, ngân hàng; phát hiện rủi ro tài chính; tối ưu hệ thống kiểm soát nội bộ.</p>',
      contentEn: '<h2>1. What is accounting?</h2><p>Accounting is the process of recording, classifying and summarizing economic transactions.</p>',
    },
  ];

  for (const a of articles) {
    const data = {
      ...a,
      publishDate: '01/08/2026',
      thumbnail: '',
      featured: true,
      isDraft: false,
    };
    await prisma.article.upsert({ where: { slug: a.slug }, update: data, create: data });
  }

  // ── Banners ─────────────────────────────────────────────────────────────
  await prisma.banner.deleteMany({});
  await prisma.banner.createMany({
    data: [
      {
        image: '',
        title: 'Dịch Vụ Kế Toán Chuyên Nghiệp',
        titleEn: 'Professional Accounting Services',
        link: '/dich-vu',
        status: true,
        order: 1,
      },
      {
        image: '',
        title: 'Giải Pháp Tư Vấn Thuế Toàn Diện',
        titleEn: 'Comprehensive Tax Consulting Solutions',
        link: '/dich-vu',
        status: true,
        order: 2,
      },
    ],
  });

  // ── LookupItem — Mã ngành nghề kinh doanh (VSIC 2018) ──────────────────
  await prisma.lookupItem.deleteMany({});
  const lookupItems = [
    { code: '6201', name: 'Lập trình máy vi tính', nameEn: 'Computer programming', description: 'Bao gồm viết, sửa đổi, kiểm tra và hỗ trợ phần mềm.', isConditional: false },
    { code: '6202', name: 'Tư vấn máy vi tính và quản trị hệ thống máy vi tính', nameEn: 'Computer consultancy and computer facilities management', description: 'Lập kế hoạch và thiết kế hệ thống máy tính.', isConditional: false },
    { code: '6209', name: 'Hoạt động dịch vụ CNTT và dịch vụ khác liên quan đến máy vi tính', nameEn: 'Other IT and computer service activities', description: 'Cài đặt phần mềm, khôi phục dữ liệu sau sự cố.', isConditional: false },
    { code: '6311', name: 'Xử lý dữ liệu, cho thuê và các hoạt động liên quan', nameEn: 'Data processing, hosting and related activities', description: 'Cung cấp hạ tầng cho hosting, xử lý dữ liệu.', isConditional: false },
    { code: '6399', name: 'Hoạt động dịch vụ thông tin khác chưa được phân vào đâu', nameEn: 'Other information service activities n.e.c.', description: null, isConditional: false },
    { code: '6411', name: 'Ngân hàng trung ương', nameEn: 'Central banking', description: 'Hoạt động của Ngân hàng Nhà nước.', isConditional: true },
    { code: '6419', name: 'Hoạt động trung gian tiền tệ khác', nameEn: 'Other monetary intermediation', description: 'Ngân hàng thương mại, tổ chức tín dụng.', isConditional: true },
    { code: '6492', name: 'Cấp tín dụng khác', nameEn: 'Other credit granting', description: 'Cho vay tiêu dùng, tín dụng thương mại.', isConditional: true },
    { code: '6612', name: 'Môi giới hợp đồng hàng hóa và chứng khoán', nameEn: 'Securities and commodity contracts brokerage', description: 'Môi giới mua bán chứng khoán.', isConditional: true },
    { code: '6810', name: 'Kinh doanh bất động sản, quyền sử dụng đất', nameEn: 'Real estate activities with own or leased property', description: 'Mua, bán, cho thuê bất động sản.', isConditional: true },
    { code: '6820', name: 'Tư vấn, môi giới, đấu giá bất động sản', nameEn: 'Real estate activities on a fee or contract basis', description: 'Dịch vụ môi giới, tư vấn BĐS.', isConditional: true },
    { code: '6910', name: 'Hoạt động pháp luật', nameEn: 'Legal activities', description: 'Tư vấn pháp lý, đại diện trước tòa.', isConditional: true },
    { code: '6920', name: 'Hoạt động kế toán, kiểm toán và tư vấn về thuế', nameEn: 'Accounting, bookkeeping and auditing; tax consultancy', description: 'Dịch vụ ghi sổ kế toán, lập báo cáo tài chính, kiểm toán và tư vấn thuế.', isConditional: true },
    { code: '7020', name: 'Hoạt động tư vấn quản lý', nameEn: 'Management consultancy activities', description: 'Tư vấn chiến lược kinh doanh, tài chính.', isConditional: false },
    { code: '7310', name: 'Quảng cáo', nameEn: 'Advertising', description: 'Thiết kế, tổ chức các chiến dịch quảng cáo.', isConditional: true },
    { code: '4610', name: 'Đại lý, môi giới, đấu giá', nameEn: 'Agents involved in the sale of agricultural products, etc.', description: 'Hoạt động đại lý, môi giới thương mại.', isConditional: false },
    { code: '4690', name: 'Bán buôn tổng hợp', nameEn: 'Non-specialized wholesale trade', description: 'Bán buôn nhiều mặt hàng không chuyên.', isConditional: false },
    { code: '4719', name: 'Bán lẻ khác trong các cửa hàng kinh doanh tổng hợp', nameEn: 'Other retail sale in non-specialized stores', description: null, isConditional: false },
    { code: '4791', name: 'Bán lẻ qua bưu điện hoặc internet', nameEn: 'Retail sale via mail order or internet', description: 'Thương mại điện tử, bán hàng online.', isConditional: false },
    { code: '5610', name: 'Nhà hàng và các dịch vụ ăn uống phục vụ lưu động', nameEn: 'Restaurants and mobile food service activities', description: 'Kinh doanh nhà hàng, quán ăn.', isConditional: true },
    { code: '5621', name: 'Cung cấp dịch vụ ăn uống theo hợp đồng', nameEn: 'Event catering', description: 'Dịch vụ nấu tiệc, suất ăn công nghiệp.', isConditional: true },
    { code: '7110', name: 'Hoạt động kiến trúc và tư vấn kỹ thuật', nameEn: 'Architectural and engineering activities', description: 'Thiết kế kiến trúc, tư vấn xây dựng.', isConditional: true },
    { code: '8010', name: 'Hoạt động bảo vệ tư nhân', nameEn: 'Private security activities', description: 'Dịch vụ bảo vệ, an ninh.', isConditional: true },
    { code: '8211', name: 'Dịch vụ hành chính tổng hợp', nameEn: 'Combined office administrative service activities', description: 'Dịch vụ văn phòng, thư ký.', isConditional: false },
    { code: '8219', name: 'Dịch vụ photocopy, chuẩn bị tài liệu', nameEn: 'Photocopying, document preparation', description: null, isConditional: false },
    { code: '8220', name: 'Hoạt động dịch vụ tổng đài điện thoại', nameEn: 'Activities of call centres', description: 'Call center, tổng đài chăm sóc KH.', isConditional: false },
    { code: '8230', name: 'Tổ chức giới thiệu và xúc tiến thương mại', nameEn: 'Organization of conventions and trade shows', description: 'Tổ chức hội chợ, triển lãm thương mại.', isConditional: false },
    { code: '8291', name: 'Hoạt động dịch vụ thu nợ và thẩm định tín dụng', nameEn: 'Activities of collection agencies and credit bureaus', description: 'Thu hồi nợ, đánh giá tín dụng.', isConditional: true },
    { code: '8299', name: 'Hoạt động dịch vụ hỗ trợ kinh doanh khác', nameEn: 'Other business support service activities n.e.c.', description: 'Dịch vụ hỗ trợ kinh doanh chưa phân vào đâu.', isConditional: false },
    { code: '8550', name: 'Hoạt động hỗ trợ giáo dục', nameEn: 'Educational support activities', description: 'Tư vấn giáo dục, đào tạo.', isConditional: false },
  ];

  for (const item of lookupItems) {
    await prisma.lookupItem.upsert({
      where: { code: item.code },
      update: item,
      create: item,
    });
  }

  console.log('Seed complete — VTAX accounting data.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
