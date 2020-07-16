import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RichContentEditor from './RichContentEditor';
import styles from '../../statics/styles/rich-content-editor.scss';
import 'wix-rich-content-common/dist/statics/styles/draftDefault.rtlignore.scss';
import { convertToRaw } from '../lib/editorStateConversion';
import { debounce } from 'lodash';

class InnerRCEModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    const { innerRCERenderedIn, config } = this.props;
    this.plugins = config[innerRCERenderedIn].innerRCEPlugins;
  }

  componentDidMount() {
    const { MobileToolbar, TextToolbar } = this.innerEditor.getToolbars();
    this.setState({ MobileToolbar, TextToolbar });
    this.innerEditor.focus();
  }

  saveInnerRCE = debounce(innerRCEEditorState => {
    const { innerRCEcb } = this.props;
    const newContentState = convertToRaw(innerRCEEditorState.getCurrentContent());
    innerRCEcb(newContentState);
  }, 200);

  render() {
    const { innerRCEEditorState, theme, isMobile, ...rest } = this.props;
    const { MobileToolbar, TextToolbar } = this.state;
    const TopToolbar = MobileToolbar || TextToolbar;
    return (
      <div className={classNames(styles.editor, theme.editor)}>
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
          toolbarsToIgnore={['FooterToolbar']}
        />
      </div>
    );
  }
}

InnerRCEModal.propTypes = {
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
};

export default InnerRCEModal;
