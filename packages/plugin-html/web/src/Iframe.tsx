import React, { FunctionComponent, Ref } from 'react';
import styles from '../statics/styles/Iframe.scss';

const Iframe: FunctionComponent<{ iframeRef?: Ref<HTMLIFrameElement>; [key: string]: unknown }> = ({
  iframeRef,
  ...otherProps
}) => (
  <iframe
    ref={iframeRef}
    className={styles.iframe}
    title="remote content"
    style={{ backgroundColor: 'transparent' }}
    {...otherProps}
  />
);

export default Iframe;
