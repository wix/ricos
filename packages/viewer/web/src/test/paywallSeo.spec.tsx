import React from 'react';
import { imageTypeMapper } from 'wix-rich-content-plugin-image/viewer';
import RichContentViewer from '../RichContentViewer';
import { render } from '@testing-library/react';
import paywallRaw from './testData/paywallRaw.json';

describe('paywallSeo', () => {
  it('should have no blocks with paywallSeo classname', () => {
    const { container } = render(
      <RichContentViewer typeMappers={[imageTypeMapper]} initialState={paywallRaw} />
    );
    expect(container.querySelectorAll('[class*="paywallSeo"]').length).toBe(0);
  });

  it('should have no blocks with paywallSeo classname', () => {
    const { container } = render(
      <RichContentViewer typeMappers={[imageTypeMapper]} initialState={paywallRaw} seoMode={{}} />
    );
    expect(container.querySelectorAll('[class*="paywallSeo"]').length).toBe(0);
  });

  it('should have 3 blocks with paywall classname', () => {
    const { container } = render(
      <RichContentViewer
        typeMappers={[imageTypeMapper]}
        initialState={paywallRaw}
        seoMode={{ paywall: {} }}
      />
    );
    expect(container.querySelectorAll('[class*="paywall"]').length).toBe(3);
  });

  it('should have 3 blocks with paywallSeo classname', () => {
    const { container } = render(
      <RichContentViewer
        typeMappers={[imageTypeMapper]}
        initialState={paywallRaw}
        seoMode={{ paywall: { className: 'paywallSeo' } }}
      />
    );
    expect(container.querySelectorAll('[class*="paywallSeo"]').length).toBe(3);
  });

  it('should have 5 blocks with paywallSeo classname', () => {
    const { container } = render(
      <RichContentViewer
        typeMappers={[imageTypeMapper]}
        initialState={paywallRaw}
        seoMode={{ paywall: { className: 'paywallSeo', index: 5 } }}
      />
    );
    expect(container.querySelectorAll('[class*="paywallSeo"]').length).toBe(5);
  });
});
