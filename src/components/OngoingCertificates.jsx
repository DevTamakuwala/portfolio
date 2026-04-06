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
          <div className="space-y-3">
            {ongoingCertificates.map((cert, index) => (
              <div key={index} className="rounded-lg bg-gray-800/50 p-4">
                {cert.url ? (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-100 font-semibold hover:text-cyan-400 transition-colors"
                  >
                    {cert.name}
                  </a>
                ) : (
                  <span className="text-gray-100 font-semibold">{cert.name}</span>
                )}
                <div className="mt-1 text-sm text-gray-400">
                  {cert.platform && <span>{cert.platform}</span>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">Currently focused on core projects and academics.</p>
        )}

      </div>
    </Section>
  );
};

export default OngoingCertificates;