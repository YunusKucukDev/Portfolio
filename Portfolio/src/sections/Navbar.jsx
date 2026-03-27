import { useState } from "react";
import { motion } from "motion/react";
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

function Navigation() {
  const { i18n } = useTranslation();    

  const toggleLanguage = () => {
    const nextLang = i18n.language === "tr" ? "en" : "tr";
    i18n.changeLanguage(nextLang);
  };

  return (
    <ul className="nav-ul flex items-center gap-4"> {/* Flex ve gap ekledik ki düzgün dizilsinler */}
      <li className="nav-li">
        <a className="nav-link" href="#home">{i18n.t('home')}</a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#about">{i18n.t('about')}</a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#projects">{i18n.t('projects')}</a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#experiences">{i18n.t('experiences')}</a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#contact">{i18n.t('contact')}</a>
      </li>

      {/* Dil Değiştirme Butonu */}
      <li className="nav-li">
        <IconButton
          onClick={toggleLanguage}
          sx={{ 
            color: 'white', 
            fontSize: '0.875rem', 
            fontWeight: 'bold',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '8px',
            padding: '4px 8px'
          }}
        >
          {i18n.language.toUpperCase()}
        </IconButton>
      </li>

      {/* Admin Butonu */}
      <li className="nav-li">
        <IconButton
          aria-label="admin"
          color="primary"
          component={Link}
          to="/admin"
        >
          <PersonIcon sx={{ color: 'white' }} />
        </IconButton>
      </li>
    </ul>
  );
}
const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed inset-x-0 z-20 w-full backdrop-blur-lg bg-primary/40">
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between py-2 sm:py-0">
          <a
            href="/"
            className="text-xl font-bold transition-colors text-neutral-400 hover:text-white"
          >
            Yunus Küçük
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden"
          >
            <img
              src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
              className="w-6 h-6"
              alt="toggle"
            />
          </button>
          <nav className="hidden sm:flex">
            <Navigation />
          </nav>
        </div>
      </div>
      {isOpen && (
        <motion.div
          className="block overflow-hidden text-center sm:hidden"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ maxHeight: "100vh" }}
          transition={{ duration: 1 }}
        >
          <nav className="pb-5">
            <Navigation />
          </nav>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
