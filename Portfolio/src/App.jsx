import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from './Slices/AuthSlice';

import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Footer from './sections/Footer';
import AdminPanel from './sections/AdminPanel';
import LoginPage from './sections/LoginPage'; // Login sayfanı import et

import ExperinceAdminPanel from "./sections/ExperinceAdminPanel";
import ProjectsAdminPanel from "./sections/ProjectsAdminPanel";
import UserAdminPanel from "./sections/UserAdminPanel";
import AdminDashBoard from "./sections/AdminDashBoard";
import AuthGuard from "./Router/AuthGuard"; // AuthGuard bileşeni



import { useAppDispacth } from "./Store/Store";
import { fetchExperinces } from "./Slices/ExperienceSlice";
import { fetchProjects } from "./Slices/ProjectSlice";
import { fetchUsers } from "./Slices/UserSlice";

const Projects = lazy(() => import("./sections/Projects"));
const About = lazy(() => import("./sections/About"));
const Experiences = lazy(() => import("./sections/Experiences"));
const Contact = lazy(() => import("./sections/Contact"));

const HomePage = () => (
  <>
    <Navbar />
    <Hero />
    <Suspense fallback={<div className="h-screen bg-black" />}>
      <About />
      <Projects />
      <Experiences />
      <Contact />
      <Footer />
    </Suspense>
  </>
);

const App = () => {
  const dispatch = useAppDispacth();

  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchExperinces());
    dispatch(fetchProjects());
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div id="home" className="container mx-auto max-w-7xl">
      <Routes>
        {/* Herkese Açık Rotalar */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* --- Korumalı Rotalar (Bekçi Burada) --- */}
        <Route element={<AuthGuard />}>
          <Route path="/admin" element={<AdminPanel />}>
            <Route index element={<AdminDashBoard />} />
            <Route path="user" element={<UserAdminPanel />} />
            <Route path="experience" element={<ExperinceAdminPanel />} />
            <Route path="project" element={<ProjectsAdminPanel />} />
          </Route>
        </Route>

        {/* Bilinmeyen yolları ana sayfaya at */}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </div>
  );
};

export default App;