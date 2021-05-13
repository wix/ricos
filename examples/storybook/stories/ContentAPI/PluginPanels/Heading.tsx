import React, { FC, useState } from 'react';
import { Layout, Cell, InputWithLabel, Button } from 'wix-style-react';
import { EditPanelProps } from '../types';
import {
  PNLCommonFields,
  PNLTextStyle,
  emptyTextStyle,
  emptyCommonBuilderFields,
} from '../AbstractPanels';

export const Heading: FC<EditPanelProps<'addHeading'>> = ({ addFunc }) => {
  const [textStyle, setTextStyle] = useState(emptyTextStyle);
  const [commonFields, setCommonFields] = useState(emptyCommonBuilderFields);
  const [text, setText] = useState(undefined as string);
  const [indentation, setIndentation] = useState(undefined as number);
  const [level, setLevel] = useState(undefined as number);
  const onAdd = () => {
    addFunc('addHeading', {
      text,
      data: { textStyle, indentation, level },
      ...commonFields,
    });
    setTextStyle(emptyTextStyle);
    setText('');
  };
  return (
    <Layout>
      <Cell>
        <InputWithLabel label="Text" value={text} onChange={e => setText(e.currentTarget.value)} />
        <InputWithLabel
          label="Indentation"
          value={indentation}
          type="number"
          onChange={e => setIndentation(e.currentTarget.valueAsNumber)}
        />
        <InputWithLabel
          label="Level (1-6)"
          value={level}
          type="number"
          onChange={e => setLevel(e.currentTarget.valueAsNumber)}
        />
        <PNLTextStyle obj={textStyle} setter={setTextStyle} />
        <PNLCommonFields obj={commonFields} setter={setCommonFields} />
        <Button onClick={onAdd}>Add</Button>
      </Cell>
    </Layout>
  );
};
