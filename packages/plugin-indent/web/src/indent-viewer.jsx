import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../statics/styles/indent.scss';

class IndentViewer extends Component {
  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.props.theme });
    return <div>This is my new indent plugin!</div>;
  }
}

IndentViewer.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default IndentViewer;
