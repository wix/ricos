import React, { useState, useEffect } from 'react';
import { Layout, Palette, ToggleSwitch } from 'wix-style-react';
import { Page, Section, ContentState } from '../Components/StoryParts';
import exapmleState from '../../../../e2e/tests/fixtures/storybook-example-app.json';
import { wixPalettes, ricosPalettes } from '../../../../e2e/tests/resources/palettesExample';
import { FONTS } from '../../../../e2e/tests/resources/fontsExample';
import ExampleApplication from '../Components/ExampleApplication';
import { SelectorCell } from './SelectorCell';
const palettes = Object.keys(wixPalettes);

const ThemeSelector = () => {
  const [palettePage, setPalettePage] = useState(0);
  const [fontPage, setFontPage] = useState(0);
  const [isFallback, setFallback] = useState(false);
  const [isFloatingBM, setFloatingBM] = useState(false);
  const fallbackColor = isFallback ? '#FF0000' : undefined;
  const settingsActionColor = isFloatingBM ? '#3899EC' : undefined;

  useEffect(() => {
    document.onkeyup = event => {
      if (event.shiftKey) {
        if (event.key === 'ArrowLeft') {
          fontPage > 0 && setFontPage(fontPage - 1);
        } else if (event.key === 'ArrowRight') {
          fontPage < FONTS.length - 1 && setFontPage(fontPage + 1);
        }
      } else if (event.key === 'ArrowLeft') {
        palettePage > 0 && setPalettePage(palettePage - 1);
      } else if (event.key === 'ArrowRight') {
        palettePage < palettes.length - 1 && setPalettePage(palettePage + 1);
      }
    };
  }, [fontPage, palettePage]);

  const palette = ricosPalettes[palettePage];
  const values = Object.values(palette);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: https://github.com/wix-private/wix-design-systems/pull/7554
  const PaletteElement = () => <Palette fill={values} />;

  return (
    <>
      <Layout cols={12} justifyItems={'center'}>
        <SelectorCell
          type={'a Palette'}
          index={palettePage}
          setIndex={setPalettePage}
          length={palettes.length}
        >
          <PaletteElement />
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

      <div>
        <ToggleSwitch checked={isFallback} onChange={({ target }) => setFallback(target.checked)} />
        <span>Use RED fallback color</span>
      </div>
      <div>
        <ToggleSwitch
          checked={isFloatingBM}
          onChange={({ target }) => setFloatingBM(target.checked)}
        />
        <span>Use BM Blue floating action color</span>
      </div>
      <div style={{ backgroundColor: palette.bgColor, padding: 4 }}>
        <ExampleApplication
          key={palettePage}
          initialState={exapmleState}
          theme={{
            palette: { ...palette, fallbackColor },
            paletteConfig: {
              settingsActionColor,
              focusActionColor: settingsActionColor,
            },
            customStyles: FONTS[fontPage],
          }}
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
        <a target="_blank" rel="noreferrer" href="https://wix.github.io/ricos/docs/ricos/theming">
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
