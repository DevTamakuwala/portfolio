import React, { useState, useMemo } from "react";
import Section from "./Section";
import { resumeHighlights } from "../data/portfolioData";

const Resume = () => {
  const resumeUrl = process.env.REACT_APP_RESUME_LINK;
  const [showViewer, setShowViewer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Convert Google Drive share URL to embeddable preview URL
  const embedUrl = useMemo(() => {
    if (!resumeUrl) return "";
    // Handle /view?... → /preview
    return resumeUrl.replace(/\/view(\?.*)?$/, "/preview");
  }, [resumeUrl]);

  return (
    <Section id="resume" title="Resume">
      <div className="glass-effect p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Resume</h2>
        <p className="mt-3 text-gray-300 max-w-2xl leading-relaxed">
          {showViewer
            ? "Viewing resume inline. Use the buttons below to toggle or open in a new tab."
            : "Click below to view the resume directly on this page."}
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              setShowViewer((prev) => !prev);
              setIsLoading(true);
            }}
            className="inline-flex items-center justify-center gap-2 bg-cyan-400 text-gray-900 font-bold py-3 px-5 rounded-lg hover:bg-cyan-300 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              {showViewer ? (
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              ) : (
                <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
              )}
            </svg>
            {showViewer ? "Hide Resume" : "Show Resume"}
          </button>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-gray-800 text-gray-100 font-bold py-3 px-5 rounded-lg hover:bg-gray-700 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
            Open in New Tab
          </a>
        </div>

        {/* Inline PDF Viewer */}
        {showViewer && (
          <div className="mt-6 relative rounded-xl overflow-hidden border border-gray-700 shadow-2xl shadow-cyan-500/10">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 z-10">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  <p className="text-gray-400 text-sm">Loading resume…</p>
                </div>
              </div>
            )}
            <iframe
              src={embedUrl}
              title="Resume"
              className="w-full bg-gray-900"
              style={{ height: "85vh", minHeight: "600px" }}
              onLoad={() => setIsLoading(false)}
              allow="autoplay"
            />
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {resumeHighlights.map((item) => (
            <div
              key={item.label}
              className="rounded-lg bg-gray-800/50 p-4 border border-gray-700"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
                {item.label}
              </p>
              <p className="mt-2 text-sm text-gray-200 leading-relaxed">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Resume;