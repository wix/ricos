import React, { FC, useState } from 'react';
import { Layout, Cell, InputWithLabel, Button, Dropdown } from 'wix-style-react';
import { TextStyle_TextAlignment } from 'ricos-schema';
import { ParagraphPanel } from '../types';

const alignOptions = ['AUTO', 'LEFT', 'RIGHT', 'CENTER', 'JUSTIFY'].map((value, id) => ({
  id,
  value,
}));

export const Paragraph: FC<ParagraphPanel> = ({ addFunc }) => {
  const [text, setText] = useState(undefined as string);
  const [selectedAlignment, setSelectedAlignment] = useState(-1);
  const onAdd = () => {
    const textAlignment = alignOptions[selectedAlignment]?.value as TextStyle_TextAlignment;
    addFunc('addParagraph', {
      text,
      data: { textStyle: { textAlignment } },
    });
    setText('');
    setSelectedAlignment(-1);
  };
  return (
    <Layout>
      <Cell>
        <InputWithLabel label="Text" value={text} onChange={e => setText(e.currentTarget.value)} />
      </Cell>
      <Cell>
        <Dropdown
          placeholder="Alignment"
          selectedId={selectedAlignment}
          options={alignOptions}
          onSelect={option => setSelectedAlignment(option.id as number)}
        />
      </Cell>
      <Cell>
        <Button onClick={onAdd}>Add</Button>
      </Cell>
    </Layout>
  );
};
