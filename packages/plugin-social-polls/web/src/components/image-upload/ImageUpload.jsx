/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import cls from 'classnames';

import { withContentRect } from 'react-measure';

import { withRCEHelpers, RCEHelpersPropTypes } from '../rce-helpers-context';
import { LoaderIcon, ReplaceIcon } from '../../assets/icons';
import { getRandomValue, getImageSrc } from '../../helpers';
import { POLL_IMAGES_POOL } from '../../defaults';

import { ImageUploadPropTypes } from './types';
import styles from './image-upload.scss';

class ImageUploadComponent extends PureComponent {
  static propTypes = {
    ...ImageUploadPropTypes,
    ...RCEHelpersPropTypes,
  };

  static defaultProps = {
    imagesPool: [],
    disabled: false,
  };

  state = {
    value: this.props.value || getRandomValue(POLL_IMAGES_POOL),
    backgroundImage: null,
    loading: false,
  };

  $label = React.createRef();

  componentWillReceiveProps(props) {
    const { value, contentRect } = props;
    const { value: prevValue, contentRect: prevContentRect } = this.props;

    if (value !== prevValue) {
      this.setState({ value }, () => this.updateBackgroundImage());
    }

    if (JSON.stringify(contentRect.bounds) !== JSON.stringify(prevContentRect.bounds)) {
      this.updateBackgroundImage(contentRect.bounds);
    }
  }

  sync() {
    this.props.onChange(this.state.value);
  }

  updateBackgroundImage(bounds = this.props.contentRect.bounds) {
    const { value } = this.state;

    if (!bounds.width || !bounds.height) {
      return null;
    }

    const backgroundImage = `url(${getImageSrc(value, bounds.width, bounds.height)})`;

    this.setState(() => ({
      backgroundImage,
    }));
  }

  handleFileUpload = ({ data }) => {
    this.setState(
      {
        value: `https://static.wixstatic.com/media/${data.file_name}`,
        loading: false,
      },
      () => {
        this.updateBackgroundImage();
        this.sync();
      }
    );
  };

  handleFileReadLoad = (backgroundImage, file) => {
    const { helpers } = this.props.rce;

    this.setState({ backgroundImage: `url(${backgroundImage})`, loading: false });

    if (helpers?.handleFileUpload) {
      this.setState({ loading: true });
      helpers.handleFileUpload(file, this.handleFileUpload);
    }
  };

  handleInputChange = e => {
    this.handleFileChange(Array.from(e.target.files));
    e.target.value = null;
  };

  handleFileChange = ([file]) => {
    const reader = new FileReader();

    this.setState({ loading: true });

    reader.onload = e => this.handleFileReadLoad(e.target.result, file);
    reader.readAsDataURL(file);
  };

  handleKeyPress = e => {
    const enterOrSpace =
      e.key === 'Enter' ||
      e.key === ' ' ||
      e.key === 'Spacebar' ||
      e.which === 13 ||
      e.which === 32;

    if (enterOrSpace) {
      e.preventDefault();
      this.$label.current?.click();
    }
  };

  handleFocus = () => {
    const { rce } = this.props;
    rce.setInPluginEditingMode(true);
  };

  handleBlur = () => {
    const { rce } = this.props;
    rce.setInPluginEditingMode(false);
  };

  render() {
    const { className, rce, small, disabled, measureRef, style = {} } = this.props;
    const { loading, backgroundImage } = this.state;

    return (
      <div
        ref={measureRef}
        className={cls(styles.container, className, {
          [styles.disabled]: rce.isViewMode || disabled,
        })}
        style={{ ...style, backgroundImage }}
        tabIndex={rce.isViewMode ? -1 : 0}
        role="button"
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyPress={this.handleKeyPress}
      >
        <label ref={this.$label}>
          <input
            type="file"
            disabled={rce.isViewMode || disabled}
            onChange={this.handleInputChange}
            accept="image/*"
            tabIndex={-1}
            style={{
              position: 'absolute',
              opacity: 0,
              top: 0,
            }}
          />
          <div
            className={cls(styles.overlay, {
              [styles.shown]: loading,
            })}
          >
            {loading ? (
              <LoaderIcon
                width={small ? 24 : 48}
                height={small ? 24 : 48}
                className={styles.spinner}
              />
            ) : (
              <>
                <ReplaceIcon />
                <p
                  className={cls(styles.text, {
                    [styles.hide]: small,
                  })}
                >
                  Change Image
                </p>
              </>
            )}
          </div>
        </label>
      </div>
    );
  }
}

export const ImageUpload = withContentRect('bounds')(withRCEHelpers(ImageUploadComponent));
