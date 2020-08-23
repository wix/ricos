import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../statics/styles/table.scss';

class TableViewer extends Component {
  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.props.theme });
    return <div>This is my new table plugin!</div>;
  }
}

TableViewer.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default TableViewer;
