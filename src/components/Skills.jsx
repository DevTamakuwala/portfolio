import React, { useState } from 'react';
import Section from './Section';
import { skillsData } from '../data/portfolioData';
import useOnScreen from '../hooks/useOnScreen';

const Skills = () => {
    const [filter, setFilter] = useState('All');
    const categories = ['All', 'Languages', 'Frameworks', 'Databases', 'Tools'];
    const filteredSkills = filter === 'All' ? skillsData : skillsData.filter(s => s.category === filter);
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

    return (
        <Section id="skills" title="Skills">
            <div className="glass-effect p-6 sm:p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                    {categories.map(cat => (
                        <button key={cat} onClick={() => setFilter(cat)}
                                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${filter === cat ? 'bg-cyan-400 text-gray-900' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>
                            {cat}
                        </button>
                    ))}
                </div>
                <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSkills.map(skill => (
                        <div key={skill.name} className="bg-gray-800/50 p-4 sm:p-6 rounded-lg">
                            <h3 className="text-lg font-bold text-gray-200">{skill.name}</h3>
                            <div className="mt-4 bg-gray-700 h-2 rounded-full">
                                <div className="bg-cyan-400 h-2 rounded-full transition-all duration-1000 ease-out"
                                     style={{ width: isVisible ? `${skill.level}%` : '0%' }}>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default Skills;