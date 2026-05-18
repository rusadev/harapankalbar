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
  }
];

const CATEGORIES = ["Semua", "Pontianak", "Singkawang", "Mempawah", "Sambas", "Sanggau", "Kapuas Hulu", "Ketapang"];

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
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      
      {/* --- MODERN HEADER --- */}
      <nav className="fixed top-0 w-full h-16 bg-white border-b border-slate-100 z-[100]">
        <div className="h-full max-w-[1920px] mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          
          {/* Left Section - Logo & Hamburger */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              aria-label="Toggle Menu"
            >
              <Menu size={22} className="text-slate-700" />
            </button>
            
            <img 
              src="/harapankalbar.jpeg" 
              alt="HarapanKalbar Logo"
              className="h-14 w-auto rounded-lg object-contain"
            />
          </div>

          {/* Center Section - Search */}
          <div className="flex-1 max-w-2xl hidden sm:block mx-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Search className="text-slate-400 group-focus-within:text-slate-900 transition-colors" size={18} />
              </div>
              <input 
                type="text"
                placeholder="Cari video, topik, atau kota..."
                className="w-full bg-slate-50 border border-slate-200/80 rounded-full py-2 pl-11 pr-4 text-sm focus:bg-white focus:border-slate-900 transition-all outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-1 sm:gap-3">
            <button 
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="p-2 sm:hidden text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <Search size={20} />
            </button>

            <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative hidden sm:block">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
            
            <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-full transition-colors">
              <User size={16} className="text-slate-700" />
              <span className="text-sm font-medium text-slate-700 hidden lg:block">Masuk</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {mobileSearchOpen && (
          <div className="sm:hidden px-4 py-3 bg-white border-b border-slate-100">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="text-slate-400" size={18} />
              </div>
              <input 
                type="text"
                placeholder="Cari video, kota..."
                className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-3 text-sm focus:bg-white focus:border-slate-900 outline-none transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
            </div>
          </div>
        )}
      </nav>

      <div className="flex pt-16">
        
        {/* --- RESPONSIVE SIDEBAR (MOBILE DRAWER & DESKTOP COLLAPSIBLE) --- */}
        {/* Backdrop overlay untuk perangkat mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <aside className={`
          fixed md:sticky top-16 h-[calc(100vh-64px)] z-50 md:z-30 bg-white transition-all duration-300 flex flex-col flex-shrink-0
          ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-0 md:w-20 -translate-x-full md:translate-x-0 overflow-hidden'}
        `}>
          <div className="space-y-1 p-3 flex-1">
            <SidebarItem icon={<Home size={20}/>} label="Beranda" active compact={!isSidebarOpen} />
            <SidebarItem icon={<Compass size={20}/>} label="Jelajahi" compact={!isSidebarOpen} />
            <SidebarItem icon={<Video size={20}/>} label="Koleksi" compact={!isSidebarOpen} />
            <SidebarItem icon={<History size={20}/>} label="Riwayat" compact={!isSidebarOpen} />
          </div>
          
          {(isSidebarOpen || true) && (
            <div className={`mt-auto pt-4 p-3 border-t border-slate-100 transition-opacity duration-200 ${!isSidebarOpen ? 'md:opacity-0' : 'opacity-100'}`}>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3">Kategori Populer</p>
              <div className="space-y-1">
                <SidebarItem icon={<Flame size={20}/>} label="Trending" />
                <SidebarItem icon={<Radio size={20}/>} label="Live" isLive />
                <SidebarItem icon={<Bookmark size={20}/>} label="Tersimpan" />
              </div>
            </div>
          )}
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1 min-w-0 pb-24 sm:pb-12 md:pb-8 transition-all duration-300">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          
            {/* Featured Hero Section */}
            {!search && (
              <section 
                onClick={() => setSelectedVideo(VIDEOS[0])}
                className="mb-8 relative aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden group cursor-pointer"
              >
                <img 
                  src={VIDEOS[0].img} 
                  alt="Featured"
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-black/40" />
                
                <div className="absolute inset-0 flex flex-col justify-end">
                  <div className="p-6 sm:p-10 md:p-12">
                    <div className="flex items-center gap-2 mb-3">
                      {VIDEOS[0].isLive && (
                        <span className="bg-rose-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-sm flex items-center gap-1 uppercase tracking-wide">
                          Live
                        </span>
                      )}
                      <span className="bg-white/20 text-white text-xs font-medium px-2.5 py-1 rounded-sm backdrop-blur-sm">
                        {VIDEOS[0].category}
                      </span>
                    </div>
                    
                    <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-white mb-3 leading-tight line-clamp-2 max-w-3xl">
                      {VIDEOS[0].title}
                    </h2>
                    
                    <div className="flex items-center gap-3 text-white/90 text-sm font-medium">
                      <span>{VIDEOS[0].channel}</span>
                      <span className="w-1 h-1 bg-white/60 rounded-full"></span>
                      <span>{VIDEOS[0].views} Penonton</span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* MINIMALIST CATEGORY FILTER (YOUTUBE STYLE) */}
            <div className="mb-6 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCat(cat)}
                    title={cat !== "Semua" ? `Konten dari ${cat}` : "Semua konten"}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium tracking-wide whitespace-nowrap transition-colors duration-150 flex-shrink-0
                      ${activeCat === cat 
                        ? 'bg-slate-900 text-white' 
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Video Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
              {filteredVideos.length > 0 ? (
                filteredVideos.map((v) => (
                  <VideoCard key={v.id} video={v} onClick={() => setSelectedVideo(v)} />
                ))
              ) : (
                <div className="col-span-full py-16 text-center">
                  <Video size={48} className="mx-auto text-slate-300 mb-3" />
                  <p className="text-slate-800 font-medium text-base">Tidak ada video ditemukan</p>
                  <p className="text-slate-400 text-sm mt-1">Coba cari dengan kata kunci atau lokasi lain</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* --- MOBILE BOTTOM NAV --- */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-slate-100 px-4 py-2 flex justify-around items-center z-[100]">
        <MobileNavItem icon={<Home size={22}/>} active />
        <MobileNavItem icon={<Compass size={22}/>} />
        <MobileNavItem icon={<Video size={22}/>} />
        <MobileNavItem icon={<User size={22}/>} />
      </nav>

      {/* --- FULLSCREEN PLAYER --- */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black z-[200] flex flex-col lg:flex-row animate-in fade-in duration-200 overflow-hidden"
          onKeyDown={(e) => e.key === 'Escape' && setSelectedVideo(null)}
          tabIndex={-1}
        >
          {/* Close Button */}
          <button 
            onClick={() => setSelectedVideo(null)}
            title="Tutup (ESC)"
            className="absolute top-4 right-4 z-[210] w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all flex items-center justify-center"
          >
            <X size={24} />
          </button>

          <div className="flex-1 flex items-center justify-center bg-black">
            <div className="w-full aspect-video max-h-screen">
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`} 
                className="w-full h-full border-0"
                allowFullScreen 
                allow="autoplay; encrypted-media"
              />
            </div>
          </div>

          <div className="w-full lg:w-[400px] bg-white h-auto lg:h-screen overflow-y-auto flex flex-col">
            <div className="lg:hidden flex items-center justify-between p-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900">Detail Video</h3>
              <button onClick={() => setSelectedVideo(null)} className="p-1.5 hover:bg-slate-100 rounded-full">
                <X size={20} className="text-slate-600" />
              </button>
            </div>

            <div className="p-5 space-y-5 flex-1">
              <h3 className="text-lg font-bold text-slate-900 leading-snug">{selectedVideo.title}</h3>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-semibold text-sm">
                  {selectedVideo.channel.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-slate-900 truncate">{selectedVideo.channel}</h4>
                  <p className="text-xs text-slate-400">1.2M Subscriber</p>
                </div>
                <button className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-full text-xs font-medium transition-colors">
                  Subscribe
                </button>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-slate-100 hover:bg-slate-200 rounded-full text-xs font-semibold text-slate-800">
                  <ThumbsUp size={16} /> Suka
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-slate-100 hover:bg-slate-200 rounded-full text-xs font-semibold text-slate-800">
                  <Share2 size={16} /> Bagikan
                </button>
              </div>

              <div className="h-px bg-slate-100"></div>

              <div className="bg-slate-50 rounded-xl p-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-1">
                  <span>{selectedVideo.views} x ditonton</span>
                  <span>•</span>
                  <span>{selectedVideo.category}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                  {selectedVideo.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-in { animation: fade-in 0.2s ease-out; }
      `}</style>
    </div>
  );
}

// --- Inner Components ---

const SidebarItem = ({ icon, label, active = false, compact = false, isLive = false }: any) => (
  <button className={`
    w-full flex items-center gap-5 px-4 py-2.5 rounded-xl transition-colors duration-150 group
    ${active ? 'bg-slate-100 text-slate-900 font-medium' : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'}
    ${compact ? 'md:justify-center md:px-0' : ''}
  `}>
    <div className={`flex-shrink-0 transition-colors ${active ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-900'}`}>
      {icon}
    </div>
    <span className={`text-sm text-left truncate transition-opacity duration-150 ${compact ? 'md:hidden' : 'block'}`}>{label}</span>
    {isLive && !compact && <span className="w-1.5 h-1.5 bg-rose-600 rounded-full ml-auto"></span>}
  </button>
);

const MobileNavItem = ({ icon, active = false }: any) => (
  <button className={`p-2 flex flex-col items-center gap-0.5 transition-colors ${active ? 'text-slate-900' : 'text-slate-500'}`}>
    {icon}
  </button>
);

const VideoCard = ({ video, onClick }: { video: Video; onClick: () => void }) => (
  <article onClick={onClick} className="group cursor-pointer flex flex-col w-full">
    {/* Thumbnail */}
    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 w-full mb-3">
      <img 
        src={video.img} 
        alt={video.title} 
        className="w-full h-full object-cover" 
      />
      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[11px] font-medium px-1.5 py-0.5 rounded-sm">
        {video.time}
      </div>
      {video.isLive && (
        <div className="absolute top-2 left-2 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm tracking-wide">
          LIVE
        </div>
      )}
    </div>
    
    {/* Meta Details */}
    <div className="flex gap-3 px-1">
      <div className="flex-shrink-0 mt-0.5">
        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 font-semibold text-xs">
          {video.channel.charAt(0)}
        </div>
      </div>
      <div className="flex flex-col min-w-0">
        <h3 className="font-semibold text-sm leading-snug mb-1 text-slate-900 line-clamp-2 group-hover:text-slate-700">
          {video.title}
        </h3>
        <p className="text-xs text-slate-500 hover:text-slate-900 truncate mb-0.5">{video.channel}</p>
        <div className="flex items-center text-xs text-slate-400">
          <span>{video.views} x ditonton</span>
          <span className="mx-1">•</span>
          <span>Baru saja</span>
        </div>
      </div>
    </div>
  </article>
);