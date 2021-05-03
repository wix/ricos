import React, { FC, useState } from 'react';
import { Layout, Cell, InputWithLabel, Button } from 'wix-style-react';
import { ParagraphPanel } from '../types';

export const Paragraph: FC<ParagraphPanel> = ({ addFunc }) => {
  const [text, setText] = useState(undefined as string);
  const [textAlignment, setTextAlignment] = useState(undefined as string);
  const onAdd = () => {
    addFunc({ text, data: { textStyle: { textAlignment: undefined } } });
    setText('');
    setTextAlignment('');
  };
  return (
    <Layout>
      <Cell>
        <InputWithLabel label="Text" value={text} onChange={e => setText(e.currentTarget.value)} />
      </Cell>
      <Cell>
        <InputWithLabel
          label="Alignment"
          value={textAlignment}
          onChange={e => setTextAlignment(e.currentTarget.value)}
        />
      </Cell>
      <Cell>
        <Button onClick={onAdd}>Add</Button>
      </Cell>
    </Layout>
  );
};
