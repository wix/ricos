import React, { FC, useState } from 'react';
import {
  Layout,
  Cell,
  Button as WSRButton,
  InputWithLabel,
  Typography as t,
} from 'wix-style-react';
import {
  emptyCommonBuilderFields,
  emptyPluginContainerData,
  PNLCommonFields,
  PNLContainerData,
} from '../AbstractPanels';
import { EditPanelProps } from '../types';

export const Html: FC<EditPanelProps<'addHtml'>> = ({ addFunc }) => {
  const [commonFields, setCommonFields] = useState(emptyCommonBuilderFields);
  const [html, setHtml] = useState(undefined as string);
  const [url, setUrl] = useState(undefined as string);
  const [containerData, setContainerData] = useState(emptyPluginContainerData);
  const onAdd = () => {
    addFunc('addHtml', {
      data: {
        containerData,
        html,
        url,
      },
      ...commonFields,
    });
  };
  return (
    <Layout>
      <Cell>
        <p className={t.h1}>Html Data</p>
        <InputWithLabel label="html" value={html} onChange={e => setHtml(e.currentTarget.value)} />
        <InputWithLabel label="url" value={url} onChange={e => setUrl(e.currentTarget.value)} />
        <PNLContainerData obj={containerData} setter={setContainerData} />
        <PNLCommonFields obj={commonFields} setter={setCommonFields} />
        <WSRButton onClick={onAdd}>Add</WSRButton>
      </Cell>
    </Layout>
  );
};
