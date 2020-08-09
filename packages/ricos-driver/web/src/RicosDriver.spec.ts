import RicosDriver from './RicosDriver';

describe('Ricos Driver', () => {
  it('should get image viewer selector', () => {
    expect(RicosDriver.viewer.image.root).toBe(`[data-hook="imageViewer"]`);
  });
});
