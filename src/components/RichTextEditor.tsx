import React, {useRef, useState, useEffect} from 'react';
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
  ['blockquote', 'code', 'clearFormat'],
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
  const [validationError, setValidationError] = useState<string>('');

  const mergedTheme = {
    ...defaultTheme,
    ...theme,
    colors: {...defaultTheme.colors, ...theme.colors},
    spacing: {...defaultTheme.spacing, ...theme.spacing},
    typography: {...defaultTheme.typography, ...theme.typography},
    borderRadius: {...defaultTheme.borderRadius, ...theme.borderRadius},
    shadows: {...defaultTheme.shadows, ...theme.shadows},
    dimensions: {...defaultTheme.dimensions, ...theme.dimensions},
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
      const blockElements =
        container.nodeType === Node.ELEMENT_NODE
          ? [container as Element]
          : Array.from(
              container.parentElement?.querySelectorAll(
                'h1, h2, h3, blockquote, pre'
              ) || []
            );

      blockElements.forEach((element) => {
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
      setValidationError('');
    } else {
      setValidationError('Please select text to add a link');
    }
  };

  const insertLink = () => {
    if (!linkUrl) {
      setValidationError('Please enter a URL');
      return;
    }

    try {
      new URL(linkUrl);
    } catch {
      setValidationError('Please enter a valid URL');
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
      setValidationError('');

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
      setValidationError('');
    }
  };

  const renderToolbarButton = (item: ToolbarItem) => {
    switch (item) {
      case 'bold':
        return (
          <BoldIcon
            onClick={() => execCommand('bold')}
            title='Bold'
            size={iconSize}
          />
        );
      case 'italic':
        return (
          <ItalicIcon
            onClick={() => execCommand('italic')}
            title='Italic'
            size={iconSize}
          />
        );
      case 'underline':
        return (
          <UnderlineIcon
            onClick={() => execCommand('underline')}
            title='Underline'
            size={iconSize}
          />
        );
      case 'strike':
        return (
          <StrikeIcon
            onClick={() => execCommand('strikeThrough')}
            title='Strikethrough'
            size={iconSize}
          />
        );
      case 'link':
        return <LinkIcon onClick={handleLink} title='Link' size={iconSize} />;
      case 'heading':
        return <HeadingDropdown title='Heading' size={iconSize} />;
      case 'unorderedList':
        return (
          <UnorderedListIcon
            onClick={() => execCommand('insertUnorderedList')}
            title='Unordered List'
            size={iconSize}
          />
        );
      case 'orderedList':
        return (
          <OrderedListIcon
            onClick={() => execCommand('insertOrderedList')}
            title='Ordered List'
            size={iconSize}
          />
        );
      case 'blockquote':
        return (
          <BlockquoteIcon
            onClick={() => execCommand('formatBlock', 'blockquote')}
            title='Blockquote'
            size={iconSize}
          />
        );
      case 'code':
        return (
          <CodeIcon
            onClick={() => execCommand('formatBlock', 'pre')}
            title='Code Block'
            size={iconSize}
          />
        );
      case 'clearFormat':
        return (
          <ClearFormatIcon
            onClick={clearFormat}
            title='Clear Format'
            size={iconSize}
          />
        );
    }
  };

  return (
    <div className={`simple-rich-editor ${className || ''}`} style={style}>
      <div className='simple-rich-editor-toolbar'>
        <div className='toolbar-container'>
          {toolbar.map((group, groupIndex) => (
            <div key={groupIndex} className='toolbar-group'>
              {group.map((item, itemIndex) => (
                <React.Fragment key={`${groupIndex}-${itemIndex}`}>
                  {renderToolbarButton(item)}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
        {isLinkModalOpen && (
          <>
            <div
              className='link-modal-overlay'
              onClick={() => {
                setIsLinkModalOpen(false);
                setLinkUrl('');
              }}
            />
            <div className='link-modal'>
              <div className='link-modal-header'>
                <h3>Add Link</h3>
                <button
                  className='close-button'
                  onClick={() => {
                    setIsLinkModalOpen(false);
                    setLinkUrl('');
                  }}
                >
                  ×
                </button>
              </div>
              <div className='link-modal-content'>
                <input
                  type='text'
                  value={linkUrl}
                  onChange={(e) => {
                    setLinkUrl(e.target.value);
                    setValidationError('');
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder='https://example.com'
                  autoFocus
                />
                {validationError && (
                  <div className='validation-error'>{validationError}</div>
                )}
                <div className='link-modal-actions'>
                  <button
                    onClick={() => {
                      setIsLinkModalOpen(false);
                      setLinkUrl('');
                    }}
                  >
                    Cancel
                  </button>
                  <button onClick={insertLink} className='primary'>
                    Add
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div
        ref={editorRef}
        contentEditable
        className='simple-rich-editor-content'
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

        .link-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }

        .link-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border-radius: ${mergedTheme.borderRadius.editor};
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border: 1px solid ${mergedTheme.colors.border};
          z-index: 1000;
          width: 400px;
          max-width: calc(100vw - 32px);
          max-height: calc(100vh - 32px);
          display: flex;
          flex-direction: column;
        }

        .link-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          border-bottom: 1px solid ${mergedTheme.colors.border};
          flex-shrink: 0;
        }

        .link-modal-header h3 {
          margin: 0;
          font-size: 1.1em;
          color: ${mergedTheme.colors.heading};
        }

        .link-modal-header .close-button {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${mergedTheme.colors.buttonText};
          border-radius: 50%;
        }

        .link-modal-header .close-button:hover {
          background: ${mergedTheme.colors.buttonHoverBackground};
        }

        .link-modal-content {
          padding: 16px;
          overflow-y: auto;
          flex-grow: 1;
        }

        .link-modal-content input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid ${mergedTheme.colors.border};
          border-radius: ${mergedTheme.borderRadius.button};
          font-size: 14px;
          margin-bottom: 16px;
          box-sizing: border-box;
        }

        .link-modal-content input:focus {
          outline: none;
          border-color: ${mergedTheme.colors.link};
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
        }

        .validation-error {
          color: #dc2626;
          font-size: 14px;
          margin-top: 8px;
          margin-bottom: 16px;
        }

        .link-modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          padding: 16px;
          border-top: 1px solid ${mergedTheme.colors.border};
          flex-shrink: 0;
        }

        .link-modal-actions button {
          padding: 8px 16px;
          border: 1px solid ${mergedTheme.colors.border};
          border-radius: ${mergedTheme.borderRadius.button};
          background: ${mergedTheme.colors.buttonBackground};
          cursor: pointer;
          font-size: 14px;
        }

        .link-modal-actions button.primary {
          background: ${mergedTheme.colors.link};
          color: white;
          border-color: ${mergedTheme.colors.link};
        }

        .link-modal-actions button:hover {
          background: ${mergedTheme.colors.buttonHoverBackground};
        }

        .link-modal-actions button.primary:hover {
          background: #1d4ed8;
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
