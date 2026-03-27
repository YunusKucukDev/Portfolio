const ProjectDetails = ({
  projectName,
  projectDescription,
  projectImage1,
  projcetTechStack,
  projectLink,
  closeModal
}) => {
  
  // Veritabanından gelen metni (string) listeye çevirir
  const renderDescription = (text) => {
    if (!text) return <p className="text-white/50 italic">Açıklama bulunamadı.</p>;
    
    return (
      <ul className="space-y-4">
        {text.split('\n').filter(line => line.trim() !== "").map((line, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="text-brand-secondary text-xl leading-none">•</span>
            <span className="text-white/80 text-base md:text-lg leading-relaxed">
              {line.trim()}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center w-full h-full p-4">
      
      {/* Arka Plan Karartma (Overlay) - Animasyonsuz Düz Div */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer"
        onClick={closeModal}
      />

      {/* Modal İçeriği */}
      <div className="relative z-10 w-full max-w-3xl max-h-[95vh] overflow-y-auto border border-white/10 rounded-2xl bg-[#0a0a0a] shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        {/* Kapat Butonu */}
        <button
          onClick={closeModal}
          className="absolute p-2 rounded-full top-4 right-4 bg-black/50 hover:bg-brand-secondary transition-all cursor-pointer z-20 border border-white/10"
        >
          <img src="assets/close.svg" className="w-5 h-5" alt="kapat" />
        </button>
        
        {/* Görsel Bölümü */}
        <div className="relative h-60 md:h-80 w-full overflow-hidden">
          <img 
            src={projectImage1} 
            alt={projectName} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        </div>
        
        {/* İçerik Alanı */}
        <div className="p-6 md:p-10 -mt-8 relative z-10">
          <div className="mb-8">
            <h5 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-3 italic uppercase">
              {projectName}
            </h5>
            <div className="h-1.5 w-24 bg-brand-secondary rounded-full" />
          </div>
          
          {/* Dinamik Liste Alanı */}
          <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/[0.05] mb-8">
            <h6 className="text-brand-secondary text-sm font-bold uppercase tracking-widest mb-4">Proje Detayları</h6>
            {renderDescription(projectDescription)}
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10">
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 text-brand-secondary font-mono text-sm">
              {projcetTechStack}
            </div>
            
            {/* Proje Linki */}
            <a 
              href={projectLink} 
              target="_blank" 
              rel="noreferrer"
              className="w-full md:w-auto inline-flex items-center justify-center gap-3 font-bold text-black bg-brand-secondary hover:bg-white px-10 py-4 rounded-xl transition-colors duration-200"
            >
              PROJEYİ GÖRÜNTÜLE
              <img src="assets/arrow-up.svg" className="size-4 invert" alt="ok" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;