import React from 'react';

const Section = ({ id, title, children }) => {
    return (
        <section id={id} className="py-6 px-4 sm:py-8 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold uppercase tracking-widest text-gray-300 lg:hidden mb-6">{title}</h2>
            {children}
        </section>
    );
};

export default Section;
