import React, { Component } from 'react';
import { Modifier, EditorState } from '@wix/draft-js';
import PropTypes from 'prop-types';
import InlineToolbarButton from '../../Components/InlineToolbarButton';
import { SPOILER_TYPE } from 'wix-rich-content-common';
import spoilerIcon from '../../Icons/spoilerIcon.svg';
// import decorateComponentWithProps from '../../Utils/decorateComponentWithProps';

class BlockSpoilerButton extends Component {
  constructor(props) {
    super(props);
    this.state = { isActive: false };
  }

  handleClick = event => {
    event.preventDefault();
    const { isActive } = this.state;
    const { getEditorState, setEditorState } = this.props;
    const editorState = getEditorState();
    const selection = editorState.getSelection();
    let contentState = editorState.getCurrentContent();
    contentState = Modifier.applyInlineStyle(contentState, selection, SPOILER_TYPE);

    setEditorState(EditorState.push(editorState, contentState, 'change-inline-style'));
    // setEditorState(RichUtils.toggleInlineStyle(getEditorState(), SPOILER_TYPE));
    this.setState({ isActive: !isActive });
  };

  // wrapBlockInSpoiler = ({ url, targetBlank, nofollow }) => {
  //   const { pubsub, anchorTarget, relValue, unchangedUrl } = this.props;
  //   let target = '_blank',
  //     rel = 'nofollow';
  //   if (!targetBlank) {
  //     target = anchorTarget !== '_blank' ? anchorTarget : '_self';
  //   }
  //   if (!nofollow) {
  //     rel = relValue !== 'nofollow' ? relValue : 'noopener';
  //   }
  //   if (!isEmpty(url) || unchangedUrl) {
  //     pubsub.setBlockData({
  //       key: 'componentLink',
  //       item: { url: url ? url : pubsub.get('componentData')?.config?.link?.url, target, rel },
  //     });
  //   } else {
  //     pubsub.setBlockData({ key: 'componentLink', item: null });
  //   }
  //   this.hideLinkPanel();
  // };

  componentWillReceiveProps() {
    this.setState({ isActive: this.isActive() });
  }

  isActive = () => {
    const { getEditorState } = this.props;
    if (getEditorState) {
      return getEditorState()
        .getCurrentInlineStyle()
        .has(SPOILER_TYPE);
    } else {
      return false;
    }
  };

  render() {
    const { theme, isMobile, tabIndex, tooltipText } = this.props;
    return (
      <InlineToolbarButton
        onClick={this.handleClick}
        isActive={this.isActive}
        dataHook={'spoilerButton'}
        theme={theme}
        isMobile={isMobile}
        tooltipText={tooltipText}
        tabIndex={tabIndex}
        icon={spoilerIcon}
      />
    );
  }
}

BlockSpoilerButton.propTypes = {
  pubsub: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  helpers: PropTypes.object,
  keyName: PropTypes.string,
  componentState: PropTypes.object,
  t: PropTypes.func,
  tabIndex: PropTypes.number,
  uiSettings: PropTypes.object,
  icons: PropTypes.object,
  unchangedUrl: PropTypes.bool,
  tooltipText: PropTypes.string,
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
};

export default BlockSpoilerButton;
