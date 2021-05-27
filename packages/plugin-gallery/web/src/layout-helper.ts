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

import layoutData from '../lib/layout-data-provider';
import { ComponentType } from 'react';
import { Store, TranslationFunction, ComponentData } from 'wix-rich-content-common';

type GalleryLayout = { value: number; label: string; icon: ComponentType };

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
  return galleryLayoutsDropdown(t).find(layout => layout.value === galleryLayout);
};

export const getGalleryLayouts = (t: TranslationFunction): GalleryLayout[] => {
  return [
    { value: 2, label: t('GalleryPlugin_Layout_Grid'), icon: LayoutGridIcon },
    { value: 1, label: t('GalleryPlugin_Layout_Masonry'), icon: LayoutMasonryIcon },
    { value: 0, label: t('GalleryPlugin_Layout_Collage'), icon: LayoutCollageIcon },
    { value: 3, label: t('GalleryPlugin_Layout_Thumbnails'), icon: LayoutThumbnailsIcon },
    { value: 9, label: t('GalleryPlugin_Layout_Slideshow'), icon: LayoutSlideshowIcon },
    { value: 6, label: t('GalleryPlugin_Layout_Panorama'), icon: LayoutPanoramaIcon },
    { value: 7, label: t('GalleryPlugin_Layout_Columns'), icon: LayoutColumnsIcon },
    { value: 4, label: t('GalleryPlugin_Layout_Slides'), icon: LayoutSlidesIcon },
  ];
};

export const galleryLayoutsDropdown = (t: TranslationFunction): GalleryLayout[] => {
  return [
    { value: 2, label: t('GalleryPlugin_Layout_Grid'), icon: GridIconSmall },
    { value: 1, label: t('GalleryPlugin_Layout_Masonry'), icon: MasonryIconSmall },
    { value: 0, label: t('GalleryPlugin_Layout_Collage'), icon: CollageIconSmall },
    { value: 3, label: t('GalleryPlugin_Layout_Thumbnails'), icon: ThumbnailsIconSmall },
    { value: 9, label: t('GalleryPlugin_Layout_Slideshow'), icon: SlideshowIconSmall },
    { value: 6, label: t('GalleryPlugin_Layout_Panorama'), icon: PanoramaIconSmall },
    { value: 7, label: t('GalleryPlugin_Layout_Columns'), icon: ColumnsIconSmall },
    { value: 4, label: t('GalleryPlugin_Layout_Slides'), icon: SlidesIconSmall },
  ];
};
