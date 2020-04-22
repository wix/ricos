import { DEFAULTS } from '../defaults';
import { getModalStyles, TOOLBARS } from 'wix-rich-content-editor-common';
import {
  TwitterIcon,
  InstagramIcon,
  FacebookIcon,
  TikTokIcon,
  PinterestIcon,
  YoutubeIcon,
} from '../icons';
import EmbedURLInputModal from './embedURLInputModal';

let content = { maxWidth: '580px', minHeight: '348px' };

export default ({ helpers, settings, isMobile, t }) => {
  if (isMobile) {
    content = {
      ...content,
      minHeight: '100%',
      minWidth: '100%',
      margin: 0,
      alignContent: 'center',
      top: 0,
      transform: 'none',
    };
  }
  const customStyles = { content };
  const { exposeEmbedButtons = [] } = settings;
  const socialIconsMap = {
    Instagram: InstagramIcon,
    Twitter: TwitterIcon,
    Facebook: FacebookIcon,
    TikTok: TikTokIcon,
    Pinterest: PinterestIcon,
    YouTube: YoutubeIcon,
  };

  return exposeEmbedButtons.map(socialType => {
    return {
      type: 'modal',
      name: `${socialType}_InsertButton`,
      tooltipText: t(`EmbedURL_Social_${socialType}_Title`),
      Icon: socialIconsMap[socialType],
      componentData: { ...DEFAULTS, socialType, fetchData: settings.fetchData },
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      helpers,
      modalElement: EmbedURLInputModal,
      modalStyles: getModalStyles({ customStyles, fullScreen: false, isMobile }),
      section: 'BlockToolbar_Section_Embed_Social',
    };
  });
};
