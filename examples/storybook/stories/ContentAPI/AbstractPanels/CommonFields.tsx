import React, { FC } from 'react';
import { Layout, Cell, InputWithLabel, Typography as t } from 'wix-style-react';
import { AbstractPanelProps, CommonBuilderFields } from '../types';
import { createAbstractPanelSetter } from './utils';

export const emptyCommonBuilderFields = {} as CommonBuilderFields;

export const PNLCommonFields: FC<AbstractPanelProps<CommonBuilderFields>> = ({ obj, setter }) => {
  const set = createAbstractPanelSetter(obj, setter);
  const { after, before, index } = obj;
  return (
    <Layout>
      <Cell>
        <p className={t.h2}>Common Fields:</p>
        <InputWithLabel
          label="after"
          type="string"
          value={after || ''}
          onChange={e => set({ after: e.currentTarget.value })}
        />
        <InputWithLabel
          label="before"
          type="string"
          value={before || ''}
          onChange={e => set({ before: e.currentTarget.value })}
        />
        <InputWithLabel
          label="index"
          type="number"
          value={index || ''}
          onChange={e => set({ index: e.currentTarget.valueAsNumber })}
        />
      </Cell>
    </Layout>
  );
};
