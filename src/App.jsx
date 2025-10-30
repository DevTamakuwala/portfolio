import React, { useState, useEffect } from 'react';
import MouseTracker from './components/MouseTracker';
import About from './components/About';
import Journey from './components/Journey';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { ArrowUpIcon } from './components/Icons';
import Sidebar from './components/Sidebar';
import MobileHeader from './components/MobileHeader';
import Certificates from './components/Certificates';
import WorkExperience from './components/WorkExperience';
import './App.css';


export default function App() {
    const [activeSection, setActiveSection] = useState('about');
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['about', 'education', 'work-experience', 'projects', 'skills', 'certificates', 'contact'];
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
                    setActiveSection(section);
                    break;
                }
            }
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <div>
            <MouseTracker /> {/* This will now act as a fixed background */}
            <div className="relative z-10">
                <MobileHeader />
                <Sidebar activeSection={activeSection} />
                <main className="lg:ml-[25%] pt-16 lg:pt-0">
                    <div className="max-w-4xl mx-auto p-4">
                        <About />
                        <Journey />
                        <WorkExperience />
                        <Projects />
                        <Skills />
                        <Certificates />
                        <Contact />
                    </div>
                </main>
                {showScrollTop && (
                    <button onClick={scrollToTop} className="fixed bottom-8 right-8 bg-cyan-400 text-gray-900 p-3 rounded-full shadow-lg hover:bg-cyan-300 transition-all duration-300 z-50">
                        <ArrowUpIcon />
                    </button>
                )}
            </div>
        </div>
    );
}

