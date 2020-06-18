/* eslint-disable max-len */
import runStrategy from './previewStrategy';
import intro from '../../../../../e2e/tests/fixtures/very-big-post.json';
import { interactionMap } from '../../../../preview/web/src/Interactions/interactionMap';
import { defaultTransformation } from '../../../../preview/web/src/Components/default-transformation';

const consumerCallback = jest.fn();
const preview = {
  transformation: defaultTransformation as unknown,
  contentInteractionMappers: [interactionMap] as unknown,
  onPreviewExpand: consumerCallback,
} as PreviewSettings;
describe('Preview Strategy', () => {
  describe('Required Props', () => {
    it('isViewer', () => {
      const strategy = runStrategy(false, false, () => true, intro, preview);
      expect(strategy).toEqual({});
    });
    it('content', () => {
      const strategy = runStrategy(true, false, () => true, undefined, preview);
      expect(strategy).toEqual({});
    });
    it('preview', () => {
      const strategy = runStrategy(true, false, () => true, intro, undefined);
      expect(strategy).toEqual({});
    });
  });

  const strategy = runStrategy(true, false, () => true, intro, preview);
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
