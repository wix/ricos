import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../statics/styles/table.scss';

class TableViewer extends Component {
  renderCell = id => {
    const { renderInnerRCE, viewerForInnerRCE, componentData } = this.props;
    return renderInnerRCE ? renderInnerRCE(id) : viewerForInnerRCE(componentData.config.cells[id]);
  };

  componentDidMount() {
    this.cleanDataOffsetKey();
  }

  cleanDataOffsetKey = () => {
    const readOnlyBlocks = this.tableRef.querySelectorAll('[data-offset-key]');
    readOnlyBlocks.forEach(block => block.removeAttribute('data-offset-key'));
  };

  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.props.theme });

    return (
      <div
        ref={tableRef => (this.tableRef = tableRef)}
        style={{ border: '1px solid black', width: '400px', display: 'flex' }}
      >
        <div style={{ zIndex: 1 }}>
          <div style={{ border: '1px solid black', width: '200px' }}>{this.renderCell(1)}</div>
          <div style={{ border: '1px solid black', width: '200px' }}>{this.renderCell(2)}</div>
        </div>
        <div style={{ zIndex: 1 }}>
          <div style={{ border: '1px solid black', width: '200px' }}>{this.renderCell(3)}</div>
          <div style={{ border: '1px solid black', width: '200px' }}>{this.renderCell(4)}</div>
        </div>
      </div>
    );
  }
}

TableViewer.propTypes = {
  disableRightClick: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  renderInnerRCE: PropTypes.func,
  viewerForInnerRCE: PropTypes.func,
  componentData: PropTypes.object,
};

export default TableViewer;
