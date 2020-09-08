export class Accordion {
  constructor(store, block, componentData) {
    this.store = store;
    this.block = block;
    //initiate store
    this.store.set('componentData', componentData, block.getKey());
  }

  getData = () => this.store.get('componentData');

  setData = data => this.store.set('componentData', data, this.block.getKey());

  updateData = data => this.store.update('componentData', data, this.block.getKey());

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
}
