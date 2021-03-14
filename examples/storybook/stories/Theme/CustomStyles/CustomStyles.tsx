import React, { useState } from 'react';
import { Page, Section, ContentState } from '../../Components/StoryParts';
import exapmleState from '../../../../../e2e/tests/fixtures/text-formatting-types.json';
import ExampleApplication from '../../Components/ExampleApplication';
import { merge } from 'lodash';
import { StyleAttr } from './types';
import { set, get } from 'local-storage';
import CustomStylesCreator from './StylesPanel';

const storageKey = 'storyCustomStyles';
const loadStyles = () => get(storageKey) as StyleAttr[];
const saveStyles = (styles: StyleAttr[]) => set(storageKey, styles);

const createStyle = ([element, property, value]: StyleAttr) => ({
  [element]: { [property]: value },
});

export default () => {
  const [stylesArray, setStylesArray] = useState(
    loadStyles() ||
      ([
        ['h3', 'color', 'red'],
        ['', '', ''],
      ] as StyleAttr[])
  );
  const customStyles = stylesArray.reduce(
    (prev, style) => merge({ ...prev }, createStyle(style)),
    {}
  );
  const setStyles = (styles: StyleAttr[]) => {
    setStylesArray(styles);
    saveStyles(styles);
  };
  return (
    <>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Yellowtail&display=swap"
        rel="stylesheet"
      />

      <Page title="Ricos Custom Styles">
        See Usage{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://wix.github.io/ricos/docs/ricos/theming#custom-styles"
        >
          here
        </a>
        <CustomStylesCreator stylesArray={stylesArray} setStyles={setStyles} />
        <div style={{ padding: 4 }}>
          <ExampleApplication initialState={exapmleState} theme={{ customStyles }} />
        </div>
        <Section title="Content State">
          <ContentState json={exapmleState} />
        </Section>
      </Page>
    </>
  );
};
