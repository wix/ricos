import React, { FC } from 'react';
import { Layout, Cell, Dropdown } from 'wix-style-react';
import { TextStyle } from 'ricos-schema';
import { AbstractPanelProps } from '../types';
import { merge } from 'lodash';

const alignments = ['AUTO', 'LEFT', 'RIGHT', 'CENTER', 'JUSTIFY'];
const options = alignments.map((value, id) => ({
  id,
  value,
}));

export const textStyleEmpty = { textAlignment: undefined } as TextStyle;

export const PNLTextStyle: FC<AbstractPanelProps<TextStyle>> = ({ obj, setter }) => {
  const set = (o: typeof obj) => setter({ ...merge(obj, o) });
  const { textAlignment, lineHeight, paddingBottom, paddingTop } = obj;
  return (
    <Layout>
      <Cell>
        <Dropdown
          placeholder="textAlignment"
          selectedId={alignments.indexOf(textAlignment)}
          options={options}
          onSelect={({ id }) => set({ textAlignment: alignments[id] })}
        />
      </Cell>
    </Layout>
  );
};
