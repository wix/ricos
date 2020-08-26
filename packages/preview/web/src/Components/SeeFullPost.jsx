import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/see-full-post.scss';

class SeeFullPost extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    children: PropTypes.node.isRequired,
    overlayStyles: PropTypes.object,
    labelStyles: PropTypes.object,
    onPreviewExpand: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    theme: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onClick: () => {},
  };

  onClick = e => {
    const { onClick, onPreviewExpand } = this.props;
    e.preventDefault();
    onClick();
    onPreviewExpand();
  };

  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.props.theme });
    const {
      label = this.props.t('Preview_ReadMore_Label'),
      children,
      overlayStyles,
      labelStyles,
    } = this.props;
    /* eslint-disable */
    return (
      <div className={this.styles.seeFullPost_container}>
        {children}
        <div
          className={this.styles.seeFullPost_overlay}
          style={overlayStyles}
          onClick={this.onClick}
        >
          <span className={this.styles.seeFullPost_label} style={labelStyles}>
            {label}
          </span>
        </div>
      </div>
    );
  }
}

export default SeeFullPost;
