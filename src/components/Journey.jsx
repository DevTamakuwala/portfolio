import React from 'react';
import Section from './Section';
import { journeyData } from '../data/portfolioData';
import { BriefcaseIcon, AcademicCapIcon } from './Icons';

const Journey = () => {
    return (
        <Section id="journey" title="Journey">
            <div className="relative border-l-2 border-gray-700 glass-effect p-6 sm:p-8">
                {journeyData.map((item, index) => (
                    <div key={index} className="mb-6 pl-10 sm:pl-12 relative group">
                        <div className="absolute -left-4 top-1 h-6 w-6 sm:h-7 sm:w-7 bg-gray-800 rounded-full border-4 border-cyan-400 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                           {item.type === 'work' ? <BriefcaseIcon/> : <AcademicCapIcon/>}
                        </div>
                        <div className="transition-all duration-300 group-hover:bg-gray-800/50 p-3 rounded-lg group-hover:shadow-xl">
                            <p className="text-sm text-gray-400">{item.date}</p>
                            <h3 className="text-lg font-bold text-gray-200 mt-1 group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                            <p className="text-md text-gray-300">{item.company} - <span className="text-gray-400">{item.location}</span></p>
                            <ul className="mt-3 space-y-2 text-gray-400 list-disc list-inside">
                                {item.details.map((detail, i) => <li key={i}>{detail}</li>)}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default Journey;
