/* eslint-disable */
import { PluginContainerData } from '../../rich_content/v1/common';

export interface GalleryData {
  containerData?: PluginContainerData;
  items: GalleryItem[];
  styles?: GalleryStyles;
  config?: GalleryConfig;
}

export interface GalleryStyles {
  galleryLayout?: number;
  gallerySizeType?: string;
  gallerySizePx?: number;
  oneRow?: boolean;
  cubeRatio?: number;
  galleryThumbnailsAlignment?: string;
  isVertical?: boolean;
  numberOfImagesPerRow?: number;
  imageMargin?: number;
  thumbnailSpacings?: number;
  cubeType?: string;
  enableInfiniteScroll?: boolean;
  titlePlacement?: string;
  allowHover?: boolean;
  itemClick?: string;
  showArrows?: boolean;
  gridStyle?: number;
  loveButton?: boolean;
  allowSocial?: boolean;
  allowDownload?: boolean;
  cubeImages?: boolean;
  groupSize?: number;
  groupTypes?: string;
  fixedColumns?: number;
  hasThumbnails?: boolean;
  enableScroll?: boolean;
  isGrid?: boolean;
  isSlider?: boolean;
  isColumns?: boolean;
  isSlideshow?: boolean;
  cropOnlyFill?: boolean;
  galleryMargin?: number;
  fullscreen?: boolean;
  mobileSwipeAnimation?: string;
  thumbnailSize?: number;
  gotStyleParams?: boolean;
  showVideoPlayButton?: boolean;
  videoPlay?: string;
  galleryType?: string;
}

export interface GalleryConfig {
  layout?: string;
  spacing?: number;
  key?: string;
  disableExpand?: boolean;
}

export interface GalleyItemMetadata {
  height?: number;
  width?: number;
  title?: string;
  type?: string;
}

export interface GalleryItem {
  metadata?: GalleyItemMetadata;
  itemId?: string;
  url?: string;
  selected?: boolean;
}

const baseGalleryData: object = {};

export const GalleryData = {
  fromJSON(object: any): GalleryData {
    const message = { ...baseGalleryData } as GalleryData;
    message.items = [];
    if (object.containerData !== undefined && object.containerData !== null) {
      message.containerData = PluginContainerData.fromJSON(object.containerData);
    } else {
      message.containerData = undefined;
    }
    if (object.items !== undefined && object.items !== null) {
      for (const e of object.items) {
        message.items.push(GalleryItem.fromJSON(e));
      }
    }
    if (object.styles !== undefined && object.styles !== null) {
      message.styles = GalleryStyles.fromJSON(object.styles);
    } else {
      message.styles = undefined;
    }
    if (object.config !== undefined && object.config !== null) {
      message.config = GalleryConfig.fromJSON(object.config);
    } else {
      message.config = undefined;
    }
    return message;
  },

  toJSON(message: GalleryData): unknown {
    const obj: any = {};
    message.containerData !== undefined &&
      (obj.containerData = message.containerData
        ? PluginContainerData.toJSON(message.containerData)
        : undefined);
    if (message.items) {
      obj.items = message.items.map(e => (e ? GalleryItem.toJSON(e) : undefined));
    } else {
      obj.items = [];
    }
    message.styles !== undefined &&
      (obj.styles = message.styles ? GalleryStyles.toJSON(message.styles) : undefined);
    message.config !== undefined &&
      (obj.config = message.config ? GalleryConfig.toJSON(message.config) : undefined);
    return obj;
  },
};

const baseGalleryStyles: object = {};

export const GalleryStyles = {
  fromJSON(object: any): GalleryStyles {
    const message = { ...baseGalleryStyles } as GalleryStyles;
    if (object.galleryLayout !== undefined && object.galleryLayout !== null) {
      message.galleryLayout = Number(object.galleryLayout);
    } else {
      message.galleryLayout = undefined;
    }
    if (object.gallerySizeType !== undefined && object.gallerySizeType !== null) {
      message.gallerySizeType = String(object.gallerySizeType);
    } else {
      message.gallerySizeType = undefined;
    }
    if (object.gallerySizePx !== undefined && object.gallerySizePx !== null) {
      message.gallerySizePx = Number(object.gallerySizePx);
    } else {
      message.gallerySizePx = undefined;
    }
    if (object.oneRow !== undefined && object.oneRow !== null) {
      message.oneRow = Boolean(object.oneRow);
    } else {
      message.oneRow = undefined;
    }
    if (object.cubeRatio !== undefined && object.cubeRatio !== null) {
      message.cubeRatio = Number(object.cubeRatio);
    } else {
      message.cubeRatio = undefined;
    }
    if (
      object.galleryThumbnailsAlignment !== undefined &&
      object.galleryThumbnailsAlignment !== null
    ) {
      message.galleryThumbnailsAlignment = String(object.galleryThumbnailsAlignment);
    } else {
      message.galleryThumbnailsAlignment = undefined;
    }
    if (object.isVertical !== undefined && object.isVertical !== null) {
      message.isVertical = Boolean(object.isVertical);
    } else {
      message.isVertical = undefined;
    }
    if (object.numberOfImagesPerRow !== undefined && object.numberOfImagesPerRow !== null) {
      message.numberOfImagesPerRow = Number(object.numberOfImagesPerRow);
    } else {
      message.numberOfImagesPerRow = undefined;
    }
    if (object.imageMargin !== undefined && object.imageMargin !== null) {
      message.imageMargin = Number(object.imageMargin);
    } else {
      message.imageMargin = undefined;
    }
    if (object.thumbnailSpacings !== undefined && object.thumbnailSpacings !== null) {
      message.thumbnailSpacings = Number(object.thumbnailSpacings);
    } else {
      message.thumbnailSpacings = undefined;
    }
    if (object.cubeType !== undefined && object.cubeType !== null) {
      message.cubeType = String(object.cubeType);
    } else {
      message.cubeType = undefined;
    }
    if (object.enableInfiniteScroll !== undefined && object.enableInfiniteScroll !== null) {
      message.enableInfiniteScroll = Boolean(object.enableInfiniteScroll);
    } else {
      message.enableInfiniteScroll = undefined;
    }
    if (object.titlePlacement !== undefined && object.titlePlacement !== null) {
      message.titlePlacement = String(object.titlePlacement);
    } else {
      message.titlePlacement = undefined;
    }
    if (object.allowHover !== undefined && object.allowHover !== null) {
      message.allowHover = Boolean(object.allowHover);
    } else {
      message.allowHover = undefined;
    }
    if (object.itemClick !== undefined && object.itemClick !== null) {
      message.itemClick = String(object.itemClick);
    } else {
      message.itemClick = undefined;
    }
    if (object.showArrows !== undefined && object.showArrows !== null) {
      message.showArrows = Boolean(object.showArrows);
    } else {
      message.showArrows = undefined;
    }
    if (object.gridStyle !== undefined && object.gridStyle !== null) {
      message.gridStyle = Number(object.gridStyle);
    } else {
      message.gridStyle = undefined;
    }
    if (object.loveButton !== undefined && object.loveButton !== null) {
      message.loveButton = Boolean(object.loveButton);
    } else {
      message.loveButton = undefined;
    }
    if (object.allowSocial !== undefined && object.allowSocial !== null) {
      message.allowSocial = Boolean(object.allowSocial);
    } else {
      message.allowSocial = undefined;
    }
    if (object.allowDownload !== undefined && object.allowDownload !== null) {
      message.allowDownload = Boolean(object.allowDownload);
    } else {
      message.allowDownload = undefined;
    }
    if (object.cubeImages !== undefined && object.cubeImages !== null) {
      message.cubeImages = Boolean(object.cubeImages);
    } else {
      message.cubeImages = undefined;
    }
    if (object.groupSize !== undefined && object.groupSize !== null) {
      message.groupSize = Number(object.groupSize);
    } else {
      message.groupSize = undefined;
    }
    if (object.groupTypes !== undefined && object.groupTypes !== null) {
      message.groupTypes = String(object.groupTypes);
    } else {
      message.groupTypes = undefined;
    }
    if (object.fixedColumns !== undefined && object.fixedColumns !== null) {
      message.fixedColumns = Number(object.fixedColumns);
    } else {
      message.fixedColumns = undefined;
    }
    if (object.hasThumbnails !== undefined && object.hasThumbnails !== null) {
      message.hasThumbnails = Boolean(object.hasThumbnails);
    } else {
      message.hasThumbnails = undefined;
    }
    if (object.enableScroll !== undefined && object.enableScroll !== null) {
      message.enableScroll = Boolean(object.enableScroll);
    } else {
      message.enableScroll = undefined;
    }
    if (object.isGrid !== undefined && object.isGrid !== null) {
      message.isGrid = Boolean(object.isGrid);
    } else {
      message.isGrid = undefined;
    }
    if (object.isSlider !== undefined && object.isSlider !== null) {
      message.isSlider = Boolean(object.isSlider);
    } else {
      message.isSlider = undefined;
    }
    if (object.isColumns !== undefined && object.isColumns !== null) {
      message.isColumns = Boolean(object.isColumns);
    } else {
      message.isColumns = undefined;
    }
    if (object.isSlideshow !== undefined && object.isSlideshow !== null) {
      message.isSlideshow = Boolean(object.isSlideshow);
    } else {
      message.isSlideshow = undefined;
    }
    if (object.cropOnlyFill !== undefined && object.cropOnlyFill !== null) {
      message.cropOnlyFill = Boolean(object.cropOnlyFill);
    } else {
      message.cropOnlyFill = undefined;
    }
    if (object.galleryMargin !== undefined && object.galleryMargin !== null) {
      message.galleryMargin = Number(object.galleryMargin);
    } else {
      message.galleryMargin = undefined;
    }
    if (object.fullscreen !== undefined && object.fullscreen !== null) {
      message.fullscreen = Boolean(object.fullscreen);
    } else {
      message.fullscreen = undefined;
    }
    if (object.mobileSwipeAnimation !== undefined && object.mobileSwipeAnimation !== null) {
      message.mobileSwipeAnimation = String(object.mobileSwipeAnimation);
    } else {
      message.mobileSwipeAnimation = undefined;
    }
    if (object.thumbnailSize !== undefined && object.thumbnailSize !== null) {
      message.thumbnailSize = Number(object.thumbnailSize);
    } else {
      message.thumbnailSize = undefined;
    }
    if (object.gotStyleParams !== undefined && object.gotStyleParams !== null) {
      message.gotStyleParams = Boolean(object.gotStyleParams);
    } else {
      message.gotStyleParams = undefined;
    }
    if (object.showVideoPlayButton !== undefined && object.showVideoPlayButton !== null) {
      message.showVideoPlayButton = Boolean(object.showVideoPlayButton);
    } else {
      message.showVideoPlayButton = undefined;
    }
    if (object.videoPlay !== undefined && object.videoPlay !== null) {
      message.videoPlay = String(object.videoPlay);
    } else {
      message.videoPlay = undefined;
    }
    if (object.galleryType !== undefined && object.galleryType !== null) {
      message.galleryType = String(object.galleryType);
    } else {
      message.galleryType = undefined;
    }
    return message;
  },

  toJSON(message: GalleryStyles): unknown {
    const obj: any = {};
    message.galleryLayout !== undefined && (obj.galleryLayout = message.galleryLayout);
    message.gallerySizeType !== undefined && (obj.gallerySizeType = message.gallerySizeType);
    message.gallerySizePx !== undefined && (obj.gallerySizePx = message.gallerySizePx);
    message.oneRow !== undefined && (obj.oneRow = message.oneRow);
    message.cubeRatio !== undefined && (obj.cubeRatio = message.cubeRatio);
    message.galleryThumbnailsAlignment !== undefined &&
      (obj.galleryThumbnailsAlignment = message.galleryThumbnailsAlignment);
    message.isVertical !== undefined && (obj.isVertical = message.isVertical);
    message.numberOfImagesPerRow !== undefined &&
      (obj.numberOfImagesPerRow = message.numberOfImagesPerRow);
    message.imageMargin !== undefined && (obj.imageMargin = message.imageMargin);
    message.thumbnailSpacings !== undefined && (obj.thumbnailSpacings = message.thumbnailSpacings);
    message.cubeType !== undefined && (obj.cubeType = message.cubeType);
    message.enableInfiniteScroll !== undefined &&
      (obj.enableInfiniteScroll = message.enableInfiniteScroll);
    message.titlePlacement !== undefined && (obj.titlePlacement = message.titlePlacement);
    message.allowHover !== undefined && (obj.allowHover = message.allowHover);
    message.itemClick !== undefined && (obj.itemClick = message.itemClick);
    message.showArrows !== undefined && (obj.showArrows = message.showArrows);
    message.gridStyle !== undefined && (obj.gridStyle = message.gridStyle);
    message.loveButton !== undefined && (obj.loveButton = message.loveButton);
    message.allowSocial !== undefined && (obj.allowSocial = message.allowSocial);
    message.allowDownload !== undefined && (obj.allowDownload = message.allowDownload);
    message.cubeImages !== undefined && (obj.cubeImages = message.cubeImages);
    message.groupSize !== undefined && (obj.groupSize = message.groupSize);
    message.groupTypes !== undefined && (obj.groupTypes = message.groupTypes);
    message.fixedColumns !== undefined && (obj.fixedColumns = message.fixedColumns);
    message.hasThumbnails !== undefined && (obj.hasThumbnails = message.hasThumbnails);
    message.enableScroll !== undefined && (obj.enableScroll = message.enableScroll);
    message.isGrid !== undefined && (obj.isGrid = message.isGrid);
    message.isSlider !== undefined && (obj.isSlider = message.isSlider);
    message.isColumns !== undefined && (obj.isColumns = message.isColumns);
    message.isSlideshow !== undefined && (obj.isSlideshow = message.isSlideshow);
    message.cropOnlyFill !== undefined && (obj.cropOnlyFill = message.cropOnlyFill);
    message.galleryMargin !== undefined && (obj.galleryMargin = message.galleryMargin);
    message.fullscreen !== undefined && (obj.fullscreen = message.fullscreen);
    message.mobileSwipeAnimation !== undefined &&
      (obj.mobileSwipeAnimation = message.mobileSwipeAnimation);
    message.thumbnailSize !== undefined && (obj.thumbnailSize = message.thumbnailSize);
    message.gotStyleParams !== undefined && (obj.gotStyleParams = message.gotStyleParams);
    message.showVideoPlayButton !== undefined &&
      (obj.showVideoPlayButton = message.showVideoPlayButton);
    message.videoPlay !== undefined && (obj.videoPlay = message.videoPlay);
    message.galleryType !== undefined && (obj.galleryType = message.galleryType);
    return obj;
  },
};

const baseGalleryConfig: object = {};

export const GalleryConfig = {
  fromJSON(object: any): GalleryConfig {
    const message = { ...baseGalleryConfig } as GalleryConfig;
    if (object.layout !== undefined && object.layout !== null) {
      message.layout = String(object.layout);
    } else {
      message.layout = undefined;
    }
    if (object.spacing !== undefined && object.spacing !== null) {
      message.spacing = Number(object.spacing);
    } else {
      message.spacing = undefined;
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = undefined;
    }
    if (object.disableExpand !== undefined && object.disableExpand !== null) {
      message.disableExpand = Boolean(object.disableExpand);
    } else {
      message.disableExpand = undefined;
    }
    return message;
  },

  toJSON(message: GalleryConfig): unknown {
    const obj: any = {};
    message.layout !== undefined && (obj.layout = message.layout);
    message.spacing !== undefined && (obj.spacing = message.spacing);
    message.key !== undefined && (obj.key = message.key);
    message.disableExpand !== undefined && (obj.disableExpand = message.disableExpand);
    return obj;
  },
};

const baseGalleyItemMetadata: object = {};

export const GalleyItemMetadata = {
  fromJSON(object: any): GalleyItemMetadata {
    const message = { ...baseGalleyItemMetadata } as GalleyItemMetadata;
    if (object.height !== undefined && object.height !== null) {
      message.height = Number(object.height);
    } else {
      message.height = undefined;
    }
    if (object.width !== undefined && object.width !== null) {
      message.width = Number(object.width);
    } else {
      message.width = undefined;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = undefined;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = String(object.type);
    } else {
      message.type = undefined;
    }
    return message;
  },

  toJSON(message: GalleyItemMetadata): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = message.height);
    message.width !== undefined && (obj.width = message.width);
    message.title !== undefined && (obj.title = message.title);
    message.type !== undefined && (obj.type = message.type);
    return obj;
  },
};

const baseGalleryItem: object = {};

export const GalleryItem = {
  fromJSON(object: any): GalleryItem {
    const message = { ...baseGalleryItem } as GalleryItem;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = GalleyItemMetadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.itemId !== undefined && object.itemId !== null) {
      message.itemId = String(object.itemId);
    } else {
      message.itemId = undefined;
    }
    if (object.url !== undefined && object.url !== null) {
      message.url = String(object.url);
    } else {
      message.url = undefined;
    }
    if (object.selected !== undefined && object.selected !== null) {
      message.selected = Boolean(object.selected);
    } else {
      message.selected = undefined;
    }
    return message;
  },

  toJSON(message: GalleryItem): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata ? GalleyItemMetadata.toJSON(message.metadata) : undefined);
    message.itemId !== undefined && (obj.itemId = message.itemId);
    message.url !== undefined && (obj.url = message.url);
    message.selected !== undefined && (obj.selected = message.selected);
    return obj;
  },
};
