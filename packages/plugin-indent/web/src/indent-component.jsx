import React from 'react';
import PropTypes from 'prop-types';
import IndentViewer from './indent-viewer';
import { INDENT_TYPE } from './types';
import { DEFAULTS } from './defaults';

class IndentComponent extends React.Component {
  static type = { INDENT_TYPE };
  render() {
    const { componentData, settings } = this.props;
    return <IndentViewer componentData={componentData} settings={settings} />;
  }
}

IndentComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
};

export { IndentComponent as Component, DEFAULTS };
