import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import classNames from 'classnames';
import styles from '../../statics/styles/see-full-post.scss';

class SeeFullPost extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    labelPosition: PropTypes.oneOf(['start', 'center', 'end']),
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
      label = this.props.t('Preview_SeeFullPost_Label'),
      children,
      overlayStyles,
      labelStyles,
      labelPosition = 'center',
    } = this.props;
    const overlay = classNames(
      this.styles.seeFullPost_overlay,
      this.styles[`seeFullPost_direction_${labelPosition}`]
    );
    /* eslint-disable */
    return (
      <div className={this.styles.seeFullPost_container}>
        {children}
        <div className={overlay} style={overlayStyles} onClick={this.onClick}>
          <span className={this.styles.seeFullPost_label} style={labelStyles}>
            {label}
          </span>
        </div>
      </div>
    );
  }
}

export default SeeFullPost;
