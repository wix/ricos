import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RichUtils } from 'wix-rich-content-editor-common';
import { Version } from 'wix-rich-content-common';
import TextButton from '../TextButton';

export default ({ style, Icon, tooltipTextKey }) =>
  class TextInlineStyleButton extends Component {
    static propTypes = {
      getEditorState: PropTypes.func.isRequired,
      setEditorState: PropTypes.func.isRequired,
      theme: PropTypes.object.isRequired,
      helpers: PropTypes.object,
      isMobile: PropTypes.bool,
      t: PropTypes.func,
      tabIndex: PropTypes.number,
    };

    toggleStyle = event => {
      const { getEditorState, setEditorState } = this.props;
      event.preventDefault();
      setEditorState(RichUtils.toggleInlineStyle(getEditorState(), style));
    };

    isActive = () => {
      const { getEditorState } = this.props;
      if (getEditorState) {
        return getEditorState()
          .getCurrentInlineStyle()
          .has(style);
      } else {
        return false;
      }
    };

    render() {
      const { theme, helpers, isMobile, t, tabIndex } = this.props;
      const tooltipText = t(tooltipTextKey);
      const textForHooks = tooltipText.replace(/\s+/, '');
      const dataHookText = `textInlineStyleButton_${textForHooks}`;
      const onClick = e => {
        helpers?.onToolbarButtonClick?.({
          buttonName: textForHooks,
          version: Version.currentVersion,
          value: String(!this.isActive()),
        });
        this.toggleStyle(e);
      };

      return (
        <TextButton
          icon={Icon}
          theme={theme}
          isMobile={isMobile}
          isActive={this.isActive}
          onClick={onClick}
          tooltipText={tooltipText}
          dataHook={dataHookText}
          tabIndex={tabIndex}
          tooltipOffset={{ y: -20 }}
        />
      );
    }
  };
