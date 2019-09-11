import React from 'react';

export const staticInlineStyleMapper = mergedStyles => ({
  BOLD: (children, { key }) => <strong key={key}>{children}</strong>,
  ITALIC: (children, { key }) => <em key={key}>{children}</em>,
  UNDERLINE: (children, { key }) => (
    <u key={key} className={mergedStyles.underline}>
      {children}
    </u>
  ),
  CODE: (children, { key }) => (
    <span key={key} className={mergedStyles.code}>
      {children}
    </span>
  ),
});
