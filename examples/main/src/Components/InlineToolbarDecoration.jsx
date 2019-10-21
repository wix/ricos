import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getVisibleSelectionRect } from 'draft-js';

import styles from './InlineToolbarDecoration.scss';

class InlineToolbarDecoration extends Component {
  handleRef = el => {
    this.element = el;
    return this.props.refCallback(el);
  };

  render() {
    const { style, className, refCallback, children, ...props } = this.props;
    const alteredStyle = style;
    if (alteredStyle.top) {
      alteredStyle.top -= 10;
    }

    const selectionRect = getVisibleSelectionRect(window);
    const toolbarRect = this.element ? this.element.getBoundingClientRect() : {};
    console.log('TCL: InlineToolbarDecoration -> render -> toolbarRect', toolbarRect);
    const relLeft = selectionRect ? selectionRect.left + selectionRect.width / 2 : 0;
    const toolbarLeft = toolbarRect.left || 0;
    const left = relLeft - toolbarLeft;

    const arrowStyle = {
      left,
    };

    return (
      <div style={alteredStyle} className={className} ref={this.handleRef} {...props}>
        <div className={styles.arrow} style={arrowStyle} />
        {children}
      </div>
    );
  }
}

InlineToolbarDecoration.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string,
  refCallback: PropTypes.func,
};

InlineToolbarDecoration.displayName = 'InlineToolbarDecoration';

export default InlineToolbarDecoration;
