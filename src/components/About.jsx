import React from 'react';
import { Link } from 'react-router-dom';
import Section from './Section';
import { user } from '../data/portfolioData';
import useTypingEffect from '../hooks/useTypingEffect';

const About = () => {
    const animatedTitle = useTypingEffect(user.titles);
    return (
        <Section id="about" title="About">
            <div className="glass-effect p-6 sm:p-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{user.name}</h1>
                <h2 className="text-lg sm:text-xl mt-2 sm:mt-3 font-semibold text-cyan-400 h-8">
                    {animatedTitle}
                    <span className="animate-ping">|</span>
                </h2>
                <p className="mt-4 sm:mt-8 max-w-xl text-gray-300 leading-relaxed">{user.bio}</p>
                <div className="mt-5 flex flex-wrap gap-2 text-sm text-gray-300">
                    <span className="px-3 py-1 rounded-full bg-gray-800/70 border border-gray-700">{user.location}</span>
                    <span className="px-3 py-1 rounded-full bg-gray-800/70 border border-gray-700">{user.availability}</span>
                    {user.languages.map((language) => (
                        <span key={language} className="px-3 py-1 rounded-full bg-gray-800/70 border border-gray-700">{language}</span>
                    ))}
                </div>
                <div className="mt-6 sm:mt-12 flex flex-wrap gap-4">
                    <a href={process.env.PUBLIC_URL + '/' + user.cv} download
                       className="inline-block bg-cyan-400 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-cyan-300 transition-colors duration-300 shadow-lg shadow-cyan-500/20">
                             Show Resume
                    </a>
                    <Link to="/documentation/smarti18nauto"
                       className="docs-cta-btn inline-flex items-center gap-2 border-2 border-cyan-400 text-cyan-400 font-bold py-3 px-6 rounded-lg transition-all duration-300 relative overflow-hidden"
                       style={{ animation: 'docsBtnGlow 2s ease-in-out infinite' }}>
                        <span className="relative z-10 flex items-center gap-2">
                            <span>📄</span> Check auto Internationalization in spring boot
                        </span>
                        <span className="docs-cta-shimmer" />
                    </Link>
                    <style>{`
                        @keyframes docsBtnGlow {
                            0%, 100% {
                                box-shadow: 0 0 8px rgba(0,255,255,0.3), 0 0 20px rgba(0,255,255,0.1), 0 0 40px rgba(255,0,255,0.05);
                            }
                            50% {
                                box-shadow: 0 0 15px rgba(0,255,255,0.5), 0 0 35px rgba(0,255,255,0.2), 0 0 60px rgba(255,0,255,0.1);
                            }
                        }
                        @keyframes docsShimmer {
                            0% { transform: translateX(-100%) skewX(-15deg); }
                            100% { transform: translateX(200%) skewX(-15deg); }
                        }
                        .docs-cta-btn:hover {
                            background: rgba(0,255,255,0.1);
                            box-shadow: 0 0 20px rgba(0,255,255,0.6), 0 0 50px rgba(0,255,255,0.3), 0 0 80px rgba(255,0,255,0.15) !important;
                            transform: translateY(-2px);
                        }
                        .docs-cta-shimmer {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 40%;
                            height: 100%;
                            background: linear-gradient(90deg, transparent, rgba(0,255,255,0.15), transparent);
                            animation: docsShimmer 3s ease-in-out infinite;
                            pointer-events: none;
                        }
                    `}</style>
                </div>
            </div>
        </Section>
    );
};

export default About;