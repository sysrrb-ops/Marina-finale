import React, { useState } from 'react';
import {
  Table,
  Plus,
  Download,
  Copy,
  Check,
  Search,
  Filter,
  Layers,
  DollarSign,
  TrendingUp,
  FileSpreadsheet,
} from 'lucide-react';
import {
  ServiceItem,
  Transaction,
  MONTHLY_METRICS,
  CUSTOMER_SEGMENTS,
} from '../data/marinaData';

interface DatabaseViewProps {
  services: ServiceItem[];
  transactions: Transaction[];
  onAddTransaction: (tx: Transaction) => void;
  lang: 'TH' | 'EN';
}

export const DatabaseView: React.FC<DatabaseViewProps> = ({
  services,
  transactions,
  onAddTransaction,
  lang,
}) => {
  const [activeSheet, setActiveSheet] = useState<1 | 2 | 3 | 4>(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [copied, setCopied] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Transaction Form State
  const [newTx, setNewTx] = useState<{
    customerName: string;
    segment: string;
    country: string;
    serviceId: string;
    bookingDate: string;
    passengers: number;
    specialRequests: string;
    channel: string;
  }>({
    customerName: '',
    segment: 'Global High-Net-Worth',
    country: 'Thailand',
    serviceId: services[0]?.id || 'MV-001',
    bookingDate: new Date().toISOString().split('T')[0],
    passengers: 4,
    specialRequests: 'ต้องการแชมเปญ Dom Pérignon และเชฟส่วนตัว',
    channel: 'Direct Website',
  });

  const handleCopyTable = () => {
    let tsv = '';
    if (activeSheet === 1) {
      tsv = ['ID', 'Service Name', 'Category', 'Price (THB)', 'Cost (THB)', 'Total Quota', 'Booked', 'Remaining', 'Revenue (THB)'].join('\t') + '\n';
      services.forEach((s) => {
        tsv += [s.id, s.name, s.category, s.price, s.cost, s.quotaTotal, s.quotaBooked, s.quotaRemaining, s.cumulativeRevenue].join('\t') + '\n';
      });
    } else if (activeSheet === 2) {
      tsv = ['Booking ID', 'Date', 'Customer Name', 'Segment', 'Country', 'Service ID', 'Service Name', 'Net Amount (THB)', 'Channel', 'Status'].join('\t') + '\n';
      transactions.forEach((t) => {
        tsv += [t.bookingId, t.date, t.customerName, t.segment, t.country, t.serviceId, t.serviceName, t.netAmount, t.channel, t.status].join('\t') + '\n';
      });
    } else if (activeSheet === 3) {
      tsv = ['Month', 'Revenue (Million THB)', 'Cost (Million THB)', 'Gross Profit (Million THB)'].join('\t') + '\n';
      MONTHLY_METRICS.forEach((m) => {
        tsv += [m.month, m.revenue, m.cost, m.grossProfit].join('\t') + '\n';
      });
    } else {
      tsv = ['Segment ID', 'Name', 'Share (%)', 'Avg Spend (THB)', 'Preferred Services', 'Description'].join('\t') + '\n';
      CUSTOMER_SEGMENTS.forEach((c) => {
        tsv += [c.id, c.name, c.sharePercent, c.avgSpend, c.preferredServices.join('; '), c.description].join('\t') + '\n';
      });
    }

    navigator.clipboard.writeText(tsv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportCSV = () => {
    let csv = '';
    let filename = `marina_valerielle_sheet_${activeSheet}.csv`;

    if (activeSheet === 1) {
      csv = 'ID,Service Name,Category,Price,Cost,Total Quota,Booked,Remaining,Cumulative Revenue\n';
      services.forEach((s) => {
        csv += `"${s.id}","${s.name}","${s.category}",${s.price},${s.cost},${s.quotaTotal},${s.quotaBooked},${s.quotaRemaining},${s.cumulativeRevenue}\n`;
      });
    } else if (activeSheet === 2) {
      csv = 'Booking ID,Date,Customer Name,Segment,Country,Service ID,Service Name,Net Amount,Channel,Status\n';
      transactions.forEach((t) => {
        csv += `"${t.bookingId}","${t.date}","${t.customerName}","${t.segment}","${t.country}","${t.serviceId}","${t.serviceName}",${t.netAmount},"${t.channel}","${t.status}"\n`;
      });
    } else if (activeSheet === 3) {
      csv = 'Month,Revenue Million,Cost Million,Gross Profit Million\n';
      MONTHLY_METRICS.forEach((m) => {
        csv += `"${m.month}",${m.revenue},${m.cost},${m.grossProfit}\n`;
      });
    } else {
      csv = 'Segment ID,Name,Share Percent,Avg Spend,Preferred Services,Description\n';
      CUSTOMER_SEGMENTS.forEach((c) => {
        csv += `"${c.id}","${c.name}",${c.sharePercent},${c.avgSpend},"${c.preferredServices.join('; ')}","${c.description}"\n`;
      });
    }

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const svc = services.find((s) => s.id === newTx.serviceId) || services[0];
    const generatedId = `BK-2026-${Math.floor(100 + Math.random() * 900)}`;

    const created: Transaction = {
      bookingId: generatedId,
      date: newTx.bookingDate,
      customerName: newTx.customerName || 'Anonymous VIP',
      segment: newTx.segment,
      country: newTx.country,
      serviceId: svc.id,
      serviceName: svc.name,
      quantity: 1,
      unitPrice: svc.price,
      discount: 0,
      netAmount: svc.price,
      cost: svc.cost,
      channel: newTx.channel,
      status: 'Confirmed',
    };

    onAddTransaction(created);
    setShowAddModal(false);
    setNewTx({
      customerName: '',
      segment: 'Global High-Net-Worth',
      country: 'Thailand',
      serviceId: services[0]?.id || 'MV-001',
      bookingDate: new Date().toISOString().split('T')[0],
      passengers: 4,
      specialRequests: '',
      channel: 'Direct Website',
    });
  };

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.bookingId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#C9A45C]/30 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-display-luxury text-[#DFB76C] tracking-[0.2em] uppercase mb-1">
            <FileSpreadsheet className="w-4 h-4 text-[#C9A45C]" />
            <span>BUSINESS DATABASE (GOOGLE SHEETS COMPATIBLE STRUCTURE)</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
            ฐานข้อมูลธุรกิจแบบ 4 ชีตเชื่อมโยง
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-light">
            โครงสร้างตารางข้อมูลมาตรฐานสำหรับวิเคราะห์ผลดำเนินงาน รองรับการคัดลอกลง Google Sheets / Excel และ Export CSV
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyTable}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#C9A45C]/40 text-xs text-[#DFB76C] bg-[#071527] hover:bg-[#C9A45C]/20 transition-all font-semibold shadow-md"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#C9A45C]" />}
            <span>{copied ? 'คัดลอกข้อมูลแล้ว!' : 'คัดลอกข้อมูลชีตนี้'}</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#C9A45C]/40 text-xs text-[#DFB76C] bg-[#071527] hover:bg-[#C9A45C]/20 transition-all font-semibold shadow-md"
          >
            <Download className="w-4 h-4 text-[#C9A45C]" />
            <span>ดาวน์โหลด CSV</span>
          </button>

          {activeSheet === 2 && (
            <button
              onClick={() => setShowAddModal(true)}
              className="gold-btn flex items-center gap-1.5 px-4 py-2 rounded-full text-xs uppercase tracking-wider font-bold shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>เพิ่มบันทึกการจอง</span>
            </button>
          )}
        </div>
      </div>

      {/* 4-Sheet Tab Selector */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#C9A45C]/20 pb-2">
        <button
          onClick={() => setActiveSheet(1)}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeSheet === 1
              ? 'bg-[#C9A45C] text-[#071527] shadow-lg shadow-[#C9A45C]/20'
              : 'bg-[#0E2A4E]/60 text-slate-300 border border-[#C9A45C]/20 hover:bg-[#C9A45C]/15 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Sheet 1: รายการบริการ & สินค้าคงเหลือ ({services.length})</span>
        </button>

        <button
          onClick={() => setActiveSheet(2)}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeSheet === 2
              ? 'bg-[#C9A45C] text-[#071527] shadow-lg shadow-[#C9A45C]/20'
              : 'bg-[#0E2A4E]/60 text-slate-300 border border-[#C9A45C]/20 hover:bg-[#C9A45C]/15 hover:text-white'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Sheet 2: บันทึกธุรกรรมและการจอง ({transactions.length})</span>
        </button>

        <button
          onClick={() => setActiveSheet(3)}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeSheet === 3
              ? 'bg-[#C9A45C] text-[#071527] shadow-lg shadow-[#C9A45C]/20'
              : 'bg-[#0E2A4E]/60 text-slate-300 border border-[#C9A45C]/20 hover:bg-[#C9A45C]/15 hover:text-white'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Sheet 3: สรุปผลดำเนินงานรายเดือน ({MONTHLY_METRICS.length})</span>
        </button>

        <button
          onClick={() => setActiveSheet(4)}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeSheet === 4
              ? 'bg-[#C9A45C] text-[#071527] shadow-lg shadow-[#C9A45C]/20'
              : 'bg-[#0E2A4E]/60 text-slate-300 border border-[#C9A45C]/20 hover:bg-[#C9A45C]/15 hover:text-white'
          }`}
        >
          <Table className="w-4 h-4" />
          <span>Sheet 4: กลุ่มลูกค้าเป้าหมาย ({CUSTOMER_SEGMENTS.length})</span>
        </button>
      </div>

      {/* SHEET 1: SERVICES & INVENTORY */}
      {activeSheet === 1 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span>ตารางข้อมูลรายการเรือยอร์ช แพ็กเกจเกาะส่วนตัว ราคา ต้นทุน และโควตารอบเปิดขาย</span>
            <span className="font-mono text-[#DFB76C]">Active Services: {services.length} items</span>
          </div>

          <div className="luxury-card rounded-2xl overflow-hidden border border-[#C9A45C]/30 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#071527] text-[#DFB76C] font-semibold border-b border-[#C9A45C]/30 uppercase tracking-wider">
                  <tr>
                    <th className="p-4">รหัส</th>
                    <th className="p-4">ชื่อบริการ / ทริป</th>
                    <th className="p-4">หมวดหมู่</th>
                    <th className="p-4 text-right">ราคาขาย (฿)</th>
                    <th className="p-4 text-right">ต้นทุนต่อทริป (฿)</th>
                    <th className="p-4 text-center">โควตา</th>
                    <th className="p-4 text-center">จองแล้ว</th>
                    <th className="p-4 text-center">คงเหลือ</th>
                    <th className="p-4 text-right">รายได้สะสม (฿)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C9A45C]/15 text-slate-200">
                  {services.map((item) => (
                    <tr key={item.id} className="hover:bg-[#0E2A4E]/60 transition-colors">
                      <td className="p-4 font-mono text-[#DFB76C] font-semibold">{item.id}</td>
                      <td className="p-4 font-medium text-white max-w-xs">{item.name}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] bg-[#071527] border border-[#C9A45C]/30 text-slate-300">
                          {item.category}
                        </span>
                      </td>
                      <td className="p-4 text-right font-num font-bold text-[#DFB76C]">
                        {item.price.toLocaleString()}
                      </td>
                      <td className="p-4 text-right font-num text-slate-300">
                        {item.cost.toLocaleString()}
                      </td>
                      <td className="p-4 text-center font-num text-slate-300">{item.quotaTotal}</td>
                      <td className="p-4 text-center font-num font-bold text-white">{item.quotaBooked}</td>
                      <td className="p-4 text-center font-num">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            item.quotaRemaining <= 2
                              ? 'bg-rose-950 text-rose-300 border border-rose-800'
                              : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          }`}
                        >
                          {item.quotaRemaining}
                        </span>
                      </td>
                      <td className="p-4 text-right font-num font-bold text-emerald-400">
                        {item.cumulativeRevenue.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SHEET 2: TRANSACTIONS & BOOKINGS */}
      {activeSheet === 2 && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ค้นหาชื่อลูกค้า, รหัสจอง หรือบริการ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#071527] border border-[#C9A45C]/30 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C9A45C]"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Filter className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>สถานะ:</span>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-[#071527] border border-[#C9A45C]/30 text-xs text-white focus:outline-none"
              >
                <option value="All">ทั้งหมด (All)</option>
                <option value="Confirmed">Confirmed (ยืนยันแล้ว)</option>
                <option value="Completed">Completed (เสร็จสิ้น)</option>
                <option value="In Escrow">In Escrow (ในเอสโครว์)</option>
              </select>
            </div>
          </div>

          <div className="luxury-card rounded-2xl overflow-hidden border border-[#C9A45C]/30 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#071527] text-[#DFB76C] font-semibold border-b border-[#C9A45C]/30 uppercase tracking-wider">
                  <tr>
                    <th className="p-4">รหัสการจอง</th>
                    <th className="p-4">วันที่ทำรายการ</th>
                    <th className="p-4">ชื่อลูกค้า</th>
                    <th className="p-4">กลุ่มลูกค้า</th>
                    <th className="p-4">ประเทศ</th>
                    <th className="p-4">บริการ</th>
                    <th className="p-4 text-right">ยอดเงินสุทธิ (฿)</th>
                    <th className="p-4">ช่องทางจอง</th>
                    <th className="p-4 text-center">สถานะ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C9A45C]/15 text-slate-200">
                  {filteredTransactions.map((tx) => (
                    <tr key={tx.bookingId} className="hover:bg-[#0E2A4E]/60 transition-colors">
                      <td className="p-4 font-mono text-[#DFB76C] font-semibold whitespace-nowrap">
                        {tx.bookingId}
                      </td>
                      <td className="p-4 whitespace-nowrap text-slate-300">{tx.date}</td>
                      <td className="p-4 font-medium text-white whitespace-nowrap">{tx.customerName}</td>
                      <td className="p-4 whitespace-nowrap text-slate-300">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#071527] border border-[#C9A45C]/20">
                          {tx.segment}
                        </span>
                      </td>
                      <td className="p-4 whitespace-nowrap text-slate-300">{tx.country}</td>
                      <td className="p-4 max-w-xs truncate text-white">{tx.serviceName}</td>
                      <td className="p-4 text-right font-num font-bold text-emerald-400 whitespace-nowrap">
                        ฿{tx.netAmount.toLocaleString()}
                      </td>
                      <td className="p-4 text-slate-400 whitespace-nowrap">{tx.channel}</td>
                      <td className="p-4 text-center whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            tx.status === 'Confirmed' || tx.status === 'Completed'
                              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600/40'
                              : 'bg-amber-950/80 text-amber-300 border-amber-600/40'
                          }`}
                        >
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SHEET 3: MONTHLY PERFORMANCE */}
      {activeSheet === 3 && (
        <div className="space-y-4">
          <div className="text-xs text-slate-300">
            สรุปข้อมูลทางการเงินรายเดือน (ม.ค. - ก.ย. 2026): รายได้ ต้นทุน และกำไรสุทธิ (Gross Profit)
          </div>

          <div className="luxury-card rounded-2xl overflow-hidden border border-[#C9A45C]/30 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#071527] text-[#DFB76C] font-semibold border-b border-[#C9A45C]/30 uppercase tracking-wider">
                  <tr>
                    <th className="p-4">เดือน</th>
                    <th className="p-4 text-right">รายได้รวม (Revenue ล้านบาท)</th>
                    <th className="p-4 text-right">ต้นทุนบริการ (Cost ล้านบาท)</th>
                    <th className="p-4 text-right">กำไรสุทธิ (Gross Profit ล้านบาท)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C9A45C]/15 text-slate-200">
                  {MONTHLY_METRICS.map((row) => (
                    <tr key={row.month} className="hover:bg-[#0E2A4E]/60 transition-colors">
                      <td className="p-4 font-bold text-white">{row.month} ({row.monthTh})</td>
                      <td className="p-4 text-right font-num font-bold text-[#DFB76C]">
                        ฿{row.revenue}M
                      </td>
                      <td className="p-4 text-right font-num text-slate-300">
                        ฿{row.cost}M
                      </td>
                      <td className="p-4 text-right font-num font-bold text-emerald-400">
                        ฿{row.grossProfit}M
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-[#071527] font-bold text-white border-t-2 border-[#C9A45C]">
                    <td className="p-4">รวมสะสม 9 เดือน</td>
                    <td className="p-4 text-right font-num text-[#DFB76C]">฿14.95M</td>
                    <td className="p-4 text-right font-num text-slate-300">฿9.207M</td>
                    <td className="p-4 text-right font-num text-emerald-400">฿5.743M</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SHEET 4: CUSTOMER SEGMENTS */}
      {activeSheet === 4 && (
        <div className="space-y-4">
          <div className="text-xs text-slate-300">
            การจำแนกพฤติกรรม สัดส่วนรายได้ และบริการยอดนิยมของกลุ่มลูกค้าเป้าหมาย 5 กลุ่มหลัก
          </div>

          <div className="luxury-card rounded-2xl overflow-hidden border border-[#C9A45C]/30 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#071527] text-[#DFB76C] font-semibold border-b border-[#C9A45C]/30 uppercase tracking-wider">
                  <tr>
                    <th className="p-4">กลุ่มลูกค้าเป้าหมาย</th>
                    <th className="p-4 text-center">สัดส่วนยอดขาย</th>
                    <th className="p-4 text-right">ยอดใช้จ่ายเฉลี่ย / ทริป</th>
                    <th className="p-4">บริการยอดนิยม</th>
                    <th className="p-4">พฤติกรรมและความต้องการเฉพาะ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C9A45C]/15 text-slate-200">
                  {CUSTOMER_SEGMENTS.map((c) => (
                    <tr key={c.id} className="hover:bg-[#0E2A4E]/60 transition-colors">
                      <td className="p-4 font-bold text-white whitespace-nowrap">{c.name}</td>
                      <td className="p-4 text-center font-num font-bold text-[#DFB76C]">{c.sharePercent}%</td>
                      <td className="p-4 text-right font-num text-white">฿{c.avgSpend.toLocaleString()}</td>
                      <td className="p-4 text-[#DFB76C]">{c.preferredServices.join(', ')}</td>
                      <td className="p-4 text-slate-300 leading-relaxed max-w-sm">{c.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ADD TRANSACTION MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#0E2A4E] rounded-3xl border border-[#C9A45C] p-6 sm:p-8 text-white shadow-2xl space-y-5">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 text-xs text-[#DFB76C] uppercase font-bold tracking-wider">
              <Plus className="w-4 h-4" />
              <span>เพิ่มบันทึกการจองใหม่ (New Manual Booking Entry)</span>
            </div>

            <form onSubmit={handleCreateTransaction} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">ชื่อลูกค้า / ตัวแทนองค์กร</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น Khun Thanavat S., Barclays Asia"
                  value={newTx.customerName}
                  onChange={(e) => setNewTx({ ...newTx, customerName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#071527] border border-[#C9A45C]/40 text-white focus:outline-none focus:border-[#C9A45C]"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">เลือกบริการ / แพ็กเกจ</label>
                <select
                  value={newTx.serviceId}
                  onChange={(e) => setNewTx({ ...newTx, serviceId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#071527] border border-[#C9A45C]/40 text-white focus:outline-none focus:border-[#C9A45C]"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.id} — {s.name} (฿{s.price.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">กลุ่มลูกค้า</label>
                  <select
                    value={newTx.segment}
                    onChange={(e) => setNewTx({ ...newTx, segment: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#071527] border border-[#C9A45C]/40 text-white focus:outline-none"
                  >
                    {CUSTOMER_SEGMENTS.map((seg) => (
                      <option key={seg.id} value={seg.name}>
                        {seg.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">วันที่เดินทาง</label>
                  <input
                    type="date"
                    required
                    value={newTx.bookingDate}
                    onChange={(e) => setNewTx({ ...newTx, bookingDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#071527] border border-[#C9A45C]/40 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">ประเทศ</label>
                  <input
                    type="text"
                    value={newTx.country}
                    onChange={(e) => setNewTx({ ...newTx, country: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#071527] border border-[#C9A45C]/40 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">ช่องทางการจอง</label>
                  <select
                    value={newTx.channel}
                    onChange={(e) => setNewTx({ ...newTx, channel: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#071527] border border-[#C9A45C]/40 text-white focus:outline-none"
                  >
                    <option value="Direct Website">Direct Website</option>
                    <option value="Private Concierge">Private Concierge</option>
                    <option value="Luxury Travel Agency">Luxury Travel Agency</option>
                    <option value="Corporate Referral">Corporate Referral</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-full border border-slate-600 text-slate-300 hover:text-white"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="gold-btn px-6 py-2 rounded-full font-bold uppercase tracking-wider"
                >
                  บันทึกข้อมูล
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
