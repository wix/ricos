import createInsertButtons from './insert-file-upload-buttons';
import createInlineButtons from './inline-file-upload-buttons';

export default function createToolbar({ helpers, settings, t }) {
  return {
    InlineButtons: createInlineButtons({ settings, t }),
    InsertButtons: createInsertButtons({ helpers, settings, t }),
    name: 'FileUpload',
  };
}
