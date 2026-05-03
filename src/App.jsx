import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Building2, Camera, Home, Image as ImageIcon, X, ArrowRight, ArrowLeft, Heart, Play, Volume2, VolumeX, ExternalLink } from 'lucide-react';

// --- DATA SOURCE ---
const tourData = [
  {
    id: "city-tour",
    name: "Manila City Tour",
    logo: "/logos/citytourlogo.jpg", 
    date: "April 5",
    loc: "Manila City",
    about: "Our journey began with a deep dive into the historical heart of the Philippines. Exploring landmarks like the walled city of Intramuros and the breezy stretch of Manila Bay provided a necessary cultural grounding. It served as a moment of reflection on our national identity, offering a peaceful transition before we moved into the fast-paced, high-tech environments of the country's business hubs.",
    images: ["/tour/city tour.jpeg", "/tour/city tour_1.jpeg", "/tour/city tour_2.jpeg", "/tour/city tour_3.jpeg", "/tour/city tour_4.jpeg", "/tour/city tour_5.jpeg", "/tour/city tour_6.jpeg"],
    videos: ["/tour/citytour.MOV", "/tour/citytour1.MOV"]
  },
  {
    id: "hytec",
    name: "Hytec Power INC",
    logo: "/logos/hyteclogo.jpg", 
    date: "April 6",
    loc: "Quezon City",
    about: "Hytec serves as a bridge between academia and heavy industry, specializing in advanced automation and industrial training systems. During the facility tour led by Ate Joy, we explored specialized labs featuring VR welding setups, electrical engineering simulators, and robotics projects developed by former students. The visit highlighted how virtual environments allow for risk-free mastery of complex machinery, effectively removing the danger from the learning process.",
    images: ["/tour/hytec.jpeg", "/tour/hytec_1.jpeg", "/tour/hytec_2.jpeg", "/tour/hytec_3.jpeg", "/tour/hytec_4.jpeg"],
    videos: ["/tour/hytec.MOV"]
  },
  {
    id: "opentext",
    name: "OpenText Philippines",
    logo: "/logos/opentextlogo.png",
    date: "April 6",
    loc: "Makati City",
    about: "Located in the heart of BGC, OpenText is a global force in Enterprise Information Management (EIM), managing sensitive data for 99 of the world's top 100 companies. Because of their strict security protocols regarding client data, we focused on their corporate operations and professional pipeline. We learned that succeeding in a world-class tech firm requires a blend of technical expertise and a proactive, professional attitude during the recruitment process.",
    images: ["/tour/opentext.jpeg", "/tour/opentext_1.jpeg", "/tour/opentext_2.jpeg", "/tour/opentext_3.jpeg"],
    videos: ["/tour/opentexy.MOV", "/tour/opentext1.MOV"]
  },
  {
    id: "mmda",
    name: "MMDA Command Center",
    logo: "/logos/mmdalogo.png",
    date: "April 7",
    loc: "Pasig City",
    about: "The MMDA headquarters houses a sophisticated nerve center that monitors Metro Manila through a massive high-definition video wall. Utilizing a dedicated underground fiber optic network to eliminate lag, the center employs AI-driven surveillance to detect traffic violations and coordinate emergency responses in real-time. The visit underscored how modern urban governance relies on stable, data-driven systems to ensure public safety and manage the city's complex flow.",
    images: ["/tour/mmda.jpeg", "/tour/mmda_1.jpeg", "/tour/mmda_2.jpeg", "/tour/mmda_3.jpeg"],
    videos: ["/tour/mmda.MOV"]
  },
  {
    id: "tp",
    name: "Teleperformance",
    logo: "/logos/teleperformancelogo.png",
    date: "April 7",
    loc: "Various Locations",
    about: "Teleperformance operates on a massive scale, managing digitally integrated business services for international markets. The visit revealed the technical complexity behind the scenes, where agents utilize advanced analytics and AI tools to handle specialized accounts ranging from healthcare to tech support. It demonstrated that the BPO industry is a high-energy environment built on precision, rapid problem-solving, and a focus on employee well-being.",
    images: ["/tour/teleperformance.jpeg", "/tour/teleperformance_1.jpeg", "/tour/teleperformance_2.jpeg", "/tour/teleperformance_3.jpeg"],
    videos: []
  },
  {
    id: "toppeg",
    name: "TOP PEG ANIMATION STUDIO",
    logo: "/logos/toppeglogo.jpg",
    date: "April 8",
    loc: "Las Piñas",
    about: "As a pioneer in Filipino animation, Top Peg has contributed to global icons for Disney, Nintendo, and Netflix. We gained hands-on experience with professional Pen Displays and learned about the intricate collaborative pipeline that powers a studio. From character rigging to color grading, the visit showed that animation is a disciplined team effort where passion and technical patience are required to bring creative visions to life on a global stage.",
    images: ["/tour/toppeg.jpeg", "/tour/toppeg_1.jpeg", "/tour/toppeg_2.jpeg"],
    videos: ["/tour/toppeg.MOV"]
  },
  {
    id: "micro",
    name: "MicroSourcing Philippines",
    logo: "/logos/microsourcinglogo.png",
    date: "April 8",
    loc: "Pasay City",
    about: "MicroSourcing specializes in offshore outsourcing, helping foreign companies build professional teams in the Philippines. Their leadership panel provided an honest look at the global job market, emphasizing that we are competing on a worldwide scale. The session highlighted that while technical skills secure the interview, soft skills and a professional mindset are the key factors for long-term growth and mentorship within a company.",
    images: ["/tour/microsourcing.jpeg", "/tour/microsourcing_1.jpeg", "/tour/microsourcing_2.jpeg"],
    videos: []
  },
  {
    id: "tagaytay",
    name: "Tagaytay City",
    logo: "/logos/tagaytaylogo.png", 
    date: "April 9",
    loc: "Cavite",
    about: "Coinciding with the Day of Valor, we traveled to the cool heights of Tagaytay. At People's Park in the Sky—situated 700 meters above sea level—we witnessed the ruins of the unfinished mansion and a clear view of Taal Volcano. Later at Sky Ranch, we enjoyed the 'Sky Eye' Ferris wheel, realizing that stepping slightly out of one's comfort zone, even with a fear of heights, is the best way to earn a new perspective.",
    images: ["/tour/tagaytay.jpeg", "/tour/tagaytay_1.jpeg", "/tour/tagaytay_2.jpeg", "/tour/tagaytay_3.jpeg"],
    videos: ["/tour/tagaytay.MOV", "/tour/tagaytay1.MOV"]
  },
  {
    id: "baguio",
    name: "Baguio City",
    logo: "/logos/baguiologo.jpg", 
    date: "April 10 - 11",
    loc: "Benguet",
    about: "The final leg of our tour took us to the Summer Capital. We explored the La Trinidad Strawberry Farm to learn about local agriculture and visited the massive 373-hectare Philippine Military Academy campus. The visit to Fort del Pilar, including Melchor Hall and the WWII aircraft displays, showed a world of intense discipline. The trip also emphasized the importance of logistics, from choosing safer travel routes to relying on the expert local knowledge of our guides.",
    images: ["/tour/baguio.jpeg", "/tour/baguio_1.jpeg", "/tour/baguio_2.jpeg", "/tour/baguio_3.jpeg", "/tour/baguio_4.jpeg", "/tour/baguio_5.jpeg", "/tour/baguio_6.jpeg", "/tour/baguio_7.jpeg"],
    videos: ["/tour/baguio.MOV", "/tour/baguio1.MOV"]
  }
];

const generalPhotos = [
  { src: "/tour/plane.jpeg", label: "Departure" },
  { src: "/tour/plane_1.jpeg", label: "In-Flight" },
  { src: "/tour/plane_2.jpeg", label: "Arrival" }
];

const galleryItems = [
  ...generalPhotos.map(p => ({ ...p, type: 'image' })),
  ...tourData.flatMap(d => d.images.map(img => ({ src: img, type: 'image', label: d.name }))),
  ...tourData.flatMap(d => d.videos.map(vid => ({ src: vid, type: 'video', label: d.name })))
];

const collagePhotos = tourData.flatMap(d => d.images);

// --- COMPONENTS ---

const PhotoCollageBackground = () => {
  const [visibleIndices, setVisibleIndices] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleIndices(prev => {
        if (prev.length >= collagePhotos.length) {
          clearInterval(timer);
          return prev;
        }
        const remaining = collagePhotos.map((_, i) => i).filter(i => !prev.includes(i));
        if (remaining.length === 0) return prev;
        const next = remaining[Math.floor(Math.random() * remaining.length)];
        return [...prev, next];
      });
    }, 100); 
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-black overflow-hidden pointer-events-none">
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 w-full h-full opacity-40">
        {collagePhotos.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={visibleIndices.includes(i) ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
            className="w-full h-full border border-white/5"
          >
            <img src={src} className="w-full h-full object-cover" alt="" onError={(e) => { e.target.style.display = 'none'; }} />
          </motion.div>
        ))}
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/40 to-black" />
    </div>
  );
};

const MeshBackground = () => (
  <div className="fixed inset-0 z-0 bg-black overflow-hidden pointer-events-none">
    <motion.div 
      animate={{ x: [-100, 100], y: [-50, 50], scale: [1, 1.1, 1] }} 
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} 
      className="absolute top-0 left-0 w-full h-full opacity-30 blur-[100px]" 
      style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%)' }} 
    />
  </div>
);

const ModalMediaGallery = ({ items }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, [items.length]);

  const next = (e) => { e.stopPropagation(); setIndex((prev) => (prev + 1) % items.length); };
  const prev = (e) => { e.stopPropagation(); setIndex((prev) => (prev - 1 + items.length) % items.length); };

  const current = items[index];

  return (
    <div className="relative w-full h-full group bg-black flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full flex items-center justify-center"
        >
          {current.type === 'video' ? (
            <video muted autoPlay loop key={current.src} className="max-w-full max-h-full object-contain">
              <source src={current.src} type="video/mp4" />
            </video>
          ) : (
            <img src={current.src} className="max-w-full max-h-full object-contain" alt="Gallery Item" />
          )}
        </motion.div>
      </AnimatePresence>

      <button onClick={prev} className="absolute left-6 z-30 p-4 rounded-full bg-black/40 text-white hover:text-[#10b981] backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto">
        <ArrowLeft size={32} />
      </button>
      <button onClick={next} className="absolute right-6 z-30 p-4 rounded-full bg-black/40 text-white hover:text-[#10b981] backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto">
        <ArrowRight size={32} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {items.map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${index === i ? 'w-8 bg-[#10b981]' : 'w-2 bg-white/20'}`} />
        ))}
      </div>
    </div>
  );
};

const CompanyModal = ({ company, onClose }) => {
  const mediaItems = [
    ...company.videos.map(v => ({ src: v, type: 'video' })),
    ...company.images.map(i => ({ src: i, type: 'image' }))
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-2xl"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
        className="relative w-full max-w-7xl h-full max-h-[85vh] bg-zinc-900 border border-white/10 rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl"
      >
        {/* FIX FOR IMAGE_F01755.JPG: Solid Close Button Overlay */}
        <button onClick={onClose} className="absolute top-6 right-6 md:top-8 md:right-8 z-[120] bg-black/80 p-4 rounded-full text-white hover:text-[#10b981] transition-all backdrop-blur-xl border border-white/20 shadow-2xl">
          <X size={28} />
        </button>

        <div className="w-full md:w-1/3 p-10 md:p-16 overflow-y-auto border-b md:border-b-0 md:border-r border-white/10 flex flex-col items-center text-center">
          <div className="mt-4 h-32 w-32 bg-white rounded-3xl p-4 flex items-center justify-center flex-shrink-0 shadow-2xl mb-10">
            <img src={company.logo} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-tight mb-8">{company.name}</h2>
          <span className="text-[#10b981] text-[11px] font-black uppercase tracking-[0.5em] mb-6 block italic">{company.date}</span>
          <p className="text-slate-400 italic text-lg leading-relaxed mb-10 px-4">{company.about}</p>
          <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-slate-500 bg-white/5 px-5 py-3 rounded-2xl border border-white/5 mx-auto">
            <MapPin size={18} className="text-[#10b981]"/> {company.loc}
          </div>
        </div>

        <div className="w-full md:w-2/3 h-full relative">
          <ModalMediaGallery items={mediaItems} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('about');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [zoomedMedia, setZoomedMedia] = useState(null);
  
  const [audioStarted, setAudioStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // FIX FOR IMAGE_F01755.JPG: Lock body scroll when modal is open
  useEffect(() => {
    if (selectedCompany || zoomedMedia) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [selectedCompany, zoomedMedia]);

  const handleGlobalClick = () => {
    if (!audioStarted && audioRef.current) {
      audioRef.current.play().catch(e => console.log("Autoplay context enabled"));
      setAudioStarted(true);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div 
      className="min-h-screen bg-black text-slate-200 font-sans selection:bg-[#10b981]/30 relative"
      onClick={handleGlobalClick}
    >
      <audio ref={audioRef} src="/tour/background-music.mp3" loop />

      {activeTab === 'about' ? <PhotoCollageBackground /> : <MeshBackground />}

      {/* FIX FOR IMAGE_F07FB7.JPG: Responsive Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-2xl border-b border-white/10 md:top-8 md:left-1/2 md:-translate-x-1/2 md:w-auto md:rounded-full md:border md:px-8 shadow-2xl">
        <div className="flex overflow-x-auto no-scrollbar items-center px-4 py-4 gap-6 md:gap-8 md:px-0">
          {[
            { id: 'about', label: 'About', icon: <Home size={14}/> },
            { id: 'destinations', label: 'Destinations', icon: <MapPin size={14}/> },
            { id: 'gallery', label: 'Gallery', icon: <ImageIcon size={14}/> },
            { id: 'acknowledgement', label: 'Acknowledgement', icon: <Heart size={14}/> }
          ].map(tab => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap flex-shrink-0 ${
                activeTab === tab.id ? 'text-[#10b981]' : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {audioStarted && (
        <button 
          onClick={toggleMute}
          className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 text-white hover:text-[#10b981] transition-all shadow-2xl"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      )}

      <AnimatePresence>
        {zoomedMedia && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setZoomedMedia(null)}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4 cursor-zoom-out"
          >
             <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"><X size={40} /></button>
             {zoomedMedia.type === 'video' ? (
               <video muted autoPlay loop className="max-w-full max-h-full rounded-2xl shadow-2xl">
                 <source src={zoomedMedia.src} type="video/mp4" />
               </video>
             ) : (
               <img src={zoomedMedia.src} className="max-w-full max-h-full rounded-2xl border border-white/10" alt="Zoomed" />
             )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{selectedCompany && <CompanyModal company={selectedCompany} onClose={() => setSelectedCompany(null)} />}</AnimatePresence>

      <AnimatePresence mode="wait">
        {activeTab === 'about' && (
          <motion.div key="about" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pt-32 md:pt-40 pb-20 px-6 max-w-4xl mx-auto text-center relative z-20">
            <div className="flex justify-center items-center gap-8 mb-10">
              <img src="/tour/WMSU.png" alt="WMSU Logo" className="h-16 md:h-20 w-auto drop-shadow-2xl" />
              <img src="/tour/CCS Seal.png" alt="CCS Seal" className="h-16 md:h-20 w-auto drop-shadow-2xl" />
            </div>
            <span className="text-[#10b981] font-black uppercase tracking-[0.5em] md:tracking-[0.8em] text-[10px] md:text-[14px] block mb-8 italic">WMSU - BSIT Industry Visit Blog</span>
            <h1 className="text-5xl md:text-[8.5rem] font-black uppercase italic leading-[0.8] mb-12 tracking-tighter drop-shadow-2xl">
              <span className="text-white">LUZON</span> <br /> <span className="text-[#10b981]">2026</span>
            </h1>
            <p className="text-lg md:text-2xl text-slate-200 leading-relaxed italic mb-12 drop-shadow-lg max-w-2xl mx-auto">An 8-day educational tour exploring the technology landscape of the Philippines.</p>
            <button onClick={() => setActiveTab('destinations')} className="group flex items-center gap-4 mx-auto text-[#10b981] font-black uppercase tracking-widest text-sm bg-black/40 backdrop-blur-md px-8 py-4 rounded-full border border-[#10b981]/30 hover:bg-[#10b981]/10 transition-all pointer-events-auto">Discover Destinations <ArrowRight size={18}/></button>
          </motion.div>
        )}

        {activeTab === 'destinations' && (
          <motion.div key="destinations" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 md:pt-40 pb-40 px-6 max-w-6xl mx-auto relative z-20">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic mb-16 tracking-tighter">TOUR <span className="text-[#10b981]">DESTINATIONS</span></h2>
            <div className="grid md:grid-cols-3 gap-6">
              {tourData.map(co => (
                <motion.div key={co.id} onClick={() => setSelectedCompany(co)} whileHover={{ y: -10 }} className="p-8 rounded-[3rem] bg-zinc-900/50 border border-white/10 backdrop-blur-xl cursor-pointer group flex flex-col items-center text-center">
                  <div className="h-24 w-24 bg-white rounded-2xl p-3 flex items-center justify-center mb-8 overflow-hidden"><img src={co.logo} className="w-full h-full object-contain" alt="Logo" /></div>
                  <h3 className="text-2xl font-black text-white uppercase italic mb-4">{co.name}</h3>
                  <p className="text-slate-500 text-[10px] font-bold uppercase flex items-center gap-2"><MapPin size={12} className="text-[#10b981]"/> {co.loc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'gallery' && (
          <motion.div key="gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 md:pt-40 pb-40 px-6 max-w-7xl mx-auto relative z-20">
            <div className="columns-1 sm:columns-2 md:columns-4 gap-6 space-y-6">
              {galleryItems.map((item, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05 }} onClick={() => setZoomedMedia(item)} className="rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 cursor-pointer group shadow-xl relative">
                  {item.type === 'video' ? (
                    <div className="aspect-video bg-black flex flex-col items-center justify-center gap-2 p-4">
                       <Play className="text-[#10b981]" size={48} />
                       <span className="text-white text-[10px] uppercase font-black tracking-tighter text-center">{item.label}</span>
                    </div>
                  ) : (
                    <>
                      <img src={item.src} className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700" alt={item.label} />
                      <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="text-white font-black uppercase italic tracking-tighter text-lg leading-none">{item.label}</span>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'acknowledgement' && (
          <motion.div 
            key="acknowledgement" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }} 
            className="pt-32 md:pt-40 pb-40 px-6 max-w-4xl mx-auto relative z-20 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-16">OUR <span className="text-[#10b981]">ACKNOWLEDGEMENT</span></h2>
            <div className="space-y-10 text-lg md:text-xl text-slate-300 italic leading-relaxed">
              <p>
                Our deepest appreciation goes to University President <span className="text-white font-bold">Dr. Ma. Carla A. Ochotorena</span> and CCS Dean <span className="text-white font-bold">Mark Flores</span>. Their approval and belief in the value of outside-the-classroom learning made this entire educational tour possible, allowing us to see the actual scale of the industry we are about to enter.
              </p>
              
              <p>
                We are sincerely grateful to the organizations that opened their doors to us: <span className="text-[#10b981] font-bold">Hytec Power, OpenText, MMDA, Teleperformance, TOP PEG, and MicroSourcing</span>. Each visit was an eye-opener, turning the abstract theories we learn in school into real-world applications and goals.
              </p>

              <p>
                A special word of thanks to the faculty members who facilitated the tour, especially <span className="text-[#10b981] font-bold">Sir Jason A. Catadman</span>. His guidance helped us navigate these professional environments and ensured that the experience was as enjoyable as it was educational.
              </p>
              
              <p>
                To our parents, thank you for your investment in our future and for making this entire tour a reality.
              </p>
              
              <p>
                Finally, we thank <span className="text-white font-bold">DJM Travel and Tour</span> for the smooth logistics, and our dedicated guides, particularly <span className="text-white font-bold">Ate Verone</span>, for keeping our energy high and our spirits safe at every single destination.
              </p>
            </div>

            <div className="mt-20">
               <a 
                 href="https://jihay-portfolio.vercel.app" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="group inline-flex items-center gap-4 text-[#10b981] font-black uppercase tracking-widest text-sm bg-white/5 backdrop-blur-md px-10 py-5 rounded-full border border-[#10b981]/30 hover:bg-[#10b981]/10 transition-all shadow-2xl"
               >
                 Back to Portfolio <ExternalLink size={18}/>
               </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <footer className="fixed bottom-8 left-8 flex items-center gap-6 z-20">
        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-600 hidden md:block">
          © 2026 Kimberly Jihay | Zamboanga City
        </span>
        <a 
          href="https://jihay-portfolio.vercel.app" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[9px] font-black uppercase tracking-[0.4em] text-[#10b981] hover:text-white transition-colors flex items-center gap-2"
        >
          Portfolio <ExternalLink size={10}/>
        </a>
      </footer>
    </div>
  );
}