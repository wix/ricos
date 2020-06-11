import {
  getSelectionStyles,
  Modifier,
  EditorState,
  SelectionState,
} from 'wix-rich-content-editor-common';

export const customStyleFn = styles =>
  styles.toArray().reduce(cssStyle => {
    return {
      ...cssStyle,
      ...{
        filter: 'blur(0.25em)',
        display: 'inline',
      },
    };
  }, {});

export const styleFnFilter = () => {
  return styles => {
    const _styles = styles.filter(style => style.includes('SPOILER'));
    return customStyleFn(_styles);
  };
};

const createNewSelectionRange = (key, start, end) => {
  return new SelectionState({
    anchorKey: key,
    anchorOffset: start,
    focusKey: key,
    focusOffset: Number(end) + 1,
  });
};

const createNewSpoilerKey = (key, start, end) => {
  return `${key}_${start}_${end}`;
};

const updateSelectionRange = (anchorKey, prevSpoiler, start, end) => {
  const splitPrev = prevSpoiler.split('_');
  const minStart = Math.min(splitPrev[2], start);
  const maxEnd = Math.max(splitPrev[3], end);
  return createNewSelectionRange(anchorKey, minStart, maxEnd);
};

const isSelectionInsideExistingSpoiler = (currentSpoilers, oldStart, oldEnd) => {
  if (currentSpoilers.length === 1) {
    const splitPrev = currentSpoilers[0].split('_');
    return splitPrev[2] <= oldStart && splitPrev[3] >= oldEnd;
  }
  return false;
};

const splitInlineStyle = (editorState, currentSpoiler, selection, oldStart, oldEnd) => {
  const splitSpoiler = currentSpoiler.split('_');
  const anchorKey = selection.anchorKey;
  const selectionToRemove = createNewSelectionRange(anchorKey, splitSpoiler[2], splitSpoiler[3]);
  const nextContentState = Modifier.removeInlineStyle(
    editorState.getCurrentContent(),
    selectionToRemove,
    currentSpoiler
  );
  const newEditorState = EditorState.push(editorState, nextContentState, 'change-inline-style');

  let keyForSelectionBefore,
    keyForSelectionAfter,
    newContentState = newEditorState.getCurrentContent();

  if (oldStart - 1 !== splitSpoiler[2]) {
    const newSelectionBefore = createNewSelectionRange(anchorKey, splitSpoiler[2], oldStart - 1);
    keyForSelectionBefore = createNewSpoilerKey(
      anchorKey,
      newSelectionBefore.anchorOffset,
      newSelectionBefore.focusOffset - 1
    );
    newContentState = Modifier.applyInlineStyle(
      newEditorState.getCurrentContent(),
      newSelectionBefore,
      `SPOILER_${keyForSelectionBefore}`
    );
  }

  if (oldEnd !== splitSpoiler[3]) {
    const newSelectionAfter = createNewSelectionRange(anchorKey, oldEnd + 1, splitSpoiler[3]);
    keyForSelectionAfter = createNewSpoilerKey(
      anchorKey,
      newSelectionAfter.anchorOffset,
      newSelectionAfter.focusOffset - 1
    );
    newContentState = Modifier.applyInlineStyle(
      newContentState,
      newSelectionAfter,
      `SPOILER_${keyForSelectionAfter}`
    );
  }

  return {
    key: keyForSelectionBefore || keyForSelectionAfter,
    newEditorState,
    newSelection: selection,
    contentState: newContentState,
  };
};

const styleFilter = style => style.includes('SPOILER');

export const updateInlineStyles = (editorState, selection, isActive) => {
  let newSelection = selection;
  let newEditorState = editorState;
  const oldStart = Math.min(selection.anchorOffset, selection.focusOffset);
  const oldEnd = Math.max(selection.anchorOffset, selection.focusOffset) - 1;

  let key = createNewSpoilerKey(selection.anchorKey, oldStart, oldEnd);
  const currentSpoilers = getSelectionStyles(styleFilter, editorState);
  if (isSelectionInsideExistingSpoiler(currentSpoilers, oldStart, oldEnd)) {
    return splitInlineStyle(editorState, currentSpoilers[0], selection, oldStart, oldEnd);
  } else {
    let start = oldStart;
    let end = oldEnd;
    newEditorState = currentSpoilers.reduce((nextEditorState, prevSpoiler) => {
      newSelection = updateSelectionRange(selection.anchorKey, prevSpoiler, start, end);
      start = Math.min(newSelection.anchorOffset, start);
      end = Math.max(end, newSelection.focusOffset - 1);
      key = createNewSpoilerKey(
        selection.anchorKey,
        newSelection.anchorOffset,
        newSelection.focusOffset - 1
      );
      const nextContentState = Modifier.removeInlineStyle(
        nextEditorState.getCurrentContent(),
        newSelection,
        prevSpoiler
      );

      return EditorState.push(nextEditorState, nextContentState, 'change-inline-style');
    }, editorState);

    let contentState = newEditorState.getCurrentContent();
    if (
      newSelection.anchorOffset !== oldStart ||
      newSelection.focusOffset - 1 !== oldEnd ||
      !isActive
    ) {
      contentState = Modifier.applyInlineStyle(contentState, newSelection, `SPOILER_${key}`);
    }

    return { key, newEditorState, newSelection, contentState };
  }
};
