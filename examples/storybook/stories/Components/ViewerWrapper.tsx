import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import { RicosContent, RicosTheme, RicosViewer, RicosViewerProps } from 'ricos/viewer';
import { RichContentViewer, RichContentViewerProps } from 'ricos/viewer';
import { pluginLinkButton, pluginActionButton } from 'ricos/button/viewer';
import { pluginCodeBlock } from 'ricos/code-block/viewer';
import { pluginDivider } from 'ricos/divider/viewer';
import { pluginEmoji } from 'ricos/emoji/viewer';
import { pluginFileUpload } from 'ricos/file-upload/viewer';
import { pluginGallery } from 'ricos/gallery/viewer';
import { pluginAccordion } from 'ricos/accordion/viewer';
import { pluginGiphy } from 'ricos/giphy/viewer';
import { pluginHashtag } from 'ricos/hashtag/viewer';
import { pluginHeadersMarkdown } from 'ricos/headers-markdown/viewer';
import { pluginHtml } from 'ricos/html/viewer';
import { pluginImage } from 'ricos/image/viewer';
import { pluginLineSpacing } from 'ricos/line-spacing/viewer';
import { pluginLink } from 'ricos/link/viewer';
import { pluginMap } from 'ricos/map/viewer';
import { pluginMentions } from 'ricos/mentions/viewer';
import { pluginSoundCloud } from 'ricos/sound-cloud/viewer';
import { pluginVideo } from 'ricos/video/viewer';
import { pluginLinkPreview } from 'ricos/link-preview/viewer';
import { pluginVerticalEmbed } from 'ricos/vertical-embed/viewer';
import { pluginTextColor, pluginTextHighlight } from 'ricos/text-color/viewer';
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
  pluginAccordion(),
  pluginVerticalEmbed(),
];

const mobileDetect = new MobileDetect(window.navigator.userAgent);

interface Props {
  content?: RicosContent;
  isMobile?: boolean;
  preview?: RicosViewerProps['preview'];
  addAnchors?: RichContentViewerProps['addAnchors'];
  normalize?: RichContentViewerProps['normalize'];
  theme?: RicosTheme;
}

const ViewerWrapper: FunctionComponent<Props> = ({
  content,
  theme,
  isMobile = mobileDetect.mobile() !== null,
  addAnchors,
  normalize,
  preview,
}) => {
  return (
    <RicosViewer
      plugins={plugins}
      theme={theme}
      content={content}
      isMobile={isMobile}
      preview={preview}
      mediaSettings={{ fullscreenProps: { backgroundColor: 'black', foregroundColor: 'white' } }}
    >
      <RichContentViewer addAnchors={addAnchors} normalize={normalize} />
    </RicosViewer>
  );
};

export default ViewerWrapper;
