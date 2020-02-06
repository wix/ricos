import React, { Children } from 'react';
import Palette from './Palette';

import { RichContentViewerBox } from './StoryParts';
import { Themes } from '../../src/RceTheme';
import { wixPalettes } from '../palettesExample';
import { SimplifiedRCV } from 'wix-rich-content-wrapper';
import ThemeWrapper from '../../src/ThemeWrapper';

export default ({ children }) => {
  return Object.keys(wixPalettes).map((paletteKey, i) => {
    const palette = wixPalettes[paletteKey];
    return (
      <div key={`palette${i}`}>
        <h3>Palette {i + 1}</h3>
        <Palette palette={palette} />

        <RichContentViewerBox preset="blog-preset">
          <SimplifiedRCV theme={Themes.PALETTE} palette={palette}>
            {Children.only(children)}
          </SimplifiedRCV>
        </RichContentViewerBox>
      </div>
    );
  });
};
