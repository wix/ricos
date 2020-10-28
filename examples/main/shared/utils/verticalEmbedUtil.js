import mockProductsData from './mockProductsData';
import mockEventsData from './mockEventsData';
import mockBookingsData from './mockBookingsData';
import mockSlimProductsData from './mockProductsData';
import mockSlimEventsData from './mockEventsData';
import mockSlimBookingsData from './mockBookingsData';
import { verticalEmbedProviders } from 'wix-rich-content-plugin-vertical-embed';

const { event, booking, product } = verticalEmbedProviders;
const mockDataMap = {
  [event]: mockEventsData,
  [booking]: mockBookingsData,
  [product]: mockProductsData,
};

const mockSlimDataMap = {
  [event]: mockSlimEventsData,
  [booking]: mockSlimBookingsData,
  [product]: mockSlimProductsData,
};

const mockFetchVerticalEmbed = (vertical, slim = false) => {
  return slim ? Promise.resolve(mockSlimDataMap[vertical]) : Promise.resolve(mockDataMap[vertical]);
};

export default class MockVerticalSearchModule {
  constructor(verticalType, slim = false, instance) {
    this.items = mockFetchVerticalEmbed(verticalType, slim);
  }
  search(searchInput) {
    return this.items.then(res =>
      res.filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase()))
    );
  }
}
