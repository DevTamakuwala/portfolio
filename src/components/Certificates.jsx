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
          <div className="space-y-3">
            {certificates.map((cert, index) => (
              <div key={index} className="rounded-lg bg-gray-800/50 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-100 font-semibold hover:text-cyan-400 transition-colors"
                    >
                      {cert.name}
                    </a>
                    <div className="mt-1 text-sm text-gray-400">
                      {cert.platform && <span>{cert.platform}</span>}
                      {cert.platform && cert.note && <span> • </span>}
                      {cert.note && <span>{cert.note}</span>}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold text-gray-100 hover:bg-gray-700 transition-colors"
                    >
                      Open Link
                    </a>
                    {cert.pdf && (
                      <a
                        href={process.env.PUBLIC_URL + cert.pdf}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-3 py-1 text-xs font-semibold text-gray-900 hover:bg-cyan-300 transition-colors"
                      >
                        View PDF
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No certificates to display at this time.</p>
        )}

      </div>
    </Section>
  );
};

export default Certificates;