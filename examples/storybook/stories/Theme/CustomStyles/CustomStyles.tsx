import React, { useState } from 'react';
import { Page, Section, ContentState } from '../../Components/StoryParts';
import exapmleState from '../../../../../e2e/tests/fixtures/text-formatting-types.json';
import ExampleApplication from '../../Components/ExampleApplication';
import { merge } from 'lodash';
import { StyleAttr } from './types';
import CustomStylesCreator from './StylesPanel';

const createStyle = ([element, property, value]: StyleAttr) => ({
  [element]: { [property]: value },
});

export default () => {
  const [stylesArray, setStyles] = useState([
    ['h3', 'color', 'red'],
    ['hashtag', 'color', 'orange'],
  ] as StyleAttr[]);
  const customStyles = stylesArray.reduce(
    (prev, style) => merge({ ...prev }, createStyle(style)),
    {}
  );
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
        <CustomStylesCreator
          stylesArray={stylesArray}
          setStyles={newStyles => setStyles(newStyles)}
        />
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
