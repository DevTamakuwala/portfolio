import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Content from './Content';
import MouseTracker from '../../components/MouseTracker';
import SEO from '../../components/SEO';
import { softwareSchema, faqSchema } from './seoSchemas';
import './Docs.css';

const sections = [
  { slug: 'introduction', title: 'Introduction', icon: 'book', group: 'Getting Started' },
  { slug: 'installation', title: 'Installation', icon: 'package', group: 'Getting Started' },
  { slug: 'quick-start', title: 'Quick Start', icon: 'zap', group: 'Getting Started' },
  { slug: 'configuration', title: 'Configuration', icon: 'settings', group: 'Getting Started' },
  { slug: 'annotations', title: 'Annotations', icon: 'tag', group: 'Core Concepts' },
  { slug: 'architecture', title: 'Architecture', icon: 'layers', group: 'Core Concepts' },
  { slug: 'examples', title: 'Examples', icon: 'bulb', group: 'Usage' },
  { slug: 'curl-examples', title: 'cURL Examples', icon: 'terminal', group: 'Usage' },
  { slug: 'performance', title: 'Performance', icon: 'gauge', group: 'Production' },
  { slug: 'security', title: 'Security', icon: 'lock', group: 'Production' },
  { slug: 'testing', title: 'Testing Locally', icon: 'flask', group: 'Production' },
  // { slug: 'release-checklist', title: 'Release Checklist', icon: 'checklist', group: 'Extras' },
  { slug: 'roadmap', title: 'Roadmap', icon: 'map', group: 'Extras' },
  { slug: 'contributing', title: 'Contributing', icon: 'users', group: 'Extras' },
  { slug: 'license', title: 'License', icon: 'file', group: 'Extras' },
  { slug: 'faq', title: 'FAQ', icon: 'help', group: 'Extras' },
];

const Docs = () => {
  const { section } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!section) {
    return <Navigate to="/documentation/smarti18nauto/introduction" replace />;
  }

  const currentIndex = sections.findIndex((s) => s.slug === section);
  const prevSection = currentIndex > 0 ? sections[currentIndex - 1] : null;
  const nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;
  const currentSection = sections[currentIndex] || sections[0];

  let currentSchema = null;
  if (section === 'introduction') currentSchema = softwareSchema;
  if (section === 'faq') currentSchema = faqSchema;

  return (
    <div className="docs-layout">
      <SEO
        title={`${currentSection.title} | smart-i18n-auto`}
        description={`Documentation for ${currentSection.title} in smart-i18n-auto, the plug-and-play internationalization middleware for Spring Boot 4.`}
        url={`/documentation/smarti18nauto/${currentSection.slug}`}
        jsonLdSchema={currentSchema}
      />
      <MouseTracker />
      <div
        className={`docs-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <Sidebar
        sections={sections}
        activeSlug={section}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="docs-content-wrapper">
        <div className="docs-topbar">
          <span className="docs-topbar-title">smart-i18n-auto</span>
          <button className="docs-hamburger" onClick={() => setSidebarOpen(true)}>
            Menu
          </button>
        </div>

        <Content
          slug={section}
          prevSection={prevSection}
          nextSection={nextSection}
        />
      </div>
    </div>
  );
};

export default Docs;
