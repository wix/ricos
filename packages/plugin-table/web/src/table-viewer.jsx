import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../statics/styles/table.scss';

class TableViewer extends Component {
  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.props.theme });
    return (
      <div style={{ border: '1px solid black', width: '400px', display: 'flex' }}>
        <div>
          <div style={{ border: '1px solid black', width: '200px' }}>1</div>
          <div style={{ border: '1px solid black', width: '200px' }}>2</div>
        </div>
        <div>
          <div style={{ border: '1px solid black', width: '200px' }}>3</div>
          <div style={{ border: '1px solid black', width: '200px' }}>4</div>
        </div>
      </div>
    );
  }
}

TableViewer.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default TableViewer;
