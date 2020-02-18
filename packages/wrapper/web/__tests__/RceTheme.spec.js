//import React from 'react';
import RceTheme, { Themes } from '../src/ThemeStrategy/RceTheme.js';
import { wixPalettes } from '../src/palettesExample';
import { pluginHashtag } from '../../../plugin-hashtag/web/src/editor';

describe('RceTheme', () => {
  const driver = {
    create: (themeType, palette, themeGenerators) =>
      new RceTheme({ theme: themeType, palette, themeGenerators }),
  };

  describe('constructor', () => {
    it('should create a new default theme', () => {
      const rceThemeWrapper = driver.create(Themes.DEFAULT);
      expect(rceThemeWrapper._theme).toBe(Themes.DEFAULT);
    });

    it('should create a new default theme if theme is unknwon', () => {
      const rceThemeWrapper = driver.create('stam');
      expect(rceThemeWrapper._theme).toBe(Themes.DEFAULT);
    });

    it('should expect site colors if theme is site', () => {
      try {
        driver.create(Themes.PALETTE);
      } catch (e) {
        expect(e.message === 'AAAArgh!');
        //console.log(e.message === 'AAAArgh!');
      }
    });

    it('should expect site colors if theme is back office', () => {
      try {
        driver.create(Themes.BACK_OFFICE);
      } catch (e) {
        expect(e.message).toBe('AAAArgh!');
      }
    });

    it('should create theme object', () => {
      const rceTheme = driver.create(Themes.PALETTE, wixPalettes.site1, [pluginHashtag().theme]);
      const styleObj = rceTheme.getStylesObject();

      expect(styleObj.hashtag.color).toBe('#FA6400');
      expect(styleObj.editor.color).toBe('#414141');
      expect(styleObj.editor.background).toBe('#FFFFFF');
    });
  });
});
