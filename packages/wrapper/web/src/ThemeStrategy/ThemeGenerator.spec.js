import ThemeGenerator, { THEMES } from './ThemeGenerator';
import { wixPalettes } from '../../tests/palettesExample';

describe('ThemeGenerator', () => {
  const driver = {
    create: (theme, palette) => new ThemeGenerator({ theme, palette }),
  };

  describe('constructor', () => {
    it('should create a new default theme', () => {
      const themeGenerator = driver.create(THEMES.DEFAULT);
      expect(themeGenerator._theme).toBe(THEMES.DEFAULT);
    });

    it('should create a new default theme if theme is unknwon', () => {
      const themeGenerator = driver.create('stam');
      expect(themeGenerator._theme).toBe(THEMES.DEFAULT);
    });

    it('should expect site colors if theme is site', () => {
      try {
        driver.create(THEMES.PALETTE);
      } catch (e) {
        expect(e.message === 'AAAArgh!');
      }
    });

    it('should expect site colors if theme is back office', () => {
      try {
        driver.create(THEMES.BACK_OFFICE);
      } catch (e) {
        expect(e.message).toBe('AAAArgh!');
      }
    });

    it('should create theme object', () => {
      const themeGenerator = driver.create(THEMES.PALETTE, wixPalettes.site1);
      const styleObj = themeGenerator.getStylesObject();

      expect(styleObj.editor.color).toBe('#414141');
      expect(styleObj.editor.background).toBe('#FFFFFF');
    });
  });
});
