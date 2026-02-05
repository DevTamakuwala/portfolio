import React from "react";
import Section from "./Section";
import { user } from "../data/portfolioData";
import { EmailIcon, WhatsAppIcon, LinkedInIcon } from "./Icons";

const Contact = () => {
  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     alert('Thank you for your message!');
  //     e.target.reset();
  // };

  return (
    <Section id="contact" title="Contact">
      <div className="glass-effect p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Get In Touch
        </h2>
        <p className="mt-3 text-gray-300 max-w-xl">
          I'm currently open to new opportunities and collaborations. Feel free
          to reach out via any of the channels below.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={user.social.email}
            className="inline-flex items-center gap-2 bg-gray-800/60 hover:bg-gray-700 text-gray-100 px-4 py-2 rounded-lg shadow"
            aria-label="Send Email"
          >
            <EmailIcon />
            <span className="text-sm font-semibold">Email</span>
          </a>

          <a
            href={user.social.whatsapp}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg shadow"
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon />
            <span className="text-sm font-semibold">WhatsApp</span>
          </a>

          <a
            href={user.social.linkedin}
            className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
            target="_blank"
            rel="noreferrer"
            aria-label="View LinkedIn"
          >
            <LinkedInIcon />
            <span className="text-sm font-semibold">LinkedIn</span>
          </a>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
