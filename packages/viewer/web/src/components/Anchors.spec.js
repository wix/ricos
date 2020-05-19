import React from 'react';

import { render } from '@testing-library/react';
import Anchor from './Anchor';

describe('Anchors', () => {
  it('should be rendered once', () => {
    const { rerender } = render(<Anchor key={1} anchorKey={'hello'} />);

    //do something with datahook
    const anchor = document.querySelector(`[data-hook=hello]`);
    anchor.innerHTML = `<div data-hook="ad-id">My Ad!</div>`;

    const adEle = document.querySelector(`[data-hook=ad-id]`);

    expect(adEle).not.toBeNull();

    rerender(<Anchor key={1} anchorKey={'hello'} />);

    const adEle2 = document.querySelector(`[data-hook=ad-id]`);
    expect(adEle2).not.toBeNull();
  });
});
