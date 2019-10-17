import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextColorIcon from './TextColorIcon';
import { TEXT_HIGHLIGHT_TYPE } from '../types';
import TextColorWrapper from './TextColorWrapper';
import { DEFAULT_STYLE_SELECTION_HIGHLIGHT_PREDICATE } from '../constants';

export default class TextHighlightButton extends Component {
  constructor(props) {
    super(props);
    this.buttonRef = React.createRef();
  }
  render() {
    const decorator = {
      dataHook: 'TextHighlightButton',
      toolTip: 'TextHighlightButton_Tooltip',
      icon: TextColorIcon,
      type: TEXT_HIGHLIGHT_TYPE,
      defaultStyleSelectionPredicate: DEFAULT_STYLE_SELECTION_HIGHLIGHT_PREDICATE,
    };
    return <TextColorWrapper buttonRef={this.buttonRef} decorator={decorator} {...this.props} />;
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
