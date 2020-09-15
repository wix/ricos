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

  getPair = idx => this.getPairs()[idx];

  getTitle = idx => this.getPair(idx).title;

  getContent = idx => this.getPair(idx).content;

  getDirection = () => this.getData().config.direction;

  setData = data => {
    this.store.set(COMPONENT_DATA, data);
  };

  updateData = data => {
    const componentData = this.getData();
    this.setData({ ...componentData, ...data });
  };

  setTitle = (idx, value) => {
    const pair = this.getPair(idx);
    pair.title = value;
    this.updateData({ ...this.getData() });
  };

  setContent = (idx, value) => {
    const pair = this.getPair(idx);
    pair.content = value;
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

  reorderPairs = (startIdx, endIdx) => {
    const pairs = this.getPairs();
    const [pairToMove] = pairs.splice(startIdx, 1);
    pairs.splice(endIdx, 0, pairToMove);

    this.updateData({ pairs });
  };

  deletePair = pairIndex => {
    const pairs = this.getPairs();
    pairs.splice(pairIndex, 1);

    this.updateData({ pairs });
  };
}
