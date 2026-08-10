import { AboutPageContent } from '@/types';

export type AboutContentResolved = {
  gioiThieu: {
    title: string;
    paragraph1: string;
    paragraph2: string;
    stat1Number: string;
    stat1Label: string;
    stat2Number: string;
    stat2Label: string;
  };
  lichSu: {
    title: string;
    intro: string;
    timeline: { year: string; text: string }[];
  };
  tamNhin: {
    visionTitle: string;
    visionText: string;
    missionTitle: string;
    missionText: string;
    coreTitle: string;
    coreValues: { title: string; desc: string }[];
    quoteText: string;
    quoteAuthor: string;
    quoteRole: string;
  };
  coSo: {
    title: string;
    intro: string;
    cardTitle: string;
    cardText: string;
    stats: { number: string; label: string }[];
  };
  coCau: {
    title: string;
    intro: string;
    roles: string[];
    quoteText: string;
  };
  thanhTuu: {
    title: string;
    heading: string;
    images: { url: string; title: string; subtitle: string }[];
  };
};

export const aboutDefaults: AboutContentResolved = {
  gioiThieu: {
    title: 'Tổng quan về VTAX',
    paragraph1:
      'VTAX tự hào là một trong những đơn vị dẫn đầu trong lĩnh vực cung cấp dịch vụ kế toán, đại lý thuế và tư vấn tài chính doanh nghiệp tại Việt Nam.',
    paragraph2:
      'Với bề dày kinh nghiệm và đội ngũ chuyên gia tận tâm, chúng tôi cam kết mang lại sự an tâm tuyệt đối về tài chính, giúp khách hàng tối ưu chi phí và tuân thủ chặt chẽ các quy định pháp luật hiện hành.',
    stat1Number: '2000+',
    stat1Label: 'Doanh nghiệp',
    stat2Number: '15+',
    stat2Label: 'Năm kinh nghiệm',
  },
  lichSu: {
    title: 'Lịch sử hình thành',
    intro:
      'Hành trình đầy tự hào của VTAX trong suốt 15 năm cống hiến cho sự phát triển của các doanh nghiệp Việt.',
    timeline: [
      {
        year: '2010',
        text: 'Chính thức được thành lập, cung cấp dịch vụ kế toán thuế cho các doanh nghiệp vừa và nhỏ.',
      },
      {
        year: '2015',
        text: 'Mở rộng chi nhánh tại TP.HCM và Đà Nẵng, chính thức trở thành Đại lý thuế được Bộ Tài chính cấp phép.',
      },
      {
        year: '2020',
        text: 'Áp dụng công nghệ số hóa toàn diện vào quy trình quản lý hồ sơ và báo cáo tài chính.',
      },
      {
        year: 'Hiện tại',
        text: 'Khẳng định vị thế hàng đầu với mạng lưới hàng ngàn khách hàng tin dùng trên toàn quốc.',
      },
    ],
  },
  tamNhin: {
    visionTitle: 'Tầm nhìn',
    visionText:
      'Trở thành tập đoàn tư vấn tài chính, kế toán và đại lý thuế uy tín nhất Việt Nam, là điểm tựa vững chắc cho mọi doanh nghiệp trên bước đường vươn tới thành công.',
    missionTitle: 'Sứ mệnh',
    missionText:
      'VTAX cam kết bảo vệ an toàn tài chính, tối ưu hóa lợi ích và giải quyết triệt để mọi rủi ro về thuế, giúp doanh nghiệp yên tâm tập trung vào hoạt động kinh doanh cốt lõi.',
    coreTitle: 'Giá trị cốt lõi',
    coreValues: [
      {
        title: 'Chuyên nghiệp (Professional)',
        desc: 'Đội ngũ chuyên viên giàu kinh nghiệm, nắm bắt kịp thời và chính xác mọi thay đổi của luật pháp.',
      },
      {
        title: 'Tận tâm (Dedicated)',
        desc: 'Luôn đặt lợi ích của khách hàng lên hàng đầu, đồng hành giải quyết mọi khó khăn 24/7.',
      },
      {
        title: 'Bảo mật (Confidential)',
        desc: 'Cam kết bảo mật tuyệt đối 100% dữ liệu tài chính và thông tin nội bộ của doanh nghiệp.',
      },
      {
        title: 'Chính trực (Integrity)',
        desc: 'Minh bạch trong mọi số liệu báo cáo, đảm bảo chuẩn mực đạo đức nghề nghiệp.',
      },
      {
        title: 'Tối ưu hóa (Optimization)',
        desc: 'Cung cấp giải pháp tối ưu nhằm tiết kiệm chi phí và thời gian tối đa cho đối tác.',
      },
    ],
    quoteText:
      '"Sự an tâm của khách hàng là thước đo thành công lớn nhất của chúng tôi."',
    quoteAuthor: 'Ban Giám Đốc',
    quoteRole: 'VTAX Group',
  },
  coSo: {
    title: 'Mạng lưới hoạt động',
    intro:
      'VTAX sở hữu hệ thống chi nhánh và văn phòng giao dịch hiện đại trên khắp cả nước, ứng dụng phần mềm quản lý tiên tiến.',
    cardTitle: 'Trụ sở chính',
    cardText: 'Trung tâm tư vấn chiến lược và xử lý hồ sơ chuyên sâu.',
    stats: [
      { number: '03', label: 'Văn phòng lớn' },
      { number: '50+', label: 'Chuyên gia' },
      { number: '24/7', label: 'Hỗ trợ' },
      { number: 'Top 5', label: 'Đại lý thuế' },
    ],
  },
  coCau: {
    title: 'Đội ngũ nhân sự',
    intro:
      'Hệ thống được vận hành bởi đội ngũ Kiểm toán viên (CPA), Chuyên gia thuế (CTA) và Luật sư doanh nghiệp dày dạn kinh nghiệm.',
    roles: [
      'Ban Giám đốc',
      'Khối Dịch vụ Kế toán',
      'Khối Tư vấn Thuế',
      'Khối Tư vấn Pháp lý',
      'Khối Chăm sóc Khách hàng',
    ],
    quoteText:
      '"Tại VTAX, mỗi nhân viên không chỉ là người làm nghề, mà còn là một chuyên gia đồng hành giải bài toán tài chính khó nhất cho doanh nghiệp."',
  },
  thanhTuu: {
    heading: 'Thành tựu',
    title:
      'Trải qua nhiều năm hoạt động, VTAX tự hào nhận được sự tin tưởng của hàng ngàn khách hàng và các giải thưởng uy tín trong ngành dịch vụ tài chính - kế toán.',
    images: [
      {
        url: '',
        subtitle: 'Giải thưởng',
        title: '"Đại lý Thuế tiêu biểu 2022"',
      },
      {
        url: '',
        subtitle: 'Bằng khen',
        title: '"Đơn vị tư vấn uy tín 2023"',
      },
      {
        url: '',
        subtitle: 'Danh hiệu',
        title: '"Top 10 Dịch vụ Kế toán xuất sắc"',
      },
    ],
  },
};

export const aboutDefaultsEn: AboutContentResolved = {
  gioiThieu: {
    title: 'VTAX Overview',
    paragraph1:
      'VTAX is proud to be a leading provider of accounting services, tax agency, and corporate financial consulting in Vietnam.',
    paragraph2:
      'With years of experience and a dedicated team of experts, we commit to providing absolute financial peace of mind, helping clients optimize costs and strictly comply with current legal regulations.',
    stat1Number: '2000+',
    stat1Label: 'Businesses',
    stat2Number: '15+',
    stat2Label: 'Years of Experience',
  },
  lichSu: {
    title: 'Our History',
    intro:
      "A proud 15-year journey dedicated to the growth and success of Vietnamese enterprises.",
    timeline: [
      {
        year: '2010',
        text: 'Officially founded, providing tax accounting services for small and medium-sized enterprises.',
      },
      {
        year: '2015',
        text: 'Expanded branches to Ho Chi Minh City and Da Nang, officially became a licensed Tax Agent by the Ministry of Finance.',
      },
      {
        year: '2020',
        text: 'Implemented comprehensive digital technology into financial reporting and document management processes.',
      },
      {
        year: 'Today',
        text: 'Affirmed our leading position with a network of thousands of trusted clients nationwide.',
      },
    ],
  },
  tamNhin: {
    visionTitle: 'Vision',
    visionText:
      'To become the most reputable financial consulting, accounting, and tax agency group in Vietnam, serving as a solid foundation for every business on their path to success.',
    missionTitle: 'Mission',
    missionText:
      'VTAX is committed to protecting financial security, optimizing benefits, and thoroughly resolving all tax risks, enabling businesses to focus entirely on their core operations.',
    coreTitle: 'Core Values',
    coreValues: [
      {
        title: 'Professional',
        desc: 'An experienced team of specialists who promptly and accurately grasp all changes in the law.',
      },
      {
        title: 'Dedicated',
        desc: 'Always putting clients\' interests first, working alongside them to overcome challenges 24/7.',
      },
      {
        title: 'Confidential',
        desc: 'Commitment to 100% absolute confidentiality of clients\' financial data and internal information.',
      },
      {
        title: 'Integrity',
        desc: 'Transparency in all reported figures, ensuring high professional ethical standards.',
      },
      {
        title: 'Optimization',
        desc: 'Providing optimal solutions to save maximum time and costs for our partners.',
      },
    ],
    quoteText:
      '"Our clients\' peace of mind is the greatest measure of our success."',
    quoteAuthor: 'Board of Directors',
    quoteRole: 'VTAX Group',
  },
  coSo: {
    title: 'Operations Network',
    intro:
      'VTAX operates a modern network of branches and transaction offices nationwide, utilizing advanced management software.',
    cardTitle: 'Headquarters',
    cardText: 'The center for strategic consulting and specialized document processing.',
    stats: [
      { number: '03', label: 'Major Offices' },
      { number: '50+', label: 'Experts' },
      { number: '24/7', label: 'Support' },
      { number: 'Top 5', label: 'Tax Agents' },
    ],
  },
  coCau: {
    title: 'Our Team',
    intro:
      'Our system is operated by a highly experienced team of Certified Public Accountants (CPA), Certified Tax Agents (CTA), and corporate lawyers.',
    roles: [
      'Board of Directors',
      'Accounting Services Division',
      'Tax Consulting Division',
      'Legal Consulting Division',
      'Customer Care Division',
    ],
    quoteText:
      '"At VTAX, every employee is not just a practitioner, but an expert companion solving the most difficult financial equations for businesses."',
  },
  thanhTuu: {
    heading: 'Achievements',
    title:
      'Over the years, VTAX has proudly earned the trust of thousands of clients and received prestigious awards in the financial-accounting services sector.',
    images: [
      {
        url: '',
        subtitle: 'Award',
        title: '"Outstanding Tax Agent 2022"',
      },
      {
        url: '',
        subtitle: 'Certificate',
        title: '"Reputable Consulting Firm 2023"',
      },
      {
        url: '',
        subtitle: 'Title',
        title: '"Top 10 Excellent Accounting Services"',
      },
    ],
  },
};

export function mergeAbout(
  data?: AboutPageContent | null,
  locale: 'vi' | 'en' = 'vi',
): AboutContentResolved {
  const d = data || {};
  const base = locale === 'en' ? aboutDefaultsEn : aboutDefaults;
  return {
    gioiThieu: { ...base.gioiThieu, ...(d.gioiThieu || {}) } as AboutContentResolved['gioiThieu'],
    lichSu: {
      ...base.lichSu,
      ...(d.lichSu || {}),
      timeline:
        d.lichSu?.timeline && d.lichSu.timeline.length > 0
          ? d.lichSu.timeline
          : base.lichSu.timeline,
    } as AboutContentResolved['lichSu'],
    tamNhin: {
      ...base.tamNhin,
      ...(d.tamNhin || {}),
      coreValues:
        d.tamNhin?.coreValues && d.tamNhin.coreValues.length > 0
          ? d.tamNhin.coreValues
          : base.tamNhin.coreValues,
    } as AboutContentResolved['tamNhin'],
    coSo: {
      ...base.coSo,
      ...(d.coSo || {}),
      stats:
        d.coSo?.stats && d.coSo.stats.length > 0
          ? d.coSo.stats
          : base.coSo.stats,
    } as AboutContentResolved['coSo'],
    coCau: {
      ...base.coCau,
      ...(d.coCau || {}),
      roles:
        d.coCau?.roles && d.coCau.roles.length > 0
          ? d.coCau.roles
          : base.coCau.roles,
    } as AboutContentResolved['coCau'],
    thanhTuu: {
      ...base.thanhTuu,
      ...(d.thanhTuu || {}),
      images:
        d.thanhTuu?.images && d.thanhTuu.images.length > 0
          ? d.thanhTuu.images.map((item) =>
              typeof item === 'string'
                ? { url: item, title: '', subtitle: '' }
                : { url: item?.url || '', title: item?.title || '', subtitle: item?.subtitle || '' }
            )
          : base.thanhTuu.images,
    } as AboutContentResolved['thanhTuu'],
  };
}
