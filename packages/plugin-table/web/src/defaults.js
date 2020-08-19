/*
  This module contains default params for your plugin.
  You can add whatever you like here.

  THEME - receives 'colors' object (palette) and returns a css object which is the exact css style of the plugin,
          but with a transformation of colors based on the palette.
          Please find examples of usage in other plugins.
  DEFAULTS - should contain at least an empty 'config' (or else the wrapper won't work)
*/

import { TABLE_TYPE as type } from './types';
import { EditorState, convertToRaw } from 'wix-rich-content-editor';
const createEmptyCellContent = () => convertToRaw(EditorState.createEmpty().getCurrentContent());

export const DEFAULTS = Object.freeze({
  type,
  config: {
    size: 'content',
    alignment: 'center',
    rows: {
      0: {
        columns: {
          0: { content: createEmptyCellContent() },
        },
      },
    },
  },
});

//@colors is defined in 'ThemeGenerator.js'
// eslint-disable-next-line no-unused-vars
export const THEME = colors => {
  // eslint-disable-next-line no-console
  console.warn(
    `Table needs to provide css definitions for Ricos.
    If you're using any color that arrives from Wix Palettes, then you should go to your
    plugin's "defaults.js" and add the relevant classnames.
    If you don't - you can remove this message.`
  );
  return {};
};
