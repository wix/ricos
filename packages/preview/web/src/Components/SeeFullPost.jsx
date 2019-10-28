import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Context, mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/see-full-post.scss';

class SeeFullPost extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    children: PropTypes.node.isRequired,
    overlayStyles: PropTypes.object,
    labelStyles: PropTypes.object,
    onPreviewExpand: PropTypes.func.isRequired,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    label: 'See full post',
    onClick: () => {},
  };

  onClick = e => {
    const { onClick, onPreviewExpand } = this.props;
    e.preventDefault();
    onClick();
    onPreviewExpand();
  };

  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.context.theme });
    const { label, children, overlayStyles, labelStyles } = this.props;
    /* eslint-disable */
    return (
      <Fragment>
        {children}
        <div className={this.styles.seeFullPost_overlay} style={overlayStyles} onClick={this.onClick}>
          <span className={this.styles.seeFullPost_label} style={labelStyles}>
            {label}
          </span>
        </div>
      </Fragment>
    );
  }
}

SeeFullPost.contextType = Context.type;

export default SeeFullPost;
