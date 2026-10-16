import React from 'react';
import { Anchor, Compass, Database, BarChart3, FileText, CalendarCheck, Download, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: 'website' | 'database' | 'dashboard' | 'report';
  setActiveTab: (tab: 'website' | 'database' | 'dashboard' | 'report') => void;
  onOpenBooking: () => void;
  lang: 'TH' | 'EN';
  setLang: (lang: 'TH' | 'EN') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenBooking,
  lang,
  setLang,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#0B1F3A]/95 backdrop-blur-md border-b border-[#C9A45C]/30 shadow-lg shadow-[#071527]/50 transition-all">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-[#071527] via-[#0E2A4E] to-[#071527] py-1.5 px-4 text-xs text-center border-b border-[#C9A45C]/20 text-[#DFB76C] flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#C9A45C] animate-pulse" />
        <span className="font-medium">
          {lang === 'TH'
            ? 'MARINA VALÉRIELLE — การเดินทางส่วนตัวระดับ Ultra-Luxury บนเรือยอร์ชและเกาะส่วนตัว'
            : 'MARINA VALÉRIELLE — Ultra-Luxury Private Yacht Charters & Exclusive Island Escapes'}
        </span>
        <span className="hidden md:inline text-[#C9A45C]/50">|</span>
        <span className="hidden md:inline text-slate-300">
          {lang === 'TH' ? 'ระบบจำลองธุรกิจและฐานข้อมูลพร้อม Dashboard 2026' : 'Business Simulation & Integrated Executive Dashboard'}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div
            onClick={() => setActiveTab('website')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-full border border-[#C9A45C] bg-[#071527] flex items-center justify-center shadow-lg shadow-[#071527] group-hover:scale-105 transition-transform">
              <Anchor className="w-5 h-5 text-[#DFB76C]" />
            </div>
            <div>
              <div className="font-display-luxury text-lg sm:text-xl font-bold tracking-[0.2em] text-white flex items-center gap-1.5">
                MARINA <span className="gold-gradient-text">VALÉRIELLE</span>
              </div>
              <div className="text-[9px] uppercase tracking-[0.28em] text-[#C9A45C] font-semibold">
                Private Yachts · Private Islands
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1 p-1 bg-[#071527]/90 border border-[#C9A45C]/30 rounded-full shadow-inner">
            <button
              onClick={() => setActiveTab('website')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                activeTab === 'website'
                  ? 'bg-gradient-to-r from-[#247DA5] to-[#1A5C7A] text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{lang === 'TH' ? 'หน้าหลักเว็บไซต์' : 'The Experience'}</span>
            </button>

            <button
              onClick={() => setActiveTab('database')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                activeTab === 'database'
                  ? 'bg-gradient-to-r from-[#C9A45C] to-[#A38038] text-[#071527] font-bold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>{lang === 'TH' ? 'ฐานข้อมูล (Sheets)' : 'Database'}</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-[#247DA5] to-[#1A5C7A] text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>{lang === 'TH' ? 'Dashboard การเงิน' : 'Dashboard'}</span>
            </button>

            <button
              onClick={() => setActiveTab('report')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                activeTab === 'report'
                  ? 'bg-gradient-to-r from-[#C9A45C] to-[#A38038] text-[#071527] font-bold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{lang === 'TH' ? 'รายงานธุรกิจ' : 'Report'}</span>
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'TH' ? 'EN' : 'TH')}
              className="px-2.5 py-1.5 rounded-full border border-[#C9A45C]/40 text-xs font-bold text-[#DFB76C] bg-[#071527] hover:bg-[#C9A45C]/15 transition-colors shadow-sm"
              title="Toggle Language"
            >
              {lang}
            </button>

            {/* Download Zip */}
            <a
              href="/marina_valerielle.zip"
              download="marina_valerielle.zip"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#C9A45C]/40 text-xs text-[#DFB76C] bg-[#071527] hover:bg-[#C9A45C]/15 transition-all font-semibold shadow-sm"
              title="ดาวน์โหลดไฟล์โค้ดโปรเจกต์ ZIP"
            >
              <Download className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>ZIP</span>
            </a>

            {/* Book Escape CTA */}
            <button
              onClick={onOpenBooking}
              className="gold-btn px-4 sm:px-5 py-2.5 rounded-full text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg"
            >
              <CalendarCheck className="w-3.5 h-3.5 text-[#071527]" />
              <span>{lang === 'TH' ? 'จองการเดินทาง' : 'Book Escape'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="lg:hidden flex items-center justify-around py-2.5 border-t border-[#C9A45C]/20 text-[11px] overflow-x-auto gap-2 bg-[#071527]">
          <button
            onClick={() => setActiveTab('website')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap font-semibold ${
              activeTab === 'website' ? 'bg-[#247DA5] text-white' : 'text-slate-300'
            }`}
          >
            หน้าหลัก
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap font-semibold ${
              activeTab === 'database' ? 'bg-[#C9A45C] text-[#071527]' : 'text-slate-300'
            }`}
          >
            ฐานข้อมูล
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap font-semibold ${
              activeTab === 'dashboard' ? 'bg-[#247DA5] text-white' : 'text-slate-300'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap font-semibold ${
              activeTab === 'report' ? 'bg-[#C9A45C] text-[#071527]' : 'text-slate-300'
            }`}
          >
            รายงาน
          </button>
        </div>
      </div>
    </header>
  );
};
