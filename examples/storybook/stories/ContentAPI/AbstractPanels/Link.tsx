import React, { FC } from 'react';
import {
  Layout,
  Cell,
  InputWithLabel,
  Typography as t,
  Dropdown,
  ToggleSwitch,
} from 'wix-style-react';
import { Link, Link_Target } from 'ricos-schema';
import { AbstractPanelProps } from '../types';
import { createAbstractPanelSetter } from './utils';
import { HorizontalField } from '../HorizontalField';

const linkTargets = ['TOP', 'BLANK', 'PARENT', 'SELF'];
const targetOptions = linkTargets.map((value, id) => ({
  id,
  value,
}));

export const emptyLink: Link = { target: 'BLANK' as Link_Target, url: '', anchor: '' };

export const PNLLink: FC<AbstractPanelProps<Link>> = ({ obj, setter }) => {
  const set = createAbstractPanelSetter(obj, setter);
  const { anchor, target, url, customData, rel: { nofollow, sponsored, ugc } = {} } = obj;
  return (
    <Layout>
      <Cell>
        <p className={t.h1}>Link:</p>
        <InputWithLabel
          label="url"
          type="string"
          value={url || ''}
          onChange={e => set({ url: e.currentTarget.value })}
        />
        <InputWithLabel
          label="anchor"
          type="string"
          value={anchor || ''}
          onChange={e => set({ anchor: e.currentTarget.value })}
        />
        <InputWithLabel
          label="customData"
          type="number"
          value={customData || ''}
          onChange={e => set({ customData: e.currentTarget.value })}
        />
      </Cell>

      <Cell>
        <HorizontalField label="target">
          <Dropdown
            placeholder="target"
            selectedId={linkTargets.indexOf(target)}
            options={targetOptions}
            onSelect={({ id }) => set({ target: linkTargets[id] })}
          />
        </HorizontalField>
      </Cell>
      <Cell>
        <p className={t.h2}>rel:</p>
        <HorizontalField label="nofollow">
          <ToggleSwitch
            checked={nofollow}
            onChange={e => set({ rel: { nofollow: e.currentTarget.checked } })}
          />
        </HorizontalField>
        <HorizontalField label="sponsored">
          <ToggleSwitch
            checked={sponsored}
            onChange={e => set({ rel: { sponsored: e.currentTarget.checked } })}
          />
        </HorizontalField>
        <HorizontalField label="ugc">
          <ToggleSwitch
            checked={ugc}
            onChange={e => set({ rel: { ugc: e.currentTarget.checked } })}
          />
        </HorizontalField>
      </Cell>
    </Layout>
  );
};
