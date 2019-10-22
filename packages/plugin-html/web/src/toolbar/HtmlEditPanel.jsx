import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  RadioGroupHorizontal,
  TextInput,
  InputWithLabel,
  isValidUrl,
  startsWithHttps,
  hasProtocol,
  mergeStyles,
} from 'wix-rich-content-common';
import { identity, trimStart } from 'lodash';
import { SRC_TYPE_HTML, SRC_TYPE_URL } from '../constants';
import styles from '../../statics/styles/HtmlEditPanel.scss';

const VALIDATORS = {
  [SRC_TYPE_HTML]: () => null,
  [SRC_TYPE_URL]: url => {
    let error = null;

    if (!url || !isValidUrl(url)) {
      error = 'HtmlEditPanel_UrlError';
    } else if (!startsWithHttps(url) && hasProtocol(url)) {
      error = 'HtmlEditPanel_HttpsError';
    }

    return error;
  },
};

const NORMALIZERS = {
  [SRC_TYPE_HTML]: identity,
  [SRC_TYPE_URL]: url => (hasProtocol(url) ? url : `https://${trimStart(url, '//')}`),
};

class HtmlEditPanel extends Component {
  initialData = this.props.componentData;

  styles = mergeStyles({ styles, theme: this.props.theme });

  state = {
    srcType: this.initialData.srcType,
    [this.initialData.srcType]: this.initialData.src,
    submitted: false,
  };

  shouldSaveOnUnmount = true;

  handleSrcTypeChange = srcType => {
    this.setState({ srcType });
  };

  handleSrcChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleCancelClick = () => {
    this.props.store.update('componentData', this.initialData);
    this.props.close();
  };

  handleUpdateClick = () => {
    if (this.isValid()) {
      this.updateComponentData();
      this.close();
    }

    this.setState({ submitted: true });
  };

  close = () => {
    this.shouldSaveOnUnmount = false;
    this.props.close();
  };

  updateComponentData = () => {
    const { srcType } = this.state;
    this.props.store.update('componentData', {
      srcType,
      src: NORMALIZERS[srcType](this.state[srcType]) || '',
    });
  };

  getError = () => {
    const { srcType } = this.state;
    return VALIDATORS[srcType](this.state[srcType]);
  };

  isValid = () => !this.getError();

  render = () => {
    const { styles } = this;
    const { srcType, submitted } = this.state;
    const { t, tabIndex, theme } = this.props;

    return (
      <div className={styles.htmlEditPanel}>
        <RadioGroupHorizontal
          theme={theme}
          name="srcType"
          value={this.state.srcType}
          onChange={this.handleSrcTypeChange}
          dataSource={[
            {
              value: SRC_TYPE_HTML,
              labelText: t('HtmlEditPanel_Code'),
              dataHook: 'htmlEditPanel_radioHtml',
            },
            {
              value: SRC_TYPE_URL,
              labelText: t('HtmlEditPanel_Source'),
              dataHook: 'htmlEditPanel_radioUrl',
            },
          ]}
          inline
        />

        <div className={styles.htmlEditPanel_input}>
          {srcType === SRC_TYPE_HTML && (
            <div className={styles.htmlEditPanel_textArea}>
              <InputWithLabel
                name={SRC_TYPE_HTML}
                onChange={this.handleSrcChange}
                tabIndex={tabIndex}
                value={this.state[SRC_TYPE_HTML]}
                placeholder={t('HtmlEditPanel_HtmlInput_Placeholder')}
                theme={theme}
                isTextArea
                isFullHeight
                dataHook="htmlEditPanel_htmlInput"
              />
            </div>
          )}

          {srcType === SRC_TYPE_URL && (
            <TextInput
              name={SRC_TYPE_URL}
              onChange={this.handleSrcChange}
              tabIndex={tabIndex}
              value={this.state[SRC_TYPE_URL]}
              error={submitted ? t(this.getError()) : null}
              theme={theme}
              placeholder={t('HtmlEditPanel_UrlInput_Placeholder')}
            />
          )}
        </div>

        <div className={styles.htmlEditPanel_buttons}>
          <button
            className={classNames(
              styles.htmlEditPanel_button,
              styles.htmlEditPanel_secondaryButton
            )}
            onClick={this.handleCancelClick}
            data-hook="htmlEditPanel_Cancel"
          >
            {t('HtmlEditPanel_Cancel')}
          </button>
          <button
            className={classNames(styles.htmlEditPanel_button, styles.htmlEditPanel_primaryButton)}
            onClick={this.handleUpdateClick}
            data-hook="htmlEditPanel_Update"
          >
            {t('HtmlEditPanel_Update')}
          </button>
        </div>
      </div>
    );
  };
}

HtmlEditPanel.propTypes = {
  componentData: PropTypes.shape({
    srcType: PropTypes.string.isRequired,
    src: PropTypes.any,
  }).isRequired,
  store: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  tabIndex: PropTypes.number,
};

export default HtmlEditPanel;
