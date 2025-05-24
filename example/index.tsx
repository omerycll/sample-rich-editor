import React from 'react';
import { RichTextEditor } from '../src';

const App = () => {
  const handleChange = (content: string) => {
    console.log('Editor content:', content);
  };

  return (
    <div>
      <h1>Simple Rich Editor Example </h1>
      < RichTextEditor
        initialContent="<p>Merhaba! Buraya yazmaya başlayabilirsiniz.</p>"
        onChange={handleChange}
      />
    </div>
  );
};

export default App;