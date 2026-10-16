import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  PieChart,
  BarChart,
  ArrowUpRight,
  Info,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  MONTHLY_METRICS,
  TOTAL_KPI,
  CUSTOMER_SEGMENTS,
  ServiceItem,
} from '../data/marinaData';

interface DashboardViewProps {
  services: ServiceItem[];
  lang: 'TH' | 'EN';
}

export const DashboardView: React.FC<DashboardViewProps> = ({ services, lang }) => {
  const [metricFilter, setMetricFilter] = useState<'all' | 'q1' | 'q2' | 'q3'>('all');

  const filteredMonthly = MONTHLY_METRICS.filter((m) => {
    if (metricFilter === 'q1') return ['Jan 2026', 'Feb 2026', 'Mar 2026'].includes(m.month);
    if (metricFilter === 'q2') return ['Apr 2026', 'May 2026', 'Jun 2026'].includes(m.month);
    if (metricFilter === 'q3') return ['Jul 2026', 'Aug 2026', 'Sep 2026'].includes(m.month);
    return true;
  });

  const maxRevenue = 2.5; // for graph scaling in Million Baht

  const totalBooked = services.reduce((acc, s) => acc + s.quotaBooked, 0);
  const totalQuota = services.reduce((acc, s) => acc + s.quotaTotal, 0);
  const totalRemaining = services.reduce((acc, s) => acc + s.quotaRemaining, 0);
  const occupancyPercent = Math.round((totalBooked / totalQuota) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-white">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#C9A45C]/30 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-display-luxury text-[#DFB76C] tracking-[0.2em] uppercase mb-1">
            <BarChart className="w-4 h-4 text-[#C9A45C]" />
            <span>EXECUTIVE FINANCIAL DASHBOARD (JAN - SEP 2026)</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
            ภาพรวมผลประกอบการและการวิเคราะห์
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-light">
            รายงานตัวชี้วัดสำคัญทางการเงิน (KPIs), แนวโน้มรายได้, ต้นทุนบริการ และการติดตามโควตาคงเหลือ
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-[#071527] text-[#DFB76C] border border-[#C9A45C]/40 text-xs font-bold flex items-center gap-1.5 shadow-md">
            <ArrowUpRight className="w-4 h-4 text-[#C9A45C]" />
            <span>เติบโต {TOTAL_KPI.growthJanSep} (ม.ค. - ก.ย.)</span>
          </span>
        </div>
      </div>

      {/* 4 CORE KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Revenue */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0E2A4E] to-[#071527] border border-[#C9A45C]/30 relative overflow-hidden group hover:border-[#C9A45C] transition-all shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="uppercase tracking-wider">รายได้รวม (Total Revenue)</span>
            <div className="w-8 h-8 rounded-full bg-[#071527] flex items-center justify-center border border-[#C9A45C]/40">
              <DollarSign className="w-4 h-4 text-[#DFB76C]" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-num font-bold text-white">
            {TOTAL_KPI.revenue}
          </div>
          <div className="mt-2.5 text-xs text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>฿{TOTAL_KPI.revenueExact.toLocaleString()} (สะสม 9 เดือน)</span>
          </div>
        </div>

        {/* Card 2: Cost */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0E2A4E] to-[#071527] border border-[#C9A45C]/30 relative overflow-hidden group hover:border-[#C9A45C] transition-all shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="uppercase tracking-wider">ต้นทุนบริการรวม (Cost)</span>
            <div className="w-8 h-8 rounded-full bg-[#071527] flex items-center justify-center border border-[#C9A45C]/40">
              <Layers className="w-4 h-4 text-[#247DA5]" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-num font-bold text-white">
            {TOTAL_KPI.cost}
          </div>
          <div className="mt-2.5 text-xs text-slate-400 flex items-center gap-1">
            <span>฿{TOTAL_KPI.costExact.toLocaleString()} (ต้นทุนตรงต่อทริป)</span>
          </div>
        </div>

        {/* Card 3: Net Profit */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0E2A4E] to-[#071527] border border-[#C9A45C]/50 relative overflow-hidden group hover:border-[#DFB76C] transition-all shadow-xl">
          <div className="flex items-center justify-between text-xs text-[#DFB76C] mb-2">
            <span className="uppercase tracking-wider font-semibold">กำไรสุทธิ (Gross Profit)</span>
            <div className="w-8 h-8 rounded-full bg-[#C9A45C]/20 flex items-center justify-center border border-[#C9A45C]">
              <Sparkles className="w-4 h-4 text-[#DFB76C]" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-num font-bold text-[#DFB76C]">
            {TOTAL_KPI.grossProfit}
          </div>
          <div className="mt-2.5 text-xs text-emerald-400 flex items-center gap-1 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>อัตรากำไร {TOTAL_KPI.grossMargin}</span>
          </div>
        </div>

        {/* Card 4: Bookings & Occupancy */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0E2A4E] to-[#071527] border border-[#C9A45C]/30 relative overflow-hidden group hover:border-[#C9A45C] transition-all shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="uppercase tracking-wider">จำนวนรอบที่ให้บริการ (Trips)</span>
            <div className="w-8 h-8 rounded-full bg-[#071527] flex items-center justify-center border border-[#C9A45C]/40">
              <BarChart className="w-4 h-4 text-[#247DA5]" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-num font-bold text-white">
            {totalBooked} รอบ
          </div>
          <div className="mt-2.5 text-xs text-slate-300 flex items-center gap-2">
            <span>อัตราการจอง:</span>
            <span className="font-bold text-[#DFB76C]">{occupancyPercent}%</span>
            <span className="text-slate-400">(เหลือ {totalRemaining} รอบ)</span>
          </div>
        </div>
      </div>

      {/* MONTHLY REVENUE & COST PERFORMANCE CHART */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0E2A4E] to-[#071527] border border-[#C9A45C]/30 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#DFB76C] font-semibold">
              MONTHLY FINANCIAL TRAJECTORY
            </div>
            <h3 className="font-serif-luxury text-2xl font-bold text-white mt-1">
              แนวโน้มรายได้และต้นทุนรายเดือน (ม.ค. - ก.ย. 2026)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-4 text-xs text-slate-300 mr-2">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-gradient-to-t from-[#C9A45C] to-[#DFB76C]" />
                <span>รายได้ (Revenue)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#247DA5]" />
                <span>ต้นทุน (Cost)</span>
              </span>
            </div>

            <div className="flex items-center bg-[#071527] p-1 rounded-full border border-[#C9A45C]/20 text-xs">
              {(['all', 'q1', 'q2', 'q3'] as const).map((q) => (
                <button
                  key={q}
                  onClick={() => setMetricFilter(q)}
                  className={`px-3 py-1 rounded-full uppercase transition-all ${
                    metricFilter === q
                      ? 'bg-[#C9A45C] text-[#071527] font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {q === 'all' ? 'ทั้งปี' : q.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bar Visualizer */}
        <div className="pt-6 pb-2">
          <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 border-b border-[#C9A45C]/30 pb-4">
            {filteredMonthly.map((m) => {
              const revHeight = (m.revenue / maxRevenue) * 100;
              const costHeight = (m.cost / maxRevenue) * 100;
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full flex items-end justify-center gap-1 sm:gap-2 h-52">
                    {/* Revenue Bar */}
                    <div
                      style={{ height: `${revHeight}%` }}
                      className="w-1/2 max-w-[28px] rounded-t-md bg-gradient-to-t from-[#C9A45C] to-[#DFB76C] relative group-hover:brightness-110 transition-all shadow-md shadow-[#C9A45C]/20 flex items-start justify-center pt-1"
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-7 text-[10px] font-bold text-[#DFB76C] bg-[#071527] px-1.5 py-0.5 rounded border border-[#C9A45C]/50 whitespace-nowrap z-20">
                        ฿{m.revenue}M
                      </span>
                    </div>

                    {/* Cost Bar */}
                    <div
                      style={{ height: `${costHeight}%` }}
                      className="w-1/2 max-w-[28px] rounded-t-md bg-[#247DA5] relative group-hover:brightness-110 transition-all flex items-start justify-center pt-1"
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-7 text-[10px] font-bold text-slate-300 bg-[#071527] px-1.5 py-0.5 rounded border border-white/20 whitespace-nowrap z-20">
                        ฿{m.cost}M
                      </span>
                    </div>
                  </div>

                  {/* Label */}
                  <div className="text-center">
                    <div className="text-xs font-semibold text-slate-200">{m.monthTh}</div>
                    <div className="text-[10px] text-[#DFB76C] font-mono">฿{m.revenue}M</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Takeaways Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs text-slate-300">
          <div className="p-3.5 rounded-2xl bg-[#071527]/70 border border-[#C9A45C]/20 flex items-start gap-3">
            <Info className="w-4 h-4 text-[#DFB76C] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">ช่วงพีคของธุรกิจ:</span> เดือน ส.ค. และ ก.ย.
              มีรายได้แตะ 2.12M และ 2.22M บาท จากลูกค้ากลุ่ม Corporate และทริป Private Island
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#071527]/70 border border-[#C9A45C]/20 flex items-start gap-3">
            <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">ประสิทธิภาพกำไร:</span> รักษากำไรสุทธิเฉลี่ย
              38.4% ได้ต่อเนื่อง โดยมีต้นทุนต่อรอบควบคุมอยู่ที่ 60% ของราคาขาย
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#071527]/70 border border-[#C9A45C]/20 flex items-start gap-3">
            <ArrowUpRight className="w-4 h-4 text-[#247DA5] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">แนวโน้ม Q4:</span> คาดการณ์รายได้ไตรมาสสุดท้ายเติบโตอีก
              25% จากเทศกาลปีใหม่และการจองล่วงหน้าของนักท่องเที่ยวต่างชาติ
            </div>
          </div>
        </div>
      </div>

      {/* TWO COLUMN: INVENTORY TRACKING & CUSTOMER SEGMENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Quota Inventory Progress */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0E2A4E] to-[#071527] border border-[#C9A45C]/30 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#C9A45C]/20 pb-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#DFB76C] font-semibold">
                SERVICE QUOTA INVENTORY
              </div>
              <h3 className="font-serif-luxury text-xl font-bold text-white mt-1">
                การติดตามโควตารอบคงเหลือ (Inventory Status)
              </h3>
            </div>
            <span className="text-xs font-semibold text-slate-300 bg-[#071527] px-3 py-1 rounded-full border border-[#C9A45C]/30">
              รวม {totalBooked}/{totalQuota} รอบ
            </span>
          </div>

          <div className="space-y-4">
            {services.map((s) => {
              const bookedPct = Math.round((s.quotaBooked / s.quotaTotal) * 100);
              return (
                <div key={s.id} className="space-y-1.5 p-3 rounded-2xl bg-[#071527]/60 border border-[#C9A45C]/15">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white truncate max-w-[220px]">
                      {s.name}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400">
                        จองแล้ว {s.quotaBooked}/{s.quotaTotal}
                      </span>
                      <span
                        className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                          s.quotaRemaining <= 2
                            ? 'bg-rose-950 text-rose-300 border border-rose-800'
                            : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        }`}
                      >
                        เหลือ {s.quotaRemaining} รอบ
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-[#0E2A4E] overflow-hidden border border-[#C9A45C]/20">
                    <div
                      style={{ width: `${bookedPct}%` }}
                      className={`h-full rounded-full transition-all duration-500 ${
                        bookedPct >= 85
                          ? 'bg-gradient-to-r from-[#DFB76C] to-rose-400'
                          : 'bg-gradient-to-r from-[#247DA5] to-[#C9A45C]'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Customer Segment Distribution */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0E2A4E] to-[#071527] border border-[#C9A45C]/30 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#C9A45C]/20 pb-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#DFB76C] font-semibold">
                TARGET DEMOGRAPHICS
              </div>
              <h3 className="font-serif-luxury text-xl font-bold text-white mt-1">
                สัดส่วนกลุ่มลูกค้าเป้าหมาย (Customer Segments)
              </h3>
            </div>
            <PieChart className="w-5 h-5 text-[#C9A45C]" />
          </div>

          <div className="space-y-4">
            {CUSTOMER_SEGMENTS.map((seg) => (
              <div
                key={seg.id}
                className="p-4 rounded-2xl bg-[#071527]/60 border border-[#C9A45C]/15 hover:border-[#C9A45C]/40 transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#DFB76C]" />
                    <span className="font-bold text-white text-sm">{seg.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-num font-bold text-sm text-[#DFB76C]">{seg.sharePercent}%</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {seg.description}
                </p>

                <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-white/5">
                  <span>บริการยอดนิยม: <strong className="text-slate-200">{seg.preferredServices.join(', ')}</strong></span>
                  <span>ยอดใช้จ่ายเฉลี่ย: <strong className="text-[#DFB76C]">฿{seg.avgSpend.toLocaleString()}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
