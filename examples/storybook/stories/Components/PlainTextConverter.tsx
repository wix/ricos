import React, { FunctionComponent, useEffect, useState } from 'react';
import { RichContentEditorBox, Section } from './StoryParts';
import EditorWrapper from './EditorWrapper';
import styles from '../Components/styles.scss';
import sourceCode from '!!raw-loader!./PlainTextConverter';
import { toPlainText } from 'ricos-content/libs/toPlainText';
import { fromDraft } from 'ricos-content/libs/migrateSchema';
import { RichContentTheme } from 'wix-rich-content-common';
import { DraftContent } from 'ricos-content';

const PlainTextConverter: FunctionComponent<{
  content: DraftContent;
  theme?: RichContentTheme;
}> = ({ content, theme }) => {
  const [newContent, setContent] = useState(content);
  const [plainText, setText] = useState('');

  useEffect(() => {
    (async () => setText(await toPlainText(fromDraft(newContent))))();
  }, [newContent]);

  return (
    <Section type={Section.Types.COMPARISON}>
      <RichContentEditorBox sourcecode={sourceCode}>
        <EditorWrapper
          content={newContent}
          theme={{ ...theme, parentClass: styles['rce-wrapper'] }}
          onChange={setContent}
        />
      </RichContentEditorBox>
      <div style={{ whiteSpace: 'pre-wrap' }}>{plainText}</div>
    </Section>
  );
};

export default PlainTextConverter;
