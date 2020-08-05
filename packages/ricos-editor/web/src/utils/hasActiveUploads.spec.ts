import { ContentState, AtomicBlockUtils } from 'wix-rich-content-editor-common';
import { hasActiveUploads } from './hasActiveUploads';
import { createWithContent } from 'wix-rich-content-editor/dist/lib/editorStateConversion.cjs.js';
import {
  PluginType,
  IMAGE_TYPE,
  VIDEO_TYPE,
  GALLERY_TYPE,
  FILE_UPLOAD_TYPE,
} from 'wix-rich-content-common';

const createEmptyContentState = () => ContentState.createFromText('');

const createContentState = (entityType: PluginType, entityData) => {
  const content = createEmptyContentState().createEntity(entityType, 'IMMUTABLE', entityData);
  return AtomicBlockUtils.insertAtomicBlock(
    createWithContent(content),
    content.getLastCreatedEntityKey(),
    ' '
  ).getCurrentContent();
};

describe('hasActiveUploads service', () => {
  it('should return false if content has no active uploads', () => {
    const contentState = createEmptyContentState();
    expect(hasActiveUploads(contentState)).toBe(false);
  });

  describe('image plugin', () => {
    it('should return true if data.src is falsy', () => {
      const contentState = createContentState(IMAGE_TYPE, {});
      expect(hasActiveUploads(contentState)).toBe(true);
    });

    it('should return false if data.src is a string', () => {
      const contentState = createContentState(IMAGE_TYPE, { src: 'doge.jpg' });
      expect(hasActiveUploads(contentState)).toBe(false);
    });

    it('should return false if data.src is an object', () => {
      const contentState = createContentState(IMAGE_TYPE, { src: {} });
      expect(hasActiveUploads(contentState)).toBe(false);
    });
  });

  describe('gallery plugin', () => {
    it('should return true if items array is empty', () => {
      const contentState = createContentState(GALLERY_TYPE, { items: [] });
      expect(hasActiveUploads(contentState)).toBe(true);
    });

    it('should return true if there are unprocessed items', () => {
      const contentState = createContentState(GALLERY_TYPE, {
        items: [{ url: 'a27d24_675acb58f77a4ba4af9994dbb604deec~mv2.jpg' }, { url: 'base64' }],
      });
      expect(hasActiveUploads(contentState)).toBe(true);
    });

    it('should return false if all items are processed', () => {
      const contentState = createContentState(GALLERY_TYPE, {
        items: [{ url: 'a27d24_675acb58f77a4ba4af9994dbb604deec~mv2.jpg' }],
      });
      expect(hasActiveUploads(contentState)).toBe(false);
    });
  });

  describe('video plugin', () => {
    it('should return false if custom video is missing', () => {
      const contentState = createContentState(VIDEO_TYPE, {});
      expect(hasActiveUploads(contentState)).toBe(false);
    });

    it('should return true if custom video is present and tempData = true', () => {
      const contentState = createContentState(VIDEO_TYPE, {
        src: { pathname: 'video/11062b_382eeb350464462c8f9150e4d3e40f2b/1080p/mp4/file.mp4' },
        tempData: true,
      });
      expect(hasActiveUploads(contentState)).toBe(true);
    });

    it('should return false if custom video is present and tempData = false', () => {
      const contentState = createContentState(VIDEO_TYPE, {
        src: 'https://www.facebook.com/facebookapp/videos/10154085960266729/',
        tempData: false,
      });
      expect(hasActiveUploads(contentState)).toBe(false);
    });
  });

  describe('file plugin', () => {
    it('should return true if file exists and tempData = true', () => {
      const contentState = createContentState(FILE_UPLOAD_TYPE, {
        name: 'myfile.txt',
        tempData: true,
      });
      expect(hasActiveUploads(contentState)).toBe(true);
    });

    it('should return false if file exists and tempData !== true', () => {
      const contentState = createContentState(FILE_UPLOAD_TYPE, { name: 'myfile.txt' });
      expect(hasActiveUploads(contentState)).toBe(false);
    });
  });
});
