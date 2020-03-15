import React from 'react';
import PropTypes from 'prop-types';
import YourPluginNameViewer from './yourDpluginDname-viewer';
import { YOUR_PLUGIN_NAME_TYPE } from './types';
import { DEFAULTS } from './defaults';

class YourPluginNameComponent extends React.Component {
  static type = { YOUR_PLUGIN_NAME_TYPE };
  render() {
    const { componentData, settings } = this.props;
    return <YourPluginNameViewer componentData={componentData} settings={settings} />;
  }
}

YourPluginNameComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
};

export { YourPluginNameComponent as Component, DEFAULTS };
