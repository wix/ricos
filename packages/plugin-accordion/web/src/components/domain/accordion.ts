import { EditorState, convertToRaw } from 'wix-rich-content-editor';
import { COMPONENT_DATA, directions, EXPANDED, generateKey } from '../../defaults';
import { Store } from 'wix-rich-content-common';
import { ContentState } from 'wix-rich-content-editor-common';

export interface Pair {
  key: number;
  title: ContentState;
  content: ContentState;
}

export interface ComponentData {
  config: { expandState: string; iconStyle: string; direction: string; expandOnlyOne: boolean };
  pairs: Pair[];
}

export class Accordion {
  componentData: ComponentData;
  store: Store;

  constructor(store: Store, componentData: ComponentData) {
    this.store = store;
    this.componentData = componentData;
  }

  getData = () => this.componentData;

  getConfig = () => this.getData().config;

  getPairs = () => this.getData().pairs;

  getPair = (idx: string) => this.getPairs()[idx];

  getTitle = (idx: string) => this.getPair(idx).title;

  getContent = (idx: string) => this.getPair(idx).content;

  getDirection = () => this.getConfig().direction;

  changeDirection = () => {
    const direction = this.getDirection() === directions.LTR ? directions.RTL : directions.LTR;
    const updatedData = { config: { ...this.getConfig(), direction } };
    this.updateData(updatedData);
  };

  getExpandState = () => this.getConfig().expandState;

  setExpandState = (expandState: string) => {
    let updatedData;

    if (expandState === EXPANDED) {
      updatedData = {
        config: { ...this.getConfig(), expandState, expandOnlyOne: undefined },
      };
    } else {
      updatedData = { config: { ...this.getConfig(), expandState } };
    }

    this.updateData(updatedData);
  };

  getExpandOnlyOne = () => this.getConfig().expandOnlyOne;

  changeExpandOnlyOne = () => {
    const updatedData = {
      config: { ...this.getConfig(), expandOnlyOne: !this.getExpandOnlyOne() },
    };
    this.updateData(updatedData);
  };

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
