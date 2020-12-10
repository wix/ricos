import React, { useState, useEffect } from 'react';
import { Layout, Palette } from 'wix-style-react';
import { Page, Section, ContentState } from '../Components/StoryParts';
import exapmleState from '../../../../e2e/tests/fixtures/storybook-example-app.json';
import { wixPalettes, ricosPalettes } from '../../../../e2e/tests/resources/palettesExample';
import ExampleApplication from '../Components/ExampleApplication';
import { SelectorCell } from './SelectorCell';
const palettes = Object.keys(wixPalettes);
const FONTS = [
  { h2: { fontFamily: 'Arial' }, p: { fontFamily: 'Comic Sans MS' } },
  { h2: { fontFamily: 'Comic Sans MS' }, p: { fontFamily: 'Bookman' } },
  { h2: { fontFamily: 'Yellowtail' }, p: { fontFamily: 'Palatino' } },
  { h2: { fontFamily: 'Palatino' }, p: { fontFamily: 'Yellowtail' } },
  { h2: { fontFamily: 'Impact' }, p: { fontFamily: 'Georgia' } },
  { h2: { fontFamily: 'Georgia' }, p: { fontFamily: 'Impact' } },
];

const ThemeSelector = () => {
  const [palettePage, setPalettePage] = useState(0);
  const [fontPage, setFontPage] = useState(0);

  useEffect(() => {
    document.onkeyup = event => {
      if (event.shiftKey) {
        if (event.key === 'ArrowLeft') {
          fontPage > 0 && setFontPage(fontPage - 1);
        } else if (event.key === 'ArrowRight') {
          fontPage < FONTS.length - 1 && setFontPage(fontPage + 1);
        }
      } else {
        if (event.key === 'ArrowLeft') {
          palettePage > 0 && setPalettePage(palettePage - 1);
        } else if (event.key === 'ArrowRight') {
          palettePage < palettes.length - 1 && setPalettePage(palettePage + 1);
        }
      }
    };
  }, [fontPage, palettePage]);

  const palette = ricosPalettes[palettePage];
  const values = Object.values(palette);

  return (
    <>
      <Layout cols={12} justifyItems={'center'}>
        <SelectorCell
          type={'a Palette'}
          index={palettePage}
          setIndex={setPalettePage}
          length={palettes.length}
        >
          <Palette fill={values} />
        </SelectorCell>

        <SelectorCell
          type={'Fonts'}
          index={fontPage}
          setIndex={newFontPage => setFontPage(newFontPage)}
          length={FONTS.length}
        >
          <div>
            <div>H2: {FONTS[fontPage].h2.fontFamily}</div>
            <div>P: {FONTS[fontPage].p.fontFamily}</div>
          </div>
        </SelectorCell>
      </Layout>
      <div style={{ backgroundColor: palette.bgColor, padding: 4 }}>
        <ExampleApplication
          key={palettePage}
          initialState={exapmleState}
          theme={{ palette, customStyles: FONTS[fontPage] }}
        />
      </div>
    </>
  );
};

export default () => {
  return (
    <>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Yellowtail&display=swap"
        rel="stylesheet"
      />

      <Page title="Ricos Theme">
        See Usage{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://wix-incubator.github.io/rich-content/docs/ricos/ricos-api#theme"
        >
          here
        </a>
        <ThemeSelector />
        <Section title="Content State">
          <ContentState json={exapmleState} />
        </Section>
      </Page>
    </>
  );
};
