/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RichContentEditor from './RichContentEditor';
import styles from '../../statics/styles/rich-content-editor.scss';
import 'wix-rich-content-common/dist/statics/styles/draftDefault.rtlignore.scss';
import { convertToRaw } from '../../lib/editorStateConversion';
import { debounce } from 'lodash';
// import { EditorState, createSelection, setSelection } from 'wix-rich-content-editor-common';
import ClickOutside from 'react-click-outside';

class InnerRCEModal extends Component {
  constructor(props) {
    super(props);
    const { innerRCERenderedIn, config, innerRCEEditorState } = this.props;
    this.plugins = config[innerRCERenderedIn].innerRCEPlugins;
    this.state = {
      innerRCEEditorState,
      // toolbarsToIgnore: ['FooterToolbar'],
      toolbarsToIgnore: ['FooterToolbar', 'SideToolbar'],
      isFocused: false,
    };
  }

  componentDidMount() {
    const { MobileToolbar, TextToolbar } = this.innerEditor.getToolbars();
    this.setState({ MobileToolbar, TextToolbar });
    this.innerEditor.focus();
  }

  saveInnerRCE = debounce(innerRCEEditorState => {
    this.setState(innerRCEEditorState);
    const { innerRCEcb } = this.props;
    const newContentState = convertToRaw(innerRCEEditorState.getCurrentContent());
    innerRCEcb(newContentState);
  }, 200);

  onFocus = () => {
    const { setInPluginEditingMode, id } = this.props;
    setInPluginEditingMode(true, id);
    this.setState({ toolbarsToIgnore: ['FooterToolbar'], isFocused: true });
  };

  onBlur = e => {
    const { isFocused } = this.state;
    if (isFocused) {
      const clickOnSideToolbar = e.path.find(element =>
        element?.className?.includes('side-toolbar')
      );
      if (!clickOnSideToolbar) {
        const { setInPluginEditingMode, id } = this.props;
        setInPluginEditingMode(false, id);
        this.setState({ toolbarsToIgnore: ['FooterToolbar', 'SideToolbar'], isFocused: false });

        // const { innerRCEEditorState } = this.state;
        // const selection = innerRCEEditorState.getSelection();
        // const updatedSelection = selection.merge({ hasFocus: false });
        // const newEditorState = EditorState.acceptSelection(innerRCEEditorState, updatedSelection);
        // this.setState({ innerRCEEditorState: newEditorState });
      }
    }
  };

  render() {
    const { theme, isMobile, ...rest } = this.props;
    const { MobileToolbar, TextToolbar, innerRCEEditorState, toolbarsToIgnore } = this.state;
    const TopToolbar = MobileToolbar || TextToolbar;
    return (
      <ClickOutside onClickOutside={e => this.onBlur(e)}>
        <div
          // onFocus={() => this.onFocus()}
          // onBlur={() => this.onBlur()}
          // tabIndex="1"
          onClick={() => this.onFocus()}
          className={classNames(styles.editor, theme.editor)}
        >
          {TopToolbar && (
            <div className="toolbar-wrapper">
              <TopToolbar />
            </div>
          )}
          <RichContentEditor
            {...rest} // {...rest} need to be before editorState, onChange, plugins
            ref={innerEditor => (this.innerEditor = innerEditor)}
            editorState={innerRCEEditorState}
            onChange={this.saveInnerRCE}
            plugins={this.plugins}
            isMobile={isMobile}
            toolbarsToIgnore={toolbarsToIgnore}
          />
        </div>
      </ClickOutside>
    );
  }
}

InnerRCEModal.propTypes = {
  id: PropTypes.number,
  innerRCEEditorState: PropTypes.object,
  innerRCEPlugins: PropTypes.array,
  theme: PropTypes.object,
  isMobile: PropTypes.bool,
  editorState: PropTypes.object,
  onChange: PropTypes.func,
  plugins: PropTypes.array,
  innerRCERenderedIn: PropTypes.string,
  config: PropTypes.object,
  innerRCEcb: PropTypes.func,
  setInPluginEditingMode: PropTypes.func,
};

export default InnerRCEModal;
