import React, { useState } from 'react';
import {
  Calendar,
  Users,
  CheckCircle2,
  Sparkles,
  Anchor,
  Clock,
} from 'lucide-react';
import { ServiceItem, Transaction } from '../data/marinaData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: ServiceItem[];
  preSelectedService: ServiceItem | null;
  onBookingConfirmed: (tx: Transaction, serviceId: string) => void;
  lang: 'TH' | 'EN';
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  services,
  preSelectedService,
  onBookingConfirmed,
  lang,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preSelectedService?.id || services[0]?.id || 'MV-001'
  );

  React.useEffect(() => {
    if (preSelectedService) {
      setSelectedServiceId(preSelectedService.id);
    }
  }, [preSelectedService]);

  const [customerName, setCustomerName] = useState('');
  const [bookingDate, setBookingDate] = useState(
    new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0]
  );
  const [passengers, setPassengers] = useState(4);
  const [customerSegment, setCustomerSegment] = useState('นักท่องเที่ยวระดับพรีเมียม (HNWI)');
  const [specialRequests, setSpecialRequests] = useState('ต้องการแชมเปญ Dom Pérignon และบริการถ่ายภาพ');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card (Black Card)');

  const [addOns, setAddOns] = useState<{ [key: string]: boolean }>({
    michelinChef: true,
    heliTransfer: false,
    sommelierPairing: true,
    droneCinematography: false,
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [createdBookingId, setCreatedBookingId] = useState('');

  if (!isOpen) return null;

  const currentService = services.find((s) => s.id === selectedServiceId) || services[0];

  const addOnPrices: { [key: string]: number } = {
    michelinChef: 35000,
    heliTransfer: 65000,
    sommelierPairing: 25000,
    droneCinematography: 20000,
  };

  const calculatedAddOnsTotal = Object.entries(addOns).reduce(
    (acc, [key, active]) => (active ? acc + (addOnPrices[key] || 0) : acc),
    0
  );

  const grandTotal = currentService.price + calculatedAddOnsTotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `BK-2026-${Math.floor(100 + Math.random() * 900)}`;

    const newTx: Transaction = {
      bookingId: generatedId,
      date: bookingDate,
      customerName: customerName || 'VIP Guest',
      country: 'Thailand',
      segment: customerSegment,
      serviceId: currentService.id,
      serviceName: currentService.name,
      quantity: 1,
      unitPrice: currentService.price,
      discount: 0,
      netAmount: grandTotal,
      cost: currentService.cost,
      status: 'Confirmed',
      channel: 'Direct Website',
    };

    onBookingConfirmed(newTx, currentService.id);
    setCreatedBookingId(generatedId);
    setIsSuccess(true);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#0E2A4E] to-[#071527] rounded-3xl border border-[#C9A45C]/50 p-6 sm:p-8 text-white shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white text-lg w-8 h-8 rounded-full bg-[#071527] flex items-center justify-center border border-[#C9A45C]/30 transition-colors"
        >
          ✕
        </button>

        {!isSuccess ? (
          <div>
            {/* Modal Header */}
            <div className="border-b border-[#C9A45C]/25 pb-5 mb-6">
              <div className="flex items-center gap-2 text-xs font-display-luxury text-[#DFB76C] tracking-[0.2em] uppercase font-bold mb-1">
                <Sparkles className="w-4 h-4 text-[#C9A45C]" />
                <span>BESPOKE RESERVATIONS & CHARTER DESK</span>
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
                สำรองการเดินทางส่วนตัวระดับ Ultra-Luxury
              </h2>
              <p className="text-xs text-slate-300 mt-1 font-light">
                ระบบจะทำการตัดยอดโควตารอบคงเหลือ และเพิ่มรายการบันทึกลงในฐานข้อมูล (Sheets) และ Dashboard โดยอัตโนมัติ
              </p>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              {/* Step 1: Select Service */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  1. เลือกเรือยอร์ชหรือแพ็กเกจเกาะส่วนตัว
                </label>
                <select
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#071527] border border-[#C9A45C]/40 text-white font-medium focus:outline-none focus:border-[#C9A45C]"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.id} — {s.name} (฿{s.price.toLocaleString()} | เหลือ {s.quotaRemaining} รอบ)
                    </option>
                  ))}
                </select>

                {/* Selected Service Quick Info */}
                <div className="mt-2.5 p-3 rounded-xl bg-[#071527]/70 border border-[#C9A45C]/20 flex items-center justify-between text-[11px] text-slate-300">
                  <div className="flex items-center gap-2">
                    <Anchor className="w-3.5 h-3.5 text-[#DFB76C]" />
                    <span>ความจุ: <strong className="text-white">{currentService.specs.capacity}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#DFB76C]" />
                    <span>ระยะเวลา: <strong className="text-white">{currentService.specs.duration}</strong></span>
                  </div>
                  <div className="text-emerald-400 font-semibold">
                    โควตาคงเหลือ: {currentService.quotaRemaining} รอบ
                  </div>
                </div>
              </div>

              {/* Step 2: Passenger & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">
                    2. วันที่ต้องการเดินทาง
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#071527] border border-[#C9A45C]/40 text-white focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">
                    3. จำนวนผู้โดยสาร
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="number"
                      min="1"
                      max="30"
                      required
                      value={passengers}
                      onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#071527] border border-[#C9A45C]/40 text-white focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Guest Profile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">
                    4. ชื่อ-นามสกุล / องค์กรผู้ติดต่อ
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น คุณกฤษดา และครอบครัว หรือ Apex Capital"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#071527] border border-[#C9A45C]/40 text-white placeholder-slate-500 focus:outline-none focus:border-[#C9A45C]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">
                    5. กลุ่มลูกค้าเป้าหมาย
                  </label>
                  <select
                    value={customerSegment}
                    onChange={(e) => setCustomerSegment(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#071527] border border-[#C9A45C]/40 text-white focus:outline-none focus:border-[#C9A45C]"
                  >
                    <option value="Global High-Net-Worth">นักท่องเที่ยวระดับพรีเมียม (HNWI)</option>
                    <option value="Couples & Honeymooners">คู่รักและคู่ฮันนีมูน (Honeymoon & Romantic)</option>
                    <option value="Families & Private Groups">ครอบครัวและกลุ่มเพื่อน VIP</option>
                    <option value="Corporate & Business Executives">องค์กรและนักธุรกิจ (Corporate / Executive)</option>
                    <option value="Royal & VIP Custom Concierge">ลูกค้าบุคคลพิเศษ (Celebrity / Royal / UHNWI)</option>
                  </select>
                </div>
              </div>

              {/* Step 4: Add-On Services */}
              <div>
                <label className="block text-slate-300 font-semibold mb-2">
                  6. บริการเสริมพิเศษ (Exclusive Bespoke Add-ons)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <label
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      addOns.michelinChef
                        ? 'bg-[#C9A45C]/20 border-[#C9A45C] text-[#DFB76C]'
                        : 'bg-[#071527] border-[#C9A45C]/20 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={addOns.michelinChef}
                        onChange={(e) => setAddOns({ ...addOns, michelinChef: e.target.checked })}
                        className="rounded border-slate-600 accent-[#C9A45C]"
                      />
                      <span>เชฟมิชลิน 1 ดาวประจำเรือ</span>
                    </div>
                    <span className="font-num font-bold">+฿35,000</span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      addOns.heliTransfer
                        ? 'bg-[#C9A45C]/20 border-[#C9A45C] text-[#DFB76C]'
                        : 'bg-[#071527] border-[#C9A45C]/20 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={addOns.heliTransfer}
                        onChange={(e) => setAddOns({ ...addOns, heliTransfer: e.target.checked })}
                        className="rounded border-slate-600 accent-[#C9A45C]"
                      />
                      <span>รับส่งเฮลิคอปเตอร์สู่เกาะ</span>
                    </div>
                    <span className="font-num font-bold">+฿65,000</span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      addOns.sommelierPairing
                        ? 'bg-[#C9A45C]/20 border-[#C9A45C] text-[#DFB76C]'
                        : 'bg-[#071527] border-[#C9A45C]/20 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={addOns.sommelierPairing}
                        onChange={(e) => setAddOns({ ...addOns, sommelierPairing: e.target.checked })}
                        className="rounded border-slate-600 accent-[#C9A45C]"
                      />
                      <span>ซอมเมอลิเยร์ & ไวน์วินเทจ</span>
                    </div>
                    <span className="font-num font-bold">+฿25,000</span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      addOns.droneCinematography
                        ? 'bg-[#C9A45C]/20 border-[#C9A45C] text-[#DFB76C]'
                        : 'bg-[#071527] border-[#C9A45C]/20 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={addOns.droneCinematography}
                        onChange={(e) => setAddOns({ ...addOns, droneCinematography: e.target.checked })}
                        className="rounded border-slate-600 accent-[#C9A45C]"
                      />
                      <span>ช่างภาพโดรน & วิดีโอ 4K</span>
                    </div>
                    <span className="font-num font-bold">+฿20,000</span>
                  </label>
                </div>
              </div>

              {/* Step 5: Payment method */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">
                    7. ช่องทางชำระเงิน
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#071527] border border-[#C9A45C]/40 text-white focus:outline-none focus:border-[#C9A45C]"
                  >
                    <option value="Credit Card (Black Card)">Credit Card (Centurion / Black)</option>
                    <option value="Wire Transfer (SWIFT)">Wire Transfer (SWIFT)</option>
                    <option value="Cryptocurrency (USDT/BTC)">Crypto (USDT / BTC)</option>
                    <option value="Escrow Account">Escrow Account</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">
                    8. คำขอพิเศษเพิ่มเติม (Special Requests)
                  </label>
                  <input
                    type="text"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="ข้อจำกัดทางอาหาร, การตกแต่งดอกไม้ ฯลฯ"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#071527] border border-[#C9A45C]/40 text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Total Calculation & Confirm CTA */}
              <div className="pt-4 border-t border-[#C9A45C]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] text-slate-400 uppercase">ยอดรวมสุทธิ (Net Total)</div>
                  <div className="text-3xl font-num font-bold text-[#DFB76C]">
                    ฿{grandTotal.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    รวมภาษีมูลค่าเพิ่ม, ค่าลูกเรือ, และประกันภัยทางทะเล
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={currentService.quotaRemaining === 0}
                  className={`gold-btn px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-bold flex items-center gap-2 shadow-xl ${
                    currentService.quotaRemaining === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-[#071527]" />
                  <span>ยืนยันการจองรอบนี้</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Success View */
          <div className="py-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-500/80 flex items-center justify-center mx-auto text-emerald-400 shadow-xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="text-xs font-display-luxury text-[#DFB76C] uppercase tracking-widest font-bold">
                RESERVATION CONFIRMED
              </div>
              <h3 className="font-serif-luxury text-3xl font-bold text-white">
                การจองเสร็จสมบูรณ์เรียบร้อยแล้ว
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto font-light">
                ระบบได้บันทึกธุรกรรมลงในชีตฐานข้อมูล และปรับปรุงยอดสถิติบน Dashboard เรียบร้อยแล้ว
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#071527] border border-[#C9A45C]/30 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-[#C9A45C]/15 pb-1.5">
                <span className="text-slate-400">รหัสการจอง (Booking ID):</span>
                <span className="font-mono font-bold text-[#DFB76C]">{createdBookingId}</span>
              </div>
              <div className="flex justify-between border-b border-[#C9A45C]/15 pb-1.5">
                <span className="text-slate-400">บริการ:</span>
                <span className="font-semibold text-white">{currentService.name}</span>
              </div>
              <div className="flex justify-between border-b border-[#C9A45C]/15 pb-1.5">
                <span className="text-slate-400">ผู้จอง:</span>
                <span className="font-semibold text-white">{customerName || 'VIP Guest'}</span>
              </div>
              <div className="flex justify-between border-b border-[#C9A45C]/15 pb-1.5">
                <span className="text-slate-400">วันที่เดินทาง:</span>
                <span className="text-white">{bookingDate}</span>
              </div>
              <div className="flex justify-between pt-1 text-sm">
                <span className="text-slate-300 font-bold">ยอดเงินสุทธิ:</span>
                <span className="font-num font-bold text-[#DFB76C]">
                  ฿{grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-center gap-4">
              <button
                onClick={handleResetAndClose}
                className="gold-btn px-8 py-3 rounded-full text-xs uppercase tracking-wider font-bold shadow-lg"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
