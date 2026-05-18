"use client";

import React, { useState, useMemo } from 'react';
import { 
  Search, Play, Eye, X, Menu, Bell, Share2, 
  User, Home, Compass, Video, History,
  Flame, Radio, Bookmark, ThumbsUp
} from 'lucide-react';

// --- Types ---
interface Video {
  id: string;
  title: string;
  category: string;
  views: string;
  time: string;
  img: string;
  description: string;
  channel: string;
  isLive?: boolean;
}

const VIDEOS: Video[] = [
  // === KONTEN PONTIANAK ===
  { 
    id: "6p60fO6wNl0", 
    title: "Pembangunan Infrastruktur Strategis: Duplikasi Jembatan Kapuas I Pontianak", 
    category: "Infrastruktur", 
    views: "12.4K", 
    time: "10m", 
    img: "https://pontianakinfo.disway.id/upload/90ef4755d9bc23478fd95eafcd9ace02.png",
    description: "Melihat lebih dekat progres pembangunan jembatan yang menjadi nadi transportasi Kota Pontianak.",
    channel: "Borneo Update",
    isLive: true 
  },
  { 
    id: "pol001", 
    title: "Debat Calon Bupati Pontianak: Visi Pembangunan dan Program Kesejahteraan", 
    category: "Politik", 
    views: "15.3K", 
    time: "45m", 
    img: "https://rricoid-assets.obs.ap-southeast-4.myhuaweicloud.com/berita/Pontianak/o/1732785631755-IMG_6613/2i8j20no8lu8uhj.png",
    description: "Tiga calon walikota mempresentasikan visi mereka untuk masa depan Pontianak. Diskusi mendalam tentang ekonomi, pendidikan, dan kesejahteraan masyarakat.",
    channel: "Pontianak Hari Ini",
    isLive: true
  },
  { 
    id: "sos001", 
    title: "Kisah inspiratif para perempuan muda yang membangun bisnis mereka dari pasar tradisional hingga marketplace online.",
    channel: "Pontianak Sosial", 
    category: "Sosial", 
    views: "8.2K", 
    time: "18m", 
    img: "https://asset.kompas.com/crops/tPjWcA9BwHaEuGlaujqem4w-ovE=/53x0:956x602/1200x675/data/photo/2026/03/09/69ae7f1f5df32.jpeg",
    description: "Kisah inspiratif para perempuan muda yang membangun bisnis mereka dari pasar tradisional hingga marketplace online.",
    channel: "Pontianak Sosial"
  },
  { 
    id: "sos002", 
    title: "Gerakan Lingkungan: Masyarakat Pontianak Tanam 10.000 Pohon", 
    category: "Sosial", 
    views: "6.5K", 
    time: "12m", 
    img: "https://cdn.antaranews.com/cache/1200x800/2023/12/30/WhatsApp-Image-2023-12-30-at-17.42.18_0cce9222.jpg",
    description: "Kepedulian lingkungan masyarakat Pontianak dalam aksi penanaman pohon skala besar untuk masa depan yang lebih hijau.",
    channel: "Borneo Hijau"
  },
  { 
    id: "pol002", 
    title: "Evaluasi Kinerja DPRD Pontianak: Transparansi dan Akuntabilitas Politik", 
    category: "Politik", 
    views: "5.8K", 
    time: "30m", 
    img: "https://i.ytimg.com/vi/OG1xvwrew8U/maxresdefault.jpg",
    description: "Analisis mendalam tentang capaian dan tantangan lembaga legislatif Pontianak dalam melayani masyarakat.",
    channel: "Politik Kalbar"
  },
  { 
    id: "sos003", 
    title: "Pendidikan Gratis untuk Anak-Anak Kurang Mampu di Kelurahan Sungai Jawi", 
    category: "Sosial", 
    views: "9.4K", 
    time: "16m", 
    img: "https://cdn.antaranews.com/cache/1200x800/2023/07/28/WhatsApp-Image-2023-07-28-at-13.57.56.jpeg",
    description: "Sekolah komunitas amal memberikan kesempatan pendidikan kepada anak-anak yang tidak mampu di Pontianak.",
    channel: "Pendidikan Kalbar"
  },

  // === KONTEN SINGKAWANG ===
  { 
    id: "y6vI9SjE8g8", 
    title: "Surga Tersembunyi: Eksplorasi Kepulauan Karimata dan Kekayaan Bahari", 
    category: "Pariwisata", 
    views: "5.2K", 
    time: "1d", 
    img: "https://images.unsplash.com/photo-1504462385559-c4e530cf0017?q=80&w=1200",
    description: "Dokumenter keindahan alam bawah laut dan pantai eksotis di Singkawang.",
    channel: "Travel Journal"
  },
  { 
    id: "pol003", 
    title: "Pemilihan Walikota Singkawang 2026: Strategi dan Janji Para Kandidat", 
    category: "Politik", 
    views: "11.2K", 
    time: "38m", 
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200",
    description: "Kompetisi ketat di Kota Singkawang dengan dua pasang calon yang menawarkan visi berbeda untuk kota pariwisata.",
    channel: "Singkawang Update",
    isLive: true
  },
  { 
    id: "sos004", 
    title: "Festival Imlek di Singkawang: Toleransi dan Keberagaman yang Indah", 
    category: "Sosial", 
    views: "13.7K", 
    time: "22m", 
    img: "https://images.unsplash.com/photo-1522066304428-dd1c7e6f8a5a?q=80&w=1200",
    description: "Perayaan Imlek yang meriah menunjukkan toleransi dan keharmonisan masyarakat Singkawang dari berbagai agama.",
    channel: "Budaya Singkawang"
  },

  // === KONTEN MEMPAWAH ===
  { 
    id: "pol004", 
    title: "Buruh Tambang Emas Mempawah: Aspirasi dan Kesejahteraan Kerja", 
    category: "Politik", 
    views: "7.3K", 
    time: "25m", 
    img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1200",
    description: "Perjuangan buruh tambang untuk mendapatkan hak dan kesejahteraan yang layak di Kabupaten Mempawah.",
    channel: "Buruh Indonesia"
  },
  { 
    id: "sos005", 
    title: "Pasang Surut Bisnis Pertanian Cengkeh di Mempawah", 
    category: "Sosial", 
    views: "6.1K", 
    time: "19m", 
    img: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=1200",
    description: "Petani cengkeh Mempawah berbagi pengalaman menghadapi fluktuasi harga dan permintaan pasar global.",
    channel: "Petani Kalbar"
  },
  { 
    id: "sos006", 
    title: "Program Kesehatan Masyarakat: Puskesmas Terpadu di Desa Terpencil Mempawah", 
    category: "Sosial", 
    views: "4.9K", 
    time: "15m", 
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200",
    description: "Inisiatif kesehatan menjangkau daerah terpencil, memberikan akses layanan medis kepada masyarakat desa.",
    channel: "Kesehatan Kalbar"
  },

  // === KONTEN SAMBAS ===
  { 
    id: "pol005", 
    title: "Kebijakan Pelestarian Budaya Melayu di Kabupaten Sambas", 
    category: "Politik", 
    views: "8.6K", 
    time: "28m", 
    img: "https://images.unsplash.com/photo-1502156915662-a8633efb753f?q=80&w=1200",
    description: "Pemerintah daerah Sambas berkomitmen melestarikan warisan budaya Melayu melalui berbagai program dan inisiatif.",
    channel: "Budaya Sambas"
  },
  { 
    id: "sos007", 
    title: "Kesenian Tradisional Sambas: Generasi Muda Lestarikan Warisan Nenek Moyang", 
    category: "Sosial", 
    views: "7.2K", 
    time: "20m", 
    img: "https://images.unsplash.com/photo-1522066304428-dd1c7e6f8a5a?q=80&w=1200",
    description: "Generasi muda Sambas belajar dan mengajarkan seni tradisional untuk menjaga kelestarian budaya lokal.",
    channel: "Seni Sambas"
  },

  // === KONTEN SANGGAU ===
  { 
    id: "pol006", 
    title: "Pembangunan Daerah Sanggau: Fokus pada Pertanian dan Konektivitas", 
    category: "Politik", 
    views: "5.4K", 
    time: "22m", 
    img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1200",
    description: "Visi pemerintah Sanggau dalam mengembangkan pertanian modern sambil meningkatkan infrastruktur jalan dan telekomunikasi.",
    channel: "Sanggau News"
  },
  { 
    id: "sos008", 
    title: "Kelompok Tani Sanggau Adopsi Teknologi Pertanian Organik", 
    category: "Sosial", 
    views: "6.8K", 
    time: "18m", 
    img: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=1200",
    description: "Petani muda Sanggau mengubah pertanian konvensional menjadi pertanian organik untuk produk berkualitas tinggi.",
    channel: "Pertanian Sanggau"
  },

  // === KONTEN KAPUAS HULU ===
  { 
    id: "pol007", 
    title: "Perlindungan Hutan Hujan Kapuas Hulu: Tanggung Jawab Bersama Masyarakat dan Pemerintah", 
    category: "Politik", 
    views: "9.5K", 
    time: "32m", 
    img: "https://images.unsplash.com/photo-1518531933037-91b2f8f0b0c5?q=80&w=1200",
    description: "Upaya konservasi hutan Kapuas Hulu melibatkan masyarakat lokal dan pemerintah untuk menjaga ekosistem yang rapuh.",
    channel: "Lingkungan Kalbar",
    isLive: true
  },
  { 
    id: "sos009", 
    title: "Masyarakat Dayak Kapuas Hulu: Menjaga Tradisi di Era Modern", 
    category: "Sosial", 
    views: "8.3K", 
    time: "24m", 
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200",
    description: "Komunitas Dayak Kapuas Hulu menjaga tradisi leluhur sambil merangkul modernisasi dan pendidikan.",
    channel: "Dayak Budaya"
  },

  // === KONTEN KETAPANG ===
  { 
    id: "pol008", 
    title: "Ekspor Minyak Sawit Ketapang: Dilema Ekonomi dan Lingkungan", 
    category: "Politik", 
    views: "12.1K", 
    time: "40m", 
    img: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=1200",
    description: "Ketapang sebagai salah satu produsen minyak sawit terbesar dihadapkan pada dilema antara ekonomi dan keberlanjutan lingkungan.",
    channel: "Politik Kalbar",
    isLive: true
  },
  { 
    id: "sos010", 
    title: "Alih Profesi Petani Ketapang: Tantangan Transisi Ekonomi", 
    category: "Sosial", 
    views: "7.6K", 
    time: "21m", 
    img: "https://images.unsplash.com/photo-1400993543529-649490aa6ace?q=80&w=1200",
    description: "Petani tradisional Ketapang berusaha beradaptasi dengan perubahan lanskap pertanian dan ekonomi lokal.",
    channel: "Ekonomi Ketapang"
  },

  // === KONTEN TAMBAHAN NASIONAL ===
  { 
    id: "j-5AIsmU_a4", 
    title: "Visi Digitalisasi UMKM Kalimantan Barat Menuju Indonesia Emas 2045", 
    category: "Ekonomi", 
    views: "3.1K", 
    time: "2h", 
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200",
    description: "Bagaimana teknologi membantu pedagang lokal menembus pasar internasional.",
    channel: "Ekonomi Kita"
  },
  { 
    id: "vI8H-5zY5bE", 
    title: "Analisis Politik: Peta Kekuatan Calon Gubernur Kalimantan Barat", 
    category: "Politik", 
    views: "18.5K", 
    time: "5h", 
    img: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=1200",
    description: "Bedah visi-misi dan track record para kandidat pemimpin masa depan Kalimantan Barat.",
    channel: "Politik Hari Ini"
  },
  { 
    id: "abc123def", 
    title: "Teknologi AI Terbaru Mengubah Industri Kreatif Indonesia", 
    category: "Teknologi", 
    views: "24.8K", 
    time: "15m", 
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
    description: "Eksplorasi bagaimana artificial intelligence sedang merevolusi cara kita berkarya.",
    channel: "Tech Insider"
  },
  { 
    id: "xyz789uv", 
    title: "Festival Budaya Nusantara: Warisan Seni Tradisional yang Hidup", 
    category: "Hiburan", 
    views: "9.3K", 
    time: "22m", 
    img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200",
    description: "Perayaan meriah menampilkan keindahan budaya lokal dari berbagai daerah.",
    channel: "Budaya Nusantara",
    isLive: true
  },
  { 
    id: "qwe456rty", 
    title: "Strategi Bisnis E-Commerce 2026: Meningkatkan Penjualan hingga 300%", 
    category: "Ekonomi", 
    views: "15.6K", 
    time: "18m", 
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200",
    description: "Tips dan trik dari para expert untuk mengembangkan bisnis online Anda.",
    channel: "Bisnis Pro"
  },
  { 
    id: "asdfgh789", 
    title: "Pariwisata Berkelanjutan: Menjaga Alam Sambil Berwisata", 
    category: "Pariwisata", 
    views: "7.1K", 
    time: "20m", 
    img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200",
    description: "Panduan wisata ramah lingkungan untuk menjaga kelestarian alam.",
    channel: "Green Travel"
  },
  { 
    id: "zxcvbn012", 
    title: "Infrastruktur Jalan Tol Trans-Kalimantan: Menghubungkan Pulau Besar", 
    category: "Infrastruktur", 
    views: "11.2K", 
    time: "25m", 
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200",
    description: "Proyek besar yang akan mengubah konektivitas Kalimantan selamanya.",
    channel: "Borneo Update"
  },
  { 
    id: "mnbvcx345", 
    title: "Musik Elektronik Indonesia Meledak di Pasar Global", 
    category: "Hiburan", 
    views: "18.9K", 
    time: "17m", 
    img: "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?q=80&w=1200",
    description: "Bagaimana musisi lokal berhasil mendominasi chart internasional.",
    channel: "Music Revolution"
  },
  { 
    id: "poiuyt678", 
    title: "5G Network Expansion: Teknologi Internet Masa Depan di Indonesia", 
    category: "Teknologi", 
    views: "13.4K", 
    time: "19m", 
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200",
    description: "Revolusi teknologi 5G mengubah cara kita terhubung dan berkomunikasi.",
    channel: "Tech Insider"
  },
];

const CATEGORIES = ["Semua", "Pontianak", "Singkawang", "Mempawah", "Sambas", "Sanggau", "Kapuas Hulu", "Ketapang"];

// Kalbar Cities mapping
const KALBAR_CITIES: Record<string, string> = {
  "Pontianak": "Infrastruktur,Ekonomi,Politik,Sosial",
  "Singkawang": "Pariwisata,Budaya,Politik,Sosial",
  "Mempawah": "Ekonomi,Pertanian,Politik,Sosial",
  "Sambas": "Pariwisata,Budaya,Politik,Sosial",
  "Sanggau": "Infrastruktur,Politik,Sosial",
  "Kapuas Hulu": "Pariwisata,Lingkungan,Politik,Sosial",
  "Ketapang": "Pariwisata,Ekonomi,Politik,Sosial"
};

export default function ProVideomag() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("Semua");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const filteredVideos = useMemo(() => {
    return VIDEOS.filter(v => {
      const matchSearch = v.title.toLowerCase().includes(search.toLowerCase()) ||
                         v.channel.toLowerCase().includes(search.toLowerCase());
      let matchCat = activeCat === "Semua" || v.category === activeCat;
      
      if (activeCat !== "Semua" && KALBAR_CITIES[activeCat]) {
        const categories = KALBAR_CITIES[activeCat].split(",");
        matchCat = categories.includes(v.category);
      }
      
      return matchSearch && matchCat;
    });
  }, [search, activeCat]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-rose-50 text-slate-900 font-sans">
      
      {/* --- MODERN HEADER --- */}
      <nav className="fixed top-0 w-full h-16 bg-white/95 backdrop-blur-xl border-b border-slate-200/60 z-[100]">
        <div className="h-full max-w-[1920px] mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          
          {/* Left Section - Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors hidden md:flex"
            >
              <Menu size={22} className="text-slate-700" />
            </button>
            
            <img 
              src="/harapankalbar.jpeg" 
              alt="HarapanKalbar Logo"
              className="h-16 sm:h-20 w-auto rounded-lg object-contain"
            />
          </div>

          {/* Center Section - Search */}
          <div className="flex-1 max-w-3xl hidden sm:block mx-3">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Search className="text-slate-400 group-focus-within:text-rose-500 transition-colors" size={20} />
              </div>
              <input 
                type="text"
                placeholder="Cari video, topik, atau kota..."
                className="w-full bg-white border border-slate-200/60 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="p-2 sm:hidden text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Search size={20} />
            </button>

            <button className="p-2.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors relative hidden sm:block">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
            
            <div className="w-px h-6 bg-slate-200/60 hidden lg:block"></div>
            
            <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-100 rounded-lg transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center border border-rose-200/50">
                <User size={16} className="text-rose-600" />
              </div>
              <span className="text-sm font-semibold text-slate-700 hidden lg:block">Masuk</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {mobileSearchOpen && (
          <div className="sm:hidden px-4 py-4 bg-white border-b border-slate-200/60">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="text-slate-400" size={18} />
              </div>
              <input 
                type="text"
                placeholder="Cari video, kota..."
                className="w-full bg-white border border-slate-200/60 rounded-lg py-2.5 pl-10 pr-3 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
            </div>
          </div>
        )}
      </nav>

      <div className="flex pt-16">
        
        {/* --- DESKTOP SIDEBAR --- */}
        <aside className={`
          hidden md:flex flex-col sticky top-16 h-[calc(100vh-64px)] transition-all duration-300 border-r border-slate-200/60 bg-white
          ${isSidebarOpen ? 'w-64' : 'w-20'}
        `}>
          <div className="space-y-1 p-4 flex-1">
            <SidebarItem icon={<Home size={20}/>} label="Beranda" active compact={!isSidebarOpen} />
            <SidebarItem icon={<Compass size={20}/>} label="Jelajahi" compact={!isSidebarOpen} />
            <SidebarItem icon={<Video size={20}/>} label="Koleksi" compact={!isSidebarOpen} />
            <SidebarItem icon={<History size={20}/>} label="Riwayat" compact={!isSidebarOpen} />
          </div>
          
          {isSidebarOpen && (
            <div className="mt-auto pt-6 p-4 border-t border-slate-200/60">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">Kategori Populer</p>
              <div className="space-y-1">
                <SidebarItem icon={<Flame size={20}/>} label="Trending" />
                <SidebarItem icon={<Radio size={20}/>} label="Live Sekarang" isLive />
                <SidebarItem icon={<Bookmark size={20}/>} label="Tersimpan" />
              </div>
            </div>
          )}
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1 min-w-0 pb-24 sm:pb-12 md:pb-8">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
            {/* Featured Hero Section */}
            {!search && (
              <section 
                onClick={() => setSelectedVideo(VIDEOS[0])}
                className="mb-12 relative aspect-[16/9] md:aspect-[20/9] rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer border border-slate-200/60"
              >
                <img 
                  src={VIDEOS[0].img} 
                  alt="Featured"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
                
                <div className="absolute inset-0 flex flex-col justify-end">
                  <div className="p-6 sm:p-10 md:p-14">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      {VIDEOS[0].isLive && (
                        <span className="bg-rose-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span> Live
                        </span>
                      )}
                      <span className="text-white/90 text-xs font-bold backdrop-blur-md bg-white/20 px-3 py-1.5 rounded-full uppercase">
                        {VIDEOS[0].category}
                      </span>
                    </div>
                    
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight line-clamp-2 md:line-clamp-3 md:max-w-2xl">
                      {VIDEOS[0].title}
                    </h2>
                    
                    <p className="hidden sm:block text-white/80 text-sm md:text-base mb-6 max-w-xl line-clamp-2">
                      {VIDEOS[0].description}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <button className="flex items-center gap-2 bg-white text-slate-900 px-6 sm:px-8 py-3 rounded-xl font-bold hover:bg-rose-50 hover:text-rose-600 transition-all transform hover:scale-105 border border-slate-200">
                        <Play fill="currentColor" size={20} /> Tonton Sekarang
                      </button>
                      <div className="flex items-center gap-2 text-white/80 text-sm font-semibold">
                        <Eye size={18}/> {VIDEOS[0].views} Penonton
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Section Title */}
            {!search && (
              <div className="mb-8">
                <h3 className="text-2xl font-black text-slate-900 mb-4">Jelajahi Video</h3>
              </div>
            )}

            {/* Category Filter Pills */}
            <div className="mb-10 sticky top-16 z-40 bg-gradient-to-b from-white via-white to-transparent pt-2 pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-slate-200/60">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3">
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCat(cat)}
                    title={cat !== "Semua" ? `Konten dari ${cat}` : "Semua konten"}
                    className={`px-4 sm:px-5 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap transition-all duration-200 border flex-shrink-0
                      ${activeCat === cat 
                        ? 'bg-rose-500 text-white border-rose-500' 
                        : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200/60 hover:border-slate-300'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Video Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredVideos.length > 0 ? (
                filteredVideos.map((v) => (
                  <VideoCard key={v.id} video={v} onClick={() => setSelectedVideo(v)} />
                ))
              ) : (
                <div className="col-span-full py-16 text-center">
                  <Video size={52} className="mx-auto text-slate-300 mb-4" />
                  <p className="text-slate-600 font-semibold text-lg">Tidak ada video ditemukan</p>
                  <p className="text-slate-400 text-sm mt-2">Coba cari dengan kata kunci atau lokasi lain</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* --- MOBILE BOTTOM NAV --- */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white/95 backdrop-blur-xl border-t border-slate-200/60 px-4 py-3 flex justify-between items-center z-[100]">
        <MobileNavItem icon={<Home size={24}/>} active />
        <MobileNavItem icon={<Compass size={24}/>} />
        <div className="relative -top-7">
          <button className="bg-gradient-to-br from-rose-500 to-rose-600 text-white p-4 rounded-2xl border-4 border-white hover:from-rose-600 hover:to-rose-700 transition-all transform hover:scale-110 active:scale-95">
            <Play fill="white" size={22} />
          </button>
        </div>
        <MobileNavItem icon={<Video size={24}/>} />
        <MobileNavItem icon={<User size={24}/>} />
      </nav>

      {/* --- FULLSCREEN PLAYER --- */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black z-[200] flex flex-col lg:flex-row animate-in fade-in duration-300 overflow-hidden">
          <button 
            onClick={() => setSelectedVideo(null)}
            className="absolute top-4 right-4 z-[210] p-2 bg-white/15 hover:bg-white/25 text-white rounded-full backdrop-blur-md transition-all transform hover:scale-110"
          >
            <X size={24} />
          </button>

          <div className="flex-1 flex items-center justify-center bg-slate-900">
            <div className="w-full h-screen lg:h-auto aspect-video">
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`} 
                className="w-full h-full"
                allowFullScreen 
                allow="autoplay; encrypted-media"
              />
            </div>
          </div>

          <div className="w-full lg:w-[420px] bg-white h-auto lg:h-screen overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Title */}
              <div>
                <h3 className="text-xl font-black text-slate-900 leading-tight line-clamp-3">{selectedVideo.title}</h3>
              </div>
              
              {/* Channel Info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center text-white font-bold text-lg">
                  {selectedVideo.channel.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 truncate">{selectedVideo.channel}</h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">1.2M Pelanggan</p>
                </div>
                <button className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all transform hover:scale-105 flex-shrink-0 border border-rose-600">
                  Ikuti
                </button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-bold text-slate-700 transition-all transform hover:scale-105">
                  <ThumbsUp size={18} /> Suka
                </button>
                <button className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-bold text-slate-700 transition-all transform hover:scale-105">
                  <Share2 size={18} /> Bagikan
                </button>
              </div>

              {/* Divider */}
              <div className="h-px bg-slate-200"></div>

              {/* Description */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase mb-3 tracking-wider">Deskripsi Video</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedVideo.description}
                </p>
              </div>

              {/* Category Badge */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase mb-3 tracking-wider">Kategori</p>
                <div className="inline-block bg-rose-50 text-rose-600 text-sm font-bold px-4 py-2 rounded-lg">
                  {selectedVideo.category}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-in { animation: fade-in 0.3s ease-out; }
      `}</style>
    </div>
  );
}

// --- Components ---

const SidebarItem = ({ icon, label, active = false, compact = false, isLive = false }: any) => (
  <button className={`
    w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group
    ${active ? 'bg-rose-50 text-rose-600' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}
    ${compact ? 'justify-center px-2' : ''}
  `}>
    <div className={`flex-shrink-0 transition-colors ${active ? 'text-rose-600' : 'text-slate-400 group-hover:text-rose-500'}`}>
      {icon}
    </div>
    {!compact && (
      <span className={`text-sm font-bold flex-1 text-left transition-colors ${active ? 'text-rose-600' : ''}`}>{label}</span>
    )}
    {isLive && !compact && <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse flex-shrink-0"></span>}
  </button>
);

const MobileNavItem = ({ icon, active = false }: any) => (
  <button className={`p-3 transition-all ${active ? 'text-rose-600' : 'text-slate-400 hover:text-slate-600'}`}>
    {icon}
  </button>
);

const VideoCard = ({ video, onClick }: { video: Video; onClick: () => void }) => (
  <article 
    onClick={onClick}
    className="group cursor-pointer flex flex-col h-full bg-white rounded-xl overflow-hidden border border-slate-200/60 hover:border-slate-300 transition-all duration-300"
  >
    <div className="relative aspect-video overflow-hidden bg-slate-100">
      <img 
        src={video.img} 
        alt={video.title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-all duration-300">
          <Play fill="white" size={28} />
        </div>
      </div>
      <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
        {video.time}
      </div>
      {video.isLive && (
        <div className="absolute top-2 left-2 bg-rose-500 text-white text-[9px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span> LIVE
        </div>
      )}
    </div>
    
    <div className="p-4 flex gap-3 flex-1">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-100 to-rose-50 flex items-center justify-center text-rose-600 font-bold group-hover:from-rose-200 group-hover:to-rose-100 transition-all text-sm">
          {video.channel.charAt(0)}
        </div>
      </div>
      <div className="flex flex-col min-w-0">
        <h3 className="font-bold text-[14px] leading-snug mb-1.5 text-slate-900 line-clamp-2 group-hover:text-rose-600 transition-colors">
          {video.title}
        </h3>
        <p className="text-xs font-semibold text-slate-500 mb-2 truncate">{video.channel}</p>
        <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400 uppercase tracking-tight">
          <span className="flex items-center gap-1"><Eye size={12}/> {video.views}</span>
          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
          <span>Baru saja</span>
        </div>
      </div>
    </div>
  </article>
);