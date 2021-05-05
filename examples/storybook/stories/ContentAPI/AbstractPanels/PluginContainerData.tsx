import React, { FC } from 'react';
import { Layout, Cell, InputWithLabel, Typography as t, Dropdown } from 'wix-style-react';
import { PluginContainerData, PluginContainerData_Alignment } from 'ricos-schema';
import { AbstractPanelProps } from '../types';
import { alignmentOptions, alignments, createAbstractPanelSetter } from './utils';

export const emptyPluginContainerData: PluginContainerData = {
  alignment: 'LEFT' as PluginContainerData_Alignment,
};

export const PNLContainerData: FC<AbstractPanelProps<PluginContainerData>> = ({ obj, setter }) => {
  const set = createAbstractPanelSetter(obj, setter);
  const { alignment, customHeight, spoiler: { buttonText, description } = {}, width } = obj;
  return (
    <Layout>
      <Cell>
        <p className={t.h1}>Plugin Container Data:</p>
        <Dropdown
          placeholder="Text Alignment"
          selectedId={alignments.indexOf(alignment)}
          options={alignmentOptions}
          onSelect={({ id }) => set({ alignment: alignments[id] })}
        />
      </Cell>
      <Cell>
        <InputWithLabel
          label="customHeight"
          type="number"
          value={customHeight}
          onChange={e => set({ customHeight: e.currentTarget.valueAsNumber })}
        />
        <p className={t.h2}>src:</p>
        <Layout>
          <Cell>
            <InputWithLabel
              label="buttonText"
              type="string"
              value={buttonText || ''}
              onChange={e => set({ spoiler: { buttonText: e.currentTarget.value } })}
            />
            <InputWithLabel
              label="description"
              type="string"
              value={description || ''}
              onChange={e => set({ spoiler: { description: e.currentTarget.value } })}
            />
          </Cell>
        </Layout>
      </Cell>
    </Layout>
  );
};
