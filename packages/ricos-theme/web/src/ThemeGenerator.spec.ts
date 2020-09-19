import ThemeGenerator from './ThemeGenerator';
import { wixPalettes } from '../tests/palettesExample';
import { pluginHashtag } from '../../../plugin-hashtag/web/src/editor';
import { PalettePreset, Palette, ThemeGeneratorFunction } from 'ricos-common';

describe('ThemeGenerator', () => {
  const createTheme = (
    isViewer: boolean,
    palette?: Palette | PalettePreset,
    themeGenerators?: ThemeGeneratorFunction[]
  ) => new ThemeGenerator(isViewer, palette, themeGenerators);

  describe('constructor', () => {
    it('should create a new default theme', () => {
      const themeGenerator = createTheme(true);
      expect(themeGenerator.palette).toBeFalsy();
    });

    it('should throw if theme is unknwon', () => {
      const func = () => createTheme(true, 'stam' as PalettePreset);
      expect(func).toThrow();
    });

    it('should create theme object', () => {
      const themeGenerator = createTheme(false, wixPalettes.site1, [pluginHashtag().theme]);
      const { jssStyleSheet: styleObj } = themeGenerator.getStylesObject();

      //expect(styleObj).toBe('#414141');
      expect(styleObj.editor.color).toBe('#414141');
      expect(styleObj.editor.background).toBe('#FFFFFF');
    });
    it('should not render editor styles if isEditor=false', () => {
      const themeGenerator = createTheme(true, wixPalettes.site1, [pluginHashtag().theme]);
      const { jssStyleSheet: styleObj } = themeGenerator.getStylesObject();
      expect(styleObj).not.toHaveProperty('footerToolbar');
    });
  });
});
