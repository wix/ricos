import React from 'react';
import PropTypes from 'prop-types';
import { RicosViewer } from 'ricos-viewer';
import { RichContentViewer } from 'wix-rich-content-viewer';
import {
  pluginLinkButton,
  pluginActionButton,
} from 'wix-rich-content-plugin-button/dist/module.viewer';
import { pluginCodeBlock } from 'wix-rich-content-plugin-code-block/dist/module.viewer';
import { pluginDivider } from 'wix-rich-content-plugin-divider/dist/module.viewer';
import { pluginEmoji } from 'wix-rich-content-plugin-emoji/dist/module.viewer';
import { pluginFileUpload } from 'wix-rich-content-plugin-file-upload/dist/module.viewer';
import { pluginGallery } from 'wix-rich-content-plugin-gallery/dist/module.viewer';
import { pluginGiphy } from 'wix-rich-content-plugin-giphy/dist/module.viewer';
import { pluginHashtag } from 'wix-rich-content-plugin-hashtag/dist/module.viewer';
import { pluginHeadersMarkdown } from 'wix-rich-content-plugin-headers-markdown/dist/module.viewer';
import { pluginHtml } from 'wix-rich-content-plugin-html/dist/module.viewer';
import { pluginImage } from 'wix-rich-content-plugin-image/dist/module.viewer';
import { pluginLineSpacing } from 'wix-rich-content-plugin-line-spacing/dist/module.viewer';
import { pluginLink } from 'wix-rich-content-plugin-link/dist/module.viewer';
import { pluginMap } from 'wix-rich-content-plugin-map/dist/module.viewer';
import { pluginMentions } from 'wix-rich-content-plugin-mentions/dist/module.viewer';
import { pluginSoundCloud } from 'wix-rich-content-plugin-sound-cloud/dist/module.viewer';
import { pluginVideo } from 'wix-rich-content-plugin-video/dist/module.viewer';
import { pluginLinkPreview } from 'wix-rich-content-plugin-link-preview/dist/module.viewer';
import {
  pluginTextColor,
  pluginTextHighlight,
} from 'wix-rich-content-plugin-text-color/dist/module.viewer';
import MobileDetect from 'mobile-detect';
import { mockFileUploadFunc } from '../../../main/shared/utils/fileUploadUtil';

const configs = {
  fileUpload: {
    accept: '*',
    handleFileSelection: mockFileUploadFunc,
  },
  giphy: {
    giphySdkApiKey: process.env.GIPHY_API_KEY || 'HXSsAGVNzjeUjhKfhhD9noF8sIbpYDsV',
    sizes: { desktop: 'original', mobile: 'original' }, // original or downsizedSmall are supported
  },
  hashtag: {
    createHref: decoratedText => `/search/posts?query=${encodeURIComponent('#')}${decoratedText}`,
    onClick: e => e.preventDefault(),
  },
};

const plugins = [
  pluginLinkButton(),
  pluginActionButton(),
  pluginCodeBlock(),
  pluginDivider(),
  pluginEmoji(),
  pluginFileUpload(configs.fileUpload),
  pluginGallery(),
  pluginGiphy(configs.giphy),
  pluginHashtag(configs.hashtag),
  pluginHtml(),
  pluginImage(),
  pluginHeadersMarkdown(),
  pluginLineSpacing(),
  pluginLink(),
  pluginMap({ googleMapApiKey: process.env.GOOGLE_MAPS_API_KEY }),
  pluginMentions(),
  pluginSoundCloud(),
  pluginVideo(),
  pluginTextColor(),
  pluginTextHighlight(),
  pluginLinkPreview(),
];

const mobileDetect = new MobileDetect(window.navigator.userAgent);

const ViewerWrapper = ({
  content,
  palette,
  isMobile = mobileDetect.mobile() !== null,
  addAnchors,
  normalize,
  preview,
  createThemeStrategy,
}) => {
  return (
    <RicosViewer
      plugins={plugins}
      theme={{ palette }}
      content={content}
      isMobile={isMobile}
      preview={preview}
      createThemeStrategy={createThemeStrategy}
    >
      <RichContentViewer addAnchors={addAnchors} normalize={normalize} />
    </RicosViewer>
  );
};

ViewerWrapper.propTypes = {
  content: PropTypes.object,
  palette: PropTypes.arrayOf(PropTypes.object),
  isMobile: PropTypes.bool,
  preview: PropTypes.object,
  addAnchors: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  normalize: PropTypes.object,
  _rcProps: PropTypes.object,
  createThemeStrategy: PropTypes.func,
};

export default ViewerWrapper;
