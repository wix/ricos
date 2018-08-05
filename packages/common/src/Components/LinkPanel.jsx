import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isUndefined from 'lodash/isUndefined';
import isEqual from 'lodash/isEqual';
import { mergeStyles } from '../Utils/mergeStyles';
import { isValidUrl } from '../Utils/urlValidators';
import Tooltip from './Tooltip';
import Checkbox from './Checkbox';
import { ErrorIcon } from '../Icons';
import styles from '../../statics/styles/link-panel.scss';

class LinkPanel extends Component {
  constructor(props) {
    super(props);
    this.state = this.propsToState(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { t, isImageSettings } = props;
    this.firstCheckboxText = t('LinkPanel_Target_Checkbox');
    this.secondCheckboxText = t('LinkPanel_Nofollow_Checkbox');
    this.inputPlaceholder = isImageSettings ? t('LinkPanel_InputPlaceholder_ImageSettings') : t('LinkPanel_InputPlaceholder');
    this.errorTooltipText = t('LinkPanel_ErrorTooltip');
  }

  componentDidMount() {
    if (!this.props.isImageSettings) {
      this.input.focus();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props, nextProps)) {
      this.setState(this.propsToState(nextProps));
    }
  }

  propsToState = props => {
    const state = {
      url: props.url || '',
      intermediateUrl: props.intermediateUrl || props.url || '',
      targetBlank: isUndefined(props.targetBlank) ? true : props.targetBlank,
      nofollow: isUndefined(props.nofollow) ? false : props.nofollow
    };
    state.isValidUrl = isValidUrl(state.intermediateUrl) || (state.intermediateUrl === '');
    return state;
  };

  handleIntermediateUrlChange = event => {
    const { onIntermediateUrlChange } = this.props;
    if (onIntermediateUrlChange) {
      onIntermediateUrlChange(event.target.value);
    } else {
      this.setState({ intermediateUrl: event.target.value });
    }
  };

  handleUrlChange = () => {
    const { onUrlChange } = this.props;
    if (onUrlChange) {
      onUrlChange();
    } else {
      const { intermediateUrl } = this.state;
      this.setState({ url: intermediateUrl });
    }
  };

  handleTargetChange = event => {
    const { onTargetBlankChange } = this.props;
    if (onTargetBlankChange) {
      onTargetBlankChange(event.target.checked);
    } else {
      this.setState({ targetBlank: event.target.checked });
    }
  };

  handleNofollowChange = event => {
    const { onNofollowChange } = this.props;
    if (onNofollowChange) {
      onNofollowChange(event.target.checked);
    } else {
      this.setState({ nofollow: event.target.checked });
    }
  };

  validateUrl = () => {
    const { intermediateUrl } = this.state;
    const isValidUrlConst = isValidUrl(intermediateUrl) || (intermediateUrl === '');
    if (isValidUrlConst) {
      this.handleUrlChange();
    }
    const { onValidateUrl } = this.props;
    if (onValidateUrl) {
      onValidateUrl(isValidUrlConst);
    } else {
      this.setState({ isValidUrl: isValidUrlConst });
    }
  };

  handleKeyDown = e => {
    const { onEnter, onEscape } = this.props;
    if (e.key === 'Enter') { // TODO: only the 2nd 'Enter' key closes the panel because of setState() call in the validateUrl
      if (onEnter) {
        onEnter(e);
      } else {
        this.validateUrl();
      }
    } else if (e.key === 'Escape') {
      onEscape && onEscape(e);
    }
  };

  render() {
    const { styles } = this;
    const { isImageSettings, theme, anchorTarget, relValue, ariaProps } = this.props;
    const showTargetBlankCheckbox = anchorTarget !== '_blank';
    const showRelValueCheckbox = relValue !== 'nofollow';

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
            onKeyDown={this.handleKeyDown}
            tabIndex="0" type="url" ref={ref => (this.input = ref)} className={textInputClassName} placeholder={this.inputPlaceholder}
            data-hook="linkPanelInput" onChange={this.handleIntermediateUrlChange} onBlur={this.validateUrl} value={this.state.intermediateUrl}
          />
          {this.state.isValidUrl ? null : (
            <Tooltip data-hook="linkPanelTooltip" content={this.errorTooltipText} moveBy={{ x: -23, y: -5 }} theme={theme}>
              <span><ErrorIcon data-hook="linkPanelError" className={styles.linkPanel_errorIcon} /></span>
            </Tooltip>
          )}
        </div>
        <div>
          {showTargetBlankCheckbox &&
            <Checkbox
              label={this.firstCheckboxText} theme={theme} checked={this.state.targetBlank}
              dataHook="linkPanelBlankCheckbox" onChange={this.handleTargetChange}
            />
          }
          {showRelValueCheckbox &&
            <Checkbox
              label={this.secondCheckboxText} theme={theme} checked={this.state.nofollow}
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
  intermediateUrl: PropTypes.string,
  targetBlank: PropTypes.bool,
  nofollow: PropTypes.bool,
  isImageSettings: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  t: PropTypes.func,
  ariaProps: PropTypes.object,
  onUrlChange: PropTypes.func,
  onIntermediateUrlChange: PropTypes.func,
  onTargetBlankChange: PropTypes.func,
  onNofollowChange: PropTypes.func,
  onValidateUrl: PropTypes.func,
  onEnter: PropTypes.func,
  onEscape: PropTypes.func,
};
export default LinkPanel;
