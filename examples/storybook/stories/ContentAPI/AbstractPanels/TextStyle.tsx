import React, { FC } from 'react';
import { Layout, Cell, Dropdown, InputWithLabel, Typography as t } from 'wix-style-react';
import { TextStyle } from 'ricos-schema';
import { AbstractPanelProps } from '../types';
import { createAbstractPanelSetter } from './utils';

const alignments = ['AUTO', 'LEFT', 'RIGHT', 'CENTER', 'JUSTIFY'];
const options = alignments.map((value, id) => ({
  id,
  value,
}));

export const emptyTextStyle = { textAlignment: undefined } as TextStyle;

export const PNLTextStyle: FC<AbstractPanelProps<TextStyle>> = ({ obj, setter }) => {
  const set = createAbstractPanelSetter(obj, setter);
  const { textAlignment, lineHeight, paddingBottom, paddingTop } = obj;
  return (
    <Layout>
      <Cell>
        <p className={t.h2}>Text Style:</p>
        <Dropdown
          placeholder="Text Alignment"
          selectedId={alignments.indexOf(textAlignment)}
          options={options}
          onSelect={({ id }) => set({ textAlignment: alignments[id] })}
        />
      </Cell>
      <Cell>
        <InputWithLabel
          label="lineHeight"
          type="number"
          value={lineHeight || ''}
          onChange={e => set({ lineHeight: e.currentTarget.value })}
        />
        <InputWithLabel
          label="paddingBottom"
          type="number"
          value={paddingBottom || ''}
          onChange={e => set({ paddingBottom: e.currentTarget.value })}
        />
        <InputWithLabel
          label="paddingTop"
          type="number"
          value={paddingTop || ''}
          onChange={e => set({ paddingTop: e.currentTarget.value })}
        />
      </Cell>
    </Layout>
  );
};
