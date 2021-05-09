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
import { GALLERY_LAYOUTS } from './defaults';

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
    { value: GALLERY_LAYOUTS.GRID, label: t('GalleryPlugin_Layout_Grid'), icon: LayoutGridIcon },
    {
      value: GALLERY_LAYOUTS.MASONRY,
      label: t('GalleryPlugin_Layout_Masonry'),
      icon: LayoutMasonryIcon,
    },
    {
      value: GALLERY_LAYOUTS.COLLAGE,
      label: t('GalleryPlugin_Layout_Collage'),
      icon: LayoutCollageIcon,
    },
    {
      value: GALLERY_LAYOUTS.THUMBNAIL,
      label: t('GalleryPlugin_Layout_Thumbnails'),
      icon: LayoutThumbnailsIcon,
    },
    {
      value: GALLERY_LAYOUTS.SLIDESHOW,
      label: t('GalleryPlugin_Layout_Slideshow'),
      icon: LayoutSlideshowIcon,
    },
    {
      value: GALLERY_LAYOUTS.PANORAMA,
      label: t('GalleryPlugin_Layout_Panorama'),
      icon: LayoutPanoramaIcon,
    },
    {
      value: GALLERY_LAYOUTS.COLUMN,
      label: t('GalleryPlugin_Layout_Columns'),
      icon: LayoutColumnsIcon,
    },
    {
      value: GALLERY_LAYOUTS.SLIDER,
      label: t('GalleryPlugin_Layout_Slides'),
      icon: LayoutSlidesIcon,
    },
  ];
};

export const galleryLayoutsDropdown = (t: TranslationFunction): GalleryLayout[] => {
  return [
    { value: GALLERY_LAYOUTS.GRID, label: t('GalleryPlugin_Layout_Grid'), icon: GridIconSmall },
    {
      value: GALLERY_LAYOUTS.MASONRY,
      label: t('GalleryPlugin_Layout_Masonry'),
      icon: MasonryIconSmall,
    },
    {
      value: GALLERY_LAYOUTS.COLLAGE,
      label: t('GalleryPlugin_Layout_Collage'),
      icon: CollageIconSmall,
    },
    {
      value: GALLERY_LAYOUTS.THUMBNAIL,
      label: t('GalleryPlugin_Layout_Thumbnails'),
      icon: ThumbnailsIconSmall,
    },
    {
      value: GALLERY_LAYOUTS.SLIDESHOW,
      label: t('GalleryPlugin_Layout_Slideshow'),
      icon: SlideshowIconSmall,
    },
    {
      value: GALLERY_LAYOUTS.PANORAMA,
      label: t('GalleryPlugin_Layout_Panorama'),
      icon: PanoramaIconSmall,
    },
    {
      value: GALLERY_LAYOUTS.COLUMN,
      label: t('GalleryPlugin_Layout_Columns'),
      icon: ColumnsIconSmall,
    },
    {
      value: GALLERY_LAYOUTS.SLIDER,
      label: t('GalleryPlugin_Layout_Slides'),
      icon: SlidesIconSmall,
    },
  ];
};
