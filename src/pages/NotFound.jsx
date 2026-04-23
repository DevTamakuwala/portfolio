import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import MouseTracker from '../components/MouseTracker';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a0a14]">
            <SEO title="404 - Page Not Found" description="The page you are looking for does not exist." noindex={true} />
            <MouseTracker />
            
            <div className="relative z-10 text-center px-4">
                <div className="glass-effect p-8 md:p-16 max-w-2xl mx-auto border border-cyan-400/20 shadow-[0_0_50px_rgba(0,255,255,0.1)]">
                    <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-4 animate-pulse">
                        404
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                        Lost in Space?
                    </h2>
                    <p className="text-[#ccd6f6] text-lg mb-10 max-w-md mx-auto leading-relaxed">
                        The coordinate you're looking for doesn't exist or has been shifted into another dimension. Let's get you back home.
                    </p>
                    <Link 
                        to="/" 
                        className="inline-block px-8 py-3 bg-cyan-400 text-[#0a0a14] font-bold rounded-full hover:bg-cyan-300 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] transform"
                    >
                        Return to Earth
                    </Link>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] -z-1"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] -z-1"></div>
        </div>
    );
};

export default NotFound;
