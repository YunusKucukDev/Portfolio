
import Project from "../components/Project";
import { useAppSelector } from "../Store/store";
import {
  selectAllProjects,
} from "../Slices/ProjectSlice";
import { useTranslation } from "react-i18next"; 


const Projects = () => {
  const projects = useAppSelector(selectAllProjects);
  const{t} = useTranslation();

  return (
    <section
      id="projects"
      className="relative px-6 py-8" // Sadece gerekli kadar iç boşluk
    >
      <h2 className="text-heading text-2xl font-bold">{t("project_title")}</h2>

      {/* Boşluğu mt-4 yaparak daralttık */}
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-4 mb-8 h-[1px] w-full" />

      <div className="flex flex-col gap-6"> {/* Projeler arasına kontrollü boşluk */}
        {projects.map((project) => (
          <Project key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
