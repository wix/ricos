import { pluginImage } from 'wix-rich-content-plugin-image';
import { pluginGallery } from 'wix-rich-content-plugin-gallery';
import { pluginVideo } from 'wix-rich-content-plugin-video';
import { pluginImage as pluginImageV } from 'wix-rich-content-plugin-image/viewer';
import { pluginGallery as pluginGalleryV } from 'wix-rich-content-plugin-gallery/viewer';
import { IMAGE_TYPE, GALLERY_TYPE, FILE_UPLOAD_TYPE, VIDEO_TYPE } from 'wix-rich-content-common';
import pluginsStrategy from './pluginsStrategy';
import { RCEPluginProps, RCVPluginProps } from './pluginTypes';
import * as utils from '../themeStrategy/themeUtils';

describe('PluginsStrategy', () => {
  const editorPlugins = [
    pluginImage(),
    pluginVideo({
      handleFileUpload: () => {},
      getVideoUrl: () => `video url`,
    }),
    pluginGallery(),
  ];

  const editorChildProps = {
    config: {
      [FILE_UPLOAD_TYPE]: {
        accept: '*',
        onFileSelected: () => 'file selected',
      },
    },
  };

  const viewerChildProps = {
    config: { PREVIEW: {} },
  };

  const viewerPlugins = [pluginImageV(), pluginGalleryV()];
  const driver = {
    runStrategy: (isViewer: boolean) =>
      pluginsStrategy({
        themeData: { utils },
        isViewer,
        plugins: isViewer ? viewerPlugins : editorPlugins,
        childProps: isViewer ? viewerChildProps : editorChildProps,
        cssOverride: { modalTheme: { content: {} } },
      }),
  };

  it('should supply editor props', () => {
    const result = driver.runStrategy(false) as RCEPluginProps;
    const expected = [IMAGE_TYPE, VIDEO_TYPE, GALLERY_TYPE, FILE_UPLOAD_TYPE, 'themeData'];
    expect(Object.keys(result.config)).toStrictEqual(expected);
    expect(result.plugins.length).toEqual(3);
  });

  it('should supply viewer props', () => {
    const result = driver.runStrategy(true) as RCVPluginProps;
    expect(Object.keys(result.config)).toStrictEqual([
      IMAGE_TYPE,
      GALLERY_TYPE,
      'PREVIEW',
      'themeData',
    ]);
    expect(result.typeMappers.length).toEqual(2);
  });
});
