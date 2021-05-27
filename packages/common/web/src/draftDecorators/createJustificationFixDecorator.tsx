import React from 'react';
import { isSSR } from '../index';
import { DraftDecorator } from 'draft-js';

export default function createJustificationFixDecorator(): DraftDecorator {
  const isTextJustified = contentBlock => {
    const textAlignment = contentBlock.toJS //check if immutable (editor/viewer)
      ? contentBlock.getData().get('textAlignment')
      : contentBlock?.data?.textAlignment;
    return textAlignment === 'justify';
  };

  const isChrome = () => !isSSR() && !!window.chrome;

  const strategy = (contentBlock, callback) => {
    if (!isChrome() && isTextJustified(contentBlock)) {
      const regex = /\s[^\s]/g;
      const str = contentBlock.getText();
      Array.from(str.matchAll(regex), (match: { index: number }) => match.index).forEach(index => {
        callback(index, index + 1);
      });
    }
  };

  const component = props => <span style={{ whiteSpace: 'normal' }}>{props.children}</span>;
  return { strategy, component };
}

declare global {
  interface Window {
    chrome: unknown;
  }
}
