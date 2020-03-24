/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import cls from 'classnames';

import { getImageSrc } from 'wix-rich-content-common';

import { withRCEHelpers, RCEHelpersPropTypes } from '../rce-helpers-context';
import { AddImageIcon } from '../../assets/icons';

import { ImageUploadPropTypes } from './types';
import styles from './image-upload.scss';

class ImageUploadComponent extends PureComponent {
  static propTypes = {
    ...ImageUploadPropTypes,
    ...RCEHelpersPropTypes,
  };

  $fileInput = React.createRef();

  $container = React.createRef();

  handleFileUploadClick = () => {
    const { rce } = this.props;

    rce.setInPluginEditingMode(true);
    this.$fileInput.current.click();
  };

  handleFileUpload = ({ data }) => {
    const { helpers } = this.props;
    const { $container } = this;

    const { width, height } = $container.current.getBoundingClientRect();

    this.props.onChange(
      getImageSrc(data, helpers, {
        requiredWidth: width,
        requiredHeight: height,
        requiredQuality: 90,
        imageType: 'highRes',
      })
    );
  };

  handleFileReadLoad = (result, file) => {
    const { helpers } = this.props.rce;

    if (!helpers?.onFilesChange) {
      this.props.onChange(result);
    }

    helpers?.onFilesChange?.(file, this.handleFileUpload);
  };

  handleFileChange = () => {
    const [file] = this.$fileInput.current.files;
    const reader = new FileReader();

    reader.onload = e => this.handleFileReadLoad(e.target.result, file);

    reader.readAsDataURL(file);

    this.props.rce.setInPluginEditingMode(false);
    this.$fileInput.current.files = null;
  };

  render() {
    const { className, value, rce } = this.props;

    if (value) {
      return (
        <div
          className={cls(styles.container, className)}
          style={{ backgroundImage: `url('${value}')` }}
        />
      );
    }

    if (rce.isViewMode) {
      return null;
    }

    return (
      <div
        ref={this.$container}
        className={cls(styles.container, className)}
        onClick={this.handleFileUploadClick}
      >
        <AddImageIcon />
        <input
          type="file"
          className={styles.hidden}
          ref={this.$fileInput}
          onChange={this.handleFileChange}
        />
      </div>
    );
  }
}

export const ImageUpload = withRCEHelpers(ImageUploadComponent);
