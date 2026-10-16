import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Copy,
  Check,
  Award,
  Users,
  Database,
  TrendingUp,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';

export const ReportView: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyReport = () => {
    const reportText = `MARINA VALÉRIELLE — EXECUTIVE REPORT 2026
Private Yachts · Private Islands · Exceptional Journeys

1. สรุปภาพรวมธุรกิจ (Executive Summary)
Marina Valérielle เป็นโมเดลธุรกิจบริการเช่าเรือยอร์ชและเกาะส่วนตัวระดับ Ultra-Luxury เน้นกลุ่มลูกค้า Ultra-High-Net-Worth Individuals (UHNWI) นักธุรกิจ และผู้บริหารระดับสูง 
แนวคิดหลักคือ "Beyond the Blue. Beyond the Ordinary." มุ่งเน้นการมอบประสบการณ์ที่ออกแบบเฉพาะบุคคล (Bespoke Luxury Experience) 100%

2. ตัวชี้วัดสำคัญทางการเงิน (Financial Highlights)
- รายได้รวมสะสม (Total Revenue): ฿14,950,000 (9 เดือน: ม.ค. - ก.ย. 2026)
- ต้นทุนบริการรวม (Total Service Cost): ฿9,207,000
- กำไรสุทธิ (Net Profit): ฿5,743,000
- อัตรากำไรสุทธิเฉลี่ย (Net Profit Margin): 38.41% (Gross Margin: 61.59%)
- จำนวนรอบการให้บริการที่ปิดการขายแล้ว: 65 รอบ จากโควตาทั้งหมด 80 รอบ (อัตราการจอง 81.25%)

3. กลยุทธ์กลุ่มลูกค้าเป้าหมาย (Customer Segments)
- กลุ่มลูกค้านักท่องเที่ยวระดับพรีเมียม (HNWI): สัดส่วน 35% รายได้ ฿5.23M
- กลุ่มองค์กรและนักธุรกิจ (Corporate / Executive): สัดส่วน 28% รายได้ ฿4.19M
- กลุ่มคู่รักและฮันนีมูนระดับบน: สัดส่วน 18% รายได้ ฿2.69M
- กลุ่มครอบครัวและเพื่อน VIP: สัดส่วน 12% รายได้ ฿1.79M
- ลูกค้าบุคคลพิเศษ (Celebrity / Royal Family): สัดส่วน 7% รายได้ ฿1.05M`;

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-white">
      {/* Top Bar Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#C9A45C]/30 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-display-luxury text-[#DFB76C] tracking-[0.2em] uppercase mb-1">
            <FileText className="w-4 h-4 text-[#C9A45C]" />
            <span>BUSINESS REPORT & EXECUTIVE BRIEFING 2026</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
            รายงานวิเคราะห์ธุรกิจฉบับสมบูรณ์
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyReport}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#C9A45C]/40 text-xs text-[#DFB76C] bg-[#071527] hover:bg-[#C9A45C]/20 transition-all font-semibold shadow-md"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#C9A45C]" />}
            <span>{copied ? 'คัดลอกรายงานแล้ว!' : 'คัดลอกบทสรุป'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="gold-btn flex items-center gap-1.5 px-4 py-2 rounded-full text-xs uppercase tracking-wider font-bold shadow-md"
          >
            <Printer className="w-4 h-4" />
            <span>พิมพ์รายงาน (Print / PDF)</span>
          </button>
        </div>
      </div>

      {/* Main Report Document Folio */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#071527] border border-[#C9A45C]/40 text-slate-200 shadow-2xl space-y-10">
        {/* Folio Header */}
        <div className="border-b border-[#C9A45C]/30 pb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="font-display-luxury text-2xl font-bold tracking-[0.2em] text-white">
              MARINA <span className="gold-gradient-text">VALÉRIELLE</span>
            </div>
            <div className="text-xs text-[#C9A45C] tracking-widest uppercase mt-1">
              Private Yachts · Private Islands · Exceptional Journeys
            </div>
            <div className="text-[11px] text-slate-400 mt-2">
              เอกสารรายงานผลประกอบการและแผนยุทธศาสตร์ธุรกิจจำลอง (Confidential Executive Folio)
            </div>
          </div>

          <div className="text-right text-xs text-slate-400 space-y-1">
            <div>
              วันที่รายงาน: <strong className="text-white">ตุลาคม 2026</strong>
            </div>
            <div>
              รอบระยะเวลา: <strong className="text-white">มกราคม - กันยายน 2026</strong>
            </div>
            <div>
              สกุลเงินหลัก: <strong className="text-[#DFB76C]">THB (บาทไทย)</strong>
            </div>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-display-luxury text-[#DFB76C] uppercase font-bold tracking-wider">
            <Award className="w-4 h-4 text-[#C9A45C]" />
            <span>1. สรุปภาพรวมและตำแหน่งทางการตลาด (Executive Summary & Brand Positioning)</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            <strong>Marina Valérielle</strong> เป็นโครงการธุรกิจจำลองที่ถูกออกแบบภายใต้มาตรฐาน
            Ultra-Luxury Hospitality & Maritime Charter ให้บริการเรือยอร์ชส่วนตัวและเกาะส่วนตัวสำหรับกลุ่มผู้มีกำลังซื้อสูงระดับโลก
            (HNWI / UHNWI) ด้วยจุดยืนของแบรนด์ <em>"Beyond the Blue. Beyond the Ordinary."</em>{' '}
            เราไม่จำหน่ายเพียงการเช่าเรือเป็นรายชั่วโมง แต่เน้นการสร้างสรรค์ประสบการณ์เฉพาะบุคคล
            (Hyper-Personalized Journeys) ครอบคลุมตั้งแต่อาหารมิชลิน กิจกรรมทางทะเล บริการผู้ช่วยส่วนตัว (Dedicated Butler)
            ไปจนถึงการรักษาความลับและความปลอดภัยระดับสากล
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-[#0E2A4E]/60 border border-[#C9A45C]/20 text-center">
              <div className="text-[10px] text-slate-400 uppercase">อัตราการจองรวม</div>
              <div className="text-xl font-num font-bold text-[#DFB76C] mt-1">81.25%</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0E2A4E]/60 border border-[#C9A45C]/20 text-center">
              <div className="text-[10px] text-slate-400 uppercase">ราคาเฉลี่ยต่อทริป</div>
              <div className="text-xl font-num font-bold text-white mt-1">฿230,000</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0E2A4E]/60 border border-[#C9A45C]/20 text-center">
              <div className="text-[10px] text-slate-400 uppercase">กำไรสุทธิต่อทริป</div>
              <div className="text-xl font-num font-bold text-emerald-400 mt-1">฿88,350</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0E2A4E]/60 border border-[#C9A45C]/20 text-center">
              <div className="text-[10px] text-slate-400 uppercase">ความพึงพอใจลูกค้า</div>
              <div className="text-xl font-num font-bold text-[#DFB76C] mt-1">99.4%</div>
            </div>
          </div>
        </div>

        {/* Section 2: Financial Performance Highlights */}
        <div className="space-y-4 pt-4 border-t border-[#C9A45C]/20">
          <div className="flex items-center gap-2 text-sm font-display-luxury text-[#DFB76C] uppercase font-bold tracking-wider">
            <TrendingUp className="w-4 h-4 text-[#C9A45C]" />
            <span>2. ผลประกอบการทางการเงิน (Financial Highlights Jan - Sep 2026)</span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            <p>
              ในช่วง 9 เดือนแรกของปี 2026 ธุรกิจสร้างรายได้รวมทั้งสิ้น <strong>14,950,000 บาท</strong>{' '}
              จากจำนวนรอบการให้บริการ <strong>65 รอบ</strong> มีต้นทุนทางตรงในการให้บริการรวม{' '}
              <strong>9,207,000 บาท</strong> ส่งผลให้มีกำไรสุทธิรวม <strong>5,743,000 บาท</strong>{' '}
              คิดเป็นอัตรากำไรสุทธิ (Net Margin) <strong>38.41%</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-300">
              <li>
                <strong>รายได้เติบโตต่อเนื่อง:</strong> เริ่มต้นจาก 1.15 ล้านบาทในเดือน ม.ค. สู่ 2.45 ล้านบาทในเดือน ก.ย. (+113%)
              </li>
              <li>
                <strong>ช่วงไฮซีซั่นและกิจกรรมพิเศษ:</strong> เดือน ส.ค. และ ก.ย. มีความต้องการสูงสุด
                จากการท่องเที่ยวฤดูร้อนของชาวยุโรปและตะวันออกกลาง รวมถึงการจัดประชุมประจำปีของผู้บริหารระดับสูง
              </li>
              <li>
                <strong>การควบคุมต้นทุน:</strong> โครงสร้างต้นทุนเชื้อเพลิง ลูกเรือ และอาหารพรีเมียมถูกควบคุมให้มีอัตราคงที่
                โดยมี Margin ต่อแพ็กเกจเฉลี่ย 35% - 42%
              </li>
            </ul>
          </div>
        </div>

        {/* Section 3: Service Profitability */}
        <div className="space-y-4 pt-4 border-t border-[#C9A45C]/20">
          <div className="flex items-center gap-2 text-sm font-display-luxury text-[#DFB76C] uppercase font-bold tracking-wider">
            <Database className="w-4 h-4 text-[#C9A45C]" />
            <span>3. การจัดอันดับบริการที่สร้างรายได้สูงสุด (Service Revenue Drivers)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#0E2A4E]/60 border border-[#C9A45C]/25 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">1. Pearl Lagoon Island Retreat</span>
                <span className="text-[#DFB76C] font-num font-bold">฿3.67M (24.5%)</span>
              </div>
              <p className="text-xs text-slate-300 font-light">
                บริการที่สร้างรายได้รวมสูงสุด ด้วยราคาแพ็กเกจ ฿245,000/ครั้ง ได้รับความนิยมจากกลุ่มครอบครัว VIP และผู้มีชื่อเสียง
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0E2A4E]/60 border border-[#C9A45C]/25 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">2. Royal Blue Business Voyage</span>
                <span className="text-[#DFB76C] font-num font-bold">฿3.20M (21.4%)</span>
              </div>
              <p className="text-xs text-slate-300 font-light">
                แพ็กเกจราคาสูงสุด ฿320,000/ครั้ง จากกลุ่มองค์กรชั้นนำ รองรับการประชุมผู้บริหารและงานต้อนรับคู่ค้าระดับนานาชาติ
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0E2A4E]/60 border border-[#C9A45C]/25 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">3. Azure Escape Yacht Charter</span>
                <span className="text-[#DFB76C] font-num font-bold">฿2.59M (17.3%)</span>
              </div>
              <p className="text-xs text-slate-300 font-light">
                บริการหลัก (Flagship Yacht) ขนาด 87 ฟุต ตอบสนองการล่องเรือแบบครอบครัวและกลุ่มเพื่อนส่วนตัว
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0E2A4E]/60 border border-[#C9A45C]/25 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">4. Golden Horizon Sunset Cruise</span>
                <span className="text-[#DFB76C] font-num font-bold">฿1.76M (11.8%)</span>
              </div>
              <p className="text-xs text-slate-300 font-light">
                อัตราการหมุนเวียนรอบสูงสุด มีการจองเต็ม 18/20 รอบ เหมาะสำหรับคู่รัก ฮันนีมูน และโอกาสฉลองวันครบรอบ
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Target Demographics Strategy */}
        <div className="space-y-4 pt-4 border-t border-[#C9A45C]/20">
          <div className="flex items-center gap-2 text-sm font-display-luxury text-[#DFB76C] uppercase font-bold tracking-wider">
            <Users className="w-4 h-4 text-[#C9A45C]" />
            <span>4. การเจาะกลุ่มลูกค้าเป้าหมาย (Demographic Targeting Strategy)</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            การกระจายตัวของกลุ่มลูกค้าสะท้อนถึงเสถียรภาพของพอร์ตรายได้ โดยกลุ่มลูกค้าที่มีสัดส่วนสูงสุดคือ{' '}
            <strong>นักท่องเที่ยวต่างชาติระดับพรีเมียม (35%)</strong> ตามด้วย{' '}
            <strong>องค์กรธุรกิจและนักลงทุน (28%)</strong> และ{' '}
            <strong>คู่รักระดับลักชัวรี (18%)</strong> ซึ่งโมเดลนี้ช่วยลดความเสี่ยงจากการพึ่งพาฤดูกาลท่องเที่ยวของกลุ่มใดกลุ่มหนึ่ง
          </p>
        </div>

        {/* Section 5: Strategic Recommendations */}
        <div className="space-y-4 pt-4 border-t border-[#C9A45C]/20">
          <div className="flex items-center gap-2 text-sm font-display-luxury text-[#DFB76C] uppercase font-bold tracking-wider">
            <Lightbulb className="w-4 h-4 text-[#C9A45C]" />
            <span>5. ข้อเสนอแนะเชิงกลยุทธ์สำหรับไตรมาสที่ 4 และปี 2027</span>
          </div>

          <div className="space-y-2.5 text-xs text-slate-300">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">ขยายโควตารอบช่วงปีใหม่ (Peak Holiday Expansion):</strong>{' '}
                เนื่องจากโควตาคงเหลือเหลือเพียง 15 รอบ ควรเปิดรอบพิเศษช่วงเคานต์ดาวน์ (30 ธ.ค. - 2 ม.ค.)
                โดยกำหนดอัตราพรีเมียมเพิ่มขึ้น 25-30%
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">ระบบสมาชิกแบบ VIP Membership (The Valérielle Syndicate):</strong>{' '}
                เปิดรับสมาชิกแบบเชิญเท่านั้น (Invitation-only) มอบสิทธิ์การสำรองเรือล่วงหน้า 90 วัน
                และบริการรับส่งเฮลิคอปเตอร์ เพื่อรักษาฐานลูกค้าประจำ (Repeat HNWI)
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">ความยั่งยืนทางทะเล (Eco-Luxury Maritime Protocol):</strong>{' '}
                ยกระดับกองเรือด้วยเทคโนโลยีไฮบริดและการชดเชยคาร์บอน (Carbon-Neutral Voyages)
                เพื่อดึงดูดกลุ่มลูกค้ายุคใหม่ที่ให้ความสำคัญกับการอนุรักษ์สิ่งแวดล้อม
              </div>
            </div>
          </div>
        </div>

        {/* Folio Sign-off Footer */}
        <div className="border-t border-[#C9A45C]/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            Prepared by: <strong className="text-white">Strategic Operations & Maritime Advisory Board</strong>
          </div>
          <div className="font-mono text-[#DFB76C]">
            CONFIDENTIAL · MARINA VALÉRIELLE LUXURY HOLDINGS
          </div>
        </div>
      </div>
    </div>
  );
};
