import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { MediaReplaceIcon } from '../icons';
import classNames from 'classnames';
import { mergeStyles, SettingsPanelFooter, TextInput, CloseIcon } from 'wix-rich-content-common';
import DesignComponent from './../components/design-component';
import styles from '../../statics/styles/button-input-modal.scss';


export default class ButtonInputModal extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { componentData } = this.props;
    this.state = {
      url: componentData.src || '',
      buttonName: componentData.buttonName || 'Click Me!',
      settings: true,
      design: false,
      inlineStyleSettings: {
        border: '2px solid #D9D4D4',
        width: '40%',
      },
      inlineStyleDesign: {}
    };
  }

  onUrlChange = e => {
    const url = e.target.value;
    this.setState({ url });
  };

  onTextChanged = e => {
    const buttonName = e.target.value;
    this.setState({ buttonName });
  };

  afterOpenModal = () => this.input.focus();

  onConfirm = () => {
    const { url, buttonName } = this.state;
    console.log('inputButtonComponent', this.props.pubsub);
    const { componentData, helpers, pubsub, onConfirm } = this.props;
    if (onConfirm) {
      onConfirm({ ...componentData, src: url, buttonName: buttonName });
    } else {
      pubsub.update('componentData', { src: url, buttonName: buttonName });
    }

    if (helpers && helpers.onVideoSelected) {
      helpers.onVideoSelected(url, data => pubsub.update('componentData', { metadata: { ...data } }));
    }

    this.onCloseRequested();

    this.setState({ submitted: true });

  };

  onCloseRequested = () => {
    this.setState({ isOpen: false });
    this.props.helpers.closeModal();
  };

  handleKeyPress = e => {
    if (e.charCode === 13) {
      this.onConfirm();
    }
  };

  onSettingClickHandler = () => {
    const style = {
      border: '2px solid #D9D4D4',
      width: '40%',
    }
    this.setState({ settings: true, design: false, inlineStyleSettings: style, inlineStyleDesign: {} });
  }
  onDesignClickHandler = () => {
    const style = {
      border: '2px solid #D9D4D4',
      width: '40%',
    }
    this.setState({ settings: false, design: true, inlineStyleSettings: {}, inlineStyleDesign: style });
  }
  render() {
    const { url, submitted, buttonName } = this.state;
    const { theme, doneLabel, cancelLabel, t } = this.props;
    const { styles } = this;
    
    return (
      <div className={styles.container} data-hook="videoUploadModal">
        <CloseIcon className={classNames(styles.closeIcon)} onClick={() => this.onCloseRequested()} />
        <div role="heading" aria-labelledby="video_modal_hdr" className={classNames(styles.header)}>
          <MediaReplaceIcon className={classNames(styles.cameraIcon, styles.header_icon)} />
          <h3 id="video_modal_hdr" className={styles.header_text}>
            {t('ButtonModal_Header')}
          </h3>
        </div>
        <div className={styles.toggle}>
          <div className={styles.settings} onClick={this.onSettingClickHandler} style={this.state.inlineStyleSettings}>
            Settings
        </div>
          <div className={styles.design} onClick={this.onDesignClickHandler} style={this.state.inlineStyleDesign}>
            Design
        </div>
        </div>

        {this.state.settings ?
          <div>
            <div className={styles.header_text}>
              What does this button say?
        </div>
            <div className={styles.videoUrlInputModal_textInput}>
              <TextInput
                inputRef={ref => {
                  this.input = ref;
                }}
                type="text"
                onKeyPress={this.handleKeyPress}
                onChange={this.onTextChanged}
                value={buttonName}
                placeholder={t('ButtonModal_InputName_Placeholder')}
                theme={theme}
                data-hook="ButtonInputModal"
              />
            </div>
            <br />
            <div >
              what does it link to?
        </div>
            <br />
            <div className={styles.videoUrlInputModal_textInput}>
              <TextInput
                inputRef={ref => {
                  this.input = ref;
                }}
                type="url"
                onKeyPress={this.handleKeyPress}
                onChange={this.onUrlChange}
                value={url}
                placeholder={t('ButtonModal_InputLink_Placeholder')}
                theme={theme}
                data-hook="ButtonInputModal"
              />
            </div>
            <br />
            <SettingsPanelFooter
              className={styles.modal_footer}
              save={() => this.onConfirm()}
              cancel={() => this.onCloseRequested()}
              saveLabel={doneLabel}
              cancelLabel={cancelLabel}
              theme={theme}
              t={t}
            />
          </div> : 
          <DesignComponent componentData={this.props} theme={theme}/>
        }
      </div>
    );
  }
}

ButtonInputModal.propTypes = {
  onConfirm: PropTypes.func,
  pubsub: PropTypes.object,
  helpers: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  url: PropTypes.string,
  theme: PropTypes.object.isRequired,
  doneLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  t: PropTypes.func,
};

ButtonInputModal.defaultProps = {
  doneLabel: 'Add Now',
  cancelLabel: 'Cancel',
};
