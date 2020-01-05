import { createHtmlPlugin } from './createHtmlPlugin';
import { HTML_TYPE } from './types';

const isSSR = () => typeof window === 'undefined'; //TODO Code duplication with examples/main utils.js
export const getBaseUrl = () => {
  if (isSSR()) {
    return null;
  }

  const { hostname, port, protocol } = window.location;
  const baseUrl = `${protocol}//${hostname}`;
  return port ? `${baseUrl}:${port}` : baseUrl;
};

const config = {
  htmlIframeSrc: `${getBaseUrl()}/static/html-plugin-embed.html`,
  minWidth: 35,
  maxWidth: 740,
  width: 350,
  minHeight: 50,
  maxHeight: 1200,
};

export const pluginHtml = {
  config,
  type: HTML_TYPE,
  createPlugin: createHtmlPlugin,
  ModalsMap: {},
};
