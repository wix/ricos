import { DEFAULTS } from '../defaults';
import { getModalStyles, TOOLBARS } from 'wix-rich-content-editor-common';
import {
  TwitterIcon,
  InstagramIcon,
  FacebookIcon,
  TikTokIcon,
  PinterestIcon,
  YouTubeIcon,
} from '../icons';
import embedURLInputModal from './embedURLInputModal';

let content = { maxWidth: '580px', minHeight: '348px' };

export default ({ helpers, settings, isMobile }) => {
  if (isMobile) {
    content = {
      ...content,
      minHeight: '100%',
      minWidth: '100%',
      margin: 0,
      alignContent: 'center',
    };
  }
  const customStyles = { content };
  const { exposeEmbedButtons = {} } = settings;
  const socialTypes = [];
  Object.keys(exposeEmbedButtons).forEach(key => {
    exposeEmbedButtons[key] && socialTypes.push(key);
  });
  const socialIconsMap = {
    Instagram: InstagramIcon,
    Twitter: TwitterIcon,
    Facebook: FacebookIcon,
    TikTok: TikTokIcon,
    Pinterest: PinterestIcon,
    YouTube: YouTubeIcon,
  };
  return socialTypes.map(socialType => {
    return {
      type: 'modal',
      name: socialType,
      tooltipText: `Add a ${socialType} post`,
      Icon: socialIconsMap[socialType],
      componentData: { ...DEFAULTS, socialType, fetchData: settings.fetchData },
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      helpers,
      modalElement: embedURLInputModal,
      modalStyles: getModalStyles({ customStyles, fullScreen: false, isMobile }),
    };
  });
};
