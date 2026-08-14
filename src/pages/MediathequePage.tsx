import React, { useState, useEffect } from 'react';
import { fetchMediatheque, getStrapiMediaUrl } from '../lib/api';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Seo from '../components/seo/Seo';

export default function MediathequePage() {
  const [medias, setMedias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("Toutes");
  const [activeType, setActiveType] = useState<string>("photo");

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchMediatheque();
      setMedias(data);
      setLoading(false);
    };
    loadData();
    window.scrollTo(0, 0);
  }, []);

  const categories = ["Toutes", ...Array.from(new Set(medias.map(m => m.category || m.attributes?.category).filter(Boolean)))];
  
  const typeFilteredMedias = medias.filter(m => {
    const attr = m.attributes || m;
    const mediaType = attr.mediaType || "photo"; // mock data default to photo if missing
    return mediaType === activeType;
  });

  const filteredMedias = activeCategory === "Toutes" 
    ? typeFilteredMedias 
    : typeFilteredMedias.filter(m => (m.category || m.attributes?.category) === activeCategory);

  return (
    <div className="bg-background-950 min-h-screen text-background-50 selection:bg-red-500/30 selection:text-white flex flex-col">
      <Seo 
        title="Médiathèque | IMPACT POSITIF" 
        description="Découvrez en images et en vidéos les réalisations, backstage et moments forts de l'agence IMPACT POSITIF."
      />
      <Header />
      
      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 md:px-12 max-w-[1600px] mx-auto w-full">
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold font-heading mb-6 tracking-tight">
            Notre <span className="text-red-500">Médiathèque</span>
          </h1>
          <p className="text-background-100/60 max-w-2xl text-lg">
            Plongez au cœur de nos événements, découvrez l'envers du décor et revivez les moments forts de nos campagnes.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Tabs Photos / Vidéos */}
            <div className="flex justify-center mb-10">
              <div className="flex bg-background-900 rounded-full p-1 border border-background-50/10">
                <button
                  onClick={() => setActiveType("photo")}
                  className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                    activeType === "photo"
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                      : "text-background-100/60 hover:text-background-50"
                  }`}
                >
                  📸 Photos
                </button>
                <button
                  onClick={() => setActiveType("video")}
                  className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                    activeType === "video"
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                      : "text-background-100/60 hover:text-background-50"
                  }`}
                >
                  🎥 Vidéos
                </button>
              </div>
            </div>

            {/* Categories Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((cat: any) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-medium transition-all duration-300 border ${
                    activeCategory === cat 
                      ? "bg-background-50 border-background-50 text-background-950 shadow-lg" 
                      : "bg-transparent border-background-50/20 hover:border-background-50/40 text-background-50/70 hover:text-background-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Masonry Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {filteredMedias.map((media, i) => {
                const isStrapiFormat = media.attributes;
                const attr = isStrapiFormat ? media.attributes : media;
                const fileObj = attr.file;
                
                const mediaUrl = typeof fileObj === 'string' ? fileObj : getStrapiMediaUrl(fileObj);
                const isVideo = fileObj?.mime?.startsWith('video/') || (typeof mediaUrl === 'string' && mediaUrl.match(/\.(mp4|webm)$/i));

                if (!mediaUrl) return null;

                return (
                  <div key={media.id || i} className="relative group overflow-hidden rounded-xl bg-background-900 border border-background-50/5 break-inside-avoid">
                    {isVideo ? (
                      <video 
                        src={mediaUrl} 
                        className="w-full h-auto object-cover"
                        controls
                        muted
                        loop
                      />
                    ) : (
                      <img 
                        src={mediaUrl} 
                        alt={attr.title || "Media"} 
                        loading="lazy"
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background-950 via-background-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 pointer-events-none">
                      <span className="text-red-400 text-xs font-mono tracking-widest uppercase mb-2">
                        {attr.category}
                      </span>
                      <h3 className="text-lg font-bold text-white leading-tight">
                        {attr.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {filteredMedias.length === 0 && (
              <div className="text-center py-20 text-background-100/40 font-mono">
                Aucun média trouvé pour cette catégorie.
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
