import createInsertButtons from './insert-buttons';

export default function createToolbar({ settings, helpers, styles, t, isMobile }) {
  return {
    InsertButtons: createInsertButtons({ settings, helpers, styles, t, isMobile }),
    name: 'emoji',
  };
}
