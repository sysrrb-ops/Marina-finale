export interface ServiceItem {
  id: string; // e.g. "MV-001"
  name: string; // e.g. "Azure Escape"
  category: 'Yacht Charter' | 'Sunset Cruise' | 'Private Island' | 'Corporate' | 'Experiences' | 'Marine Activity' | 'VIP Transfer';
  tagline: string;
  description: string;
  price: number; // e.g. 185000
  cost: number; // e.g. 118000
  quotaTotal: number; // e.g. 12
  quotaBooked: number; // e.g. 7
  quotaRemaining: number; // e.g. 5
  cumulativeRevenue: number;
  image: string;
  specs: {
    length?: string;
    capacity: string;
    crew: string;
    highlights: string[];
    duration: string;
  };
}

export interface Transaction {
  bookingId: string;
  date: string;
  serviceId: string;
  serviceName: string;
  customerName: string;
  country: string;
  segment: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  netAmount: number;
  cost: number;
  status: 'Confirmed' | 'Completed' | 'Pending Concierge' | 'In Escrow';
  channel: string;
}

export interface CustomerSegment {
  id: string;
  name: string;
  sharePercent: number;
  description: string;
  avgSpend: number;
  preferredServices: string[];
  primaryChannels: string[];
  keyMarkets: string[];
}

export interface MonthlyRecord {
  month: string;
  monthTh: string;
  revenue: number; // In Million THB
  cost: number; // In Million THB
  grossProfit: number; // In Million THB
}

// 8 Official Services from User Brief
export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'MV-001',
    name: 'Azure Escape Yacht Charter',
    category: 'Yacht Charter',
    tagline: 'Azimut GRANDE 27M (87 ft) Motor Yacht',
    description: 'เช่าเรือยอร์ชส่วนตัวเต็มวัน พร้อมกัปตัน ลูกเรือ และอาหารพรีเมียม สัมผัสความสงบแห่งอันดามันและอ่าวไทย',
    price: 185000,
    cost: 118000,
    quotaTotal: 12,
    quotaBooked: 7,
    quotaRemaining: 5,
    cumulativeRevenue: 1295000,
    image: 'https://images.openai.com/static-rsc-4/ahOAEX7JxZroSenLdBgHtSaWBV_6XWDcbe2gI9i6nj1J0QCo0gc735du2lK3DgfANP5jpq3RuGKhm-xmGxJ01XHJYStsxOxjoSXQf40Fz8NU1Q8Asip8BRSkt_HSKT00jqCmMHwZcdshic2_GUBhI5_2dS4pgbZRGO29S68g0Qc?purpose=inline',
    specs: {
      length: '87 ft (27m)',
      capacity: '12 VIP Guests',
      crew: '4 Professional Crew (Captain, Butler, Chef, Deckhand)',
      highlights: ['Flybridge Jacuzzi', 'Seabob Water Toys', 'Michelin-curated Seafood Lunch', 'Champagne Welcome'],
      duration: '8 Hours (Full Day)',
    },
  },
  {
    id: 'MV-002',
    name: 'Golden Horizon Sunset Cruise',
    category: 'Sunset Cruise',
    tagline: 'Sunseeker Manhattan 68 Luxury Cruiser',
    description: 'ล่องเรือชมพระอาทิตย์ตก ดินเนอร์สุดโรแมนติกกลางทะเล และบริการช่างภาพส่วนตัวเก็บภาพความประทับใจ',
    price: 98000,
    cost: 59000,
    quotaTotal: 18,
    quotaBooked: 9,
    quotaRemaining: 9,
    cumulativeRevenue: 882000,
    image: 'https://images.openai.com/static-rsc-4/rCzq7oznJPe4WxIc9kyRQ4DeZxNZ7rUxjEoC8_TYnPz97PmulCbRjpXI_FxO6AkB-sSu2b9dSnqLnMCup5M-ltXN0EHgOWt0pg1UIEqtmlhKdpn2cvAX907BpkWx3kU7NTDoz2zZTiH2hrZ2TTM4tkDPZuyp6tIMuNpLswMWh-Q?purpose=inline',
    specs: {
      length: '68 ft (21m)',
      capacity: '16 VIP Guests',
      crew: '3 Professional Crew',
      highlights: ['Sunset Canapé & Caviar Bar', 'Live Acoustic / Saxophone on request', 'Dedicated Drone Photographer', 'Signature Cocktail Bar'],
      duration: '4 Hours (16:30 - 20:30)',
    },
  },
  {
    id: 'MV-003',
    name: 'Pearl Lagoon Island Retreat',
    category: 'Private Island',
    tagline: 'Ultra-Exclusive Private Atoll & Water Villa',
    description: 'ทริปเกาะส่วนตัว พร้อมวิลล่าหรูริมทะเล กิจกรรมทางทะเลครบวงจร และอาหารโดยเชฟส่วนตัว',
    price: 245000,
    cost: 162000,
    quotaTotal: 8,
    quotaBooked: 5,
    quotaRemaining: 3,
    cumulativeRevenue: 1225000,
    image: 'https://images.openai.com/static-rsc-4/xH3OQsXT35KAjU8VVY6mZt4bdPQrLAQM410xQRNlnrAnlhRaISNATDodZ96MLbTs-s4clqX9oXWlVuDCyxMP8rK2cZ9ox-sE0dq3_IIThnc9fzJ5t9jFkV_es5Di9pybZFILx2dEIxhsGIJUCJ9z3J5GxmuAgAERh_7VoGWc8jQ?purpose=inline',
    specs: {
      length: 'Private Island Access',
      capacity: '8 Guests Overnight (20 Day Pass)',
      crew: 'Dedicated Island Butler & Master Chef',
      highlights: ['Overwater Infinity Pool', 'Coral Reef Private Snorkeling', 'Custom Sandbank Dinner', 'Spa by the Ocean'],
      duration: 'Full Day / Overnight',
    },
  },
  {
    id: 'MV-004',
    name: 'Royal Blue Business Voyage',
    category: 'Corporate',
    tagline: 'Benetti Oasis 40M Superyacht Executive Hub',
    description: 'เช่าเรือจัดประชุมผู้บริหารระดับสูง งานรับรองคู่ค้าพันธมิตร และกิจกรรมองค์กรบนผืนน้ำระดับ Ultra-Luxury',
    price: 320000,
    cost: 215000,
    quotaTotal: 6,
    quotaBooked: 4,
    quotaRemaining: 2,
    cumulativeRevenue: 1280000,
    image: 'https://images.openai.com/static-rsc-4/1jTuOq-8WphoJJGuF0ZyWBewKQ6AuXfriqPG118uCx2wrSjQdZVtZ5oF7adDTIPAYbAgofgK8aEsiJM5CWMjIUkBnGTdXsDl2iU6qGUs2DGH7CxvG-SEw3GKGgOoxxFctD7smPCqxBn3tJQb1H67LX6NrBPL0Id1by1LLbJbA1g?purpose=inline',
    specs: {
      length: '133 ft (40m Superyacht)',
      capacity: '25 VIP Executives',
      crew: '7 Elite Crew & White-Glove Hospitality',
      highlights: ['Starlink Encrypted High-Speed Satellite', 'Boardroom Audio-Visual Lounge', 'Private Sommelier Wine Tasting', 'Executive Security Escort Option'],
      duration: '8 Hours (Full Day)',
    },
  },
  {
    id: 'MV-005',
    name: 'Valérielle Signature Celebration',
    category: 'Experiences',
    tagline: 'Curated Anniversaries & Midnight Gala',
    description: 'งานฉลองวันเกิด ฮันนีมูน หรือหมั้นหมายส่วนตัวกลางทะเล พร้อมพลุไฟ การแสดงดนตรี และดินเนอร์ใต้แสงดาว',
    price: 275000,
    cost: 178000,
    quotaTotal: 8,
    quotaBooked: 4,
    quotaRemaining: 4,
    cumulativeRevenue: 1100000,
    image: 'https://images.openai.com/static-rsc-4/xqExfnpkGeaUQMfso96mGxRuhyb_9Ih4joYb9Zwt7kwLLNDDPnkU4lV8PcbaIOkUGsNQSAk0hdzAoU8-UgUW_pcrUmj9DwuyZ6XfpZClygCLRktiBNwXfmiqxuejBYsBArtvado0U13gyR17ZFmNEsxmKGTL8ajVvuucqucRSEA?purpose=inline',
    specs: {
      length: '95 ft Custom Yacht',
      capacity: '14 Guests',
      crew: '5 Event & Hospitality Staff',
      highlights: ['Authorized Offshore Fireworks Show', 'Floral & Candlelit Deck Design', '6-Course French Haute Cuisine', 'Dom Pérignon Vintage Pairing'],
      duration: '6 Hours (Evening to Midnight)',
    },
  },
  {
    id: 'MV-006',
    name: 'Ocean Jewel Overnight Voyage',
    category: 'Experiences',
    tagline: 'Multi-Day Offshore Archipelago Expedition',
    description: 'ล่องเรือ 2 วัน 1 คืน นอนค้างกลางทะเลดาวระยิบระยับ ดื่มด่ำกับเกาะร้าง จุดดำน้ำลับ และความสงบสมบูรณ์แบบ',
    price: 420000,
    cost: 285000,
    quotaTotal: 4,
    quotaBooked: 2,
    quotaRemaining: 2,
    cumulativeRevenue: 840000,
    image: 'https://images.openai.com/static-rsc-4/gaz7H8BdCkwqMivS9bNX86kGXrVh509b-z-bzdvuF2T3oRNGVfb3-KnClokq1mfmc7yBxoPeIUpR8Z2gQtmlmTGN_C3x-_qC63Kh4a691YNW_rvNvTkZ8vJb5_6PE7Ein0W3sk7d31zuMWuSaoH1Voscg393_Eh6um6iNScx5cc?purpose=inline',
    specs: {
      length: '110 ft Tri-Deck Mega Yacht',
      capacity: '8 Guests (4 Master Suites)',
      crew: '6 Full-Time Specialist Crew',
      highlights: ['Starlight Deck Cinema', 'Morning Dolphin & Manta Ray Excursion', 'Private Island Beach Barbecue', 'Tender Boat & Jet Ski Fleet'],
      duration: '2 Days / 1 Night',
    },
  },
  {
    id: 'MV-007',
    name: 'Crystal Water Diving Expedition',
    category: 'Marine Activity',
    tagline: 'PADI Master Guided Sanctuary Expedition',
    description: 'ทริปดำน้ำลึกจุดสงวนเฉพาะเรือยอร์ช พร้อมมาสเตอร์ไดฟ์เวอร์ อุปกรณ์มาตรฐานสากล และการสำรวจแนวปะการังอันบริสุทธิ์',
    price: 125000,
    cost: 76000,
    quotaTotal: 10,
    quotaBooked: 3,
    quotaRemaining: 7,
    cumulativeRevenue: 375000,
    image: 'https://images.openai.com/static-rsc-4/zWGtFGOhn_h-YJnghohFOtCPZ6i2lFETqkMM-uEwkTTVs2x6lkXc6Qo9u1HEu8Vx5USN4xGBqPE8Wse01UPdyjy71tXg_YsjT1DmzHQo3JfLOvXh__cykWjclFW0nzgZLDYiN_vl0Nf3AlB6D9hyQu7408YvHjuB0vYywO3nlrg?purpose=inline',
    specs: {
      length: '62 ft Diving Catamaran',
      capacity: '8 Certified Divers',
      crew: 'PADI Pro Instructors + Marine Biologist',
      highlights: ['Nitrox Diving Tank System', 'Underwater 4K Video Recording', 'Secret Outer Reef Location', 'Warm Towels & Gourmet Energy Refreshments'],
      duration: '6 Hours',
    },
  },
  {
    id: 'MV-008',
    name: 'Marina Grand VIP Transfer',
    category: 'VIP Transfer',
    tagline: 'Sea & Air Luxury Intermodal Connection',
    description: 'บริการรับ-ส่งความเร็วสูงทางเรือสปีดโบ๊ตหรูหรือเฮลิคอปเตอร์ส่วนตัว เชื่อมระหว่างสนามบินนานาชาติและวิลล่ากลางน้ำ',
    price: 65000,
    cost: 39000,
    quotaTotal: 15,
    quotaBooked: 4,
    quotaRemaining: 11,
    cumulativeRevenue: 260000,
    image: 'https://images.openai.com/static-rsc-4/ahOAEX7JxZroSenLdBgHtSaWBV_6XWDcbe2gI9i6nj1J0QCo0gc735du2lK3DgfANP5jpq3RuGKhm-xmGxJ01XHJYStsxOxjoSXQf40Fz8NU1Q8Asip8BRSkt_HSKT00jqCmMHwZcdshic2_GUBhI5_2dS4pgbZRGO29S68g0Qc?purpose=inline',
    specs: {
      length: '45 ft High-Speed Interceptor / Airbus H130',
      capacity: '6 VIPs + Luggage',
      crew: 'Certified Commercial Pilots / Captains',
      highlights: ['Fast-track VIP Airport Immigration', 'Luggage Valet direct to Suite', 'Chilled Ruinart Champagne onboard', 'Express Transfer under 25 mins'],
      duration: 'Direct On-Demand',
    },
  },
];

// Jan - Sep 2026 Monthly Figures (Total: Rev 14.95M, Cost 9.207M, GP 5.743M, 38.4%)
export const MONTHLY_METRICS: MonthlyRecord[] = [
  { month: 'Jan 2026', monthTh: 'ม.ค.', revenue: 1.12, cost: 0.70, grossProfit: 0.42 },
  { month: 'Feb 2026', monthTh: 'ก.พ.', revenue: 1.25, cost: 0.78, grossProfit: 0.47 },
  { month: 'Mar 2026', monthTh: 'มี.ค.', revenue: 1.40, cost: 0.88, grossProfit: 0.52 },
  { month: 'Apr 2026', monthTh: 'เม.ย.', revenue: 1.58, cost: 0.99, grossProfit: 0.59 },
  { month: 'May 2026', monthTh: 'พ.ค.', revenue: 1.65, cost: 1.02, grossProfit: 0.63 },
  { month: 'Jun 2026', monthTh: 'มิ.ย.', revenue: 1.72, cost: 1.05, grossProfit: 0.67 },
  { month: 'Jul 2026', monthTh: 'ก.ค.', revenue: 1.89, cost: 1.16, grossProfit: 0.73 },
  { month: 'Aug 2026', monthTh: 'ส.ค.', revenue: 2.12, cost: 1.30, grossProfit: 0.82 },
  { month: 'Sep 2026', monthTh: 'ก.ย.', revenue: 2.22, cost: 1.327, grossProfit: 0.893 },
];

export const TOTAL_KPI = {
  revenue: '฿14.95M',
  revenueExact: 14950000,
  cost: '฿9.207M',
  costExact: 9207000,
  grossProfit: '฿5.743M',
  grossProfitExact: 5743000,
  grossMargin: '38.4%',
  growthJanSep: '+98.2%',
  totalBookings: 38,
};

// Initial Sales Transactions (Sheet 2)
export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    bookingId: 'BK-2026-089',
    date: '2026-09-24',
    serviceId: 'MV-004',
    serviceName: 'Royal Blue Business Voyage',
    customerName: 'Lord Alistair Sterling',
    country: 'United Kingdom',
    segment: 'Corporate & Business Executives',
    quantity: 1,
    unitPrice: 320000,
    discount: 0,
    netAmount: 320000,
    cost: 215000,
    status: 'Confirmed',
    channel: 'Private Family Office',
  },
  {
    bookingId: 'BK-2026-088',
    date: '2026-09-21',
    serviceId: 'MV-006',
    serviceName: 'Ocean Jewel Overnight Voyage',
    customerName: 'Sheikh Mansoor Al-Qasimi',
    country: 'United Arab Emirates',
    segment: 'Royal & VIP Custom Concierge',
    quantity: 1,
    unitPrice: 420000,
    discount: 20000,
    netAmount: 400000,
    cost: 285000,
    status: 'In Escrow',
    channel: 'Royal Protocol Embassy',
  },
  {
    bookingId: 'BK-2026-087',
    date: '2026-09-18',
    serviceId: 'MV-005',
    serviceName: 'Valérielle Signature Celebration',
    customerName: 'Marcus & Elena Vance',
    country: 'United States',
    segment: 'Couples & Honeymooners',
    quantity: 1,
    unitPrice: 275000,
    discount: 0,
    netAmount: 275000,
    cost: 178000,
    status: 'Confirmed',
    channel: 'Luxury Travel Advisor (Virtuoso)',
  },
  {
    bookingId: 'BK-2026-086',
    date: '2026-09-15',
    serviceId: 'MV-003',
    serviceName: 'Pearl Lagoon Island Retreat',
    customerName: 'Tan Sri Dato Henry Chen',
    country: 'Singapore',
    segment: 'Families & Private Groups',
    quantity: 1,
    unitPrice: 245000,
    discount: 10000,
    netAmount: 235000,
    cost: 162000,
    status: 'Completed',
    channel: 'Direct Concierge Web Portal',
  },
  {
    bookingId: 'BK-2026-085',
    date: '2026-09-10',
    serviceId: 'MV-001',
    serviceName: 'Azure Escape Yacht Charter',
    customerName: 'Dr. Jean-Philippe Moreau',
    country: 'Monaco',
    segment: 'Global High-Net-Worth',
    quantity: 1,
    unitPrice: 185000,
    discount: 0,
    netAmount: 185000,
    cost: 118000,
    status: 'Completed',
    channel: 'Monaco Yacht Club Concierge',
  },
  {
    bookingId: 'BK-2026-084',
    date: '2026-09-06',
    serviceId: 'MV-002',
    serviceName: 'Golden Horizon Sunset Cruise',
    customerName: 'Khun Pasin & Chanya R.',
    country: 'Thailand',
    segment: 'Couples & Honeymooners',
    quantity: 1,
    unitPrice: 98000,
    discount: 0,
    netAmount: 98000,
    cost: 59000,
    status: 'Completed',
    channel: 'Direct Concierge Web Portal',
  },
  {
    bookingId: 'BK-2026-083',
    date: '2026-09-02',
    serviceId: 'MV-007',
    serviceName: 'Crystal Water Diving Expedition',
    customerName: 'Sven & Astrid Lindholm',
    country: 'Sweden',
    segment: 'Global High-Net-Worth',
    quantity: 1,
    unitPrice: 125000,
    discount: 0,
    netAmount: 125000,
    cost: 76000,
    status: 'Completed',
    channel: 'Superyacht Charter Broker',
  },
  {
    bookingId: 'BK-2026-082',
    date: '2026-08-28',
    serviceId: 'MV-004',
    serviceName: 'Royal Blue Business Voyage',
    customerName: 'Aether Capital Partners (AG)',
    country: 'Switzerland',
    segment: 'Corporate & Business Executives',
    quantity: 1,
    unitPrice: 320000,
    discount: 15000,
    netAmount: 305000,
    cost: 215000,
    status: 'Completed',
    channel: 'Executive Corporate Assistant',
  },
];

// Customer Segments (Sheet 3)
export const CUSTOMER_SEGMENTS: CustomerSegment[] = [
  {
    id: 'SEG-01',
    name: 'นักท่องเที่ยวระดับพรีเมียมทั่วโลก (Global HNW Tourists)',
    sharePercent: 34,
    description: 'ผู้มีกำลังซื้อสูงต้องการประสบการณ์ทะเลแบบเป็นส่วนตัว ไม่แออัด และได้รับมาตรฐานความปลอดภัยระดับสูงสุด',
    avgSpend: 215000,
    preferredServices: ['Azure Escape (MV-001)', 'Crystal Water Diving (MV-007)'],
    primaryChannels: ['Luxury Travel Advisors', 'Monaco Yacht Broker', 'Private Banks'],
    keyMarkets: ['Monaco', 'United States', 'Switzerland', 'United Kingdom'],
  },
  {
    id: 'SEG-02',
    name: 'คู่รักและคู่ฮันนีมูน (Couples & Honeymoon Luxury)',
    sharePercent: 22,
    description: 'ทริปโรแมนติก ดินเนอร์พระอาทิตย์ตก งานขอแต่งงาน และแพ็กเกจฉลองครบรอบสุดประทับใจ',
    avgSpend: 186000,
    preferredServices: ['Golden Horizon (MV-002)', 'Valérielle Signature Celebration (MV-005)'],
    primaryChannels: ['Direct VIP Website', 'Luxury Wedding Planners', '5-Star Hotel Concierge'],
    keyMarkets: ['United States', 'Thailand', 'Japan', 'France'],
  },
  {
    id: 'SEG-03',
    name: 'ครอบครัวและกลุ่มเพื่อน (Families & Private Groups)',
    sharePercent: 18,
    description: 'กลุ่มเดินทางครอบครัวขนาด 6-12 คน ที่ต้องการกำหนดเส้นทาง กิจกรรม และอาหารตามความชื่นชอบอย่างอิสระ',
    avgSpend: 245000,
    preferredServices: ['Pearl Lagoon Island Retreat (MV-003)', 'Azure Escape (MV-001)'],
    primaryChannels: ['Family Office', 'Repeat Customers', 'Direct Concierge'],
    keyMarkets: ['Singapore', 'Hong Kong', 'Australia', 'United Kingdom'],
  },
  {
    id: 'SEG-04',
    name: 'นักธุรกิจและองค์กร (Corporate & Business Executives)',
    sharePercent: 16,
    description: 'งานประชุมบอร์ดบริหาร งานเลี้ยงขอบคุณลูกค้าคนสำคัญ และกิจกรรมเสริมสร้างความสัมพันธ์พันธมิตร',
    avgSpend: 320000,
    preferredServices: ['Royal Blue Business Voyage (MV-004)'],
    primaryChannels: ['Corporate PA/Advisory', 'Direct B2B Agreement'],
    keyMarkets: ['Singapore', 'United Arab Emirates', 'Switzerland', 'Japan'],
  },
  {
    id: 'SEG-05',
    name: 'ลูกค้า VIP & Royal (VIP Custom Concierge)',
    sharePercent: 10,
    description: 'ราชวงศ์ ผู้นำองค์กรระดับโลก และมหาเศรษฐีที่ต้องการความเป็นส่วนตัวสูงสุด การรักษาความปลอดภัย และบริการ Concierge 24/7',
    avgSpend: 420000,
    preferredServices: ['Ocean Jewel Overnight (MV-006)', 'Marina Grand VIP Transfer (MV-008)'],
    primaryChannels: ['Royal Protocol Offices', 'Private Ambassador', 'Confidential Agent'],
    keyMarkets: ['United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Monaco'],
  },
];

// Pre-formatted Google Sheets Formula Matrix for copy-paste
export const GOOGLE_SHEETS_FORMULAS = [
  { item: 'กำไรขั้นต้นต่อครั้ง (Gross Profit / Trip)', formula: '=C2-D2', note: 'คำนวณกำไรต่อหนึ่งรอบบริการ (ราคาขาย - ต้นทุน)' },
  { item: 'อัตรากำไรขั้นต้น (Gross Profit Margin %)', formula: '=(C2-D2)/C2', note: 'สัดส่วนกำไรขั้นต้นเทียบกับราคาขาย แสดงในรูปแบบเปอร์เซ็นต์' },
  { item: 'รายได้รวม (Total Revenue)', formula: '=SUM(G2:G100)', note: 'รวมรายได้จากการจองทั้งหมดที่เกิดขึ้น' },
  { item: 'ต้นทุนบริการรวม (Total Service Cost)', formula: '=SUM(H2:H100)', note: 'รวมต้นทุนการจัดบริการทั้งหมด' },
  { item: 'กำไรขั้นต้นรวม (Total Gross Profit)', formula: '=SUM(G2:G100)-SUM(H2:H100)', note: 'รายได้รวมหักลบต้นทุนบริการรวม' },
  { item: 'โควตาคงเหลือ (Remaining Quota)', formula: '=E2-F2', note: 'รอบบริการที่เปิดขาย - รอบบริการที่ได้รับการจองแล้ว' },
];
