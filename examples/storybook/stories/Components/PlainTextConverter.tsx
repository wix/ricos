import React, { useEffect, useState } from 'react';
import { RichContentEditorBox, Section } from './StoryParts';
import PropTypes from 'prop-types';
import EditorWrapper from './EditorWrapper';
import styles from '../Components/styles.scss';
import { toPlainText } from 'ricos-content/libs/toPlainText';

export default function PlainTextConverter({ content, theme }) {
  const [newContent, setContent] = useState(content);
  const [plainText, setText] = useState('');

  useEffect(() => {
    (async () => setText(await toPlainText(newContent)))();
  }, [newContent]);

  return (
    <Section type={Section.Types.COMPARISON}>
      <RichContentEditorBox>
        <EditorWrapper
          content={newContent}
          theme={{ ...theme, parentClass: styles['rce-wrapper'] }}
          onChange={setContent}
        />
      </RichContentEditorBox>
      <div style={{ whiteSpace: 'pre-wrap' }}>{plainText}</div>
    </Section>
  );
}

PlainTextConverter.propTypes = {
  content: PropTypes.object,
  theme: PropTypes.object,
};
