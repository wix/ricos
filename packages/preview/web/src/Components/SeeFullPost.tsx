import React, { PureComponent } from 'react';
import { mergeStyles, RichContentTheme, TranslateFunction } from 'wix-rich-content-common';
import styles from '../../statics/styles/see-full-post.scss';
import { PreviewConfig } from '..';

interface Props {
  label?: string;
  lines?: number;
  theme: RichContentTheme;
  showToggle?: boolean;
  t: TranslateFunction;
  onPreviewExpand: PreviewConfig['onPreviewExpand'];
  overlayStyles: Record<string, string>;
  labelStyles: Record<string, string>;
  onClick?: (e: React.MouseEvent) => void;
}

class SeeFullPost extends PureComponent<Props> {
  styles: Record<string, string>;
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
