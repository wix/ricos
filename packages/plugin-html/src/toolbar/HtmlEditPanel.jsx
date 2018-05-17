import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RadioGroupHorizontal } from 'wix-rich-content-common';
import { SRC_TYPE_HTML, SRC_TYPE_URL } from '../constants';
import TextArea from './TextArea';
import styles from './HtmlEditPanel.scss';

class HtmlEditPanel extends Component {
  initialData = this.props.componentData;

  state = {
    srcType: this.initialData.srcType,
    [this.initialData.srcType]: this.initialData.src,
  };

  handleSrcTypeChange = srcType => {
    this.setState({ srcType }, this.updateComponentData);
  };

  handleSrcChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, this.updateComponentData);
  };

  updateComponentData = () => {
    const { srcType } = this.state;
    this.props.store.update('componentData', {
      srcType,
      src: this.state[srcType],
    });
  };

  handleCancelClick = () => {
    this.props.store.update('componentData', this.initialData);
    this.props.close();
  };

  render = () => {
    const { srcType } = this.state;
    const { t, tabIndex, theme } = this.props;

    return (
      <div className={styles.htmlEditPanel}>
        <RadioGroupHorizontal
          theme={theme}
          name="srcType"
          value={this.state.srcType}
          onChange={this.handleSrcTypeChange}
          dataSource={[
            { value: SRC_TYPE_HTML, labelText: t('HtmlPlugin_Code') },
            { value: SRC_TYPE_URL, labelText: t('HtmlPlugin_Source') },
          ]}
        />

        <div className={styles.htmlEditPanel_input}>
          {srcType === SRC_TYPE_HTML && (
            <TextArea name={SRC_TYPE_HTML} onChange={this.handleSrcChange} tabIndex={tabIndex}>{this.state.code}</TextArea>
          )}

          {srcType === SRC_TYPE_URL && (
            <input name={SRC_TYPE_URL} onChange={this.handleSrcChange} tabIndex={tabIndex} value={this.state.url}/>
          )}
        </div>

        <div className={styles.htmlEditPanel_buttons}>
          <button onClick={this.handleCancelClick}>{t('HtmlPlugin_Cancel')}</button>
          <button onClick={this.props.close}>{t('HtmlPlugin_Update')}</button>
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
