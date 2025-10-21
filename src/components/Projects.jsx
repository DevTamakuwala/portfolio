import React, { useState } from 'react';
import Section from './Section';
import { projectsData } from '../data/portfolioData';
import { LinkIcon } from './Icons';

const Projects = () => {
    const [filter, setFilter] = useState('All');
    const categories = ['All', 'Mobile', 'Web'];
    const filteredProjects = filter === 'All' ? projectsData : projectsData.filter(p => Array.isArray(p.category) ? p.category.includes(filter) : p.category === filter);

    // Helper to parse a fuzzy month-year string into a timestamp for sorting.
    const parseDateToTime = (s) => {
        if (!s) return 0;
        const normal = String(s).trim();
        if (/present/i.test(normal)) return Date.now();
        const t = new Date(normal);
        return isNaN(t.getTime()) ? 0 : t.getTime();
    };

    // Sort by startDate descending
    const sortedProjects = [...filteredProjects].sort((a, b) => parseDateToTime(b.startDate) - parseDateToTime(a.startDate));

    const [expanded, setExpanded] = useState({});
    const toggleExpanded = (name) => setExpanded(prev => ({ ...prev, [name]: !prev[name] }));

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

                <div className="relative border-l-2 border-gray-700">
                    {sortedProjects.map((project, index) => (
                        <div key={project.name} className="mb-6 pl-10 sm:pl-12 relative group">
                            <div className="absolute -left-4 top-1 h-6 w-6 sm:h-7 sm:w-7 bg-gray-800 rounded-full border-4 border-cyan-400 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                                <LinkIcon />
                            </div>

                            <div className="transition-all duration-300 group-hover:bg-gray-800/50 p-3 rounded-lg group-hover:shadow-xl">
                                <h3 className="text-lg font-bold text-gray-200 mt-1 group-hover:text-cyan-400 transition-colors">{project.name}</h3>
                                <p className="text-sm text-gray-400 mt-1">{project.startDate} - {project.endDate}</p>
                                <p className="text-sm text-gray-400 mt-1">{Array.isArray(project.category) ? project.category.join(' • ') : project.category}</p>
                                <p className="text-md text-gray-300 mt-2">{project.description}</p>

                                <ul className="mt-3 flex flex-wrap gap-2">
                                    {(() => {
                                        const maxVisible = 3;
                                        const tags = project.tags || [];
                                        const isExpanded = !!expanded[project.name];
                                        const visibleTags = isExpanded ? tags : tags.slice(0, maxVisible);
                                        const remaining = tags.length - maxVisible;

                                        return (
                                            <>
                                                {visibleTags.map((tag, i) => (
                                                    <li key={`${project.name}-tag-${i}`} className="px-3 py-1 text-xs font-semibold bg-gray-700 text-cyan-400 rounded-full">{tag}</li>
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
                                </ul>

                                <div className="mt-4 flex flex-wrap gap-4">
                                    {project.demo && <a href={project.link} target="_blank" rel="noreferrer" className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-2">Live Demo <LinkIcon/></a>}
                                    {project.playstore && <a href={project.link} target="_blank" rel="noreferrer" className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-2">View on Play Store <LinkIcon/></a>}
                                    {project.github && <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-2">View on GitHub <LinkIcon/></a>}
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