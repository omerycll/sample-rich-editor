import React, { useRef, useState, useEffect } from 'react';
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikeIcon,
  LinkIcon,
  HeadingDropdown,
  UnorderedListIcon,
  OrderedListIcon,
  BlockquoteIcon,
  CodeIcon,
  ClearFormatIcon,
} from './EditorIcons';

export type ToolbarItem =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strike'
  | 'link'
  | 'heading'
  | 'unorderedList'
  | 'orderedList'
  | 'blockquote'
  | 'code'
  | 'clearFormat';

export interface RichTextEditorTheme {
  colors: {
    border: string;
    background: string;
    toolbarBackground: string;
    buttonBackground: string;
    buttonHoverBackground: string;
    buttonActiveBackground: string;
    text: string;
    buttonText: string;
    buttonHoverText: string;
    heading: string;
    link: string;
    blockquoteBackground: string;
    blockquoteBorder: string;
    codeBackground: string;
  };
  spacing: {
    toolbarPadding: string;
    contentPadding: string;
    buttonPadding: string;
    buttonGap: string;
  };
  typography: {
    fontSize: string;
    lineHeight: string;
    fontFamily: string;
  };
  borderRadius: {
    editor: string;
    button: string;
    code: string;
  };
  shadows: {
    editor: string;
  };
  dimensions: {
    minHeight: string;
    buttonMinSize: string;
  };
}

export const defaultTheme: RichTextEditorTheme = {
  colors: {
    border: '#e2e8f0',
    background: 'white',
    toolbarBackground: '#f8fafc',
    buttonBackground: 'white',
    buttonHoverBackground: '#f1f5f9',
    buttonActiveBackground: '#e2e8f0',
    text: '#1e293b',
    buttonText: '#475569',
    buttonHoverText: '#1e293b',
    heading: '#0f172a',
    link: '#2563eb',
    blockquoteBackground: '#f8fafc',
    blockquoteBorder: '#e2e8f0',
    codeBackground: '#f1f5f9',
  },
  spacing: {
    toolbarPadding: '12px',
    contentPadding: '24px',
    buttonPadding: '8px',
    buttonGap: '8px',
  },
  typography: {
    fontSize: '16px',
    lineHeight: '1.6',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  borderRadius: {
    editor: '8px',
    button: '6px',
    code: '3px',
  },
  shadows: {
    editor: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  dimensions: {
    minHeight: '200px',
    buttonMinSize: '36px',
  },
};

export interface RichTextEditorProps {
  initialContent?: string;
  onChange?: (content: string) => void;
  className?: string;
  style?: React.CSSProperties;
  theme?: Partial<RichTextEditorTheme>;
  iconSize?: number;
  toolbar?: ToolbarItem[][];
}

export const defaultToolbar: ToolbarItem[][] = [
  ['bold', 'italic', 'underline', 'strike', 'link'],
  ['heading'],
  ['unorderedList', 'orderedList'],
  ['blockquote', 'code', 'clearFormat']
];

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialContent = '',
  onChange,
  className,
  style,
  theme = {},
  iconSize = 24,
  toolbar = defaultToolbar,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState(initialContent);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [savedSelection, setSavedSelection] = useState<Range | null>(null);

  const mergedTheme = {
    ...defaultTheme,
    ...theme,
    colors: { ...defaultTheme.colors, ...theme.colors },
    spacing: { ...defaultTheme.spacing, ...theme.spacing },
    typography: { ...defaultTheme.typography, ...theme.typography },
    borderRadius: { ...defaultTheme.borderRadius, ...theme.borderRadius },
    shadows: { ...defaultTheme.shadows, ...theme.shadows },
    dimensions: { ...defaultTheme.dimensions, ...theme.dimensions },
  };

  useEffect(() => {
    if (!isInitialized && editorRef.current) {
      editorRef.current.innerHTML = initialContent;
      setIsInitialized(true);
    }
  }, [initialContent, isInitialized]);

  const execCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const clearFormat = () => {
    // Önce tüm biçimlendirmeleri kaldır
    document.execCommand('removeFormat', false);
    document.execCommand('unlink', false);

    // Blok elementlerini ve başlıkları normal paragrafa çevir
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const container = range.commonAncestorContainer;

      // Seçili alanın tüm blok elementlerini bul
      const blockElements = container.nodeType === Node.ELEMENT_NODE
        ? [container as Element]
        : Array.from(container.parentElement?.querySelectorAll('h1, h2, h3, blockquote, pre') || []);

      blockElements.forEach(element => {
        if (element.matches('h1, h2, h3, blockquote, pre')) {
          // Yeni bir paragraf oluştur
          const p = document.createElement('p');
          // İçeriği yeni paragrafa taşı
          p.innerHTML = element.innerHTML;
          // Eski elementi yeni paragraf ile değiştir
          element.parentNode?.replaceChild(p, element);
        }
      });
    }

    // Editörü güncelle
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      onChange?.(newContent);
    }

    editorRef.current?.focus();
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerHTML;
    setContent(newContent);
    onChange?.(newContent);
  };

  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      setSavedSelection(selection.getRangeAt(0).cloneRange());
    }
  };

  const restoreSelection = () => {
    if (savedSelection && editorRef.current) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(savedSelection);
    }
  };

  const handleLink = () => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      saveSelection();
      setIsLinkModalOpen(true);
    } else {
      alert('Lütfen bağlantı eklemek için metin seçin');
    }
  };

  const insertLink = () => {
    if (!linkUrl) {
      alert('Lütfen bir URL girin');
      return;
    }

    try {
      new URL(linkUrl);
    } catch {
      alert('Lütfen geçerli bir URL girin');
      return;
    }

    if (savedSelection && editorRef.current) {
      // Seçimi geri yükle
      restoreSelection();

      // Link oluştur
      const link = document.createElement('a');
      link.href = linkUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';

      // Seçili metni link içine al
      savedSelection.surroundContents(link);

      // Editörü güncelle
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      onChange?.(newContent);

      // Temizlik
      setLinkUrl('');
      setIsLinkModalOpen(false);
      setSavedSelection(null);

      // Editöre focus'u geri ver
      editorRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      insertLink();
    } else if (e.key === 'Escape') {
      setIsLinkModalOpen(false);
      setLinkUrl('');
      setSavedSelection(null);
    }
  };

  const renderToolbarButton = (item: ToolbarItem) => {
    switch (item) {
      case 'bold':
        return <BoldIcon onClick={() => execCommand('bold')} title="Bold" size={iconSize} />;
      case 'italic':
        return <ItalicIcon onClick={() => execCommand('italic')} title="Italic" size={iconSize} />;
      case 'underline':
        return <UnderlineIcon onClick={() => execCommand('underline')} title="Underline" size={iconSize} />;
      case 'strike':
        return <StrikeIcon onClick={() => execCommand('strikeThrough')} title="Strikethrough" size={iconSize} />;
      case 'link':
        return <LinkIcon onClick={handleLink} title="Link" size={iconSize} />;
      case 'heading':
        return <HeadingDropdown title="Başlık" size={iconSize} />;
      case 'unorderedList':
        return <UnorderedListIcon onClick={() => execCommand('insertUnorderedList')} title="Unordered List" size={iconSize} />;
      case 'orderedList':
        return <OrderedListIcon onClick={() => execCommand('insertOrderedList')} title="Ordered List" size={iconSize} />;
      case 'blockquote':
        return <BlockquoteIcon onClick={() => execCommand('formatBlock', 'blockquote')} title="Blockquote" size={iconSize} />;
      case 'code':
        return <CodeIcon onClick={() => execCommand('formatBlock', 'pre')} title="Code Block" size={iconSize} />;
      case 'clearFormat':
        return <ClearFormatIcon onClick={clearFormat} title="Clear Format" size={iconSize} />;
    }
  };

  return (
    <div className={`simple-rich-editor ${className || ''}`} style={style}>
      <div className="simple-rich-editor-toolbar">
        <div className="toolbar-container">
          {toolbar.map((group, groupIndex) => (
            <div key={groupIndex} className="toolbar-group">
              {group.map((item, itemIndex) => (
                <React.Fragment key={`${groupIndex}-${itemIndex}`}>
                  {renderToolbarButton(item)}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
        {isLinkModalOpen && (
          <div className="link-modal">
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Bağlantı URL'si"
              autoFocus
            />
            <button onClick={insertLink}>Ekle</button>
            <button onClick={() => {
              setIsLinkModalOpen(false);
              setLinkUrl('');
            }}>İptal</button>
          </div>
        )}
      </div>

      <div
        ref={editorRef}
        contentEditable
        className="simple-rich-editor-content"
        onInput={handleInput}
      />

      <style>{`
        .simple-rich-editor {
          border: 1px solid ${mergedTheme.colors.border};
          border-radius: ${mergedTheme.borderRadius.editor};
          overflow: visible;
          box-shadow: ${mergedTheme.shadows.editor};
          background: ${mergedTheme.colors.background};
        }

        .simple-rich-editor-toolbar {
          padding: ${mergedTheme.spacing.toolbarPadding};
          background: ${mergedTheme.colors.toolbarBackground};
          border-bottom: 1px solid ${mergedTheme.colors.border};
          position: relative;
        }

        .toolbar-container {
          display: flex;
          gap: ${mergedTheme.spacing.buttonGap};
          flex-wrap: wrap;
        }

        .toolbar-group {
          display: flex;
          gap: ${mergedTheme.spacing.buttonGap};
          padding-right: ${mergedTheme.spacing.buttonGap};
          border-right: 1px solid ${mergedTheme.colors.border};
        }

        .toolbar-group:last-child {
          border-right: none;
          padding-right: 0;
        }

        .simple-rich-editor-toolbar button {
          padding: ${mergedTheme.spacing.buttonPadding};
          border: 1px solid ${mergedTheme.colors.border};
          border-radius: ${mergedTheme.borderRadius.button};
          background: ${mergedTheme.colors.buttonBackground};
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${mergedTheme.colors.buttonText};
          transition: all 0.2s ease;
          min-width: ${mergedTheme.dimensions.buttonMinSize};
          min-height: ${mergedTheme.dimensions.buttonMinSize};
        }

        .simple-rich-editor-toolbar button:hover {
          background: ${mergedTheme.colors.buttonHoverBackground};
          border-color: ${mergedTheme.colors.border};
          color: ${mergedTheme.colors.buttonHoverText};
        }

        .simple-rich-editor-toolbar button:active {
          background: ${mergedTheme.colors.buttonActiveBackground};
          transform: translateY(1px);
        }

        .link-modal {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          padding: 16px;
          border-radius: ${mergedTheme.borderRadius.editor};
          box-shadow: ${mergedTheme.shadows.editor};
          border: 1px solid ${mergedTheme.colors.border};
          z-index: 1000;
          display: flex;
          gap: 8px;
          margin-top: 8px;
        }

        .link-modal::before {
          content: '';
          position: absolute;
          top: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-bottom: 6px solid ${mergedTheme.colors.border};
        }

        .link-modal::after {
          content: '';
          position: absolute;
          top: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-bottom: 6px solid white;
        }

        .link-modal input {
          padding: 8px;
          border: 1px solid ${mergedTheme.colors.border};
          border-radius: ${mergedTheme.borderRadius.button};
          min-width: 200px;
        }

        .link-modal button {
          padding: 8px 16px;
          border: 1px solid ${mergedTheme.colors.border};
          border-radius: ${mergedTheme.borderRadius.button};
          background: ${mergedTheme.colors.buttonBackground};
          cursor: pointer;
        }

        .link-modal button:hover {
          background: ${mergedTheme.colors.buttonHoverBackground};
        }

        .simple-rich-editor-content {
          min-height: ${mergedTheme.dimensions.minHeight};
          padding: ${mergedTheme.spacing.contentPadding};
          outline: none;
          color: ${mergedTheme.colors.text};
          line-height: ${mergedTheme.typography.lineHeight};
          font-size: ${mergedTheme.typography.fontSize};
          font-family: ${mergedTheme.typography.fontFamily};
        }

        .simple-rich-editor-content:focus {
          outline: none;
        }

        .simple-rich-editor-content p {
          margin: 0 0 1em 0;
        }

        .simple-rich-editor-content ul,
        .simple-rich-editor-content ol {
          margin: 0 0 1em 1.5em;
          padding: 0;
        }

        .simple-rich-editor-content ul li,
        .simple-rich-editor-content ol li {
          margin: 0.5em 0;
        }

        .simple-rich-editor-content h1,
        .simple-rich-editor-content h2,
        .simple-rich-editor-content h3,
        .simple-rich-editor-content h4,
        .simple-rich-editor-content h5,
        .simple-rich-editor-content h6 {
          margin: 1.5em 0 0.5em 0;
          color: ${mergedTheme.colors.heading};
        }

        .simple-rich-editor-content a {
          color: ${mergedTheme.colors.link};
          text-decoration: none;
        }

        .simple-rich-editor-content a:hover {
          text-decoration: underline;
        }

        .simple-rich-editor-content blockquote {
          margin: 1em 0;
          padding: 0.5em 1em;
          border-left: 4px solid ${mergedTheme.colors.blockquoteBorder};
          background: ${mergedTheme.colors.blockquoteBackground};
          color: ${mergedTheme.colors.text};
        }

        .simple-rich-editor-content pre {
          margin: 1em 0;
          padding: 1em;
          background: ${mergedTheme.colors.blockquoteBackground};
          border-radius: ${mergedTheme.borderRadius.editor};
          overflow-x: auto;
        }

        .simple-rich-editor-content code {
          font-family: monospace;
          background: ${mergedTheme.colors.codeBackground};
          padding: 0.2em 0.4em;
          border-radius: ${mergedTheme.borderRadius.code};
          font-size: 0.9em;
        }
      `}</style>
    </div>
  );
};