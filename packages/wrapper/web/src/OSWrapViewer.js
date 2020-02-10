import React from 'react';
import GenWrp from './GenWrp';
import themeStrategyProvider from './ThemeStrategy';
import pluginsStrategyProviderViewer from './PluginsStrategyViewer';
import PropTypes from 'prop-types';

export default function OSWrapViewer({ strategies = [], plugins, theme, palette, children }) {
  strategies.push(themeStrategyProvider({ theme, palette }));
  strategies.push(pluginsStrategyProviderViewer({ plugins }));
  return <GenWrp strategies={strategies}>{children}</GenWrp>;
}

OSWrapViewer.propTypes = {
  children: PropTypes.any,
  strategies: PropTypes.array,
  plugins: PropTypes.arrayOf(PropTypes.object),
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  palette: PropTypes.array,
};
