/* eslint-disable max-len */
import runStrategy from './previewStrategy';
import { PreviewConfig } from '../types';
import intro from '../../../../../e2e/tests/fixtures/very-big-post.json';
import { previewSettings as createPreviewConfig } from '../../../../preview/web/src/';
import { interactionMap } from '../../../../preview/web/src/Interactions/interactionMap';
import { defaultTransformation } from '../../../../preview/web/src/Components/default-transformation';

const consumerCallback = jest.fn();
const initConfig = {
  onPreviewExpand: consumerCallback,
  contentInteractionMappers: [interactionMap],
  transformation: defaultTransformation,
};
const previewSettings = createPreviewConfig(initConfig) as PreviewConfig;
describe('Preview Strategy', () => {
  describe('Required Props', () => {
    it('isViewer', () => {
      const strategy = runStrategy(false, false, () => true, previewSettings, intro);
      expect(strategy).toEqual({});
    });
    it('content', () => {
      const strategy = runStrategy(true, false, () => true, previewSettings, undefined);
      expect(strategy).toEqual({});
    });
    it('preview', () => {
      const strategy = runStrategy(true, false, () => true, undefined, intro);
      expect(strategy).toEqual({});
    });
  });

  const strategy = runStrategy(true, false, () => true, previewSettings, intro);
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
