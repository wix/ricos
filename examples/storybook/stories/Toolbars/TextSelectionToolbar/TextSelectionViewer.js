import React, { Component } from 'react';
import { RicosViewer } from 'ricos-viewer';
import PropTypes from 'prop-types';
import { TextSelectionToolbar, TwitterButton } from 'wix-rich-content-text-selection-toolbar';

class TextSelectionViewer extends Component {
  constructor(props) {
    super(props);
    this.viewerRef = React.createRef();
  }

  render() {
    const { contentState } = this.props;
    return (
      <div data-hook="viewer" ref={this.viewerRef}>
        <RicosViewer content={contentState} />
        <TextSelectionToolbar container={this.viewerRef.current}>
          {selectedText => <TwitterButton selectedText={selectedText} />}
        </TextSelectionToolbar>
      </div>
    );
  }
}

TextSelectionViewer.propTypes = {
  contentState: PropTypes.object,
};

export default TextSelectionViewer;
