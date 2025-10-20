import React from 'react';
import Section from './Section';

const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your message!');
        e.target.reset();
    };

    return (
        <Section id="contact" title="Contact">
            <div className="glass-effect p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Get In Touch</h2>
                <p className="mt-3 text-gray-300 max-w-xl">I'm currently open to new opportunities and collaborations. Feel free to send me a message about anything you want to discuss!</p>
                <form onSubmit={handleSubmit} className="mt-6 sm:mt-12 max-w-xl space-y-4">
                     <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-400">Name</label>
                        <input type="text" id="name" required className="mt-2 w-full bg-gray-800/50 border border-gray-700 rounded-md py-3 px-4 text-gray-200 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none"/>
                     </div>
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
                        <input type="email" id="email" required className="mt-2 w-full bg-gray-800/50 border border-gray-700 rounded-md py-3 px-4 text-gray-200 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none"/>
                     </div>
                     <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-400">Message</label>
                        <textarea id="message" rows="5" required className="mt-2 w-full bg-gray-800/50 border border-gray-700 rounded-md py-3 px-4 text-gray-200 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none resize-none"></textarea>
                     </div>
                     <button type="submit" className="bg-cyan-400 text-gray-900 font-bold py-3 px-8 rounded-lg hover:bg-cyan-300 transition-colors duration-300 shadow-lg shadow-cyan-500/20">
                        Send Message
                     </button>
                </form>
            </div>
        </Section>
    );
};

export default Contact;