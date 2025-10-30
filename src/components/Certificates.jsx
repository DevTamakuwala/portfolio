import React from "react";
import Section from "./Section";
import { certificates } from "../data/portfolioData"; // Import the user object

const Certificates = () => {
  // Access the certificates array from the user object
  // const certs = certificates || [];

  return (
    <Section id="certificates" title="Certificates"> {/* Corrected title casing */}
      <div className="glass-effect p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Certificates
        </h2>
        
        {/* Check if there are certificates before rendering the list */}
        {certificates.length > 0 ? (
          <ul className="text-gray-300 leading-relaxed space-y-2 list-disc list-inside">
            {/* Map over the certificates data to create list items dynamically */}
            {certificates.map((cert, index) => (
              <li key={index}>
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noreferrer" // Added for security and best practices
                  className="underline hover:text-cyan-400 transition-colors"
                >
                  {cert.name}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No certificates to display at this time.</p>
        )}

      </div>
    </Section>
  );
};

export default Certificates;