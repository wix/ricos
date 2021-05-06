import React, { FC, useState } from 'react';
import {
  Layout,
  Cell,
  Button as WSRButton,
  InputWithLabel,
  Typography as t,
  ToggleSwitch,
} from 'wix-style-react';
import {
  emptyCommonBuilderFields,
  emptyPluginContainerData,
  PNLCommonFields,
  PNLContainerData,
} from '../AbstractPanels';
import { EditPanelProps } from '../types';
import { HorizontalField } from '../HorizontalField';

export const Gallery: FC<EditPanelProps<'addGallery'>> = ({ addFunc }) => {
  const [commonFields, setCommonFields] = useState(emptyCommonBuilderFields);
  const [disableExpand, setDisableExpand] = useState(false);
  const [key, setKey] = useState(undefined as string);
  const [layout, setLayout] = useState(undefined as string);
  const [spacing, setSpacing] = useState(undefined as number);
  const [containerData, setContainerData] = useState(emptyPluginContainerData);
  const onAdd = () => {
    addFunc('addGallery', {
      data: {
        containerData,
        config: { disableExpand, key, layout, spacing },
        // TODO: items
        // TODO: styles
      },
      ...commonFields,
    });
  };
  return (
    <Layout>
      <Cell>
        <p className={t.h1}>GalleryConfig</p>
        <HorizontalField label="disableExpand">
          <ToggleSwitch
            checked={disableExpand}
            onChange={e => setDisableExpand(e.currentTarget.checked)}
          />
        </HorizontalField>
        <InputWithLabel label="key" value={key} onChange={e => setKey(e.currentTarget.value)} />
        <InputWithLabel
          label="layout"
          value={layout}
          onChange={e => setLayout(e.currentTarget.value)}
        />
        <InputWithLabel
          label="spacing"
          type="number"
          value={spacing}
          onChange={e => setSpacing(e.currentTarget.valueAsNumber)}
        />
        <PNLContainerData obj={containerData} setter={setContainerData} />
        <PNLCommonFields obj={commonFields} setter={setCommonFields} />
        <WSRButton onClick={onAdd}>Add</WSRButton>
      </Cell>
    </Layout>
  );
};
