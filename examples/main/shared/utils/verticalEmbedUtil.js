import mockProductsData from './mockProductsData';
import mockEventsData from './mockEventsData';
import mockBookingsData from './mockBookingsData';
import { verticalEmbedProviders } from 'wix-rich-content-plugin-vertical-embed';

const { event, booking, product } = verticalEmbedProviders;
const mockDataMap = {
  [event]: mockEventsData,
  [booking]: mockBookingsData,
  [product]: mockProductsData,
};

const mockFetchVerticalEmbed = vertical => {
  return Promise.resolve(mockDataMap[vertical]);
};

export class MockVerticalSearchModule {
  constructor(verticalType, instance) {
    this.items = mockFetchVerticalEmbed(verticalType);
  }
  search(searchInput) {
    return this.items.then(res =>
      res.filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase()))
    );
  }
}

export const MockIsVisiblePromise = (type, locale) => {
  if (type === product) {
    return Promise.resolve(true);
  }

  return Promise.resolve(false);
};
