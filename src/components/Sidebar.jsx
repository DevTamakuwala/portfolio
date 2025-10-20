import React from 'react';
import { user } from '../data/portfolioData';
import { GitHubIcon, LinkedInIcon, EmailIcon } from './Icons';

const Sidebar = ({ activeSection }) => {
    const navItems = ['about', 'journey', 'skills', 'projects', 'contact'];
    const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    return (
        <aside className="fixed top-0 left-0 h-full w-1/4 p-10 flex-col justify-between hidden lg:flex glass-effect">
            <div>
                <div className="flex items-center gap-4">
                    {user.avatar ? (
                        <img src={user.avatar} alt={`${user.name} avatar`} className="h-20 w-20 rounded-full border-2 border-cyan-400 p-0 m-0" />
                    ) : (
                        <div className="h-20 w-20 rounded-full bg-gray-700 flex items-center justify-center text-cyan-400 font-bold">{user.name.split(' ').map(n => n[0]).slice(0,2).join('')}</div>
                    )}
                    <div>
                        <h1 className="text-2xl sm:text-4xl font-bold text-cyan-400">{user.name}</h1>
                        <h2 className="text-sm sm:text-lg mt-1 text-gray-300">Pune, Maharashtra</h2>
                    </div>
                </div>
                <nav className="mt-12">
                    <ul className="space-y-4">
                        {navItems.map(item => (
                            <li key={item}>
                                <a href={`#${item}`} onClick={(e) => { e.preventDefault(); scrollToSection(item); }}
                                   className="group flex items-center py-2 cursor-pointer">
                                    {/* <span className={`nav-indicator mr-4 h-px w-8 bg-gray-500 group-hover:w-16 group-hover:bg-cyan-400 transition-all duration-300 ${activeSection === item ? 'w-16 bg-cyan-400' : ''}`}></span> */}
                                    <span className={`nav-text text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-cyan-400 transition-colors duration-300 ${activeSection === item ? 'text-cyan-400' : ''}`}>{item}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="flex space-x-4">
                <a href={user.social.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors"><GitHubIcon /></a>
                <a href={user.social.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors"><LinkedInIcon /></a>
                <a href={user.social.email} className="text-gray-400 hover:text-cyan-400 transition-colors"><EmailIcon /></a>
            </div>
        </aside>
    );
};

export default Sidebar;