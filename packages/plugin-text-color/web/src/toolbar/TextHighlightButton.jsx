import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextColorIcon from './TextColorIcon';
import { TEXT_HIGHLIGHT_TYPE } from '../types';
import TextColorWrapper from './TextColorWrapper';

export default class TextHighlightButton extends Component {
  constructor(props) {
    super(props);
    this.buttonRef = React.createRef();
  }
  render() {
    const type = {
      dataHook: 'TextHighlightButton',
      toolTip: 'TextHighlightButton_Tooltip',
      icon: TextColorIcon,
      TYPE: TEXT_HIGHLIGHT_TYPE,
    };
    return <TextColorWrapper buttonRef={this.buttonRef} type={type} {...this.props} />;
  }
}

TextHighlightButton.propTypes = {
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

TextHighlightButton.defaultProps = {
  setKeepOpen: () => {},
};
