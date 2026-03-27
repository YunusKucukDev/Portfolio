import { createBrowserRouter } from "react-router";
import About from "../sections/About";
import Projects from "../sections/Projects";
import Experiences from "../sections/Experiences";
import Contact from "../sections/Contact";


export const routers = createBrowserRouter([

    { path: "#about", element: <About /> },
    { path: "#projects", element: <Projects /> },
    { path: "#experiences", element: <Experiences /> },
    { path: "#contact", element: <Contact /> },
])