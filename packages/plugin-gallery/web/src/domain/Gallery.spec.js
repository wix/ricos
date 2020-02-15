import Gallery from './Gallery';
import { DEFAULTS, BASE_MOBILE_STYLES, sampleItems } from '../constants';
import { convertItemData } from '../helpers/convert-item-data';
const itemsExample = [
  {
    metadata: {
      height: 1060,
      width: 2560,
      link: {
        url: 'www.wix.com',
        target: '_top',
      },
      title: 'this is title',
    },
    itemId: 'a27d24_346eb94e9ceb4512b6fe8fdd629ee442~mv2.jpg',
    url: 'a27d24_346eb94e9ceb4512b6fe8fdd629ee442~mv2.jpg',
    selected: false,
  },
  {
    metadata: {
      height: 400,
      width: 870,
      link: null,
      title: 'title it is',
    },
    itemId: 'a27d24_9fc76dfecb75438e939c43077c8ab6ba~mv2.jpg',
    url: 'a27d24_9fc76dfecb75438e939c43077c8ab6ba~mv2.jpg',
    selected: true,
  },
  {
    metadata: {
      height: 320,
      width: 760,
    },
    itemId: 'a27d24_2d3bb3c3a75e48c3bac3f82dbc02d4c1~mv2.jpg',
    url: 'a27d24_2d3bb3c3a75e48c3bac3f82dbc02d4c1~mv2.jpg',
    selected: false,
  },
];

const stylesExamples = {
  galleryLayout: 3,
};

const getComponentData = ({ items, styles } = {}) => ({
  items,
  styles,
  config: {
    alignment: 'center',
    size: 'content',
    layout: 'small',
    spacing: 0,
  },
});
describe('Gallery Domain', () => {
  it('Should return sample items', () => {
    const gallery = new Gallery(getComponentData());
    expect(gallery.items).toEqual(sampleItems);
  });

  it('Should return non-empty items', () => {
    const gallery = new Gallery(getComponentData({ items: itemsExample }));
    expect(gallery.items).toEqual(convertItemData({ items: itemsExample }));
  });

  it('Should render default styles', () => {
    const gallery = new Gallery(getComponentData());
    expect(gallery.styleParams).toEqual({ ...DEFAULTS.styles, allowHover: true });
  });

  it('Should render non-default styles', () => {
    const gallery = new Gallery(getComponentData({ styles: stylesExamples }));
    expect(gallery.styleParams).toEqual({
      ...DEFAULTS.styles,
      ...stylesExamples,
      allowHover: true,
    });
  });

  it('Should render mobile styles', () => {
    const componetData = getComponentData({ styles: stylesExamples, items: itemsExample });
    const gallery = new Gallery(componetData, { isMobile: true });
    expect(gallery.styleParams).toEqual({
      ...DEFAULTS.styles,
      ...stylesExamples,
      ...BASE_MOBILE_STYLES,
    });
  });
});
