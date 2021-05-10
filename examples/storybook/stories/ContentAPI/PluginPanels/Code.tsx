import React, { FC, useState } from 'react';
import { Layout, Cell, InputWithLabel, Button } from 'wix-style-react';
import { EditPanelProps } from '../types';
import {
  PNLCommonFields,
  PNLTextStyle,
  emptyTextStyle,
  emptyCommonBuilderFields,
} from '../AbstractPanels';

export const Code: FC<EditPanelProps<'addCode'>> = ({ addFunc }) => {
  const [textStyle, setTextStyle] = useState(emptyTextStyle);
  const [commonFields, setCommonFields] = useState(emptyCommonBuilderFields);
  const [text, setText] = useState(undefined as string);
  const onAdd = () => {
    addFunc('addCode', {
      text,
      data: { textStyle },
      ...commonFields,
    });
    setTextStyle(emptyTextStyle);
    setText('');
  };
  return (
    <Layout>
      <Cell>
        <InputWithLabel label="Text" value={text} onChange={e => setText(e.currentTarget.value)} />
        <PNLTextStyle obj={textStyle} setter={setTextStyle} />
        <PNLCommonFields obj={commonFields} setter={setCommonFields} />
        <Button onClick={onAdd}>Add</Button>
      </Cell>
    </Layout>
  );
};
