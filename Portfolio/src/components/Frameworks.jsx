export function Frameworks() {
  const skills = [
    "blazor", "csharp", "css3", "dotnet", "dotnetcore", 
    "git", "html5", "javascript", "microsoft", "react", 
    "sqlite", "tailwindcss", "vitejs", 
  ];

  return (
    <div className="w-full py-6">
      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto px-4">
        {skills.map((skill, index) => (
          <div 
            key={index} 
            // Kapsayıcıyı sabit bir kare yaptık (w-16 h-16) ve flex-center ile ortaladık
            className="group relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-brand-secondary/50 transition-all duration-300 shadow-sm"
          >
            <img 
              src={`assets/logos/${skill}.svg`} 
              alt={skill}
              // object-contain logonun kesilmesini önler ve kutuya sığdırır
              className="w-10 h-10 md:w-12 md:h-12 object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" 
            />
          </div>
        ))}
      </div>
    </div>
  );
}