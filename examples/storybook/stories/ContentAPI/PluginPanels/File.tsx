import React, { FC, useState } from 'react';
import { Layout, Cell, Button, InputWithLabel } from 'wix-style-react';
import {
  emptyCommonBuilderFields,
  emptyPluginContainerData,
  PNLCommonFields,
  PNLContainerData,
} from '../AbstractPanels';
import { EditPanelProps } from '../types';

export const File: FC<EditPanelProps<'addFile'>> = ({ addFunc }) => {
  const [commonFields, setCommonFields] = useState(emptyCommonBuilderFields);
  const [name, setName] = useState(undefined as string);
  const [size, setSize] = useState(undefined as number);
  const [type, setType] = useState(undefined as string);
  const [containerData, setContainerData] = useState(emptyPluginContainerData);
  const onAdd = () => {
    addFunc('addFile', {
      data: {
        containerData,
        name,
        size,
        type,
      },
      ...commonFields,
    });
  };
  return (
    <Layout>
      <Cell>
        <InputWithLabel label="name" value={name} onChange={e => setName(e.currentTarget.value)} />
        <InputWithLabel
          label="size"
          value={size}
          onChange={e => setSize(e.currentTarget.valueAsNumber)}
        />
        <InputWithLabel label="type" value={type} onChange={e => setType(e.currentTarget.value)} />
      </Cell>
      <Cell>
        <PNLContainerData obj={containerData} setter={setContainerData} />
        <PNLCommonFields obj={commonFields} setter={setCommonFields} />
        <Button onClick={onAdd}>Add</Button>
      </Cell>
    </Layout>
  );
};
