import React from "react";
import Section from "./Section";
import { ongoingCertificates } from "../data/portfolioData"; // Import the new data

const OngoingCertificates = () => {
  return (
    <Section id="ongoing-learning" title="Ongoing Learning">
      <div className="glass-effect p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Ongoing Learning
        </h2>
        
        {/* Check if there are certificates before rendering the list */}
        {ongoingCertificates.length > 0 ? (
          <ul className="text-gray-300 leading-relaxed space-y-2 list-disc list-inside">
            {/* Map over the certificates data to create list items dynamically */}
            {ongoingCertificates.map((cert, index) => (
              <li key={index}>
                {cert.url ? (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noreferrer" // Added for security and best practices
                    className="underline hover:text-cyan-400 transition-colors"
                  >
                    {cert.name}
                  </a>
                ) : (
                  <span>{cert.name}</span>
                )}
                {cert.platform && (
                  <span className="text-gray-400 text-sm"> - {cert.platform}</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">Currently focused on core projects and academics.</p>
        )}

      </div>
    </Section>
  );
};

export default OngoingCertificates;