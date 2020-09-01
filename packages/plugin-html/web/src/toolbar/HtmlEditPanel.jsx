import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { RadioGroupHorizontal, TextInput, InputWithLabel } from 'wix-rich-content-plugin-commons';
import { mergeStyles, isValidUrl, startsWithHttps, hasProtocol } from 'wix-rich-content-common';
import { identity, trimStart } from 'lodash';
import { SRC_TYPE_HTML, SRC_TYPE_URL } from '../constants';
import AdsenseTitle from '../AdsenseTitle';
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

  handleSrcTypeChange = srcType => {
    this.setState({ srcType });
  };

  handleSrcChange = target => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.updateComponentData());
  };

  handleCancelClick = () => {
    this.props.store.update('componentData', this.initialData);
    this.props.close();
  };

  updateComponentData = () => {
    const { srcType } = this.state;
    if (this.isValid()) {
      this.props.store.update('componentData', {
        srcType,
        src: NORMALIZERS[srcType](this.state[srcType]) || '',
      });
    }

    this.setState({ submitted: true });
  };

  getError = () => {
    const { srcType } = this.state;
    return VALIDATORS[srcType](this.state[srcType]);
  };

  isValid = () => !this.getError();

  render = () => {
    const { styles } = this;
    const { srcType, submitted } = this.state;
    const {
      t,
      tabIndex,
      theme,
      componentData: { config },
    } = this.props;
    const inputBaseProps = {
      onChange: this.handleSrcChange,
      getTarget: true,
      tabIndex,
      theme,
    };

    return (
      <div className={styles.htmlEditPanel}>
        {config?.isAdsense ? (
          <AdsenseTitle t={t} />
        ) : (
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
          )}

        <div className={styles.htmlEditPanel_input}>
          {srcType === SRC_TYPE_HTML && (
            <div className={styles.htmlEditPanel_textArea}>
              <InputWithLabel
                name={SRC_TYPE_HTML}
                value={this.state[SRC_TYPE_HTML]}
                placeholder={
                  config?.isAdsense
                    ? t('HtmlEditPanel_HtmlInput_AdSense_Placeholder')
                    : t('HtmlEditPanel_HtmlInput_Placeholder')
                }
                isTextArea
                isFullHeight
                dataHook="htmlEditPanel_htmlInput"
                {...inputBaseProps}
              />
            </div>
          )}

          {srcType === SRC_TYPE_URL && (
            <TextInput
              name={SRC_TYPE_URL}
              value={this.state[SRC_TYPE_URL]}
              data-hook="htmlEditPanel_htmlInput"
              error={submitted ? t(this.getError()) : null}
              placeholder={t('HtmlEditPanel_UrlInput_Placeholder')}
              {...inputBaseProps}
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
            onClick={this.props.close}
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
    config: PropTypes.object,
  }).isRequired,
  store: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  tabIndex: PropTypes.number,
};

export default HtmlEditPanel;
