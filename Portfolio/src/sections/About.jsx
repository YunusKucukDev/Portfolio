import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next"; // 1. Import ekle
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/Frameworks";
import DownloadCv from "../components/DownloadCv";
import { selectAllUsers, fetchUsers } from "../Slices/UserSlice";
import { useAppDispacth, useAppSelector } from "../Store/store";

const About = () => {
  const { t } = useTranslation(); // 2. Hook'u tanımla
  const grid2Container = useRef();
  const dispatch = useAppDispacth();
  const users = useAppSelector(selectAllUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (!users || users.length === 0) return null;

  return (
    <section className="c-space section-spacing" id="about">
      {users.map((user) => (
        <div key={user.id}>
          {/* Çeviri: Hakkımda */}
          <h2 className="text-heading">{t("about_title")}</h2>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
            
            <div className="flex items-end grid-default-color grid-1 relative overflow-hidden">
              <img
                src="assets/coding-pov.png"
                className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
                alt="coding"
              />
              <div className="z-10">
                {/* Dinamik isim + Sabit metin */}
                <p className="headtext">Hello, I am Yunus Küçük</p>
                <p className="subtext">{user.description1}</p>
              </div>
              <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 bg-gradient-to-t from-indigo" />
            </div>

            <div className="grid-default-color grid-2">
              <div ref={grid2Container} className="flex items-center justify-center w-full h-full">
                <DownloadCv user={user} />
              </div>
            </div>

            <div className="grid-black-color grid-3 relative overflow-hidden ">
              <div className="z-10 centered">
                <p className="subtext">{user.description2}</p>
              </div>
            </div>

            <div className="grid-special-color grid-4">
              <div className="flex flex-col items-center justify-center gap-4 size-full text-center">
                {/* Çeviri: Proje teklifi */}
                <p className="headtext">{t("about_contact_prompt")}</p>
                <CopyEmailButton email={user.email} />
              </div>
            </div>

            <div className="grid-default-color grid-5 relative overflow-hidden">
              <div className="z-10 w-[50%]">
                <p className="headtext text-white">Tech Stack</p>
                <p className="subtext">{user.techStack}</p>
              </div>
              <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
                <Frameworks />
              </div>
            </div>

          </div>
        </div>
      ))}
    </section>
  );
};

export default About;