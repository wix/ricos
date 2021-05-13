import {
  LayoutGridIcon,
  LayoutMasonryIcon,
  LayoutCollageIcon,
  LayoutThumbnailsIcon,
  LayoutSlideshowIcon,
  LayoutPanoramaIcon,
  LayoutColumnsIcon,
  LayoutSlidesIcon,
  Grid as GridIconSmall,
  Masonry as MasonryIconSmall,
  Collage as CollageIconSmall,
  Thumbnails as ThumbnailsIconSmall,
  Slideshow as SlideshowIconSmall,
  Panorama as PanoramaIconSmall,
  Columns as ColumnsIconSmall,
  Slides as SlidesIconSmall,
} from './icons';

import { layoutData, GALLERY_LAYOUTS } from '../lib/layout-data-provider';
import { ComponentType } from 'react';
import { Store, TranslationFunction, ComponentData } from 'wix-rich-content-common';

type GalleryLayout = { value: GALLERY_LAYOUTS; label: string; icon: ComponentType };

export const switchLayout = (layout: GalleryLayout, componentData: ComponentData, store: Store) => {
  const galleryLayout = layout.value;
  const layoutStyles = { ...{ galleryLayout }, ...layoutData[galleryLayout] };
  store.set('componentData', {
    ...componentData,
    styles: layoutStyles,
  });
};

export const getCurrentLayout = (store: Store, t: TranslationFunction) => {
  const componentData = store.get('componentData');
  const galleryLayout =
    (componentData && componentData.styles && componentData.styles.galleryLayout) || 0;
  return getGalleryLayouts(t).find(layout => layout.value === galleryLayout);
};

export const getGalleryLayoutsDropdown = (t: TranslationFunction): GalleryLayout[] =>
  getGalleryLayouts(t);

export const getGalleryLayoutsSettings = (t: TranslationFunction): GalleryLayout[] =>
  getGalleryLayouts(t, false);

const getGalleryLayouts = (t: TranslationFunction, isDropdown = true): GalleryLayout[] => {
  return [
    {
      value: GALLERY_LAYOUTS.GRID,
      label: t('GalleryPlugin_Layout_Grid'),
      icon: isDropdown ? GridIconSmall : LayoutGridIcon,
    },
    {
      value: GALLERY_LAYOUTS.MASONRY,
      label: t('GalleryPlugin_Layout_Masonry'),
      icon: isDropdown ? MasonryIconSmall : LayoutMasonryIcon,
    },
    {
      value: GALLERY_LAYOUTS.COLLAGE,
      label: t('GalleryPlugin_Layout_Collage'),
      icon: isDropdown ? CollageIconSmall : LayoutCollageIcon,
    },
    {
      value: GALLERY_LAYOUTS.THUMBNAIL,
      label: t('GalleryPlugin_Layout_Thumbnails'),
      icon: isDropdown ? ThumbnailsIconSmall : LayoutThumbnailsIcon,
    },
    {
      value: GALLERY_LAYOUTS.FULLSIZE,
      label: t('GalleryPlugin_Layout_Slideshow'),
      icon: isDropdown ? SlideshowIconSmall : LayoutSlideshowIcon,
    },
    {
      value: GALLERY_LAYOUTS.PANORAMA,
      label: t('GalleryPlugin_Layout_Panorama'),
      icon: isDropdown ? PanoramaIconSmall : LayoutPanoramaIcon,
    },
    {
      value: GALLERY_LAYOUTS.COLUMN,
      label: t('GalleryPlugin_Layout_Columns'),
      icon: isDropdown ? ColumnsIconSmall : LayoutColumnsIcon,
    },
    {
      value: GALLERY_LAYOUTS.SLIDER,
      label: t('GalleryPlugin_Layout_Slides'),
      icon: isDropdown ? SlidesIconSmall : LayoutSlidesIcon,
    },
  ];
};
