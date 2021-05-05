import React, { FC, useState } from 'react';
import { Layout, Cell, Button as WSRButton, InputWithLabel, Dropdown } from 'wix-style-react';
import { ButtonData_Type } from 'ricos-schema';
import {
  emptyCommonBuilderFields,
  emptyLink,
  emptyPluginContainerData,
  PNLCommonFields,
  PNLContainerData,
  PNLLink,
} from '../AbstractPanels';
import { EditPanelProps } from '../types';
import { HorizontalField } from '../HorizontalField';
import { buttonTypes, buttonTypesOptions } from '../AbstractPanels/utils';

export const Button: FC<EditPanelProps<'addLinkButton' | 'addActionButton'>> = ({ addFunc }) => {
  const [commonFields, setCommonFields] = useState(emptyCommonBuilderFields);
  const [link, setLink] = useState(emptyLink);
  const [text, setText] = useState('');
  const [type, setType] = useState('LINK' as ButtonData_Type);
  const [backgroundColor, setBackgroundColor] = useState(undefined as string);
  const [borderColor, setBorderColor] = useState(undefined as string);
  const [borderRadius, setBorderRadius] = useState(undefined as number);
  const [borderWidth, setBorderWidth] = useState(undefined as number);
  const [textColor, setTextColor] = useState(undefined as string);
  const [containerData, setContainerData] = useState(emptyPluginContainerData);
  const onAdd = () => {
    addFunc(type === 'LINK' ? 'addLinkButton' : 'addActionButton', {
      data: {
        containerData,
        link,
        text,
        type,
        styles: { backgroundColor, borderColor, borderRadius, borderWidth, textColor },
      },
      ...commonFields,
    });
  };
  return (
    <Layout>
      <Cell>
        <InputWithLabel label="Text" value={text} onChange={e => setText(e.currentTarget.value)} />
        <HorizontalField label="type">
          <Dropdown
            placeholder="type"
            selectedId={buttonTypes.indexOf(type)}
            options={buttonTypesOptions}
            onSelect={({ id }) => setType(buttonTypes[id])}
          />
        </HorizontalField>
        <InputWithLabel
          label="backgroundColor"
          type="string"
          value={backgroundColor}
          onChange={e => setBackgroundColor(e.currentTarget.value)}
        />
        <InputWithLabel
          label="borderColor"
          type="string"
          value={borderColor}
          onChange={e => setBorderColor(e.currentTarget.value)}
        />
        <InputWithLabel
          label="borderRadius"
          type="number"
          value={borderRadius}
          onChange={e => setBorderRadius(e.currentTarget.valueAsNumber)}
        />
        <InputWithLabel
          label="borderWidth"
          type="number"
          value={borderWidth}
          onChange={e => setBorderWidth(e.currentTarget.valueAsNumber)}
        />
        <InputWithLabel
          label="textColor"
          type="string"
          value={textColor}
          onChange={e => setTextColor(e.currentTarget.value)}
        />
        <PNLLink obj={link} setter={setLink} />
        <PNLContainerData obj={containerData} setter={setContainerData} />
        <PNLCommonFields obj={commonFields} setter={setCommonFields} />
        <WSRButton onClick={onAdd}>Add</WSRButton>
      </Cell>
    </Layout>
  );
};
