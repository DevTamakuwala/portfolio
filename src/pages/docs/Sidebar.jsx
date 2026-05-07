import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const iconPaths = {
  book: (
    <>
      <path d="M4 5.5C4 4.7 4.7 4 5.5 4H10v12H5.5C4.7 16 4 15.3 4 14.5v-9Z" />
      <path d="M10 4h4.5c.8 0 1.5.7 1.5 1.5v9c0 .8-.7 1.5-1.5 1.5H10" />
    </>
  ),
  package: (
    <>
      <path d="m4 7 6-3 6 3-6 3-6-3Z" />
      <path d="M4 7v6l6 3 6-3V7" />
      <path d="M10 10v6" />
    </>
  ),
  zap: <path d="M11 2 4 11h5l-1 7 8-10h-5l0-6Z" />,
  settings: (
    <>
      <path d="M10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
      <path d="M15.7 9.4 17 8l-1.5-2.6-1.9.5a6 6 0 0 0-1.2-.7L12 3h-4l-.4 2.2c-.4.2-.8.4-1.2.7l-1.9-.5L3 8l1.3 1.4a5.8 5.8 0 0 0 0 1.2L3 12l1.5 2.6 1.9-.5c.4.3.8.5 1.2.7L8 17h4l.4-2.2c.4-.2.8-.4 1.2-.7l1.9.5L17 12l-1.3-1.4a5.8 5.8 0 0 0 0-1.2Z" />
    </>
  ),
  tag: (
    <>
      <path d="M3 5v5l6.5 6.5a1.4 1.4 0 0 0 2 0l5-5a1.4 1.4 0 0 0 0-2L10 3H5a2 2 0 0 0-2 2Z" />
      <path d="M7 7h.01" />
    </>
  ),
  layers: (
    <>
      <path d="m10 3 7 4-7 4-7-4 7-4Z" />
      <path d="m3 10 7 4 7-4" />
      <path d="m3 13 7 4 7-4" />
    </>
  ),
  bulb: (
    <>
      <path d="M7 14h6" />
      <path d="M8 17h4" />
      <path d="M10 3a5 5 0 0 0-3 9c.7.6 1 1.1 1 2h4c0-.9.3-1.4 1-2a5 5 0 0 0-3-9Z" />
    </>
  ),
  terminal: (
    <>
      <path d="m4 6 4 4-4 4" />
      <path d="M10 14h6" />
    </>
  ),
  gauge: (
    <>
      <path d="M4 15a7 7 0 1 1 12 0" />
      <path d="m10 13 3-5" />
      <path d="M10 13h.01" />
    </>
  ),
  lock: (
    <>
      <path d="M5 9h10v8H5V9Z" />
      <path d="M7 9V7a3 3 0 0 1 6 0v2" />
    </>
  ),
  flask: (
    <>
      <path d="M8 3h4" />
      <path d="M9 3v5l-4 7a2 2 0 0 0 1.7 3h6.6a2 2 0 0 0 1.7-3l-4-7V3" />
      <path d="M7 13h6" />
    </>
  ),
  checklist: (
    <>
      <path d="M7 5h9" />
      <path d="M7 10h9" />
      <path d="M7 15h9" />
      <path d="m3 5 .8.8L5.5 4" />
      <path d="m3 10 .8.8L5.5 9" />
      <path d="m3 15 .8.8L5.5 14" />
    </>
  ),
  map: (
    <>
      <path d="m4 5 4-2 4 2 4-2v12l-4 2-4-2-4 2V5Z" />
      <path d="M8 3v12" />
      <path d="M12 5v12" />
    </>
  ),
  users: (
    <>
      <path d="M7.5 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M3 17a4.5 4.5 0 0 1 9 0" />
      <path d="M13 6a2.5 2.5 0 0 1 0 5" />
      <path d="M14 13a4 4 0 0 1 3 4" />
    </>
  ),
  file: (
    <>
      <path d="M5 3h6l4 4v10H5V3Z" />
      <path d="M11 3v4h4" />
      <path d="M8 12h5" />
      <path d="M8 15h4" />
    </>
  ),
  help: (
    <>
      <path d="M8 8a2 2 0 1 1 3.4 1.4c-.9.8-1.4 1.2-1.4 2.1" />
      <path d="M10 15h.01" />
      <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
    </>
  ),
};

const DocIcon = ({ name }) => (
  <svg
    aria-hidden="true"
    className="docs-sidebar-link-svg"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.6"
  >
    {iconPaths[name] || iconPaths.file}
  </svg>
);

const Sidebar = ({ sections, activeSlug, isOpen, onClose }) => {
  const navigate = useNavigate();

  const grouped = sections.reduce((acc, section) => {
    if (!acc[section.group]) acc[section.group] = [];
    acc[section.group].push(section);
    return acc;
  }, {});

  const handleClick = (slug) => {
    navigate(`/documentation/smarti18nauto/${slug}`);
    onClose();
  };

  return (
    <aside className={`docs-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="docs-sidebar-header">
        <Link to="/documentation/smarti18nauto/introduction" className="docs-sidebar-logo" onClick={onClose}>
          <span className="docs-sidebar-logo-icon">i18n</span>
          <span>smart-i18n-auto</span>
        </Link>
        <Link to="/" className="docs-sidebar-back" onClick={onClose}>
          Back to Portfolio
        </Link>
      </div>

      <nav className="docs-sidebar-nav">
        {Object.entries(grouped).map(([group, items]) => (
          <div key={group} className="docs-sidebar-section">
            <div className="docs-sidebar-section-title">{group}</div>
            {items.map((item) => (
              <div
                key={item.slug}
                className={`docs-sidebar-link ${activeSlug === item.slug ? 'active' : ''}`}
                onClick={() => handleClick(item.slug)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleClick(item.slug)}
              >
                <span className="docs-sidebar-link-icon">
                  <DocIcon name={item.icon} />
                </span>
                {item.title}
              </div>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
