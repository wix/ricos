import { EditorState, convertToRaw } from 'wix-rich-content-editor';
const COMPONENT_DATA = 'componentData';

const convertArrayToObject = array => {
  let idx = 0;
  return array.reduce((res, pair) => {
    return {
      ...res,
      [++idx]: pair[1],
    };
  }, {});
};

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

  getPair = id => this.getPairs()[id];

  getTitle = id => this.getPair(id).title;

  setTitle = (id, value) => {
    const pair = this.getPair(id);
    pair.title = value;
    this.setData({ ...this.getData() });
  };

  getContent = id => this.getPair(id).content;

  setContent = (id, value) => {
    const pair = this.getPair(id);
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
    const id = Object.keys(pairs).length + 1;

    const updatedComponentData = {
      ...componentData,
      pairs: { ...pairs, [id]: this.createNewPair() },
    };
    this.setData(updatedComponentData);
  };

  deletePair = pairIndex => {
    const componentData = this.getData();
    const pairs = this.getPairs();
    const pairsArray = Object.entries(pairs);
    pairsArray.splice(pairIndex, 1);

    const updatedComponentData = { ...componentData, pairs: convertArrayToObject(pairsArray) };
    this.setData(updatedComponentData);
  };

  reorderPairs = (startIdx, endIdx) => {
    const componentData = this.getData();
    const pairs = this.getPairs();
    const reorderedPairs = Object.entries(pairs);
    const [pairToMove] = reorderedPairs.splice(startIdx, 1);
    reorderedPairs.splice(endIdx, 0, pairToMove);

    const updatedComponentData = { ...componentData, pairs: convertArrayToObject(reorderedPairs) };
    this.setData(updatedComponentData);
  };
}
