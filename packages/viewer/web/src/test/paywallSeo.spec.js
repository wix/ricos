import React from 'react';
import RichContentViewer from '../RichContentViewer';
import { render } from '@testing-library/react';
import raw from './testData/raw.json';

describe('paywallSeo', () => {
  it('should add paywall class name to blocks in range of size', () => {
    render(<RichContentViewer initialState={raw} />);
    // //do something with datahook
    // const anchor = document.querySelector(`[data-hook=hello]`);
    // anchor.innerHTML = `<div data-hook="ad-id">My Ad!</div>`;
    // const adEle = document.querySelector(`[data-hook=ad-id]`);
    // expect(adEle).not.toBeNull();
    // rerender(<Anchor key={1} anchorKey={'hello'} />);
    // const adEle2 = document.querySelector(`[data-hook=ad-id]`);
    // expect(adEle2).not.toBeNull();
  });
});
