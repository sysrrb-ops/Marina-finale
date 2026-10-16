import React, { useState } from 'react';
import {
  Ship,
  Palmtree,
  Sparkles,
  Briefcase,
  Calendar,
  Compass,
  Users,
  Clock,
  ShieldCheck,
  ChevronRight,
  PhoneCall,
  Mail,
  MapPin,
  CheckCircle2,
  Award,
  Wine,
  Waves,
  Eye,
} from 'lucide-react';
import { ServiceItem } from '../data/marinaData';

interface WebsiteViewProps {
  services: ServiceItem[];
  onSelectServiceToBook: (service: ServiceItem) => void;
  onOpenBooking: () => void;
  lang: 'TH' | 'EN';
}

export const WebsiteView: React.FC<WebsiteViewProps> = ({
  services,
  onSelectServiceToBook,
  onOpenBooking,
  lang,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedService, setExpandedService] = useState<ServiceItem | null>(null);

  const categories = ['All', 'Yacht Charter', 'Sunset Cruise', 'Private Island', 'Corporate', 'Marine Activity'];

  const filteredServices =
    selectedCategory === 'All'
      ? services
      : services.filter((s) => s.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div className="space-y-24 pb-20">
      {/* 01 — HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background Visual Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.openai.com/static-rsc-4/xqExfnpkGeaUQMfso96mGxRuhyb_9Ih4joYb9Zwt7kwLLNDDPnkU4lV8PcbaIOkUGsNQSAk0hdzAoU8-UgUW_pcrUmj9DwuyZ6XfpZClygCLRktiBNwXfmiqxuejBYsBArtvado0U13gyR17ZFmNEsxmKGTL8ajVvuucqucRSEA?purpose=inline"
            alt="Marina Valérielle Luxury Ocean"
            className="w-full h-full object-cover scale-105 transform motion-safe:animate-subtle-zoom brightness-[0.7] contrast-[1.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F3A]/85 via-[#0B1F3A]/45 to-[#0B1F3A]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#0B1F3A_95%)]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A45C]/50 bg-[#071527]/80 backdrop-blur-md text-[#DFB76C] text-xs uppercase tracking-[0.25em] mb-6 shadow-xl">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>Private Yachts · Private Islands · Exceptional Journeys</span>
          </div>

          {/* Brand Title */}
          <h1 className="font-display-luxury text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.16em] uppercase text-white drop-shadow-2xl mb-4">
            MARINA <span className="gold-gradient-text">VALÉRIELLE</span>
          </h1>

          {/* Tagline */}
          <h2 className="font-serif-luxury italic text-2xl sm:text-3xl md:text-4xl text-[#DFB76C] font-light tracking-wide mb-6">
            Beyond the Blue. Beyond the Ordinary.
          </h2>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-200 font-light leading-relaxed mb-10">
            สัมผัสอิสระเหนือระดับ กับการเดินทางส่วนตัวบนผืนน้ำสีคริสตัล พร้อมเรือยอร์ชสุดหรู เกาะสวรรค์ส่วนตัว
            และการบริการระดับเวิลด์คลาสที่ออกแบบเฉพาะคุณและคนที่สำคัญที่สุด
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenBooking}
              className="gold-btn w-full sm:w-auto px-8 py-4 rounded-full text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:scale-105 transition-all"
            >
              <Calendar className="w-4 h-4 text-[#071527]" />
              <span>{lang === 'TH' ? 'จองการเดินทาง (Book Your Escape)' : 'Book Your Escape'}</span>
            </button>
            <a
              href="#collection"
              className="w-full sm:w-auto px-8 py-4 rounded-full text-sm uppercase tracking-widest text-white border border-[#C9A45C]/50 bg-[#071527]/60 hover:bg-[#C9A45C]/20 hover:border-[#C9A45C] backdrop-blur-md transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Compass className="w-4 h-4 text-[#DFB76C]" />
              <span>{lang === 'TH' ? 'สำรวจคอลเลกชันเรือและเกาะ' : 'Explore Fleet & Islands'}</span>
            </a>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto pt-10 border-t border-[#C9A45C]/30 text-left">
            <div className="p-4 rounded-2xl bg-[#071527]/70 border border-[#C9A45C]/20 backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-display-luxury font-bold text-[#DFB76C]">
                8
              </div>
              <div className="text-xs text-slate-300 uppercase tracking-wider font-medium">
                Vessels in Fleet
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-[#071527]/70 border border-[#C9A45C]/20 backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-display-luxury font-bold text-[#DFB76C]">
                3
              </div>
              <div className="text-xs text-slate-300 uppercase tracking-wider font-medium">
                Private Islands
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-[#071527]/70 border border-[#C9A45C]/20 backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-display-luxury font-bold text-[#DFB76C]">
                100%
              </div>
              <div className="text-xs text-slate-300 uppercase tracking-wider font-medium">
                Bespoke Itinerary
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-[#071527]/70 border border-[#C9A45C]/20 backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-display-luxury font-bold text-[#DFB76C]">
                24/7
              </div>
              <div className="text-xs text-slate-300 uppercase tracking-wider font-medium">
                Dedicated Butler
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — YACHT & EXPERIENCE COLLECTION */}
      <section id="collection" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#C9A45C]/30 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-display-luxury text-[#DFB76C] tracking-[0.2em] uppercase mb-2">
              <Ship className="w-4 h-4 text-[#C9A45C]" />
              <span>LUXURY FLEET & ESCAPES</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              คอลเลกชันบริการเรือยอร์ชและเกาะส่วนตัว
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl font-light">
              เลือกสัมผัสประสบการณ์เหนือระดับจากบริการที่ได้รับความนิยมสูงสุด
              พร้อมข้อมูลราคาและจำนวนรอบคงเหลือในระบบ
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-[#C9A45C] to-[#A38038] text-[#071527] shadow-lg shadow-[#C9A45C]/30'
                    : 'bg-[#0E2A4E]/60 text-slate-300 border border-[#C9A45C]/30 hover:bg-[#C9A45C]/20 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="luxury-card rounded-3xl overflow-hidden group flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Badges */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071527] via-transparent to-black/30" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#071527]/85 border border-[#C9A45C]/50 text-[#DFB76C] backdrop-blur-md">
                      {service.category}
                    </span>
                  </div>

                  {/* Quota Remaining Badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border ${
                        service.quotaRemaining <= 2
                          ? 'bg-rose-950/80 text-rose-300 border-rose-500/50'
                          : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                      }`}
                    >
                      เหลือ {service.quotaRemaining} รอบ
                    </span>
                  </div>

                  {/* Vessel Spec pill at bottom */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-200 bg-[#071527]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#DFB76C]" />
                      <span>{service.specs.capacity}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#DFB76C]" />
                      <span>{service.specs.duration}</span>
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6">
                  <div className="text-[10px] text-[#C9A45C] font-mono mb-1">
                    รหัสบริการ: {service.id}
                  </div>
                  <h3 className="font-serif-luxury text-xl font-bold text-white mb-1 group-hover:text-[#DFB76C] transition-colors">
                    {service.name}
                  </h3>
                  <div className="text-[11px] text-[#DFB76C] font-medium mb-2">{service.tagline}</div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Features Highlights */}
                  <div className="space-y-1.5 border-t border-[#C9A45C]/20 pt-3 mb-5">
                    {service.specs.highlights.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A45C] shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Action Footer */}
              <div className="p-6 pt-0 border-t border-[#C9A45C]/15 mt-auto">
                <div className="flex items-end justify-between py-4">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                      ราคาเช่าเหมาลำ / ทริป
                    </div>
                    <div className="text-2xl font-num font-bold text-[#DFB76C]">
                      ฿{service.price.toLocaleString()}
                    </div>
                  </div>
                  <button
                    onClick={() => setExpandedService(service)}
                    className="text-xs text-slate-300 hover:text-white flex items-center gap-1 py-1 underline-offset-4 hover:underline"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#C9A45C]" />
                    <span>ดูรายละเอียด</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectServiceToBook(service)}
                    disabled={service.quotaRemaining === 0}
                    className={`w-full py-3 rounded-full text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all ${
                      service.quotaRemaining === 0
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                        : 'gold-btn'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#071527]" />
                    <span>{service.quotaRemaining === 0 ? 'โควตาเต็ม' : 'จองรอบนี้'}</span>
                  </button>
                  <button
                    onClick={() => setExpandedService(service)}
                    className="w-full py-3 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#0E2A4E] text-white border border-[#C9A45C]/30 hover:border-[#C9A45C] transition-all flex items-center justify-center gap-1"
                  >
                    <span>ข้อมูลเรือ</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#DFB76C]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 03 — PRIVATE ISLANDS ESCAPES */}
      <section className="relative py-20 bg-gradient-to-b from-[#0B1F3A] via-[#071527] to-[#0B1F3A] border-y border-[#C9A45C]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A45C]/40 bg-[#0E2A4E]/50 text-[#DFB76C] text-xs uppercase tracking-widest">
                <Palmtree className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>Sanctuary of Seclusion</span>
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white leading-tight">
                เกาะส่วนตัวระดับ <span className="gold-gradient-text">Ultra-Luxury</span> บนผืนน้ำอันดามันและมัลดีฟส์
              </h2>
              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                สัมผัสการพักผ่อนแบบ Secluded Island ที่ให้คุณครอบครองทั้งเกาะแต่เพียงผู้เดียว
                วิลล่าหรูริมทะเล จุดจอดเรือยอร์ชส่วนตัว ลานจอดเฮลิคอปเตอร์
                และทีมเชฟมิชลินที่พร้อมรังสรรค์มื้ออาหารสุดประทับใจใต้แสงดาว
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-[#0E2A4E]/60 border border-[#C9A45C]/25">
                  <Waves className="w-5 h-5 text-[#247DA5] mb-2" />
                  <div className="font-semibold text-white text-sm">หาดทรายขาวส่วนตัว</div>
                  <div className="text-xs text-slate-400 mt-1">สงบ เป็นส่วนตัว 100% ปราศจากผู้รบกวน</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#0E2A4E]/60 border border-[#C9A45C]/25">
                  <Wine className="w-5 h-5 text-[#C9A45C] mb-2" />
                  <div className="font-semibold text-white text-sm">บริการระดับ 6 ดาว</div>
                  <div className="text-xs text-slate-400 mt-1">ทีมงานบริการส่วนตัวประจำเกาะตลอด 24 ชม.</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="gold-btn px-8 py-3.5 rounded-full text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg"
                >
                  <Calendar className="w-4 h-4 text-[#071527]" />
                  <span>จองแพ็กเกจเกาะส่วนตัว</span>
                </button>
              </div>
            </div>

            {/* Visual Collage */}
            <div className="relative">
              <div className="relative z-10 rounded-3xl overflow-hidden border border-[#C9A45C]/40 shadow-2xl">
                <img
                  src="https://images.openai.com/static-rsc-4/zWGtFGOhn_h-YJnghohFOtCPZ6i2lFETqkMM-uEwkTTVs2x6lkXc6Qo9u1HEu8Vx5USN4xGBqPE8Wse01UPdyjy71tXg_YsjT1DmzHQo3JfLOvXh__cykWjclFW0nzgZLDYiN_vl0Nf3AlB6D9hyQu7408YvHjuB0vYywO3nlrg?purpose=inline"
                  alt="Shark Residence Private Island"
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 z-20 w-3/5 rounded-2xl overflow-hidden border-2 border-[#C9A45C] shadow-2xl hidden sm:block">
                <img
                  src="https://images.openai.com/static-rsc-4/gaz7H8BdCkwqMivS9bNX86kGXrVh509b-z-bzdvuF2T3oRNGVfb3-KnClokq1mfmc7yBxoPeIUpR8Z2gQtmlmTGN_C3x-_qC63Kh4a691YNW_rvNvTkZ8vJb5_6PE7Ein0W3sk7d31zuMWuSaoH1Voscg393_Eh6um6iNScx5cc?purpose=inline"
                  alt="Private Beach Villa"
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — EXPERIENCES & CORPORATE CHARTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A45C]/40 bg-[#071527] text-[#DFB76C] text-xs uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>Curated Moments</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white mb-4">
            ประสบการณ์ที่ออกแบบตามความปรารถนา
          </h2>
          <p className="text-sm text-slate-300 font-light leading-relaxed">
            ไม่ว่าจะเป็นการเดินทางเพื่อเฉลิมฉลองโอกาสพิเศษ หรือการเจรจาธุรกิจระดับสูง
            เราพร้อมจัดเตรียมทุกรายละเอียดให้สมบูรณ์แบบไร้ที่ติ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="luxury-card rounded-3xl p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#071527] border border-[#C9A45C]/40 flex items-center justify-center text-[#DFB76C]">
                <Wine className="w-6 h-6" />
              </div>
              <h3 className="font-serif-luxury text-2xl font-bold text-white">
                Honeymoon & Romantic Soirée
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                ดินเนอร์ใต้แสงเทียนกลางทะเล ดอกไม้สดระดับลักชัวรี แชมเปญวินเทจ
                และนักดนตรีคลาสสิกบรรเลงส่วนตัว เพื่อช่วงเวลาโรแมนติกที่น่าจดจำที่สุด
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#C9A45C]/20 flex items-center justify-between">
              <span className="text-xs text-[#DFB76C] font-semibold">เริ่มต้น ฿98,000</span>
              <button
                onClick={onOpenBooking}
                className="text-xs text-white hover:text-[#DFB76C] flex items-center gap-1 font-semibold"
              >
                <span>จองบริการ</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="luxury-card rounded-3xl p-8 flex flex-col justify-between border-[#C9A45C]/60 shadow-2xl">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#071527] border border-[#C9A45C] flex items-center justify-center text-[#DFB76C]">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-serif-luxury text-2xl font-bold text-white">
                Executive & Corporate Charter
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                พื้นที่ประชุมผู้บริหารระดับ C-Suite พร้อมระบบอินเทอร์เน็ตผ่านดาวเทียมความเร็วสูง
                ความปลอดภัยระดับสูง การเลี้ยงรับรองคู่ค้า และกิจกรรมสร้างความสัมพันธ์ระดับผู้นำ
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#C9A45C]/20 flex items-center justify-between">
              <span className="text-xs text-[#DFB76C] font-semibold">เริ่มต้น ฿320,000</span>
              <button
                onClick={onOpenBooking}
                className="text-xs text-white hover:text-[#DFB76C] flex items-center gap-1 font-semibold"
              >
                <span>จองบริการ</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="luxury-card rounded-3xl p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#071527] border border-[#C9A45C]/40 flex items-center justify-center text-[#DFB76C]">
                <Waves className="w-6 h-6" />
              </div>
              <h3 className="font-serif-luxury text-2xl font-bold text-white">
                Deep Ocean & Coral Expedition
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                สำรวจแนวปะการังน้ำลึกและจุดดำน้ำส่วนตัว มีอุปกรณ์ Seabob, เจ็ตสกี,
                และครูดำน้ำ PADI Master คอยดูแลอย่างใกล้ชิดและปลอดภัยสูงสุด
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#C9A45C]/20 flex items-center justify-between">
              <span className="text-xs text-[#DFB76C] font-semibold">เริ่มต้น ฿120,000</span>
              <button
                onClick={onOpenBooking}
                className="text-xs text-white hover:text-[#DFB76C] flex items-center gap-1 font-semibold"
              >
                <span>จองบริการ</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — CONCIERGE & GLOBAL SUPPORT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#0E2A4E] via-[#071527] to-[#0B1F3A] border border-[#C9A45C]/40 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="text-xs uppercase tracking-widest text-[#DFB76C] font-display-luxury font-bold">
                24/7 PRIVATE CONCIERGE
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
                ผู้ดูแลส่วนตัวพร้อมประสานงานทุกความต้องการ
              </h2>
              <p className="text-sm text-slate-300 font-light leading-relaxed">
                ไม่ว่าจะเป็นคำขอพิเศษ การปรับเปลี่ยนเส้นทางเดินเรือ การจัดหาเชฟเฉพาะทาง
                หรือการรับส่งด้วยเฮลิคอปเตอร์ส่วนตัว ทีม Concierge ของเราพร้อมดูแลคุณตลอด 24 ชั่วโมง
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C9A45C]" />
                  <span>ความปลอดภัยมาตรฐานสากล</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A45C]" />
                  <span>รองรับ 5 ภาษา (TH, EN, FR, RU, ZH)</span>
                </div>
              </div>
            </div>

            <div className="bg-[#071527]/80 rounded-2xl p-6 border border-[#C9A45C]/30 space-y-4">
              <div className="text-sm font-semibold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#DFB76C]" />
                <span>ติดต่อผู้ดูแลส่วนตัว (Private Concierge Office)</span>
              </div>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <PhoneCall className="w-4 h-4 text-[#C9A45C]" />
                  <span className="font-mono">+66 (0) 2 890 9888 / +33 4 93 00 12 00 (Monaco)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#C9A45C]" />
                  <span className="font-mono">concierge@marina-valerielle.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#C9A45C]" />
                  <span>Royal Marina Pier & Port Hercules, Côte d'Azur</span>
                </div>
              </div>
              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="w-full gold-btn py-3 rounded-xl text-xs uppercase tracking-wider font-bold shadow-md"
                >
                  ติดต่อปรึกษาเส้นทางและรับใบเสนอราคา
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE DETAIL MODAL */}
      {expandedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#0E2A4E] rounded-3xl border border-[#C9A45C] p-6 sm:p-8 text-white shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setExpandedService(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold w-8 h-8 rounded-full bg-[#071527] flex items-center justify-center border border-[#C9A45C]/30"
            >
              ✕
            </button>

            <div className="relative h-60 rounded-2xl overflow-hidden mb-6 border border-[#C9A45C]/30">
              <img
                src={expandedService.image}
                alt={expandedService.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#071527]/90 text-[#DFB76C] border border-[#C9A45C]/40">
                  {expandedService.category}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-xs text-[#C9A45C] font-mono">
                  SERVICE ID: {expandedService.id}
                </div>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
                  {expandedService.name}
                </h3>
                <div className="text-xs text-[#DFB76C] font-semibold mt-1">{expandedService.tagline}</div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                {expandedService.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-3 border-y border-[#C9A45C]/20 text-xs">
                <div>
                  <div className="text-slate-400 text-[10px]">ความจุผู้โดยสาร</div>
                  <div className="font-bold text-[#DFB76C]">{expandedService.specs.capacity}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px]">ระยะเวลา</div>
                  <div className="font-bold text-[#DFB76C]">{expandedService.specs.duration}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px]">โควตารอบคงเหลือ</div>
                  <div className="font-bold text-emerald-400">{expandedService.quotaRemaining} รอบ</div>
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
                  สิ่งอำนวยความสะดวกและบริการในแพ็กเกจ:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {expandedService.specs.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A45C] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[#C9A45C]/20">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">ราคาเหมาลำ</div>
                  <div className="text-2xl font-num font-bold text-[#DFB76C]">
                    ฿{expandedService.price.toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={() => {
                    const s = expandedService;
                    setExpandedService(null);
                    onSelectServiceToBook(s);
                  }}
                  className="gold-btn px-6 py-3 rounded-full text-xs uppercase tracking-widest font-bold"
                >
                  ดำเนินการจองรอบนี้
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
