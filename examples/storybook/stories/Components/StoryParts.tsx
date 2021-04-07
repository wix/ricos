import React, { FunctionComponent, ReactNode } from 'react';
import ReactJson from 'react-json-view';
import SourceCode from './SourceCode';
import styles from './styles.scss';
import { DraftContent } from 'ricos-editor';

export const Page: FunctionComponent<{ title?: string }> = ({ title, children }) => (
  <div className={styles.page}>
    <h1>{title}</h1>
    {children}
  </div>
);

export const Section: FunctionComponent<{ title?: string; children: ReactNode; type?: string }> & {
  Types: Record<string, string>;
} = ({ type, title, children }) => {
  return (
    <div className={styles.section}>
      <h2>{title}</h2>
      <div className={styles[type]}>{children}</div>
    </div>
  );
};

Section.Types = {
  COMPARISON: 'Comparison',
};

export const RichContentEditorBox: FunctionComponent<{
  children: ReactNode;
  preset?: string;
  sourcecode?: string;
  content?: DraftContent;
  title?: string;
}> = ({ children, preset = '', sourcecode, content, title }) => {
  return (
    <div className={styles[preset]}>
      {title && <h3>{title}</h3>}
      <div className={styles.rceWrapper}>{children}</div>
      {sourcecode && <SourceCode code={sourcecode} />}
      {content && (
        <div>
          <p>Content State:</p>
          <ContentState json={content} />
        </div>
      )}
    </div>
  );
};

export const RichContentViewerBox: FunctionComponent<{
  children: ReactNode;
  preset?: string;
  sourcecode?: string;
}> = ({ children, preset, sourcecode }) => (
  <div className={`${styles[preset || '']}`}>
    <div className={styles.rcvWrapper}>{children}</div>
    {sourcecode && <SourceCode code={sourcecode} />}
  </div>
);

export const ContentState: FunctionComponent<{ json?: DraftContent; collapsed?: number }> = ({
  json,
  collapsed = 1,
}) => <ReactJson src={json} collapsed={collapsed} />;
