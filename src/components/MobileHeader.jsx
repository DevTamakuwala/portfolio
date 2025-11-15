import React from 'react';
import { user } from '../data/portfolioData';
import useTypingEffect from '../hooks/useTypingEffect';

const MobileHeader = () => {
    const animatedTitle = useTypingEffect(user.titles);
    return (
        <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-gray-900/60 backdrop-blur-sm border-b border-gray-800">
            <div className="max-w-4xl mx-auto flex items-center gap-3 p-3">
                {user.avatar ? (
                    <img src={process.env.PUBLIC_URL + '/' + user.avatar} alt={`${user.name} avatar`} className="h-12 w-12 rounded-full object-cover border-2 border-cyan-400" />
                ) : (
                    <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center text-cyan-400 font-bold">{user.name.split(' ').map(n => n[0]).slice(0,2).join('')}</div>
                )}
                <div>
                    <h1 className="text-lg font-bold text-cyan-400 leading-tight">{user.name}</h1>
                    {/* <p className="text-xs text-gray-300">{user.titles?.[0] ?? ''}</p> */}
                    <p className="text-xs text-gray-300">{animatedTitle}</p>
                </div>
            </div>
        </header>
    );
};

export default MobileHeader;