import React from 'react';

import { RichContentViewerBox, Page } from '../Components/StoryParts';
import ViewerWrapper from '../Components/ViewerWrapper';
import fixture from '../../../../e2e/tests/fixtures/very-big-post.json';
import { wixPalettes } from '../palettesExample';
import { Button } from 'wix-style-react';

const anchorPrefix = 'test-anchors';
const getAllAnchors = () => document.querySelectorAll(`[data-hook^=${anchorPrefix}]`);
class ViewerAnchors extends React.Component {
  addAfterAnchor = (el, adFnc) => {
    try {
      const newEl = document.createElement('p');
      const text = adFnc ? adFnc(el) : 'My Ad!';
      newEl.innerHTML = `<div style="background: cyan; width: 50%; margin: 0 auto; padding: 20px; text-align: center;"}>${text}</div>`;
      el.parentNode.replaceChild(newEl, el);
    } catch (e) {
      console.error('failed add after paragraph ' + paragraphNumber, e); //eslint-disable-line
    }
  };

  addEveryParagraph = (startFrom = 3, addEvery = 2, adFnc) => {
    let curBlock = startFrom;
    const anchors = getAllAnchors();
    // eslint-disable-next-line fp/no-loops
    while (curBlock <= anchors.length) {
      this.addAfterAnchor(anchors[curBlock - 1], adFnc);
      curBlock += addEvery;
      if (addEvery === 0) {
        return;
      }
    }
  };

  markAll = () => {
    this.addEveryParagraph(1, 1, el => {
      return 'Anchor below ' + (el.getAttribute('type') || 'no-type');
    });
  };

  render() {
    return (
      <Page title="Viewer Anchors Demo">
        <div>
          <Button onClick={() => this.addEveryParagraph(5, 0)}>Add after paragraph 5</Button>
        </div>
        <div>
          <Button onClick={() => this.addEveryParagraph(2, 3)}>
            Add every 3rd paragraph (starting from the 2nd)
          </Button>
        </div>
        <div>
          <Button onClick={() => this.markAll()}>Check Anchors type</Button>
        </div>
        <RichContentViewerBox preset="blog-preset">
          <ViewerWrapper content={fixture} palette={wixPalettes.site1} addAnchors={anchorPrefix} />
        </RichContentViewerBox>
      </Page>
    );
  }
}
export default ViewerAnchors;
