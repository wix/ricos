import { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import { isEmpty } from 'lodash';
import {
  insertLinkAtCurrentSelection,
  getLinkDataInSelection,
  removeLinksInSelection,
  LinkPanelContainer,
  decorateComponentWithProps,
} from 'wix-rich-content-common';

export default class TextLinkPanel extends Component {
  componentDidMount() {
    const { anchorTarget, relValue, getEditorState, theme, t, uiSettings } = this.props;
    const linkData = getLinkDataInSelection(getEditorState());
    const { url, target, rel } = linkData || {};
    const targetBlank = target === '_blank';
    const nofollow = rel === 'nofollow';
    const linkContainerProps = {
      url,
      targetBlank,
      nofollow,
      theme,
      anchorTarget,
      relValue,
      t,
      isActive: !isEmpty(linkData),
      onDone: this.createLinkEntity,
      onCancel: this.hideLinkPanel,
      onDelete: this.deleteLink,
      onOverrideContent: this.props.onOverrideContent,
      uiSettings,
    };

    const LinkPanelContainerWithProps = decorateComponentWithProps(
      LinkPanelContainer,
      linkContainerProps
    );
    this.props.onOverrideContent(LinkPanelContainerWithProps);
  }

  createLinkEntity = ({ url, targetBlank, nofollow }) => {
    const { anchorTarget, relValue } = this.props;
    if (!isEmpty(url)) {
      const { getEditorState, setEditorState } = this.props;
      const newEditorState = insertLinkAtCurrentSelection(getEditorState(), {
        url,
        targetBlank,
        nofollow,
        anchorTarget,
        relValue,
      });
      setEditorState(newEditorState);
    }
    this.hideLinkPanel();
  };

  deleteLink = () => {
    const { getEditorState, setEditorState } = this.props;
    const editorState = getEditorState();
    const selection = editorState.getSelection();
    const newEditorState = removeLinksInSelection(editorState);
    setEditorState(EditorState.acceptSelection(newEditorState, selection));
  };

  hideLinkPanel = () => {
    this.props.onExtendContent(undefined);
    this.props.onOverrideContent(undefined);
  };

  render() {
    return false;
  }
}

TextLinkPanel.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  onExtendContent: PropTypes.func.isRequired,
  onOverrideContent: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  t: PropTypes.func,
  uiSettings: PropTypes.object,
};
