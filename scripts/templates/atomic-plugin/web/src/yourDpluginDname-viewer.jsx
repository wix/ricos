import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../statics/styles/yourDpluginDname.scss';

class YourPluginNameViewer extends Component {
  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.props.theme });
    return <div>This is my new yourDpluginDname plugin!</div>;
  }
}

YourPluginNameViewer.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default YourPluginNameViewer;
