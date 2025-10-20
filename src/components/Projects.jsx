import React, { useState } from 'react';
import Section from './Section';
import { projectsData } from '../data/portfolioData';
import { LinkIcon } from './Icons';

const Projects = () => {
    const [filter, setFilter] = useState('All');
    const categories = ['All', 'Mobile', 'Web'];
    const filteredProjects = filter === 'All' ? projectsData : projectsData.filter(p => p.category.includes(filter));

    const [expanded, setExpanded] = useState({});

    const toggleExpanded = (name) => {
        setExpanded(prev => ({ ...prev, [name]: !prev[name] }));
    };

    return (
        <Section id="projects" title="Projects">
            <div className="glass-effect p-6 sm:p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                    {categories.map(cat => (
                        <button key={cat} onClick={() => setFilter(cat)}
                                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${filter === cat ? 'bg-cyan-400 text-gray-900' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredProjects.map(project => (
                        <div key={project.name} className="group block bg-gray-800/50 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2">
                             <img src={`https://placehold.co/600x400/1F2937/14B8A6?text=${project.name.replace(/\s/g, '+')}`} alt={project.name} className="w-full h-32 sm:h-40 object-cover" />
                             <div className="p-4 sm:p-6">
                                <h3 className="text-lg font-bold text-gray-200 group-hover:text-cyan-400 transition-colors duration-300">{project.name}</h3>
                                <p className="mt-2 text-gray-400 h-12">{project.description}</p>
                                <div className="mt-12 sm:mt-13 flex flex-wrap gap-2 items-center">
                                    {(() => {
                                        const maxVisible = 3;
                                        const tags = project.tags || [];
                                        const isExpanded = !!expanded[project.name];
                                        const visibleTags = isExpanded ? tags : tags.slice(0, maxVisible);
                                        const remaining = tags.length - maxVisible;

                                        return (
                                            <>
                                                {visibleTags.map((tag, i) => (
                                                    <span key={`${project.name}-tag-${i}`} className="px-3 py-1 text-xs font-semibold bg-gray-700 text-cyan-400 rounded-full">{tag}</span>
                                                ))}

                                                {remaining > 0 && !isExpanded && (
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleExpanded(project.name)}
                                                        className="px-2 py-1 text-xs font-semibold bg-gray-600 text-gray-200 rounded-full hover:bg-gray-500"
                                                        aria-label={`Show ${remaining} more tags`}
                                                    >
                                                        +{remaining}
                                                    </button>
                                                )}

                                                {isExpanded && tags.length > maxVisible && (
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleExpanded(project.name)}
                                                        className="px-2 py-1 text-xs font-semibold bg-gray-600 text-gray-200 rounded-full hover:bg-gray-500"
                                                        aria-label="Show fewer tags"
                                                    >
                                                        −
                                                    </button>
                                                )}
                                            </>
                                        );
                                    })()}
                                </div>
                                 <div className="mt-4">
                                    {project.demo && <a href={project.link} target="_blank" rel="noreferrer" className="text-sm font-semibold text-cyan-400 hover:text-cyan-300">Live Demo <LinkIcon/></a>}
                                    {project.playstore && <a href={project.link} target="_blank" rel="noreferrer" className="text-sm font-semibold text-cyan-400 hover:text-cyan-300">View on Play Store <LinkIcon/></a>}
                                 </div>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default Projects;