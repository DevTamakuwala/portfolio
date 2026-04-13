import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ sections, activeSlug, isOpen, onClose }) => {
  const navigate = useNavigate();

  // Group sections by their group property
  const grouped = sections.reduce((acc, s) => {
    if (!acc[s.group]) acc[s.group] = [];
    acc[s.group].push(s);
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
          <span className="docs-sidebar-logo-icon">🌐</span>
          <span>smart-i18n-auto</span>
        </Link>
        <Link to="/" className="docs-sidebar-back" onClick={onClose}>
          ← Back to Portfolio
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
                <span className="docs-sidebar-link-icon">{item.icon}</span>
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
