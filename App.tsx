/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { WebsiteView } from './components/WebsiteView';
import { DatabaseView } from './components/DatabaseView';
import { DashboardView } from './components/DashboardView';
import { ReportView } from './components/ReportView';
import { BookingModal } from './components/BookingModal';
import {
  INITIAL_SERVICES,
  INITIAL_TRANSACTIONS,
  ServiceItem,
  Transaction,
} from './data/marinaData';
import { Anchor, Download, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'website' | 'database' | 'dashboard' | 'report'>('website');
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [preSelectedService, setPreSelectedService] = useState<ServiceItem | null>(null);
  const [lang, setLang] = useState<'TH' | 'EN'>('TH');

  const handleOpenBooking = (service?: ServiceItem) => {
    setPreSelectedService(service || null);
    setIsBookingOpen(true);
  };

  const handleBookingConfirmed = (newTx: Transaction, serviceId: string) => {
    // 1. Add to transactions database
    setTransactions((prev) => [newTx, ...prev]);

    // 2. Decrement remaining quota & update booked/cumulative
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === serviceId) {
          const newRemaining = Math.max(0, s.quotaRemaining - 1);
          const newBooked = s.quotaBooked + 1;
          const newCumulative = s.cumulativeRevenue + newTx.netAmount;
          return {
            ...s,
            quotaRemaining: newRemaining,
            quotaBooked: newBooked,
            cumulativeRevenue: newCumulative,
          };
        }
        return s;
      })
    );
  };

  const handleAddTransaction = (tx: Transaction) => {
    setTransactions((prev) => [tx, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#0B1F3A] text-white flex flex-col font-sans selection:bg-[#C9A45C] selection:text-[#0B1F3A]">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBooking={() => handleOpenBooking()}
        lang={lang}
        setLang={setLang}
      />

      {/* Main Content Area Based on Active Tab */}
      <main className="flex-1">
        {activeTab === 'website' && (
          <WebsiteView
            services={services}
            onSelectServiceToBook={(s) => handleOpenBooking(s)}
            onOpenBooking={() => handleOpenBooking()}
            lang={lang}
          />
        )}

        {activeTab === 'database' && (
          <DatabaseView
            services={services}
            transactions={transactions}
            onAddTransaction={handleAddTransaction}
            lang={lang}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView services={services} lang={lang} />
        )}

        {activeTab === 'report' && <ReportView />}
      </main>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        services={services}
        preSelectedService={preSelectedService}
        onBookingConfirmed={handleBookingConfirmed}
        lang={lang}
      />

      {/* Luxury Nautical Footer */}
      <footer className="bg-gradient-to-b from-[#0B1F3A] via-[#071527] to-[#040D18] border-t border-[#C9A45C]/30 text-xs text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full border border-[#C9A45C] bg-[#071527] flex items-center justify-center shadow-lg shadow-[#071527]">
                <Anchor className="w-5 h-5 text-[#DFB76C]" />
              </div>
              <div>
                <div className="font-display-luxury text-base font-bold tracking-[0.2em] text-white">
                  MARINA <span className="gold-gradient-text">VALÉRIELLE</span>
                </div>
                <div className="text-[10px] text-[#C9A45C] font-semibold tracking-wider">
                  Beyond the Blue. Beyond the Ordinary.
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-medium">
              <button
                onClick={() => setActiveTab('website')}
                className="hover:text-[#DFB76C] transition-colors"
              >
                หน้าหลัก
              </button>
              <button
                onClick={() => setActiveTab('database')}
                className="hover:text-[#DFB76C] transition-colors"
              >
                ฐานข้อมูล (Google Sheets)
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className="hover:text-[#DFB76C] transition-colors"
              >
                Dashboard รายได้ ฿14.95M
              </button>
              <button
                onClick={() => setActiveTab('report')}
                className="hover:text-[#DFB76C] transition-colors"
              >
                รายงานธุรกิจฉบับเต็ม
              </button>
              <a
                href="/marina_valerielle.zip"
                download="marina_valerielle.zip"
                className="text-[#DFB76C] hover:text-white hover:underline flex items-center gap-1.5 font-semibold bg-[#071527] px-3.5 py-1.5 rounded-full border border-[#C9A45C]/40 shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>ดาวน์โหลด ZIP โค้ด</span>
              </a>
            </div>
          </div>

          <div className="border-t border-[#C9A45C]/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
            <div>
              © 2026 Marina Valérielle International Luxury S.A. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>ข้อมูลและราคาเป็นตัวเลขจำลองธุรกิจ (Simulation)</span>
              <span>·</span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>มาตรฐานความปลอดภัยทางทะเลสากล SOLAS & IMO</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
