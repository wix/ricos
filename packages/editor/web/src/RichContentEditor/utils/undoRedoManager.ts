import { debounce, isEqual } from 'lodash';
import { EditorState, ContentState } from 'wix-rich-content-editor-common';
import { SetEditorState } from 'wix-rich-content-common';
interface Command {
  execute: (arg?: EditorState) => void;
}

interface commandManager extends Command {
  undo: () => void;
  redo: () => void;
}

function isNonEmptyStack<T>(stack: Stack<T>): stack is NonEmptyStack<T> {
  return !stack.isEmpty();
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

  clear(): void {
    this.elements = [];
  }
}

interface NonEmptyStack<T> extends Stack<T> {
  pop: () => T;
}

function createNewEditorState(
  editorState: EditorState,
  newContent: ContentState,
  lastChangeType: string
) {
  return EditorState.set(editorState, {
    currentContent: newContent,
    forceSelection: true,
    inlineStyleOverride: null,
    lastChangeType,
    nativelyRenderedContent: null,
    selection: editorState.getCurrentContent().getSelectionBefore(),
  });
}

export default class UndoRedoManager implements commandManager {
  editorState: EditorState;
  setEditorState: SetEditorState;
  undoStack: Stack<ContentState> = new Stack<ContentState>(100);
  redoStack: Stack<ContentState> = new Stack<ContentState>(100);

  constructor(initialContent: EditorState, setEditorState: SetEditorState) {
    this.setEditorState = setEditorState;
    this.editorState = initialContent;
  }

  private shouldUpdateState(newEditorState: EditorState): boolean {
    const currentState = this.editorState.getCurrentContent().toJS();
    const newState = newEditorState.getCurrentContent().toJS();
    return (
      !['undo', 'redo'].includes(newEditorState.getLastChangeType()) &&
      (!isEqual(currentState.blockMap, newState.blockMap) ||
        !isEqual(newState.entityMap, currentState.entityMap))
    );
  }

  execute = debounce((editorState: EditorState) => {
    if (this.shouldUpdateState(editorState)) {
      this.undoStack.push(this.editorState.getCurrentContent());
      this.editorState = editorState;
      this.redoStack.clear();
    }
  }, 100);

  undo() {
    if (isNonEmptyStack(this.undoStack)) {
      this.redoStack.push(this.editorState.getCurrentContent());
      this.editorState = createNewEditorState(this.editorState, this.undoStack.pop(), 'undo');
      this.setEditorState(this.editorState);
    }
  }

  redo() {
    if (isNonEmptyStack(this.redoStack)) {
      this.undoStack.push(this.editorState.getCurrentContent());
      this.editorState = createNewEditorState(this.editorState, this.redoStack.pop(), 'redo');
      this.setEditorState(this.editorState);
    }
  }

  isUndoStackEmpty(): boolean {
    return this.undoStack.isEmpty();
  }

  isRedoStackEmpty(): boolean {
    return this.redoStack.isEmpty();
  }
}
