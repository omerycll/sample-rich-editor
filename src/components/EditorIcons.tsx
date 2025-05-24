import React, { useState, useRef, useEffect } from 'react';

interface IconProps {
  title?: string;
  size?: number;
  onClick?: () => void;
}

export const BoldIcon: React.FC<IconProps> = ({ title, onClick, size = 24 }) => (
  <button onClick={onClick} title={title}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 5h6a3.5 3.5 0 0 1 0 7h-6z" />
      <path d="M13 12h1a3.5 3.5 0 0 1 0 7h-7v-7" />
    </svg>
  </button>
);

export const ItalicIcon: React.FC<IconProps> = ({ title, onClick, size = 24 }) => (
  <button onClick={onClick} title={title}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 5l6 0" />
      <path d="M7 19l6 0" />
      <path d="M14 5l-4 14" />
    </svg>

  </button>
);

export const UnderlineIcon: React.FC<IconProps> = ({ title, onClick, size = 24 }) => (
  <button onClick={onClick} title={title}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 5v5a5 5 0 0 0 10 0v-5" />
      <path d="M5 19h14" />
    </svg>

  </button>
);

export const StrikeIcon: React.FC<IconProps> = ({ title, onClick, size = 24 }) => (
  <button onClick={onClick} title={title}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12l14 0" />
      <path d="M16 6.5a4 2 0 0 0 -4 -1.5h-1a3.5 3.5 0 0 0 0 7h2a3.5 3.5 0 0 1 0 7h-1.5a4 2 0 0 1 -4 -1.5" />
    </svg>

  </button>
);

export const LinkIcon: React.FC<IconProps> = ({ title, onClick, size = 24 }) => (
  <button onClick={onClick} title={title}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 15l6 -6" />
      <path d="M11 6l.463 -.536a5 5 0 0 1 7.072 0a4.993 4.993 0 0 1 -.001 7.072" />
      <path d="M12.603 18.534a5.07 5.07 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" />
      <path d="M16 19h6" />
      <path d="M19 16v6" />
    </svg>

  </button>
);

export const HeadingDropdown: React.FC<IconProps> = ({ title, onClick, size = 24 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const headings = [
    { level: 'h1', label: 'Başlık 1' },
    { level: 'h2', label: 'Başlık 2' },
    { level: 'h3', label: 'Başlık 3' },
    { level: 'h4', label: 'Başlık 4' },
    { level: 'h5', label: 'Başlık 5' },
    { level: 'h6', label: 'Başlık 6' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleHeadingSelect = (level: string) => {
    document.execCommand('formatBlock', false, level);
    setIsOpen(false);
  };

  return (
    <div className="heading-dropdown" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        title={title}
        className={`dropdown-trigger ${isOpen ? 'active' : ''}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 12h10" />
          <path d="M7 5v14" />
          <path d="M17 5v14" />
          <path d="M15 19h4" />
          <path d="M15 5h4" />
          <path d="M5 19h4" />
          <path d="M5 5h4" />
        </svg>
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {headings.map((heading) => (
            <button
              key={heading.level}
              onClick={() => handleHeadingSelect(heading.level)}
              className="dropdown-item"
            >
              {heading.label}
            </button>
          ))}
        </div>
      )}
      <style>{`
        .heading-dropdown {
          position: relative;
          display: inline-block;
        }

        .dropdown-trigger {
          padding: 8px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          background: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #475569;
          transition: all 0.2s ease;
        }

        .dropdown-trigger:hover {
          background: #f1f5f9;
          border-color: #e2e8f0;
          color: #1e293b;
        }

        .dropdown-trigger.active {
          background: #e2e8f0;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 4px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          z-index: 1000;
          min-width: 120px;
        }

        .dropdown-item {
          display: block;
          width: 100%;
          padding: 8px 12px;
          border: none;
          background: none;
          text-align: left;
          cursor: pointer;
          color: #475569;
          transition: all 0.2s ease;
        }

        .dropdown-item:hover {
          background: #f1f5f9;
          color: #1e293b;
        }
      `}</style>
    </div>
  );
};

export const UnorderedListIcon: React.FC<IconProps> = ({ title, onClick, size = 24 }) => (
  <button onClick={onClick} title={title}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 6l11 0" />
      <path d="M9 12l11 0" />
      <path d="M9 18l11 0" />
      <path d="M5 6l0 .01" />
      <path d="M5 12l0 .01" />
      <path d="M5 18l0 .01" />
    </svg>

  </button>
);

export const OrderedListIcon: React.FC<IconProps> = ({ title, onClick, size = 24 }) => (
  <button onClick={onClick} title={title}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 6h9" />
      <path d="M11 12h9" />
      <path d="M12 18h8" />
      <path d="M4 16a2 2 0 1 1 4 0c0 .591 -.5 1 -1 1.5l-3 2.5h4" />
      <path d="M6 10v-6l-2 2" />
    </svg>

  </button>
);

export const BlockquoteIcon: React.FC<IconProps> = ({ title, onClick, size = 24 }) => (
  <button onClick={onClick} title={title}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 15h15" />
      <path d="M21 19h-15" />
      <path d="M15 11h6" />
      <path d="M21 7h-6" />
      <path d="M9 9h1a1 1 0 1 1 -1 1v-2.5a2 2 0 0 1 2 -2" />
      <path d="M3 9h1a1 1 0 1 1 -1 1v-2.5a2 2 0 0 1 2 -2" />
    </svg>

  </button>
);

export const CodeIcon: React.FC<IconProps> = ({ title, onClick, size = 24 }) => (
  <button onClick={onClick} title={title}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 12h.01" />
      <path d="M12 12h.01" />
      <path d="M9 12h.01" />
      <path d="M6 19a2 2 0 0 1 -2 -2v-4l-1 -1l1 -1v-4a2 2 0 0 1 2 -2" />
      <path d="M18 19a2 2 0 0 0 2 -2v-4l1 -1l-1 -1v-4a2 2 0 0 0 -2 -2" />
    </svg>

  </button>
);

export const ClearFormatIcon: React.FC<IconProps> = ({ title, onClick, size = 24 }) => (
  <button onClick={onClick} title={title}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 15l4 4m0 -4l-4 4" />
      <path d="M7 6v-1h11v1" />
      <path d="M7 19l4 0" />
      <path d="M13 5l-4 14" />
    </svg>
  </button>
); 