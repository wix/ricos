import { EditorChangeTypes } from 'wix-rich-content-common';
import { EditorState, ContentState } from 'wix-rich-content-editor-common';
import EditorBidiService from 'draft-js/lib/EditorBidiService';

interface commandManager {
  onChange: (editorState?: EditorState, lastChangeType?: EditorChangeTypes) => EditorState;
  undo: (editorState: EditorState) => EditorState | undefined;
  redo: (editorState: EditorState) => EditorState | undefined;
}

class Stack<T> {
  elements: T[] = [];
  capacity: number;

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  push(element: T): void {
    if (this.elements.length === this.capacity) {
      this.elements.shift();
    }
    this.elements.push(element);
  }

  peek(): T | undefined {
    return this.elements[this.elements.length - 1];
  }

  pop(): T | undefined {
    return this.elements.pop();
  }

  isEmpty(): boolean {
    return this.elements.length === 0;
  }
}

function createNewEditorState(
  editorState: EditorState,
  newContent: ContentState,
  lastChangeType: EditorChangeTypes
) {
  const directionMap = EditorBidiService.getDirectionMap(newContent, editorState.getDirectionMap());
  const currentContent = editorState.getCurrentContent();
  return EditorState.set(editorState, {
    currentContent: newContent,
    directionMap,
    forceSelection: true,
    inlineStyleOverride: null,
    nativelyRenderedContent: null,
    selection:
      lastChangeType === EditorChangeTypes.UNDO
        ? currentContent.getSelectionBefore()
        : currentContent.getSelectionAfter(),
  });
}

export class UndoRedoManager implements commandManager {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentContent: ContentState;
  undoStack: Stack<ContentState> = new Stack<ContentState>(100);
  redoStack: Stack<ContentState> = new Stack<ContentState>(100);

  constructor(editorState: EditorState) {
    this.currentContent = editorState.getCurrentContent();
  }

  private shouldUpdateState(editorState: EditorState, lastChangeType: EditorChangeTypes): boolean {
    const newContent = editorState.getCurrentContent();
    return (
      this.currentContent !== newContent &&
      (editorState.getSelection() !== newContent.getSelectionAfter() ||
        lastChangeType !== EditorChangeTypes.GENERAL)
    );
  }

  onChange(editorState: EditorState, lastChangeType: EditorChangeTypes): EditorState {
    if (this.shouldUpdateState(editorState, lastChangeType)) {
      if ([EditorChangeTypes.UNDO, EditorChangeTypes.REDO].indexOf(lastChangeType) === -1) {
        this.undoStack.push(this.currentContent);
        this.redoStack = new Stack<ContentState>(100);
      }
      this.currentContent = editorState.getCurrentContent();
      this.currentContent = <
        ContentState // eslint-disable-next-line keyword-spacing
      >(<unknown>this.currentContent.set('selectionBefore', editorState.getSelection()));
      return createNewEditorState(editorState, this.currentContent, lastChangeType);
    }
    return editorState;
  }

  undo(editorState: EditorState): EditorState | undefined {
    const newContent = this.undoStack.pop();
    if (newContent) {
      this.redoStack.push(editorState.getCurrentContent());
      return createNewEditorState(editorState, newContent, EditorChangeTypes.UNDO);
    }
  }

  redo(editorState: EditorState): EditorState | undefined {
    const newContent = this.redoStack.pop();
    if (newContent) {
      this.undoStack.push(editorState.getCurrentContent());
      return createNewEditorState(editorState, newContent, EditorChangeTypes.REDO);
    }
  }

  isUndoStackEmpty(): boolean {
    return this.undoStack.isEmpty();
  }

  isRedoStackEmpty(): boolean {
    return this.redoStack.isEmpty();
  }
}
