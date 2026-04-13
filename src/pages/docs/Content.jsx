import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

/* ── Code block with copy button ─────────────────────────── */
const CodeBlock = ({ language, children }) => {
  const [copied, setCopied] = useState(false);
  const code = String(children).replace(/\n$/, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <span className="code-block-lang">{language || 'text'}</span>
        <button className={`code-copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopy}>
          {copied ? '✓ Copied' : '⎘ Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        language={language || 'text'}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: 'transparent',
          fontSize: '0.82rem',
          lineHeight: 1.65,
        }}
        codeTagProps={{
          style: { fontFamily: "'SF Mono','Fira Code','JetBrains Mono',monospace" },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

/* ── Custom markdown components ──────────────────────────── */
const markdownComponents = {
  code({ inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    if (!inline && match) {
      return <CodeBlock language={match[1]}>{children}</CodeBlock>;
    }
    return <code className={className} {...props}>{children}</code>;
  },
  a({ href, children, ...props }) {
    if (href && href.startsWith('/')) {
      return <Link to={href} {...props}>{children}</Link>;
    }
    return <a href={href} target="_blank" rel="noreferrer" {...props}>{children}</a>;
  },
};

/* ── Content component ───────────────────────────────────── */
const Content = ({ slug, prevSection, nextSection }) => {
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);

  const loadContent = useCallback(async () => {
    setLoading(true);
    try {
      const file = await import(`../../docs-content/${slug}.md`);
      const response = await fetch(file.default);
      const text = await response.text();
      setMarkdown(text);
    } catch {
      setMarkdown('# 404\n\nThis documentation page was not found.');
    }
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    loadContent();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [loadContent]);

  if (loading) {
    return (
      <div className="docs-content" style={{ display: 'flex', justifyContent: 'center', paddingTop: '4rem' }}>
        <div style={{
          width: 32, height: 32,
          border: '3px solid rgba(0,229,255,0.2)',
          borderTop: '3px solid #00e5ff',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className="docs-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {markdown}
      </ReactMarkdown>

      {/* Prev / Next navigation */}
      <div className="docs-footer-nav">
        {prevSection ? (
          <Link to={`/documentation/smarti18nauto/${prevSection.slug}`} className="docs-footer-link prev">
            <span className="docs-footer-label">← Previous</span>
            <span className="docs-footer-title">{prevSection.title}</span>
          </Link>
        ) : <div />}
        {nextSection ? (
          <Link to={`/documentation/smarti18nauto/${nextSection.slug}`} className="docs-footer-link next">
            <span className="docs-footer-label">Next →</span>
            <span className="docs-footer-title">{nextSection.title}</span>
          </Link>
        ) : <div />}
      </div>
    </div>
  );
};

export default Content;
