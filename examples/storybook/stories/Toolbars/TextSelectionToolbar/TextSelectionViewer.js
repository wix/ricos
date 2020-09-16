import React, { Component } from 'react';
import { RicosViewer } from 'ricos-viewer';
import PropTypes from 'prop-types';
import { TextSelectionToolbar, TwitterButton } from 'wix-rich-content-text-selection-toolbar';

class TextSelectionViewer extends Component {
  state = {};
  setRef = ref => this.setState({ containerRef: ref });

  render() {
    const { contentState } = this.props;
    return (
      <div data-hook="viewer" style={{ position: 'relative', paddingTop: '8px' }} ref={this.setRef}>
        <RicosViewer content={contentState} />
        <TextSelectionToolbar container={this.state.containerRef}>
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
