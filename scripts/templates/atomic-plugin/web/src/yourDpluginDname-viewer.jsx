import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../statics/styles/yourPluginName.scss';

class YourPluginNameViewer extends Component {
  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.props.theme });
    return <div>This is my new yourPluginName plugin!</div>;
  }
}

YourPluginNameViewer.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default YourPluginNameViewer;
