import createInsertButtons from './insert-upload-file-buttons';
import createInlineButtons from './inline-upload-file-buttons';

export default function createToolbar({ helpers, t, settings }) {
  return {
    InlineButtons: createInlineButtons({ t, settings }),
    InsertButtons: createInsertButtons({ helpers, t, settings }),
    name: 'UploadFile',
  };
}
