import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/row.scss';
import { setListeners } from '../table-resize';

class RowRenderer extends PureComponent {
  render() {
    return (
      <tr className={styles.container}>
        {this.props.children}
        {/* <div
          className={styles.resizer}
          // style={{ height: attributes.tableHeight }}
          // ref={ref => ref && setListeners(ref, attributes.onResize)}
        /> */}
      </tr>
    );
  }
}

RowRenderer.propTypes = {
  children: PropTypes.any,
};

export default RowRenderer;
