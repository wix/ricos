import ThemeGenerator from './ThemeGenerator';
import { StyleSheet as Aphrodite } from 'aphrodite';
import { defaultTheme } from './defaults';

const createThemeStrategy = (themeObj = {}) => (innerProps = {}) => {
  const { theme = {} } = innerProps;
  return { theme: { ...themeObj, ...theme } };
};

const withNestedCssSupport = () =>
  Aphrodite.extend([
    {
      selectorHandler: (selector, baseSelector, generateSubtreeStyles) => {
        const nestedTags = [];
        const selectors = selector.split(',');
        selectors.forEach((subselector, key) => {
          if (selector[0] === '&') {
            const tag = key === 0 ? subselector.slice(1) : subselector;
            const nestedTag = generateSubtreeStyles(
              `${baseSelector} ${tag}`.replace(/ +(?= )/g, '')
            );
            nestedTags.push(nestedTag);
          }
        });
        return nestedTags.length ? nestedTags.flat() : null;
      },
    },
  ]);

export default function themeStrategyProvider(isEditor, themeProperties) {
  const { theme } = themeProperties;
  if (typeof theme === 'string') {
    const themeGenerator = new ThemeGenerator(isEditor, themeProperties);
    const { StyleSheet, css } = withNestedCssSupport();
    const styles = StyleSheet.create(themeGenerator.getStylesObject());

    const themeObj = Object.entries(styles).reduce((prev, curr) => {
      return { ...prev, [curr[0]]: css(curr[1]) };
    }, {});

    return createThemeStrategy({ ...defaultTheme, ...themeObj });
  }
  return createThemeStrategy({ ...defaultTheme, ...theme });
}
