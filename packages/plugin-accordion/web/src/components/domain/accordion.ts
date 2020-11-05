import { EditorState } from 'wix-rich-content-editor-common';
import { COMPONENT_DATA, directions, EXPANDED, generateKey } from '../../defaults';
import { Store } from 'wix-rich-content-common';

type Pair = {
  key: string;
  title: EditorState;
  content: EditorState;
};

interface ComponentData {
  config: {
    expandState: string;
    direction: string;
    expandOnlyOne: boolean | undefined;
  };
  pairs: Pair[];
}

export class Accordion {
  componentData: ComponentData;
  store: Store;

  constructor(store: Store, componentData: ComponentData) {
    this.store = store;
    this.componentData = componentData;
  }

  getData = (): ComponentData => this.componentData;

  getConfig = (): ComponentData['config'] => this.getData().config;

  getPairs = (): Pair[] => this.getData().pairs;

  getPair = (idx: string): Pair => this.getPairs()[idx];

  getTitle = (idx: string): EditorState => this.getPair(idx).title || EditorState.createEmpty();

  getContent = (idx: string): EditorState => this.getPair(idx).content || EditorState.createEmpty();

  getDirection = (): string => this.getConfig().direction;

  changeDirection = () => {
    const direction = this.getDirection() === directions.LTR ? directions.RTL : directions.LTR;
    const updatedData = { config: { ...this.getConfig(), direction } };
    this.updateData(updatedData);
  };

  getExpandState = (): string => this.getConfig().expandState;

  setExpandState = (expandState: string) => {
    const updatedData = { config: { ...this.getConfig(), expandState } };

    if (expandState === EXPANDED) {
      updatedData.config.expandOnlyOne = undefined;
    }

    this.updateData(updatedData);
  };

  getExpandOnlyOne = (): boolean | undefined => this.getConfig().expandOnlyOne;

  toggleExpandOnlyOne = () => {
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

  setTitle = (idx: string, editorState: EditorState) => {
    const pair = this.getPair(idx);
    pair.title = editorState;
    this.updateData({ ...this.getData() });
  };

  setContent = (idx: string, editorState: EditorState) => {
    const pair = this.getPair(idx);
    pair.content = editorState;
    this.updateData({ ...this.getData() });
  };

  createNewPair = (): Pair => {
    return {
      key: generateKey(),
      title: EditorState.createEmpty(),
      content: EditorState.createEmpty(),
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
