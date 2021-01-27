import React, { Component } from 'react';
import { RicosContent, RicosViewer } from 'ricos-viewer';
import { TextSelectionToolbar, TwitterButton, HighlightButton, UnhighlightButton } from 'wix-rich-content-text-selection-toolbar';

class TextSelectionViewer extends Component<
  { content?: RicosContent },
  { containerRef?: HTMLDivElement }
> {
  setRef = (ref: HTMLDivElement) => this.setState({ containerRef: ref });

  render() {
    const { content } = this.props;
    return (
      <div data-hook="viewer" style={{ position: 'relative', paddingTop: '8px' }} ref={this.setRef}>
        <RicosViewer content={content} />
        <TextSelectionToolbar container={this.state.containerRef}>
          {selectedText => (
            <>
              <TwitterButton selectedText={selectedText} />
              <HighlightButton />
              <UnhighlightButton />
            </>
          )}
        </TextSelectionToolbar>
      </div>
    );
  }
}

export default TextSelectionViewer;
