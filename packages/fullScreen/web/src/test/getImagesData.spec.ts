import getImagesData from '../../lib/getImagesData';
import initialContentState from './Fixtures/imagesContentState';
import { cloneDeep } from 'lodash';
import { DraftContent } from 'ricos-common';

describe('get images from content', () => {
  let imagesContentState: DraftContent;
  const totalImages = 6;
  const numOfImageKeys = 4;
  beforeEach(() => (imagesContentState = cloneDeep(initialContentState)));

  it('should get all 6 images with the expand mode enabled ', () => {
    const res = getImagesData(imagesContentState);
    const imageKeys = Object.keys(res.imageMap).length;
    expect(res.images.length).toBe(totalImages);
    expect(imageKeys).toBe(numOfImageKeys);
  });

  it('should get only 3 of the images when gallery expand is disabled', () => {
    imagesContentState.entityMap['1'].data.disableExpand = true; // gallery

    const numOfItems = imagesContentState.entityMap['1'].data.items.length;
    const res = getImagesData(imagesContentState);
    const imageKeys = Object.keys(res.imageMap).length;
    expect(res.images.length).toBe(totalImages - numOfItems);
    expect(imageKeys).toBe(numOfImageKeys - 1);
  });

  it('should get only 5 of the images when image expand inside table is disabled', () => {
    imagesContentState.entityMap['0'].data.config.rows['1'].columns['1'].content.entityMap[
      '0'
    ].data.disableExpand = true; // image inside table

    const res = getImagesData(imagesContentState);
    const imageKeys = Object.keys(res.imageMap).length;
    expect(res.images.length).toBe(totalImages - 1);
    expect(imageKeys).toBe(numOfImageKeys - 1);
  });

  it('should get 7 of the images when image expand inside collapsible list is enabled', () => {
    imagesContentState.entityMap['3'].data.pairs['1'].content.entityMap[
      '0'
    ].data.disableExpand = false; // image inside collapsible list

    const res = getImagesData(imagesContentState);
    const imageKeys = Object.keys(res.imageMap).length;
    expect(res.images.length).toBe(totalImages + 1);
    expect(imageKeys).toBe(numOfImageKeys + 1);
  });
});
