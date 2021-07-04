/* eslint-disable max-len */
import runStrategy from './previewStrategy';
import { PreviewConfig } from 'wix-rich-content-preview';
import intro from '../../../../../e2e/tests/fixtures/very-big-post.json';
import { createPreview } from '../../../../preview/web/src/';
import { interactionMap } from '../../../../preview/web/src/Interactions/interactionMap';
import { defaultTransformation } from '../../../../preview/web/src/Components/default-transformation';

const consumerCallback = jest.fn();
const initConfig = {
  onPreviewExpand: consumerCallback,
  contentInteractionMappers: [interactionMap],
  transformation: defaultTransformation,
};

const previewConfig = createPreview(initConfig) as PreviewConfig;
describe('Preview Strategy', () => {
  describe('Required Props', () => {
    it('isViewer', () => {
      const strategy = runStrategy({
        isViewer: false,
        isPreviewExpanded: false,
        onPreviewExpand: () => true,
        previewConfig,
        content: intro,
      });
      expect(strategy).toEqual({});
    });
    it('content', () => {
      const strategy = runStrategy({
        isViewer: true,
        isPreviewExpanded: false,
        onPreviewExpand: () => true,
        previewConfig,
      });
      expect(strategy).toEqual({});
    });
    it('preview', () => {
      const strategy = runStrategy({
        isViewer: true,
        isPreviewExpanded: false,
        onPreviewExpand: () => true,
        content: intro,
      });
      expect(strategy).toEqual({});
    });
  });

  const strategy = runStrategy({
    isViewer: true,
    isPreviewExpanded: false,
    onPreviewExpand: () => true,
    previewConfig,
    content: intro,
  });
  it('should create a different initialState (very-big-post.json)', () => {
    expect(strategy).toHaveProperty('initialState');
    expect(strategy.initialState).not.toStrictEqual(intro);
  });
  it('should create a preview config', () => {
    expect(strategy).toHaveProperty('config');
    expect(strategy.config).toHaveProperty('PREVIEW');
    expect(strategy.config?.PREVIEW).toHaveProperty('contentInteractionMappers');
    expect(strategy.config?.PREVIEW).toHaveProperty('onPreviewExpand');
  });
  it(`should trigger consumer's onPreviewExpand when triggered`, () => {
    strategy.config?.PREVIEW?.onPreviewExpand();
    expect(consumerCallback).toHaveBeenCalled();
  });
});
