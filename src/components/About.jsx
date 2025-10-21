import React from 'react';
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
                <a href={process.env.PUBLIC_URL + '/' + user.cv} download
                   className="mt-6 sm:mt-12 inline-block bg-cyan-400 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-cyan-300 transition-colors duration-300 shadow-lg shadow-cyan-500/20">
                   Download CV
                </a>
            </div>
        </Section>
    );
};

export default About;