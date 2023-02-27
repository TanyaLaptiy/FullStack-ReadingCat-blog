import React from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';

interface EditorProps {
  initialParagraphs: OutputData['blocks'];
  onChange: (paragraphs: OutputData['blocks']) => void;
}
export const Editor: React.FC<EditorProps> = (props) => {
  React.useEffect(() => {
    const editor = new EditorJS({
      holder: 'editor',
      placeholder: 'Enter the text',
      data: {
        blocks: props.initialParagraphs,
      },
      async onChange() {
        const data = await editor.save();
        props.onChange(data.blocks);
      },
    });

    return () => {
      editor.isReady
        .then(() => {
          editor.destroy();
        })
        .catch((e) => console.error('ERROR', e));
    };
  }, []);

  return <div id="editor" />;
};
