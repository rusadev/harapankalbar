"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, X, Menu, ThumbsUp, Facebook, Twitter, 
  ArrowRight, MessageSquare, Home, Newspaper, 
  Flame, Radio, Play, Send, CheckCircle2, Loader2, ChevronRight, Award, ShieldCheck
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string[];
  author: string;
  date: string;
  time: string;
  img: string;
  views: string;
  isCustomVideo?: boolean;
  videoUrlId?: string;
  link?: string;
  sourceMedia: 'Harapan Kalbar' | 'Rakyat Kalbar' | 'Suara Kalbar';
  timestamp: number;
}

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200",
  "https://images.unsplash.com/photo-1495020689067-958852a6565d?q=80&w=1200",
  "https://images.unsplash.com/photo-1588681664899-f142ff225f63?q=80&w=1200",
  "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?q=80&w=1200"
];

function getFallbackImage(index: number): string {
  return FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
}

// ARSIP BERITA LOKAL PREMIUM TIAP DAERAH & KATEGORI (UPDATED & FULLY LOADED)
const LOCAL_ARTICLES: BlogPost[] = [
  {
    id: "hk-001",
    title: "Eksklusif Visual: Duplikasi Jembatan Kapuas I Resmi Beroperasional Penuh, Atasi Macet Kota",
    category: "Infrastruktur",
    excerpt: "Liputan visual dan analisis mendalam mengenai dampak beroperasinya Jembatan Kapuas I dalam mengurai simpul kemacetan parah di jam sibuk masyarakat Kota Pontianak.",
    content: [
      "Pemerintah Provinsi Kalimantan Barat secara resmi telah membuka fungsional penuh duplikasi Jembatan Kapuas I. Melalui infrastruktur baru ini, pergerakan logistik dan mobilitas harian warga menuju Pontianak Timur kini terpantau jauh lebih kondusif dan bebas antrean panjang.",
      "Pantauan tim redaksi di lapangan menunjukkan waktu tempuh yang biasanya memakan waktu hingga 45 menit kini terpangkas menjadi hanya 10 menit saja. Evaluasi berkala akan terus dilakukan oleh Dishub Kalbar demi kenyamanan bersama."
    ],
    author: "Fajar Ramadan (Redaksi Utama)",
    date: "Senin, 18 Mei 2026",
    time: "11:20 WIB",
    img: "https://images.unsplash.com/photo-1545558014-868c57fde351?q=80&w=1200",
    views: "18,430",
    isCustomVideo: true,
    videoUrlId: "6p60fO6wNl0",
    sourceMedia: "Harapan Kalbar",
    timestamp: Date.now()
  },
  {
    id: "hk-002",
    title: "Festival Cap Go Meh Singkawang Targetkan Lonjakan Wisatawan Mancanegara, Okupansi Hotel Capai 98%",
    category: "Singkawang",
    excerpt: "Persiapan matang terus dilakukan jajaran panitia dan Pemkot Singkawang untuk menyambut kedatangan ratusan ribu wisatawan domestik hingga internasional lewat parade kebudayaan kolosal.",
    content: [
      "Kota Singkawang kembali bersiap mengukuhkan posisinya sebagai pusat toleransi dengan menggelar perayaan festival tahunan Cap Go Meh secara meriah.",
      "Aparatur keamanan gabungan disiagakan di berbagai titik strategis guna menjamin kenyamanan para pelancong. Sektor perhotelan dan pelaku UMKM kuliner lokal melaporkan lonjakan pesanan yang sangat signifikan menjelang hari H acara."
    ],
    author: "Dewi Lestari",
    date: "Senin, 18 Mei 2026",
    time: "09:45 WIB",
    img: "https://images.unsplash.com/photo-1522066304428-dd1c7e6f8a5a?q=80&w=800",
    views: "12,190",
    sourceMedia: "Harapan Kalbar",
    timestamp: Date.now() - 3600000
  },
  {
    id: "hk-003",
    title: "Dokumenter Budaya: Menjaga Eksistensi Kain Tenun Songket Khas Sambas di Era Modernization Global",
    category: "Sambas",
    excerpt: "Saksikan bagaimana pengrajin lokal di Kabupaten Sambas berinovasi menggunakan pewarnaan alami demi menembus kurasi industri fashion mewah internasional.",
    content: [
      "Warisan adiluhung tenun songket khas Sambas kini tidak hanya menjadi pakaian adat, melainkan telah bertransformasi menjadi komoditas kreatif bernilai ekonomi tinggi yang mulai dilirik oleh para desainer mancanegara."
    ],
    author: "Rian Hidayat",
    date: "Minggu, 17 Mei 2026",
    time: "14:15 WIB",
    img: "https://images.unsplash.com/photo-1502156915662-a8633efb753f?q=80&w=800",
    views: "9,750",
    sourceMedia: "Harapan Kalbar",
    timestamp: Date.now() - 7200000
  },
  {
    id: "hk-004",
    title: "Hilirisasi Kelapa Sawit Kalbar Dorong Pendapatan Daerah Naik 15% di Kuartal I",
    category: "Ekonomi",
    excerpt: "Penerapan pabrik pengolahan turunan CPO lokal di daerah Ketapang dan Sanggau mulai membuahkan hasil masif bagi penyerapan tenaga kerja lokal.",
    content: [
      "Dinas Perindustrian dan Perdagangan Kalbar menyatakan bahwa akselerasi investasi pabrik pengolahan minyak goreng dan produk turunan kelapa sawit domestik berhasil mendongkrak realisasi ekspor non-migas.",
      "Langkah strategis ini mengurangi ketergantungan penjualan bahan mentah keluar daerah sekaligus menciptakan ekosistem industri yang lebih stabil bagi petani mandiri."
    ],
    author: "Budi Santoso",
    date: "Senin, 18 Mei 2026",
    time: "08:10 WIB",
    img: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=800",
    views: "14,210",
    sourceMedia: "Harapan Kalbar",
    timestamp: Date.now() - 10800000
  },
  {
    id: "hk-005",
    title: "Pemkot Pontianak Galakkan Digitalisasi Pasar Tradisional Flamboyan Guna Efisiensi Transaksi",
    category: "Pontianak",
    excerpt: "Ratusan pedagang sembako dan sayur kini beralih menggunakan pembayaran QRIS terintegrasi demi menekan laju inflasi dan sirkulasi uang palsu.",
    content: [
      "Wali Kota Pontianak meninjau langsung implementasi program Smart Market di Pasar Flamboyan. Fasilitas Wi-Fi gratis dan pendampingan dari perbankan daerah dikerahkan penuh untuk melancarkan adopsi teknologi ini."
    ],
    author: "Andi Wijaya",
    date: "Minggu, 17 Mei 2026",
    time: "16:40 WIB",
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800",
    views: "8,920",
    sourceMedia: "Harapan Kalbar",
    timestamp: Date.now() - 18000000
  },
  {
    id: "hk-006",
    title: "Kubu Raya Fokuskan Anggaran Desa untuk Optimalisasi Pompanisasi Lahan Pertanian Padi",
    category: "Kubu Raya",
    excerpt: "Langkah mitigasi cuaca ekstrem dari Pemkab Kubu Raya guna menjaga status sebagai salah satu lumbung pangan utama bagi wilayah Kalimantan Barat.",
    content: [
      "Bupati Kubu Raya menyerahkan puluhan unit pompa air modern kepada kelompok tani di Rasau Jaya. Pendekatan berbasis mekanisasi ini diharapkan mampu mendongkrak frekuensi panen menjadi tiga kali dalam setahun."
    ],
    author: "Siti Rahma",
    date: "Sabtu, 16 Mei 2026",
    time: "10:15 WIB",
    img: "https://images.unsplash.com/photo-1599818204204-c3bf79bfba3e?q=80&w=800",
    views: "6,540",
    sourceMedia: "Harapan Kalbar",
    timestamp: Date.now() - 86400000
  },
  {
    id: "hk-007",
    title: "Pengembangan Potensi Ekowisata Mangrove Ketapang Masuk Nominasi Desa Wisata Nasional",
    category: "Ketapang",
    excerpt: "Konservasi hutan bakau yang dikelola swadaya oleh pemuda pesisir Ketapang mendapat apresiasi dari Kementerian Pariwisata karena berhasil memadukan edukasi lingkungan.",
    content: [
      "Hutan Mangrove Ketapang kini menawarkan konsep glamping dan tracking edukasi malam hari bagi peneliti. Pembenahan infrastruktur jalan akses terus dikebut demi kenyamanan pelancong domestik."
    ],
    author: "Riza Pahlevi",
    date: "Jumat, 15 Mei 2026",
    time: "11:30 WIB",
    img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800",
    views: "11,050",
    sourceMedia: "Harapan Kalbar",
    timestamp: Date.now() - 172800000
  },
  {
    id: "hk-008",
    title: "Pembangunan Sentra Industri Kerajinan Rotan Kapuas Hulu Mulai Berjalan Tahap Konstruksi",
    category: "Kapuas Hulu",
    excerpt: "Guna memaksimalkan nilai jual hasil hutan non-kayu, Pemkab Kapuas Hulu membangun gedung workshop dan galeri pameran bersama bagi para pengrajin pedalaman.",
    content: [
      "Kapuas Hulu terkenal dengan kualitas rotan alamnya yang kokoh. Melalui wadah sentra industri baru ini, standardisasi desain dan kontrol kualitas produk kerajinan anyaman akan dipantau ketat agar siap bersaing di pasar modern Jabodetabek."
    ],
    author: "Yohanes Albert",
    date: "Kamis, 14 Mei 2026",
    time: "14:22 WIB",
    img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800",
    views: "7,310",
    sourceMedia: "Harapan Kalbar",
    timestamp: Date.now() - 259200000
  }
];

// NAVIGASI KATEGORI DAERAH KOMPLET
const CATEGORIES = [
  "Semua Berita", "Infrastruktur", "Ekonomi", 
  "Pontianak", "Singkawang", "Sambas", "Kubu Raya", "Ketapang", "Kapuas Hulu",
  "Harapan Kalbar", "Rakyat Kalbar", "Suara Kalbar"
];

export default function PerfectIntegratedPortalFinal() {
  const [rssPosts, setRssPosts] = useState<BlogPost[]>([]);
  const [loadingRss, setLoadingRss] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("Semua Berita");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [comments, setComments] = useState<Record<string, Comment[]>>({
    "hk-001": [{ id: "1", author: "Hendra_Pontianak", text: "Apresiasi tinggi untuk visual beritanya, layout portal barunya mewah sekali.", timestamp: "2 menit yang lalu" }]
  });
  const [inputName, setInputName] = useState("");
  const [inputText, setInputText] = useState("");
  const [shareToast, setShareToast] = useState<string | null>(null);

  useEffect(() => {
    async function loadFeeds() {
      try {
        setLoadingRss(true);
        const response = await fetch('/api/rss');
        if (!response.ok) throw new Error();
        const data = await response.json();

        const rkItems = data.rakyatkalbar?.items || [];
        const skItems = data.suarakalbar?.items || [];

        const parsedRakyat: BlogPost[] = rkItems.map((item: any, idx: number) => {
          let imageUrl = "";
          if (item.content) {
            const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
            if (imgMatch && imgMatch[1]) imageUrl = imgMatch[1];
          }
          if (!imageUrl || imageUrl.includes('localhost') || imageUrl.length < 10) imageUrl = getFallbackImage(idx);

          const pDate = item.pubDate ? new Date(item.pubDate) : new Date();
          return {
            id: item.guid || `rk-${idx}-${pDate.getTime()}`,
            title: item.title,
            category: "Rakyat Kalbar",
            excerpt: item.description ? item.description.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 140) + "..." : "Klik untuk membaca analisis warta lengkap dari jaringan Rakyat Kalbar.",
            content: [item.content || item.description || ""],
            author: item.author || "Redaksi Rakyat Kalbar",
            date: pDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
            time: pDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + " WIB",
            img: imageUrl,
            views: `${Math.floor(Math.random() * 800) + 400}`,
            link: item.link,
            sourceMedia: "Rakyat Kalbar",
            timestamp: pDate.getTime()
          };
        });

        const parsedSuara: BlogPost[] = skItems.map((item: any, idx: number) => {
          let imageUrl = "";
          if (item.thumbnail) imageUrl = item.thumbnail;
          else if (item.description) {
            const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
            if (imgMatch && imgMatch[1]) imageUrl = imgMatch[1];
          }
          if (!imageUrl || imageUrl.includes('localhost') || imageUrl.length < 10) imageUrl = getFallbackImage(idx + 4);

          const pDate = item.pubDate ? new Date(item.pubDate) : new Date();
          return {
            id: item.guid || `sk-${idx}-${pDate.getTime()}`,
            title: item.title,
            category: "Suara Kalbar",
            excerpt: item.description ? item.description.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 140) + "..." : "Akses laporan berita konvensional langsung via sindikasi Suara Kalbar.",
            content: [item.content || item.description || ""],
            author: item.author || "Redaksi Suara Kalbar",
            date: pDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
            time: pDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + " WIB",
            img: imageUrl,
            views: `${Math.floor(Math.random() * 900) + 500}`,
            link: item.link,
            sourceMedia: "Suara Kalbar",
            timestamp: pDate.getTime()
          };
        });

        setRssPosts([...parsedRakyat, ...parsedSuara]);
      } catch (err) {
        console.error("Sinkronisasi feed dinamis eksternal tertunda.");
      } finally {
        setLoadingRss(false);
      }
    }
    loadFeeds();
  }, []);

  const allPosts = useMemo(() => {
    return [...LOCAL_ARTICLES, ...rssPosts].sort((a, b) => b.timestamp - a.timestamp);
  }, [rssPosts]);

  const filteredArticles = useMemo(() => {
    return allPosts.filter(a => {
      const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase());
      if (activeCat === "Semua Berita") return matchSearch;
      const matchCat = a.category.toLowerCase().includes(activeCat.toLowerCase()) || a.sourceMedia.toLowerCase().includes(activeCat.toLowerCase());
      return matchSearch && matchCat;
    });
  }, [allPosts, search, activeCat]);

  const headlinePost = useMemo(() => {
    return filteredArticles.length > 0 ? filteredArticles[0] : null;
  }, [filteredArticles]);

  const remainingPosts = useMemo(() => {
    return filteredArticles.length > 1 ? filteredArticles.slice(1) : [];
  }, [filteredArticles]);

  const handleAddComment = (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    if (!inputName.trim() || !inputText.trim()) return;
    const newComm = { id: `c-${Date.now()}`, author: inputName, text: inputText, timestamp: "Baru saja" };
    setComments(prev => ({ ...prev, [postId]: [newComm, ...(prev[postId] || [])] }));
    setInputText("");
  };

  const triggerShareSimulation = (platform: string, title: string) => {
    setShareToast(`Tautan warta "${title.substring(0, 25)}..." disalin ke ${platform}.`);
    setTimeout(() => setShareToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#f4f5f7] text-slate-900 font-sans antialiased selection:bg-rose-600 selection:text-white pb-20 md:pb-0">
      
      {shareToast && (
        <div className="fixed bottom-6 right-6 bg-slate-950 text-white text-xs font-semibold px-5 py-3 rounded-xl shadow-2xl z-[300] flex items-center gap-2 border border-slate-800 animate-in fade-in">
          <CheckCircle2 size={14} className="text-emerald-400" /> <span>{shareToast}</span>
        </div>
      )}

      {/* STRIP INFO PANEL ATAS */}
      <div className="bg-slate-950 text-white text-[10px] uppercase tracking-widest py-2 px-4 border-b border-slate-900 font-medium">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
            <span className="text-slate-400">Integrated National Layout Network</span>
          </div>
          <div className="hidden md:flex gap-4 text-slate-400">
            <span>Senin, 18 Mei 2026</span>
            <span>·</span>
            <span>Premium Aggregate</span>
          </div>
        </div>
      </div>

      {/* LUXURY STICKY HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-[100] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between h-20 sm:h-24 md:h-28 relative">
            
            <button onClick={() => setIsSidebarOpen(true)} className="p-3 hover:bg-slate-100 rounded-xl transition-colors z-10">
              <Menu size={22} className="text-slate-800" />
            </button>

            {/* LOGO MASIF TERPUSAT */}
            <div 
              className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer transition-transform duration-300 hover:scale-[1.02] z-0"
              onClick={() => { setSelectedPost(null); setActiveCat("Semua Berita"); setSearch(""); }}
            >
              <img 
                src="/harapankalbar.png" 
                alt="Harapan Kalbar" 
                className="h-14 sm:h-18 md:h-22 lg:h-24 w-auto object-contain" 
              />
            </div>

            {/* BOX PENCARIAN DESKTOP */}
            <div className="hidden md:block w-64 z-10">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
                <input 
                  type="text" placeholder="Cari berita daerah..."
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl py-2 pl-9 pr-4 focus:bg-white focus:border-slate-950 outline-none transition-all"
                  value={search} onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="md:hidden w-10 h-10" />
          </div>

          {/* KOTAK PENCARIAN MODE MOBILE */}
          <div className="block md:hidden pb-4 px-2">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-3 text-slate-400" size={15} />
              <input 
                type="text" placeholder="Cari berita atau topik Kalbar..."
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl py-2.5 pl-10 pr-4 focus:bg-white focus:border-slate-950 outline-none transition-all"
                value={search} onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

        </div>

        {/* STRIP FILTER KATEGORI DAERAH HORIZONTAL */}
        <div className="border-t border-slate-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar py-2.5">
            <div className="flex justify-start md:justify-center items-center gap-1.5 min-w-max">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat} onClick={() => { setActiveCat(cat); setSelectedPost(null); }}
                  className={`px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-md transition-all
                    ${activeCat === cat ? 'bg-slate-950 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* SIDEBAR DRAWER CHANNELS */}
      {isSidebarOpen && (
        <>
          <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-[200]" onClick={() => setIsSidebarOpen(false)} />
          <aside className="fixed left-0 top-0 h-full w-80 bg-white z-[210] p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-left duration-200">
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-4 border-b">
                <img src="/harapankalbar.png" className="h-12" alt="Harapan Kalbar" />
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-slate-100 rounded-full"><X size={18}/></button>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-rose-600 tracking-widest uppercase mb-4">Saluran Informasi</p>
                <button onClick={() => { setSelectedPost(null); setActiveCat("Semua Berita"); setIsSidebarOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-slate-800 bg-slate-50 rounded-lg"><Home size={15}/> Dashboard Utama</button>
                <button onClick={() => { setActiveCat("Harapan Kalbar"); setSelectedPost(null); setIsSidebarOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900"><Radio size={15}/> Liputan Harapan Kalbar</button>
                <button onClick={() => { setActiveCat("Rakyat Kalbar"); setSelectedPost(null); setIsSidebarOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900"><Newspaper size={15}/> Sindikasi Rakyat Kalbar</button>
                <button onClick={() => { setActiveCat("Suara Kalbar"); setSelectedPost(null); setIsSidebarOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900"><Newspaper size={15}/> Sindikasi Suara Kalbar</button>
              </div>
            </div>
            <div className="text-[10px] text-slate-400 font-bold text-center border-t pt-4">© 2026 HARAPAN KALBAR NETWORK</div>
          </aside>
        </>
      )}

      {/* SPACE IKLAN 1: TOP LEADERBOARD BANNER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="w-full bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between min-h-[90px] relative overflow-hidden shadow-lg group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
          <span className="absolute top-1 right-3 text-[7px] font-black text-indigo-400/70 uppercase tracking-widest">OFFICIAL PARTNER AD</span>
          
          <div className="flex items-center gap-4 z-10 text-center md:text-left flex-col md:flex-row">
            <div className="p-2.5 bg-white/10 rounded-xl border border-white/10 text-indigo-400 shadow-inner">
              <Award size={24} />
            </div>
            <div>
              <h4 className="text-white text-xs sm:text-sm font-black uppercase tracking-wider">Investasi Properti Strategis Kota Baru Pontianak</h4>
              <p className="text-slate-400 text-[10px] sm:text-xs font-medium">Miliki Hunian Eksklusif Modern dengan Kapital Gain hingga 25% Per Tahun.</p>
            </div>
          </div>
          <button className="mt-3 md:mt-0 z-10 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[10px] uppercase tracking-widest px-5 py-2.5 rounded-lg shadow-lg transition-all border border-indigo-400/30">
            Hubungi Pengembang
          </button>
        </div>
      </div>

      {/* VIEW UTAMA PORTAL */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {!selectedPost ? (
          
          /* ================= GRID LIST BERITA KRONOLOGIS DEPAN ================= */
          <div className="space-y-10">
            
            {/* 1. BIG CONTENT HERO FEATURE */}
            {headlinePost && (
              <section 
                onClick={() => setSelectedPost(headlinePost)}
                className="group cursor-pointer bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
              >
                <div className="lg:col-span-7 bg-slate-950 aspect-[16/10] lg:aspect-auto overflow-hidden relative">
                  <img 
                    src={headlinePost.img} 
                    alt="Cover Utama" 
                    className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-700"
                  />
                  {headlinePost.isCustomVideo && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white text-slate-950 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <Play size={22} className="fill-current ml-1 text-rose-600" />
                      </div>
                    </div>
                  )}
                  <span className="absolute top-4 left-4 bg-slate-950 text-white text-[9px] font-black px-3 py-1 rounded-sm uppercase tracking-widest">
                    {headlinePost.sourceMedia}
                  </span>
                </div>

                <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-white">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-wider">
                      <span>{headlinePost.category}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      <span className="text-slate-400">{headlinePost.time}</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-rose-600 transition-colors">
                      {headlinePost.title}
                    </h2>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                      {headlinePost.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-semibold mt-4">
                    <span>Oleh: {headlinePost.author}</span>
                    <span className="flex items-center gap-1 text-slate-950 font-bold group-hover:text-rose-600 transition-colors">
                      Baca Analisis <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              </section>
            )}

            {/* 2. DUAL-COLUMN GRID ARUS FEED */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* FEED KIRI */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Arus Berita: {activeCat}</h3>
                  {loadingRss && (
                    <span className="text-xs text-slate-400 flex items-center gap-1.5 font-semibold">
                      <Loader2 size={12} className="animate-spin" /> Jaringan Sinkronisasi...
                    </span>
                  )}
                </div>

                {filteredArticles.length === 0 ? (
                  <div className="bg-white rounded-xl p-12 text-center border text-slate-400 font-semibold text-xs">
                    Arsip warta daerah belum tersedia atau tidak cocok untuk kata kunci ini.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {(activeCat !== "Semua Berita" || search ? filteredArticles : remainingPosts).map((art, index) => (
                      <React.Fragment key={art.id}>
                        
                        {/* KARTU BERITA */}
                        <div 
                          onClick={() => setSelectedPost(art)}
                          className="group bg-white border border-slate-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between"
                        >
                          <div>
                            <div className="aspect-[16/10] w-full bg-slate-100 overflow-hidden relative">
                              <img src={art.img} alt={art.title} className="w-full h-full object-cover" loading="lazy" />
                              <span className="absolute bottom-2 left-2 bg-slate-950/90 text-white text-[8px] font-black px-2 py-0.5 rounded-xs uppercase">
                                {art.sourceMedia}
                              </span>
                            </div>
                            <div className="p-4 space-y-2">
                              <span className="text-[9px] font-black text-rose-600 uppercase tracking-wider block">{art.category}</span>
                              <h4 className="text-sm font-black text-slate-900 leading-snug line-clamp-2 group-hover:text-rose-600 transition-colors">
                                {art.title}
                              </h4>
                              <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">{art.excerpt}</p>
                            </div>
                          </div>
                          <div className="px-4 py-3 bg-slate-50/50 text-[9px] text-slate-400 font-bold uppercase flex items-center justify-between border-t border-slate-100">
                            <span className="truncate max-w-[130px]">{art.author}</span>
                            <span>{art.date}</span>
                          </div>
                        </div>

                        {/* SPACE IKLAN 2: IN-FEED BANNER */}
                        {activeCat === "Semua Berita" && !search && index === 1 && (
                          <div className="sm:col-span-2 w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white border border-amber-500 rounded-2xl p-6 relative overflow-hidden group shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                            <span className="absolute top-1 left-3 text-[7px] font-bold text-amber-200/80 uppercase tracking-widest">SPONSORED HIGHLIGHT</span>
                            
                            <div className="space-y-1 text-center sm:text-left">
                              <span className="text-[9px] font-black uppercase bg-white/20 px-2 py-0.5 rounded-sm tracking-wider">Komoditas Unggulan Daerah</span>
                              <h4 className="text-base font-black tracking-tight leading-snug">Kerajinan Autentik Kalbar Tembus Pasar Ekspor Uni Eropa</h4>
                              <p className="text-amber-100 text-xs font-normal">Dukung industri kreatif UMKM lokal go-global. Produk bergaransi mutu premium.</p>
                            </div>
                            <button className="bg-slate-950 hover:bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-lg transition-transform group-hover:scale-102 flex items-center gap-1.5 flex-shrink-0">
                              Lihat Katalog <ArrowRight size={12}/>
                            </button>
                          </div>
                        )}

                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>

              {/* SIDEBAR MONITOR TERPOPULER & IKLAN VERTIKAL */}
              <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-36">
                
                {/* BLOK TERPOPULER */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-2xs">
                  <div className="border-b pb-3 flex items-center gap-2">
                    <Flame size={15} className="text-rose-600" />
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">TERPOPULER WEEKLY</h3>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {allPosts.slice(0, 5).map((trend, index) => (
                      <div key={trend.id} onClick={() => setSelectedPost(trend)} className="py-3.5 first:pt-0 flex gap-3 cursor-pointer group">
                        <span className="text-xl font-black text-slate-200 group-hover:text-rose-600 transition-colors w-6">0{index + 1}</span>
                        <div className="space-y-0.5 min-w-0">
                          <span className="text-[8px] font-black text-slate-400 uppercase block">{trend.sourceMedia}</span>
                          <h5 className="text-xs font-bold text-slate-800 leading-snug line-clamp-2 group-hover:underline">{trend.title}</h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SPACE IKLAN 3: SIDEBAR STICKY HALF-PAGE BANNER */}
                <div className="bg-gradient-to-br from-rose-950 via-slate-900 to-slate-950 text-white rounded-xl border border-rose-900/40 p-6 relative min-h-[340px] flex flex-col justify-between overflow-hidden shadow-xl group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
                  <span className="absolute top-2 left-3 text-[7px] font-black text-rose-400/80 uppercase tracking-widest">EXCLUSIVE ADSENSE</span>
                  
                  <div className="space-y-4 pt-4 text-center">
                    <div className="w-14 h-14 bg-rose-600/10 border border-rose-500/30 rounded-full flex items-center justify-center mx-auto text-rose-500 shadow-xl">
                      <ShieldCheck size={28} />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-sm font-black uppercase tracking-wider">Layanan Premium Cloud Hosting Kalbar</h4>
                      <p className="text-slate-400 text-xs font-normal leading-relaxed">Kecepatan server NVMe ultra-cepat, uptime 99.99% khusus korporasi & portal berita lokal.</p>
                    </div>
                  </div>

                  <div className="space-y-2 w-full pt-6">
                    <div className="text-center text-[10px] text-rose-400 font-bold bg-rose-500/10 border border-rose-500/20 py-1.5 rounded-md">Diskon 50% Ganti Provider</div>
                    <button className="w-full bg-rose-600 hover:bg-rose-500 text-white font-black text-[10px] uppercase tracking-widest py-3 rounded-lg shadow-lg transition-colors">
                      Ambil Kupon Server
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        ) : (
          
          /* ================= ARTIKEL READER DETAIL VIEW ================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in">
            <div className="lg:col-span-8 space-y-6">
              <button onClick={() => setSelectedPost(null)} className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
                ← Kembali Ke Arus Berita
              </button>

              <article className="bg-white p-5 sm:p-8 md:p-10 rounded-2xl border border-slate-200 space-y-6 shadow-2xs">
                <header className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-slate-950 text-white text-[8px] font-black px-2.5 py-0.5 rounded-sm uppercase">{selectedPost.sourceMedia}</span>
                    <span className="text-slate-400 text-xs font-semibold">{selectedPost.date} · {selectedPost.time}</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">{selectedPost.title}</h1>
                  <div className="text-xs text-slate-400 font-semibold border-b border-slate-100 pb-4">Kontributor: <span className="text-slate-700 font-bold">{selectedPost.author}</span> · Pembaca: {selectedPost.views}</div>
                </header>

                {selectedPost.isCustomVideo ? (
                  <div className="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-inner">
                    <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${selectedPost.videoUrlId}?autoplay=1`} className="border-0" allowFullScreen allow="autoplay" />
                  </div>
                ) : (
                  <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-50">
                    <img src={selectedPost.img} alt="Detail" className="w-full h-full object-cover" />
                  </div>
                )}

                {/* SPACE IKLAN 4: IN-ARTICLE BANNER */}
                <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
                  <span className="absolute top-1 left-3 text-[6px] font-bold text-slate-500 uppercase tracking-widest">CONTEXTUAL ADVERTISEMENT</span>
                  <p className="text-white text-xs font-black uppercase tracking-wider mt-2 sm:mt-0">Layanan Hukum & Advokasi Korporasi Profesional Kalbar</p>
                  <button className="bg-white text-slate-950 font-black text-[9px] uppercase tracking-widest px-4 py-1.5 rounded-md hover:bg-slate-100 transition-colors">Konsultasi</button>
                </div>

                <div className="text-slate-800 leading-relaxed text-sm sm:text-base space-y-4 font-normal">
                  <p className="font-bold border-l-4 border-slate-900 pl-4 bg-slate-50 py-3 text-slate-900 text-sm sm:text-base rounded-r-lg">
                    {selectedPost.excerpt}
                  </p>
                  {selectedPost.content.map((para, i) => (
                    <p key={i} dangerouslySetInnerHTML={{ __html: para }}></p>
                  ))}

                  {selectedPost.link && (
                    <div className="bg-slate-50 p-6 rounded-xl border text-center my-8">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Rilis Resmi Mitra Terintegrasi</p>
                      <a href={selectedPost.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-slate-950 text-white text-xs font-black px-6 py-3 rounded-lg hover:bg-rose-600 transition-colors uppercase tracking-wider">
                        Buka Dokumen Rilis Asli <ArrowRight size={13}/>
                      </a>
                    </div>
                  )}
                </div>

                {/* BERBAGI BERITA */}
                <div className="border-y border-slate-100 py-4 flex flex-wrap items-center justify-between gap-4">
                  <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"><ThumbsUp size={14} /> REKOMENDASIKAN</button>
                  <div className="flex items-center gap-2">
                    <button onClick={() => triggerShareSimulation("WhatsApp", selectedPost.title)} className="p-2 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-full"><MessageSquare size={14}/></button>
                    <button onClick={() => triggerShareSimulation("Facebook", selectedPost.title)} className="p-2 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-full"><Facebook size={14}/></button>
                    <button onClick={() => triggerShareSimulation("Twitter", selectedPost.title)} className="p-2 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-full"><Twitter size={14}/></button>
                  </div>
                </div>

                {/* KOMENTAR PUBLIK */}
                <div className="space-y-6 pt-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Tanggapan Publik ({comments[selectedPost.id]?.length || 0})</h3>
                  <form onSubmit={(e) => handleAddComment(e, selectedPost.id)} className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input type="text" placeholder="Nama..." className="bg-white border rounded-lg p-2.5 text-xs outline-none focus:border-slate-900" value={inputName} onChange={(e) => setInputName(e.target.value)} required />
                      <input type="text" placeholder="Tulis opini Anda..." className="sm:col-span-2 bg-white border rounded-lg p-2.5 text-xs outline-none focus:border-slate-900" value={inputText} onChange={(e) => setInputText(e.target.value)} required />
                    </div>
                    <button type="submit" className="flex items-center gap-2 bg-slate-950 text-white font-black text-xs px-5 py-2 rounded-lg ml-auto hover:bg-rose-600 transition-colors uppercase tracking-wider">Kirim <Send size={11}/></button>
                  </form>

                  <div className="space-y-4 divide-y divide-slate-100">
                    {(comments[selectedPost.id] || []).map((comm) => (
                      <div key={comm.id} className="pt-4 first:pt-0 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-900">{comm.author}</span>
                          <span className="text-[10px] text-slate-400">{comm.timestamp}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal">{comm.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </div>

            {/* SIDEBAR REKOMENDASI DALAM */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-2xs">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 border-b pb-3">Saran Artikel Lain</h4>
                <div className="space-y-4">
                  {allPosts.filter(p => p.id !== selectedPost.id).slice(0, 6).map(art => (
                    <div key={art.id} onClick={() => { setSelectedPost(art); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="group cursor-pointer flex gap-3 items-center border-b border-slate-50 pb-3 last:border-0">
                      <div className="w-16 aspect-[4/3] rounded bg-slate-100 overflow-hidden flex-shrink-0">
                        <img src={art.img} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h5 className="text-xs font-bold text-slate-800 leading-snug line-clamp-2 group-hover:text-rose-600 transition-colors">{art.title}</h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MOBILE LOWER BAR */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 py-3.5 flex justify-around items-center z-[150] shadow-2xl">
        <button className="flex flex-col items-center gap-0.5 text-slate-900" onClick={() => setSelectedPost(null)}>
          <Home size={18} /> <span className="text-[9px] font-black uppercase tracking-wider">Home</span>
        </button>
        <button className="flex flex-col items-center gap-0.5 text-slate-400" onClick={() => setIsSidebarOpen(true)}>
          <Newspaper size={18} /> <span className="text-[9px] font-black uppercase tracking-wider">Channels</span>
        </button>
      </nav>

      {/* SYSTEM STYLES */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes shimmer { 100% { transform: translateX(100%); } }
        .animate-in { animation: fade-in 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-shimmer { animation: shimmer 2.5s infinite; }
      `}</style>
    </div>
  );
}