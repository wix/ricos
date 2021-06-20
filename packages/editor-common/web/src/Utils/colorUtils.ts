import { EditorState, Modifier } from '@wix/draft-js';
import { getSelectionStyles } from './inlineStyleUtils';
import { RICOS_TEXT_COLOR_TYPE, RICOS_TEXT_HIGHLIGHT_TYPE } from 'wix-rich-content-common';

type ColorType = typeof RICOS_TEXT_COLOR_TYPE | typeof RICOS_TEXT_HIGHLIGHT_TYPE;

const normalizeStyle = (style: string) => {
  try {
    return JSON.parse(style);
  } catch (e) {
    return { FG: style };
  }
};

const getColorByType = (style: string, type: string) => {
  const parsed = normalizeStyle(style);
  return parsed[type] || '';
};

const textForegroundPredicate = (style: string) => getColorByType(style, 'FG');

const textBackgroundPredicate = (style: string) => getColorByType(style, 'BG');

const getCurrentColors = (editorState: EditorState, colorType: ColorType) => {
  const isTextColor = colorType === 'ricos-text-color';
  const styleSelectionPredicate = isTextColor ? textForegroundPredicate : textBackgroundPredicate;
  const currentColors = getSelectionStyles(styleSelectionPredicate, editorState);
  return currentColors;
};

export const getColor = (editorState: EditorState, colorType: ColorType) => {
  const currentColors = getCurrentColors(editorState, colorType);
  const parsed = normalizeStyle(currentColors[0]);
  return Object.values(parsed)[0];
};

const removeCurrentColors = (
  editorState: EditorState,
  data: { colorType: ColorType; color?: string }
) => {
  const selection = editorState.getSelection();
  const currentColors = getCurrentColors(editorState, data.colorType);
  return currentColors.reduce((nextEditorState, prevColor) => {
    const contentState = nextEditorState.getCurrentContent();
    const nextContentState = Modifier.removeInlineStyle(contentState, selection, prevColor);
    return EditorState.push(nextEditorState, nextContentState, 'change-inline-style');
  }, editorState);
};

export const setColor = (
  editorState: EditorState,
  data: { colorType: ColorType; color?: string }
) => {
  const selection = editorState.getSelection();
  const isTextColor = data.colorType === 'ricos-text-color';
  const newEditorState = removeCurrentColors(editorState, data);
  let contentState = newEditorState.getCurrentContent();
  if (data?.color) {
    const inlineStyle = isTextColor
      ? JSON.stringify({ FG: data?.color })
      : JSON.stringify({ BG: data?.color });
    contentState = Modifier.applyInlineStyle(contentState, selection, inlineStyle);
  }
  return EditorState.push(newEditorState, contentState, 'change-inline-style');
};

export const setTextColor = (editorState: EditorState, data?: { color?: string }) =>
  setColor(editorState, { colorType: 'ricos-text-color', color: data?.color });

export const setHighlightColor = (editorState: EditorState, data?: { color?: string }) =>
  setColor(editorState, { colorType: 'ricos-text-highlight', color: data?.color });
