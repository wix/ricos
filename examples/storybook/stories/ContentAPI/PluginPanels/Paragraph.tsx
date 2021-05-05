import React, { FC, useState } from 'react';
import { Layout, Cell, InputWithLabel, Button } from 'wix-style-react';
import { EditPanelProps } from '../types';
import { PNLTextStyle, textStyleEmpty } from '../AbstractPanels';

export const Paragraph: FC<EditPanelProps<'addParagraph'>> = ({ addFunc }) => {
  const [textStyle, setTextStyle] = useState(textStyleEmpty);
  const [text, setText] = useState(undefined as string);
  const onAdd = () => {
    addFunc('addParagraph', {
      text,
      data: { textStyle },
    });
    setTextStyle(textStyleEmpty);
    setText('');
  };
  return (
    <Layout>
      <Cell>
        <InputWithLabel label="Text" value={text} onChange={e => setText(e.currentTarget.value)} />
      </Cell>
      <Cell>
        <PNLTextStyle obj={textStyle} setter={setTextStyle} />
      </Cell>
      <Cell>
        <Button onClick={onAdd}>Add</Button>
      </Cell>
    </Layout>
  );
};
