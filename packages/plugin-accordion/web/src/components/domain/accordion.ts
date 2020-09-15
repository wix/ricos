import { EditorState, convertToRaw } from 'wix-rich-content-editor';
import { Store } from 'wix-rich-content-common';
import { ContentState, ContentBlock } from 'wix-rich-content-editor-common';
import { COMPONENT_DATA, generateKey } from '../../defaults';

interface Pair {
  key: string;
  title: ContentState;
  content: ContentState;
}

interface ComponentData {
  config: { expandState: string; iconStyle: string; direction: string; expandOneOnly: boolean };
  pairs: Pair[];
}

export class Accordion {
  componentData: ComponentData;
  store: Store;
  blockKey: string;

  constructor(store: Store, block: ContentBlock, componentData: ComponentData) {
    this.store = store;
    this.blockKey = block.getKey();
    this.componentData = componentData;
  }

  getData = () => this.componentData;

  getPairs = () => this.getData().pairs;

  getPair = (idx: string) => this.getPairs()[idx];

  getTitle = (idx: string) => this.getPair(idx).title;

  getContent = (idx: string) => this.getPair(idx).content;

  getDirection = () => this.getData().config.direction;

  setData = (data: ComponentData) => {
    this.store.set(COMPONENT_DATA, data);
  };

  updateData = data => {
    const componentData = this.getData();
    this.setData({ ...componentData, ...data });
  };

  setTitle = (idx: string, contentState: ContentState) => {
    const pair = this.getPair(idx);
    pair.title = contentState;
    this.updateData({ ...this.getData() });
  };

  setContent = (idx: string, contentState: ContentState) => {
    const pair = this.getPair(idx);
    pair.content = contentState;
    this.updateData({ ...this.getData() });
  };

  createNewPair = () => {
    return {
      key: generateKey(),
      title: convertToRaw(EditorState.createEmpty().getCurrentContent()),
      content: convertToRaw(EditorState.createEmpty().getCurrentContent()),
    };
  };

  insertNewPair = () => {
    const pairs = this.getPairs();
    this.updateData({ pairs: [...pairs, this.createNewPair()] });
  };

  reorderPairs = (startIdx: number, endIdx: number) => {
    const pairs = this.getPairs();
    const [pairToMove] = pairs.splice(startIdx, 1);
    pairs.splice(endIdx, 0, pairToMove);

    this.updateData({ pairs });
  };

  deletePair = (pairIndex: number) => {
    const pairs = this.getPairs();
    pairs.splice(pairIndex, 1);

    this.updateData({ pairs });
  };
}
