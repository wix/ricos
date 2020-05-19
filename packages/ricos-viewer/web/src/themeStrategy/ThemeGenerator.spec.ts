import ThemeGenerator, { PRESETS } from './ThemeGenerator';
import { wixPalettes } from '../../tests/palettesExample';
import { pluginHashtag } from '../../../../plugin-hashtag/web/src/editor';
import '../types';

describe('ThemeGenerator', () => {
  const createTheme = (isViewer, { theme, palette, themeGenerators }: ThemeProperties) =>
    new ThemeGenerator(isViewer, { theme, palette, themeGenerators });

  describe('constructor', () => {
    it('should create a new default theme', () => {
      const themeGenerator = createTheme(true, { theme: PRESETS.DEFAULT });
      expect(themeGenerator.palette).toBe(PRESETS.DEFAULT);
    });

    it('should create a new default theme if theme is unknwon', () => {
      const themeGenerator = createTheme(true, { theme: 'stam' });
      expect(themeGenerator._theme).toBe(PRESETS.DEFAULT);
    });

    it('should expect site colors if theme is site', () => {
      const func = () => createTheme(true, { theme: PRESETS.PALETTE });
      expect(func).toThrow();
    });

    it('should expect default behavior if theme is back office', () => {
      const func = () => createTheme(true, { theme: PRESETS.BACK_OFFICE });
      expect(func).not.toThrow();
    });

    it('should create theme object', () => {
      const themeGenerator = createTheme(false, {
        theme: PRESETS.PALETTE,
        palette: wixPalettes.site1,
        themeGenerators: [pluginHashtag().theme],
      });
      const styleObj: any = themeGenerator.getStylesObject();

      //expect(styleObj).toBe('#414141');
      expect(styleObj.editor.color).toBe('#414141');
      expect(styleObj.editor.background).toBe('#FFFFFF');
    });
    it('should not render editor styles if isEditor=false', () => {
      const themeGenerator = createTheme(true, {
        theme: PRESETS.PALETTE,
        palette: wixPalettes.site1,
        themeGenerators: [pluginHashtag().theme],
      });
      const styleObj = themeGenerator.getStylesObject();
      expect(styleObj).not.toHaveProperty('footerToolbar');
    });
  });
});
