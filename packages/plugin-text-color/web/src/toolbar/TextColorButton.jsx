import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextColorIcon from './TextColorIcon';
import { TEXT_COLOR_TYPE } from '../types';
import BaseTextColor from './BaseTextColor';
import { textForegroundPredicate } from '../text-decorations-utils';
import { get } from 'lodash';

export default class TextColorButton extends Component {
  constructor(props) {
    super(props);
    this.buttonRef = React.createRef();
  }

  render() {
    const settings = this.props.config[TEXT_COLOR_TYPE];
    const icon = get(settings, 'toolbar.icons.TextColor');
    const pluginParams = {
      dataHook: 'TextColorButton',
      toolTip: 'TextColorButton_Tooltip',
      icon: icon || TextColorIcon,
      type: TEXT_COLOR_TYPE,
      predicate: textForegroundPredicate,
    };
    return <BaseTextColor buttonRef={this.buttonRef} pluginParams={pluginParams} {...this.props} />;
  }
}

TextColorButton.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  onExtendContent: PropTypes.func.isRequired,
  onOverrideContent: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  textColorModal: PropTypes.bool,
  helpers: PropTypes.object,
  keyName: PropTypes.string,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  t: PropTypes.func,
  tabIndex: PropTypes.number,
  uiSettings: PropTypes.object,
  config: PropTypes.object,
  setKeepOpen: PropTypes.func,
};

TextColorButton.defaultProps = {
  setKeepOpen: () => {},
};
