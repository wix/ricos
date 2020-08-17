import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class ValueViewer extends PureComponent {
  setRef = ref => {
    ref &&
      this.props.setCellContentHeight &&
      this.props.setCellContentHeight(ref.children[0].offsetHeight);
  };
  render() {
    const { value } = this.props;
    return (
      <span className="value-viewer" ref={this.setRef} style={{ height: '100%' }}>
        {value}
      </span>
    );
  }
}

ValueViewer.propTypes = {
  value: PropTypes.node.isRequired,
  setCellContentHeight: PropTypes.func,
};
