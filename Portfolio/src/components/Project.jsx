import { useState } from "react";
import ProjectDetails from "./ProjectDetails";
import { motion } from "framer-motion";

const Project = ({
  projectName,
  projectDescription,
  projectImage1,
  projectImage2,
  projectImage3,
  projectImage4,
  projectImage5,
  projcetTechStack,
  projectLink
}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="relative bg-midnight rounded-2xl p-6 flex flex-col md:flex-row items-start gap-6 cursor-pointer group"
      >

        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-brand-secondary rounded-full" /> {/* Dekoratif Çizgi */}
            <h3 className="text-2xl font-bold text-white group-hover:text-brand-secondary transition-colors">
              {projectName}
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {projcetTechStack}
          </div>
        </div>

       
        <div className="flex items-center gap-6 mt-6 md:mt-0">
          <button
            onClick={() => setIsModalOpen(true)} // Modal'ı açmak için TRUE yapıyoruz.
            className="px-6 py-2 bg-white/10 hover:bg-brand-secondary hover:text-white 
                       text-white rounded-xl transition-all duration-300 font-medium 
                       border border-white/10 active:scale-95 cursor-pointer"
          >
            Detayları Gör
          </button>

          <a
            href={projectLink}
            target="_blank"
            rel="noreferrer"
            className="p-3 bg-midnight rounded-full hover:bg-brand-secondary transition-colors group/link cursor-pointer"
          >
            <img src="assets/arrow-up.svg" className="size-5 group-hover/link:-rotate-12 transition-transform" alt="link" />
          </a>
        </div>
      </div>

      {isModalOpen && (
        <ProjectDetails
          projectName={projectName} 
          projectDescription={projectDescription}
          projectImage1={projectImage1}
          projcetTechStack={projcetTechStack}
          projectLink={projectLink}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default Project;