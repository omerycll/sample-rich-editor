# Simple Rich Editor

A modern, customizable rich text editor component for React applications. Built with TypeScript and styled with CSS-in-JS.

![Simple Rich Editor](https://raw.githubusercontent.com/omerycll/sample-rich-editor/master/simple-rich-editor.png)

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/devbox/eager-ardinghelli-rg5kgl)

## Features

- 🎨 Modern and clean design
- 🛠️ Fully customizable through theme object
- 📱 Responsive layout
- ⌨️ Keyboard shortcuts support
- 🔗 Link insertion with validation
- 📝 Multiple formatting options:
  - Text formatting (bold, italic, underline, strikethrough)
  - Headings (H1-H6)
  - Lists (ordered and unordered)
  - Blockquotes
  - Code blocks
  - Clear formatting

## Installation

```bash
npm install @omerfycll/simple-rich-editor
# or
yarn add @omerfycll/simple-rich-editor
```

## Basic Usage

```tsx
import {RichTextEditor} from '@omerfycll/simple-rich-editor';

function App() {
  const handleChange = (content: string) => {
    console.log('Editor content:', content);
  };

  return (
    <RichTextEditor
      initialContent='<p>Hello, World!</p>'
      onChange={handleChange}
    />
  );
}
```

## Customization

### Theme Customization

You can customize the editor's appearance by passing a theme object:

```tsx
import {
  RichTextEditor,
  RichTextEditorTheme,
} from '@omerfycll/simple-rich-editor';

const customTheme: Partial<RichTextEditorTheme> = {
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

function App() {
  return (
    <RichTextEditor
      theme={customTheme}
      onChange={(content) => console.log(content)}
    />
  );
}
```

### Custom Toolbar

You can customize the toolbar layout by passing a toolbar configuration:

```tsx
import {RichTextEditor, ToolbarItem} from '@omerfycll/simple-rich-editor';

const customToolbar: ToolbarItem[][] = [
  ['bold', 'italic', 'underline', 'strike', 'link'],
  ['heading'],
  ['unorderedList', 'orderedList'],
  ['blockquote', 'code', 'clearFormat'],
];

function App() {
  return (
    <RichTextEditor
      toolbar={customToolbar}
      onChange={(content) => console.log(content)}
    />
  );
}
```

## Props

| Prop             | Type                           | Default   | Description                            |
| ---------------- | ------------------------------ | --------- | -------------------------------------- |
| `initialContent` | `string`                       | `''`      | Initial HTML content of the editor     |
| `onChange`       | `(content: string) => void`    | -         | Callback function when content changes |
| `className`      | `string`                       | -         | Additional CSS class name              |
| `style`          | `React.CSSProperties`          | -         | Additional inline styles               |
| `theme`          | `Partial<RichTextEditorTheme>` | -         | Custom theme object                    |
| `iconSize`       | `number`                       | `24`      | Size of toolbar icons in pixels        |
| `toolbar`        | `ToolbarItem[][]`              | See below | Custom toolbar configuration           |

### Default Toolbar

```typescript
const defaultToolbar: ToolbarItem[][] = [
  ['bold', 'italic', 'underline', 'strike', 'link'],
  ['heading'],
  ['unorderedList', 'orderedList'],
  ['blockquote', 'code', 'clearFormat'],
];
```

## Keyboard Shortcuts

- **Bold**: `Ctrl/Cmd + B`
- **Italic**: `Ctrl/Cmd + I`
- **Underline**: `Ctrl/Cmd + U`
- **Link**: `Ctrl/Cmd + K`
- **Clear Format**: `Ctrl/Cmd + Space`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [omerfycll](https://github.com/omerfycll)
