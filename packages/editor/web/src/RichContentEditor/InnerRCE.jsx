/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RichContentEditor from './RichContentEditor';
import styles from '../../statics/styles/rich-content-editor.scss';
import 'wix-rich-content-common/dist/statics/styles/draftDefault.rtlignore.scss';
import { convertToRaw } from '../../lib/editorStateConversion';
import { cloneDeep } from 'lodash';

class InnerRCE extends Component {
  constructor(props) {
    super(props);
    const { innerRCERenderedIn, config, editorState } = props;
    this.config = this.removeAnchorFromLink(cloneDeep(config));
    this.plugins = config[innerRCERenderedIn].innerRCEPlugins;
    this.state = {
      editorState,
    };
  }

  removeAnchorFromLink = config => {
    if (config?.LINK?.linkTypes?.anchor) {
      config.LINK.linkTypes.anchor = false;
    }
    return config;
  };

  static getDerivedStateFromProps(props, state) {
    const propsContentState = convertToRaw(props.editorState.getCurrentContent());
    const stateContentState = convertToRaw(state.editorState.getCurrentContent());
    if (JSON.stringify(propsContentState) !== JSON.stringify(stateContentState)) {
      return { editorState: props.editorState };
    } else {
      null;
    }
  }

  saveInnerRCE = editorState => {
    this.setState({ editorState });
    const newContentState = convertToRaw(editorState.getCurrentContent());
    this.props.onChange(newContentState);
  };

  onFocus = e => {
    e.stopPropagation();
  };

  render() {
    const { theme, isMobile, ...rest } = this.props;
    const { editorState } = this.state;
    return (
      <div
        data-id="inner-rce"
        onFocus={this.onFocus}
        className={classNames(styles.editor, theme.editor)}
      >
        <RichContentEditor
          {...rest} // {...rest} need to be before editorState, onChange, plugins
          editorState={editorState}
          onChange={this.saveInnerRCE}
          plugins={this.plugins}
          config={this.cofig}
          isMobile={isMobile}
          toolbarsToIgnore={['FooterToolbar', 'SideToolbar']}
          isInnerRCE
          editorKey="inner-rce"
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
};

export default InnerRCE;
