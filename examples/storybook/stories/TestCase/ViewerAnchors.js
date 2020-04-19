import React from 'react';

import { RichContentViewerBox, Page } from '../Components/StoryParts';
import ViewerWrapper from '../Components/ViewerWrapper';
import fixture from '../../../../e2e/tests/fixtures/very-big-post.json';
import { wixPalettes } from '../palettesExample';
import { Button } from 'wix-style-react';

class ViewerAnchors extends React.Component {
  addAfterParagraph = paragraphNumber => {
    try {
      const el = document.querySelector(`[data-hook=test-anchors${paragraphNumber}]`);

      const newEl = document.createElement('p');
      newEl.innerHTML = `<div style="background: cyan; width: 50%; margin: 0 auto; padding: 20px; text-align: center;"}>My Ad!</div>`;
      el.parentNode.replaceChild(newEl, el);
    } catch (e) {
      console.error('failed add after paragraph ' + paragraphNumber, e); //eslint-disable-line
    }
  };

  getLastAnchor = () => {
    const allAnchors = document.querySelectorAll('[data-hook^=test-anchors]');
    if (allAnchors.length === 0) {
      return 0;
    }
    const lastAnchor = allAnchors[allAnchors.length - 1]
      .getAttribute('data-hook')
      .match(/test-anchors(\d*)/);
    return lastAnchor ? Number(lastAnchor[1]) : 0;
  };

  addEveryParagraph = (startFrom = 3, addEvery = 2) => {
    let curBlock = startFrom;
    const lastAnchor = this.getLastAnchor();
    // eslint-disable-next-line fp/no-loops
    while (curBlock < lastAnchor) {
      this.addAfterParagraph(curBlock);
      curBlock += addEvery;
    }
  };
  render() {
    return (
      <Page title="Viewer Anchors Demo">
        <div>
          <Button onClick={() => this.addAfterParagraph(5)}>Add after paragraph 5</Button>
        </div>
        <div>
          <Button onClick={() => this.addEveryParagraph(2, 3)}>
            Add every 3rd paragraph (starting from the 2nd)
          </Button>
        </div>
        <RichContentViewerBox preset="blog-preset">
          <ViewerWrapper
            contentState={fixture}
            palette={wixPalettes.site1}
            addAnchors={'test-anchors'}
          />
        </RichContentViewerBox>
      </Page>
    );
  }
}
export default ViewerAnchors;
