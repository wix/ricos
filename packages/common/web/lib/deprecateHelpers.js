/* eslint-disable fp/no-delete */
import { IMAGE_TYPE, GALLERY_TYPE, VIDEO_TYPE, SOUND_CLOUD_TYPE } from '../src/consts';

export const deprecateHelpers = (helpers = {}, config) => {
  const { onExpand, handleFileUpload, handleFileSelection, onVideoSelected } = helpers;

  if (onExpand) {
    if (config[GALLERY_TYPE]) {
      config[GALLERY_TYPE].onExpand = onExpand;
    }
    if (config[IMAGE_TYPE]) {
      config[IMAGE_TYPE].onExpand = onExpand;
    }

    delete helpers.onExpand;
  }

  if (handleFileUpload) {
    if (config[GALLERY_TYPE]) {
      config[GALLERY_TYPE].handleFileUpload = handleFileUpload;
    }
    if (config[IMAGE_TYPE]) {
      config[IMAGE_TYPE].handleFileUpload = handleFileUpload;
    }

    delete helpers.handleFileUpload;
  }

  if (handleFileSelection) {
    if (config[GALLERY_TYPE]) {
      config[GALLERY_TYPE].handleFileSelection = handleFileSelection;
    }
    if (config[IMAGE_TYPE]) {
      config[IMAGE_TYPE].handleFileSelection = handleFileSelection;
    }

    delete helpers.handleFileSelection;
  }

  if (onVideoSelected) {
    if (config[VIDEO_TYPE]) {
      config[VIDEO_TYPE].onVideoSelected = onVideoSelected;
    }
    if (config[SOUND_CLOUD_TYPE]) {
      config[SOUND_CLOUD_TYPE].onVideoSelected = onVideoSelected;
    }
    if (config[GALLERY_TYPE]) {
      config[GALLERY_TYPE].onVideoSelected = onVideoSelected;
    }

    delete helpers.onVideoSelected;
  }
};
