import React from 'react';
import EngineWrapper from './EngineWrapper';
import themeStrategyProvider from './ThemeStrategy';
import pluginsStrategyProviderViewer from './PluginsStrategyViewer';
import PropTypes from 'prop-types';

export default function ViewerWrapper({ strategies = [], plugins, theme, palette, children }) {
  strategies.push(themeStrategyProvider({ theme, palette }));
  strategies.push(pluginsStrategyProviderViewer({ plugins }));
  return <EngineWrapper strategies={strategies}>{children}</EngineWrapper>;
}

ViewerWrapper.propTypes = {
  children: PropTypes.any,
  strategies: PropTypes.array,
  plugins: PropTypes.arrayOf(PropTypes.object),
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  palette: PropTypes.array,
};
