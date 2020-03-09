import React from 'react';
import EngineWrapper from './lib/EditorModal';
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
  const themeGenerators = plugins.filter(plug => !!plug.theme).map(plug => plug.theme);
  strategies.push(themeStrategyProvider(editor, { theme, palette, themeGenerators }));
  strategies.push(pluginsStrategyProvider(editor, { plugins }));
  strategies.push(localeStrategyProvider({ locale }));
  return (
    <EngineWrapper strategies={strategies} {...rest} editor={editor}>
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
