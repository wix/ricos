import RceTheme, { Themes } from '../src/RceTheme';
import { wixPalettes } from '../stories/palettesExample';

describe('RceTheme', () => {
  const driver = {
    create: (themeType, palette) => new RceTheme(themeType, palette),
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
      const rceTheme = driver.create(Themes.PALETTE, wixPalettes.site1);
      const styleObj = rceTheme.getStylesObject();

      expect(styleObj.hashtag.color).toBe('#FA6400');
      expect(styleObj.editor.color).toBe('#414141');
      expect(styleObj.editor.background).toBe('#FFFFFF');
    });
  });
});
