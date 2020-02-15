import { DEFAULTS, BASE_MOBILE_STYLES, sampleItems } from '../constants';
import { convertItemData } from '../helpers/convert-item-data';

export default class Gallery {
  constructor(componentData, { isMobile, anchorTarget, relValue, disableHoverDefault } = {}) {
    const { items, styles } = componentData;
    this.items = this.getItems(items || DEFAULTS.items, anchorTarget, relValue);
    this.isMobile = isMobile;
    this.disableHoverDefault = disableHoverDefault;
    this.styleParams = this.getStyleParams({ ...DEFAULTS.styles, ...(styles || {}) });
  }

  getItems = (items, anchorTarget, relValue) => {
    if (items.length > 0) {
      return convertItemData({ items, anchorTarget, relValue });
    } else {
      return sampleItems;
    }
  };

  hasTitle = () => {
    return this.items.some(item => {
      return item.metadata && item.metadata.title;
    });
  };

  getStyleParams = styles => {
    if (!this.isMobile) {
      return { ...styles, allowHover: true };
    }
    if (this.disableHoverDefault || !this.hasTitle) {
      return styles;
    }

    return {
      ...styles,
      ...BASE_MOBILE_STYLES,
    };
  };
}
