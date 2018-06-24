
import GridIconLarge from '../../statics/icons/layout_grid.svg';
import MasonryIconLarge from '../../statics/icons/layout_masonry.svg';
import CollageIconLarge from '../../statics/icons/layout_collage.svg';
import ThumbnailsIconLarge from '../../statics/icons/layout_thumbnails.svg';
import SlideshowIconLarge from '../../statics/icons/layout_slideshow.svg';
import PanoramaIconLarge from '../../statics/icons/layout_panorama.svg';
import ColumnsIconLarge from '../../statics/icons/layout_columns.svg';
import SlidesIconLarge from '../../statics/icons/layout_slides.svg';

import GridIconSmall from '../../statics/icons/toolbar/Grid.svg';
import MasonryIconSmall from '../../statics/icons/toolbar/Masonry.svg';
import CollageIconSmall from '../../statics/icons/toolbar/Collage.svg';
import ThumbnailsIconSmall from '../../statics/icons/toolbar/Thumbnails.svg';
import SlideshowIconSmall from '../../statics/icons/toolbar/Slideshow.svg';
import PanoramaIconSmall from '../../statics/icons/toolbar/Panorama.svg';
import ColumnsIconSmall from '../../statics/icons/toolbar/Columns.svg';
import SlidesIconSmall from '../../statics/icons/toolbar/Slides.svg';

import layoutData from './layout-data-provider';

export const switchLayout = (layout, _componentData, store) => {
  const galleryLayout = layout.value;
  const layoutStyles = Object.assign(
    { galleryLayout },
    layoutData[galleryLayout]
  );
  const componentData = {
    ..._componentData,
    styles: Object.assign({}, _componentData.styles, layoutStyles)
  };
  store.set('componentData', componentData);
};

export const getCurrentLayout = (store, t) => {
  const componentData = store.get('componentData');
  const galleryLayout = (componentData && componentData.styles && componentData.styles.galleryLayout) || 0;
  return galleryLayoutsDropdown(t).find(layout => layout.value === galleryLayout);
};

export const getGalleryLayouts = t => {
  return [
    { value: 2, label: t('GalleryPlugin_Layout_Grid'), icon: GridIconLarge },
    { value: 1, label: t('GalleryPlugin_Layout_Masonry'), icon: MasonryIconLarge },
    { value: 0, label: t('GalleryPlugin_Layout_Collage'), icon: CollageIconLarge },
    { value: 3, label: t('GalleryPlugin_Layout_Thumbnails'), icon: ThumbnailsIconLarge },
    { value: 9, label: t('GalleryPlugin_Layout_Slideshow'), icon: SlideshowIconLarge },
    { value: 6, label: t('GalleryPlugin_Layout_Panorama'), icon: PanoramaIconLarge },
    { value: 7, label: t('GalleryPlugin_Layout_Columns'), icon: ColumnsIconLarge },
    { value: 4, label: t('GalleryPlugin_Layout_Slides'), icon: SlidesIconLarge },
  ];
};

export const galleryLayoutsDropdown = t => {
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

