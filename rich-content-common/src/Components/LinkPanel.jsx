import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isUndefined from 'lodash/isUndefined';
import { mergeStyles } from '../Utils/mergeStyles';
import { isValidUrl } from '../Utils/urlValidators';
import Tooltip from './Tooltip';
import Checkbox from './Checkbox';
import ErrorIcon from './icons/error.svg';
import styles from '../Styles/link-panel.scss';

class LinkPanel extends Component {
  constructor(props) {
    super(props);
    const { url, targetBlank, nofollow } = props;
    const intermediateUrl = url || '';
    this.state = {
      intermediateUrl,
      url: url || '',
      isValidUrl: true,
      targetBlank: isUndefined(targetBlank) ? true : targetBlank,
      nofollow: isUndefined(nofollow) ? false : nofollow,
    };
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  componentDidMount() {
    if (!this.props.isImageSettings) {
      this.input.focus();
    }
  }

  handleIntermediateUrlChange = event => {
    this.setState({ intermediateUrl: event.target.value });
  };

  handleUrlChange = () => {
    const { intermediateUrl } = this.state;
    this.setState({ url: intermediateUrl });
  };

  handleTargetChange = event => {
    this.setState({ targetBlank: event.target.checked });
  };

  handleNofollowChange = event => {
    this.setState({ nofollow: event.target.checked });
  };

  validateUrl = () => {
    const { intermediateUrl } = this.state;
    const isValidUrlConst = isValidUrl(intermediateUrl) || (intermediateUrl === '');
    if (isValidUrlConst) {
      this.handleUrlChange();
    }
    this.setState({ isValidUrl: isValidUrlConst });
  };

  handleKeyPress = e => {
    if (e.charCode === 13) {
      this.validateUrl(e);
    }
  };

  render() {
    const { styles } = this;
    const { isImageSettings, theme, anchorTarget, relValue, t, ariaProps } = this.props;
    const showTargetBlankCheckbox = anchorTarget !== '_blank';
    const showRelValueCheckbox = relValue !== 'nofollow';
    const firstCheckboxText = t('LinkPanel_Target_Checkbox');
    const secondCheckboxText = t('LinkPanel_Nofollow_Checkbox');
    const inputPlaceholder = isImageSettings ? t('LinkPanel_InputPlaceholder_ImageSettings') : t('LinkPanel_InputPlaceholder');
    const errorTooltipText = t('LinkPanel_ErrorTooltip');
    const textInputClassName = classNames(styles.linkPanel_textInput,
      {
        [styles.linkPanel_textInput_invalid]: !this.state.isValidUrl,
        [styles.linkPanel_imageSettings]: isImageSettings
      }
    );
    return (
      <div className={styles.linkPanel_Content} {...ariaProps} role="form">
        <div className={styles.linkPanel_Input}>
          <input
            onKeyPress={this.handleKeyPress}
            tabIndex="0" type="url" ref={ref => (this.input = ref)} className={textInputClassName} placeholder={inputPlaceholder}
            data-hook="linkPanelInput" onChange={this.handleIntermediateUrlChange} onBlur={this.validateUrl} value={this.state.intermediateUrl}
          />
          {this.state.isValidUrl ? null : (
            <Tooltip data-hook="linkPanelTooltip" content={errorTooltipText} moveBy={{ x: -23, y: -5 }} theme={theme}>
              <span><ErrorIcon data-hook="linkPanelError" className={styles.linkPanel_errorIcon}/></span>
            </Tooltip>
          )}
        </div>
        <div>
          {showTargetBlankCheckbox &&
            <Checkbox
              label={firstCheckboxText} theme={theme} checked={this.state.targetBlank}
              dataHook="linkPanelBlankCheckbox" onChange={this.handleTargetChange}
            />
          }
          {showRelValueCheckbox &&
            <Checkbox
              label={secondCheckboxText} theme={theme} checked={this.state.nofollow}
              dataHook="linkPanelRelCheckbox" onChange={this.handleNofollowChange}
            />
          }
        </div>
      </div>
    );
  }
}

LinkPanel.propTypes = {
  url: PropTypes.string,
  targetBlank: PropTypes.bool,
  nofollow: PropTypes.bool,
  isImageSettings: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  t: PropTypes.func,
  ariaProps: PropTypes.object,
};
export default LinkPanel;
