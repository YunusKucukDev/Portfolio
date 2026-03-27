import { FaFileDownload } from "react-icons/fa";
import { useTranslation } from "react-i18next";

// user objesini prop olarak alıyoruz
function DownloadCv({ user }) {
  const { t, i18n } = useTranslation();

  // API'nin çalıştığı ana adres (Kendi portuna göre güncelle)
  const baseUrl = "http://localhost:7000";

  // 1. Dil kontrolüne göre veritabanından gelen doğru path'i seçiyoruz
  // user.cvPathTR ve user.cvPathEN senin DTO/Entity içindeki isimlerin olmalı
  const currentCvPath = i18n.language === "tr" ? user.cvPathTR : user.cvPathEN;

  // 2. Tam URL'i oluşturuyoruz
  const fullCvUrl = currentCvPath ? `${baseUrl}${currentCvPath}` : null;

  return (
    <div className="flex justify-center my-8">
      {/* Eğer CV yolu yoksa butonu pasif yapabiliriz veya gizleyebiliriz */}
      <a
        href={fullCvUrl || "#"}
        target="_blank"
        rel="noopener noreferrer"
        download={`Yunus_Kucuk_CV_${i18n.language.toUpperCase()}.pdf`} 
        className={`group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full overflow-hidden shadow-lg hover:shadow-blue-500/50 hover:scale-105 active:scale-95 ${!fullCvUrl && 'opacity-50 cursor-not-allowed'}`}
        onClick={(e) => !fullCvUrl && e.preventDefault()} 
      >
        {/* Arka plan parlama efekti */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>

        <span className="flex items-center gap-2 relative">
          <FaFileDownload className="text-xl group-hover:animate-bounce" />
          <span>{fullCvUrl ? t("download_cv") : "CV Not Found"}</span>
        </span>
      </a>

      {/* Shimmer efekti */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
}

export default DownloadCv;