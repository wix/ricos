import React, { FC } from 'react';
import { Layout, Cell, InputWithLabel, Typography as t } from 'wix-style-react';
import { Media } from 'ricos-schema';
import { AbstractPanelProps } from '../types';
import { createAbstractPanelSetter } from './utils';

export const emptyMedia: Media = {};

export const PNLMedia: FC<AbstractPanelProps<Media>> = ({ obj, setter }) => {
  const set = createAbstractPanelSetter(obj, setter);
  const { height, src: { custom, url } = {}, width } = obj;
  return (
    <Layout>
      <Cell>
        <p className={t.h1}>Media:</p>
        <InputWithLabel
          label="height"
          type="number"
          value={height || ''}
          onChange={e => set({ height: e.currentTarget.valueAsNumber })}
        />
        <InputWithLabel
          label="width"
          type="number"
          value={width || ''}
          onChange={e => set({ width: e.currentTarget.valueAsNumber })}
        />
        <p className={t.h2}>src:</p>
        <Layout>
          <Cell>
            <InputWithLabel
              label="url"
              type="string"
              value={url || ''}
              onChange={e => set({ src: { url: e.currentTarget.value } })}
            />
            <InputWithLabel
              label="custom"
              type="string"
              value={custom || ''}
              onChange={e => set({ src: { custom: e.currentTarget.value } })}
            />
          </Cell>
        </Layout>
      </Cell>
    </Layout>
  );
};
