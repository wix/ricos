import { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import {
  getLinkDataInSelection,
  removeLinksInSelection,
  LinkRouter,
  decorateComponentWithProps,
  setForceSelection,
} from 'wix-rich-content-editor-common';

export default class TextLinkPanel extends Component {
  componentDidMount() {
    const {
      anchorTarget,
      relValue,
      getEditorState,
      setEditorState,
      theme,
      t,
      uiSettings,
      linkPanelAddons,
    } = this.props;
    const linkData = getLinkDataInSelection(getEditorState());
    const { url, target, rel } = linkData || {};
    const targetBlank = target ? target === '_blank' : anchorTarget === '_blank';
    const nofollow = rel ? rel === 'nofollow' : relValue === 'nofollow';
    const linkContainerProps = {
      getEditorState,
      setEditorState,
      url,
      targetBlank,
      nofollow,
      theme,
      anchorTarget,
      relValue,
      t,
      isActive: !isEmpty(linkData),
      onDone: this.createLinkEntity,
      onCancel: this.onCancel,
      hidePanel: this.hideLinkPanel,
      onDelete: this.deleteLink,
      onOverrideContent: this.props.onOverrideContent,
      uiSettings,
      linkPanelAddons,
    };

    const LinkPanelContainerWithProps = decorateComponentWithProps(LinkRouter, linkContainerProps);
    this.props.onOverrideContent(LinkPanelContainerWithProps);
  }

  createLinkEntity = ({ url, targetBlank, nofollow, linkToAnchor, defaultName }) => {
    const { anchorTarget: _anchorTarget, relValue, insertLinkFn } = this.props;
    const anchorTarget = linkToAnchor ? '_self' : _anchorTarget;
    if (!isEmpty(url)) {
      const { getEditorState, setEditorState } = this.props;
      const newEditorState = insertLinkFn(getEditorState(), {
        url,
        targetBlank,
        nofollow,
        anchorTarget,
        relValue,
        text: defaultName,
      });
      setEditorState(newEditorState);
    }
    this.hideLinkPanel();
  };

  deleteLink = () => {
    const { getEditorState, setEditorState, closeInlinePluginToolbar } = this.props;
    const editorState = getEditorState();
    const newEditorState = removeLinksInSelection(editorState, setEditorState);
    setEditorState(newEditorState);
    closeInlinePluginToolbar && closeInlinePluginToolbar();
  };

  onCancel = () => {
    const { getEditorState, setEditorState } = this.props;
    const editorState = getEditorState();
    setEditorState(setForceSelection(editorState, editorState.getSelection()));
    this.hideLinkPanel();
  };

  hideLinkPanel = () => {
    this.props.onExtendContent?.(undefined);
    this.props.onOverrideContent(undefined);
  };

  render() {
    return false;
  }
}

TextLinkPanel.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  onExtendContent: PropTypes.func,
  onOverrideContent: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  t: PropTypes.func,
  uiSettings: PropTypes.object,
  insertLinkFn: PropTypes.func,
  closeInlinePluginToolbar: PropTypes.func,
  linkPanelAddons: PropTypes.array,
};
