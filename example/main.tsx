import React from 'react';
import ReactDOM from 'react-dom/client';
import { RichTextEditor } from '../src/components/RichTextEditor';

const App = () => {
  const handleChange = (content: string) => {
    console.log('Editor content:', content);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      <h1>Rich Text Editor Test</h1>
      <RichTextEditor
        toolbar={[
          ['bold', 'italic', 'underline', 'link']
        ]}
        initialContent="<p>Merhaba! Bu bir test içeriğidir.</p>"
        onChange={handleChange}
        style={{ marginTop: '20px' }}
        iconSize={20}
      />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 