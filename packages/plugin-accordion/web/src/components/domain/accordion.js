import { EditorState, convertToRaw } from 'wix-rich-content-editor';
const COMPONENT_DATA = 'componentData';

export class Accordion {
  constructor(store, block, componentData) {
    this.store = store;
    this.blockKey = block.getKey();
    this.componentData = componentData;
  }

  getData = () => this.componentData;

  setData = data => {
    this.store.set(COMPONENT_DATA, data, this.blockKey);
  };

  getPairs = () => this.getData().pairs;

  getPair = idx => this.getPairs()[idx];

  getTitle = idx => this.getPair(idx).title;

  setTitle = (idx, value) => {
    const pair = this.getPair(idx);
    pair.title = value;
    this.setData({ ...this.getData() });
  };

  getContent = idx => this.getPair(idx).content;

  setContent = (idx, value) => {
    const pair = this.getPair(idx);
    pair.content = value;
    this.setData({ ...this.getData() });
  };

  getDirection = () => this.getData().config.direction;

  createNewPair = () => {
    return {
      title: convertToRaw(EditorState.createEmpty().getCurrentContent()),
      content: convertToRaw(EditorState.createEmpty().getCurrentContent()),
    };
  };

  insertNewPair = () => {
    const componentData = this.getData();
    const pairs = this.getPairs();

    const updatedComponentData = {
      ...componentData,
      pairs: [...pairs, this.createNewPair()],
    };
    this.setData(updatedComponentData);
  };

  deletePair = pairIndex => {
    const componentData = this.getData();
    const pairs = this.getPairs();
    pairs.splice(pairIndex, 1);

    const updatedComponentData = { ...componentData, pairs };
    this.setData(updatedComponentData);
  };

  reorderPairs = (startIdx, endIdx) => {
    const componentData = this.getData();
    const pairs = this.getPairs();
    const [pairToMove] = pairs.splice(startIdx, 1);
    pairs.splice(endIdx, 0, pairToMove);

    const updatedComponentData = { ...componentData, pairs };
    this.setData(updatedComponentData);
  };
}
