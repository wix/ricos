import React from 'react';
import EngineWrapper from './EngineWrapper';
import themeStrategyProvider from './themeStrategy/themeStrategyProvider';
import pluginsStrategyProvider from './pluginsStrategy/pluginsStrategyProvider';
import localeStrategyProvider from './localeStrategy/localeStrategyProvider';
import PropTypes from 'prop-types';

export default function RichContentWrapper({
  strategies = [],
  theme,
  locale,
  palette,
  plugins = [],
  children,
  editor = false,
  ...rest
}) {
  const themeGenerators = plugins.filter(plugin => !!plugin.theme).map(plugin => plugin.theme);
  const mergedStrategies = [
    themeStrategyProvider(editor, { theme, palette, themeGenerators }),
    pluginsStrategyProvider(editor, { plugins }),
    localeStrategyProvider({ locale }),
    ...strategies,
  ];

  return (
    <EngineWrapper strategies={mergedStrategies} {...rest} editor={editor}>
      {children}
    </EngineWrapper>
  );
}
RichContentWrapper.propTypes = {
  children: PropTypes.any,
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  locale: PropTypes.string,
  palette: PropTypes.array,
  plugins: PropTypes.arrayOf(PropTypes.object),
  strategies: PropTypes.arrayOf(PropTypes.func),
  editor: PropTypes.bool,
};

RichContentWrapper.defaultProps = {
  locale: 'en',
};
