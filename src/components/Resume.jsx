import React from "react";
import Section from "./Section";
import { user, resumeHighlights } from "../data/portfolioData";

const Resume = () => {
  const resumeUrl = process.env.PUBLIC_URL + user.cv;

  return (
    <Section id="resume" title="Resume">
      <div className="glass-effect p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Resume
        </h2>
        <p className="mt-3 text-gray-300 max-w-2xl leading-relaxed">
          Open the resume PDF in a new window to review the full document.
          The highlights below summarize the same information shown elsewhere on the site.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => window.open(resumeUrl, "_blank", "noopener,noreferrer")}
            className="inline-flex items-center justify-center bg-cyan-400 text-gray-900 font-bold py-3 px-5 rounded-lg hover:bg-cyan-300 transition-colors duration-300"
          >
            Show Resume
          </button>
          <a
            href={resumeUrl}
            download
            className="inline-flex items-center justify-center bg-gray-800 text-gray-100 font-bold py-3 px-5 rounded-lg hover:bg-gray-700 transition-colors duration-300"
          >
            Download PDF
          </a>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {resumeHighlights.map((item) => (
            <div key={item.label} className="rounded-lg bg-gray-800/50 p-4 border border-gray-700">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">{item.label}</p>
              <p className="mt-2 text-sm text-gray-200 leading-relaxed">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Resume;