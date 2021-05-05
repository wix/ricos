import React, { FC } from 'react';
import { Layout, Cell } from 'wix-style-react';
import { AbstractPanelProps, CommonBuilderFields } from '../types';
import { createAbstractPanelSetter } from './utils';

export const emptyCommonBuilderFields = {} as CommonBuilderFields;

export const PNLAfterBefore: FC<AbstractPanelProps<CommonBuilderFields>> = ({ obj, setter }) => {
  const set = createAbstractPanelSetter(obj, setter);
  const { after, before, index } = obj;
  return (
    <Layout>
      <Cell>
        {/* <Dropdown
          placeholder="textAlignment"
          selectedId={alignments.indexOf(textAlignment)}
          options={options}
          onSelect={({ id }) => set({ textAlignment: alignments[id] })}
        /> */}
      </Cell>
    </Layout>
  );
};
