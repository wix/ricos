import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { mergeStyles, SettingsPanelFooter, TextInput, CloseIcon, Checkbox, Tabs, Tab, FocusManager } from 'wix-rich-content-common';
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
      inlineStyleSettings: {
        borderBottom: '2px solid #0261ff',
      },
      inlineStyleDesign: {},
      newTap: false,
      nonfollowTag: false,
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
    const { componentData, helpers, pubsub, onConfirm } = this.props;
    if (onConfirm) {
      onConfirm({ ...componentData, src: url, buttonName });
    } else {
      pubsub.update('componentData', { src: url, buttonName });
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

  onNewTapChecked = () => {
    this.setState({ newTap: !this.state.newTap });
  };

  onNonfollowTagChecked = () => {
    this.setState({ nonfollowTag: !this.state.nonfollowTag });
  };

  render() {
    const { url, buttonName } = this.state;
    const { theme, doneLabel, cancelLabel, t } = this.props;
    const { styles } = this;
    const settingsSection = (
      <div className={styles.section_content}>
        <div className={styles.header_text}>
          {t('ButtonModal_Button_Text')}
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
          {t('ButtonModal_Button_Link')}
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
        <div className={styles.checkboxes_group}>
          <Checkbox checked={this.state.newTap} theme={theme} onChange={this.onNewTapChecked} label={t('ButtonModal_New_Tap')} />
          <Checkbox checked={this.state.nonfollowTag} theme={theme} onChange={this.onNonfollowTagChecked} label={t('ButtonModal_Nofollow_Tags')} />
        </div>
      </div>
    );
    return (
      <div className={styles.container} data-hook="ButtonInputModal">
        <CloseIcon className={classNames(styles.closeIcon)} onClick={() => this.onCloseRequested()} />
        <div role="heading" aria-labelledby="button_modal_hdr" className={classNames(styles.header)}>
          <h3 id="button_modal_hdr" className={styles.header_text}>
            {t('ButtonModal_Header')}
          </h3>
        </div>
        <FocusManager>
          <div>
            <Tabs value={'manage_setting'} theme={theme} >
              <Tab label={t('ButtonModal_Settings_Tab')} value={'manage_setting'} theme={theme}>
                {settingsSection}
              </Tab>
              <Tab label={t('ButtonModal_Design_Tab')} value={'manage_design'} theme={theme}>
                <DesignComponent componentData={this.props} theme={theme} t={t} />
              </Tab>
            </Tabs>
          </div>
        </FocusManager>
        <SettingsPanelFooter
          className={styles.modal_footer}
          save={() => this.onConfirm()}
          cancel={() => this.onCloseRequested()}
          saveLabel={doneLabel}
          cancelLabel={cancelLabel}
          theme={theme}
          t={t}
        />
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
