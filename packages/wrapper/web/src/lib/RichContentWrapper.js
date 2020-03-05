import React from 'react';
import EngineWrapper from '../EngineWrapper';
import themeStrategyProvider from '../themeStrategy/themeStrategyProvider';
import pluginsStrategyProvider from '../pluginsStrategy/pluginsStrategyProvider';
import localeStrategyProvider from '../localeStrategy/localeStrategyProvider';
import PropTypes from 'prop-types';

export function RichContentWrapper({
  strategies = [],
  theme,
  locale,
  palette,
  plugins = [],
  children,
  isEditor = false,
  ...rest
}) {
  const themeGenerators = plugins.filter(plug => !!plug.theme).map(plug => plug.theme);
  strategies.push(themeStrategyProvider(isEditor, { theme, palette, themeGenerators }));
  strategies.push(pluginsStrategyProvider(isEditor, { plugins }));
  strategies.push(localeStrategyProvider({ locale }));
  return (
    <EngineWrapper strategies={strategies} {...rest} isEditor={isEditor}>
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
  isEditor: PropTypes.bool,
};

RichContentWrapper.defaultProps = {
  locale: 'en',
};
