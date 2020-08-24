/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RichContentEditor from './RichContentEditor';
import styles from '../../statics/styles/rich-content-editor.scss';
import 'wix-rich-content-common/dist/statics/styles/draftDefault.rtlignore.scss';
import { convertToRaw } from '../../lib/editorStateConversion';

class InnerRCE extends Component {
  constructor(props) {
    super(props);
    const { innerRCERenderedIn, config, editorState } = this.props;
    this.plugins = config[innerRCERenderedIn].innerRCEPlugins;
    this.state = {
      editorState,
      isFocused: false,
    };
    this.editorRef = React.createRef();
  }

  componentDidMount() {
    const { MobileToolbar, TextToolbar } = this.editorRef.current.getToolbars();
    this.setState({ MobileToolbar, TextToolbar });
  }

  saveInnerRCE = editorState => {
    this.setState(editorState);
    const { onChange } = this.props;
    const newContentState = convertToRaw(editorState.getCurrentContent());
    onChange(newContentState);
  };

  onFocus = e => {
    e.stopPropagation();
  };

  render() {
    const { theme, isMobile, additionalProps, ...rest } = this.props;
    const { MobileToolbar, TextToolbar, editorState } = this.state;
    const TopToolbar = MobileToolbar || TextToolbar;
    return (
      <div
        data-id="inner-rce"
        onFocus={this.onFocus}
        className={classNames(styles.editor, theme.editor)}
      >
        {TopToolbar && (
          <div className="toolbar-wrapper">
            <TopToolbar />
          </div>
        )}
        <RichContentEditor
          {...rest} // {...rest} need to be before editorState, onChange, plugins
          ref={this.editorRef}
          editorState={editorState}
          onChange={this.saveInnerRCE}
          plugins={this.plugins}
          isMobile={isMobile}
          toolbarsToIgnore={['FooterToolbar', 'SideToolbar']}
          isInnerRCE
          editorKey="inner-rce"
          {...additionalProps}
        />
      </div>
    );
  }
}

InnerRCE.propTypes = {
  editorState: PropTypes.object,
  innerRCEPlugins: PropTypes.array,
  theme: PropTypes.object,
  isMobile: PropTypes.bool,
  onChange: PropTypes.func,
  plugins: PropTypes.array,
  innerRCERenderedIn: PropTypes.string,
  config: PropTypes.object,
  innerRCEcb: PropTypes.func,
  setInPluginEditingMode: PropTypes.func,
  setFocusToBlock: PropTypes.func,
  additionalProps: PropTypes.object,
};

export default InnerRCE;
