import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../statics/styles/accordion.scss';

class AccordionViewer extends Component {
  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.props.theme });
    return <div>This is my new accordion plugin!</div>;
  }
}

AccordionViewer.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default AccordionViewer;
