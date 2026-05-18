"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Newspaper, Video, Globe, ChevronRight, ShieldAlert } from 'lucide-react';

export default function CorporateGatewayPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col justify-between relative selection:bg-slate-950 selection:text-white">
      
      {/* GARIS AKSEN OTENTIK MERAH MAROON / TOP BAR MEDIA */}
      <div className="h-1 w-full bg-[#8b0000]" />

      {/* NAVBAR ATAS */}
      <header className="w-full max-w-7xl mx-auto px-6 py-5 flex justify-between items-center border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Globe size={13} className="text-slate-800 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Harapan Kalbar Media Network
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1 rounded-sm text-[9px] font-bold text-slate-600 uppercase tracking-wider">
          <ShieldAlert size={11} className="text-slate-800" /> Dewan Pers Terverifikasi
        </div>
      </header>

      {/* UTAMA: GERBANG SELEKTOR PORTAL */}
      <main className="w-full max-w-4xl mx-auto px-6 py-16 flex flex-col items-center justify-center my-auto z-10">
        
        {/* LOGO PENYAMBUT & PENGANTAR REDAKSI */}
        <div className="mb-12 text-center animate-in">
          <img 
            src="/harapankalbar.png" 
            alt="Harapan Kalbar" 
            className="h-16 sm:h-20 md:h-24 w-auto object-contain mx-auto bg-white" 
          />
          <div className="h-[2px] w-10 bg-[#8b0000] mx-auto my-6" />
          <h1 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
            Pusat Informasi Multimedia Terpadu
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm font-normal max-w-xl mx-auto leading-relaxed">
            Selamat datang di gerbang distribusi warta resmi Harapan Kalbar. Silakan pilih format preferensi Anda untuk mengakses laporan jurnalistik tepercaya di wilayah Kalimantan Barat.
          </p>
        </div>

        {/* TWO-COLUMN CORPORATE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
          
          {/* OPSI 1: PORTAL BERITA TEKS */}
          <div 
            onClick={() => router.push('/blog')}
            className="group cursor-pointer bg-white border border-slate-200 p-8 rounded-xl transition-all duration-300 flex flex-col justify-between hover:border-slate-950 hover:shadow-2xl hover:shadow-slate-100"
          >
            <div className="space-y-4">
              <div className="w-10 h-10 bg-slate-50 text-slate-800 border border-slate-200 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-slate-950 group-hover:text-white">
                <Newspaper size={18} />
              </div>
              <div className="space-y-1.5">
                <h2 className="text-xs font-black tracking-widest uppercase text-slate-900 group-hover:text-slate-950">
                  Portal Berita & Artikel
                </h2>
                <p className="text-slate-500 text-xs font-normal leading-relaxed">
                  Menyajikan analisis data komprehensif, laporan mendalam (*in-depth reporting*), tajuk rencana, opini publik, serta rangkuman pers sindikasi daerah Kalimantan Barat.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-950 transition-colors">
              <span>Masuk Ke Portal Teks</span>
              <ChevronRight size={13} className="transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* OPSI 2: PORTAL LIVE VIDEO */}
          <div 
            onClick={() => router.push('/video')}
            className="group cursor-pointer bg-white border border-slate-200 p-8 rounded-xl transition-all duration-300 flex flex-col justify-between hover:border-slate-950 hover:shadow-2xl hover:shadow-slate-100"
          >
            <div className="space-y-4">
              <div className="w-10 h-10 bg-slate-50 text-slate-800 border border-slate-200 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-slate-950 group-hover:text-white">
                <Video size={18} />
              </div>
              <div className="space-y-1.5">
                <h2 className="text-xs font-black tracking-widest uppercase text-slate-900 group-hover:text-slate-950">
                  Portal Audio Visual & Video
                </h2>
                <p className="text-slate-500 text-xs font-normal leading-relaxed">
                  Menampilkan siaran langsung, liputan investigatif on-the-spot, dokumenter kebudayaan daerah, serta program berita berbasis tayangan video digital resolusi tinggi.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-950 transition-colors">
              <span>Masuk Ke Portal Video</span>
              <ChevronRight size={13} className="transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

      </main>

      {/* FOOTER CORPORATE STATUS WITH DEVELOPER CREDITS */}
      <footer className="w-full text-center py-5 text-[9px] font-bold uppercase tracking-widest border-t border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-slate-400">
        <span>© 2026 PT. Harapan Kalbar Media Network.</span>
        <span className="hidden sm:inline">·</span>
        <span>Developed by <a href="https://rusabyte.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-[#8b0000] transition-colors">Rusabyte Indonesia</a></span>
      </footer>

      {/* MICRO-ANIMATION LAYOUT */}
      <style jsx global>{`
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>

    </div>
  );
}