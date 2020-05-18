import { withI18n } from 'wix-rich-content-common';
import englishResources from 'wix-rich-content-common/dist/statics/locale/messages_en.json';
import RichContentViewer from './RichContentViewer';

const I18nRichContentViewer = withI18n(RichContentViewer, englishResources);

I18nRichContentViewer.displayName = 'RichContentViewer';

export default I18nRichContentViewer;
