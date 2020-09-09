import React, { PureComponent } from 'react';
import { mergeStyles, RichContentTheme } from 'wix-rich-content-common';
import styles from '../../statics/styles/see-full-post.scss';
import { PreviewConfig } from '..';

interface Props {
  ellipsis?: string;
  label?: string;
  lines?: number;
  theme: RichContentTheme;
  showToggle?: boolean;
  t: (key: string) => string;
  onPreviewExpand: PreviewConfig['onPreviewExpand'];
  overlayStyles: typeof styles;
  labelStyles: typeof styles;
  onClick: (e: React.MouseEvent) => void;
}

class SeeFullPost extends PureComponent<Props, null> {
  styles: typeof styles;
  onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { onClick, onPreviewExpand } = this.props;
    e.preventDefault();
    onClick?.(e);
    onPreviewExpand?.();
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
