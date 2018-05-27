import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { RadioGroupHorizontal, TextInput, isHttpsUrl, isValidUrl } from 'wix-rich-content-common';
import { SRC_TYPE_HTML, SRC_TYPE_URL } from '../constants';
import TextArea from './TextArea';
import styles from './HtmlEditPanel.scss';

class HtmlEditPanel extends Component {
  initialData = this.props.componentData;

  state = {
    srcType: this.initialData.srcType,
    [this.initialData.srcType]: this.initialData.src,
    submitted: false,
  };

  handleSrcTypeChange = srcType => {
    this.setState({ srcType }, this.updateComponentData);
  };

  handleSrcChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, this.updateComponentData);
  };

  updateComponentData = debounce(() => {
    const { srcType } = this.state;
    this.props.store.update('componentData', {
      srcType,
      src: this.state[srcType] || '',
    });
  }, 100);

  handleCancelClick = () => {
    this.props.store.update('componentData', this.initialData);
    this.props.close();
  };

  handleUpdateClick = () => {
    if (this.state.srcType !== SRC_TYPE_URL || !this.getUrlError()) {
      this.props.close();
    }

    this.setState({ submitted: true });
  };

  getUrlError() {
    const { url } = this.state;
    let error = null;

    if (!isHttpsUrl(url)) {
      error = 'HtmlEditPanel_HttpsError';
    } else if (!isValidUrl(url)) {
      error = 'HtmlEditPanel_UrlError';
    }

    return error;
  }

  render = () => {
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
            { value: SRC_TYPE_HTML, labelText: t('HtmlEditPanel_Code') },
            { value: SRC_TYPE_URL, labelText: t('HtmlEditPanel_Source') },
          ]}
          inline
        />

        <div className={styles.htmlEditPanel_input}>
          {srcType === SRC_TYPE_HTML && (
            <TextArea
              name={SRC_TYPE_HTML}
              onChange={this.handleSrcChange}
              tabIndex={tabIndex}
              value={this.state.html}
            />
          )}

          {srcType === SRC_TYPE_URL && (
            <TextInput
              name={SRC_TYPE_URL}
              onChange={this.handleSrcChange}
              tabIndex={tabIndex}
              value={this.state.url}
              error={submitted ? this.getUrlError() : null}
              theme={theme}
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
          >
            {t('HtmlEditPanel_Cancel')}
          </button>
          <button
            className={classNames(
              styles.htmlEditPanel_button,
              styles.htmlEditPanel_primaryButton
            )}
            onClick={this.handleUpdateClick}
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
