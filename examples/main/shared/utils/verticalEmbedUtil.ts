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

const mockFetchVerticalEmbed = (vertical: string) => {
  return Promise.resolve(mockDataMap[vertical]);
};

export class MockVerticalSearchModule {
  items;

  constructor(verticalType: string) {
    this.items = mockFetchVerticalEmbed(verticalType);
  }
  search(searchInput: string) {
    return this.items.then(res =>
      res.filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase()))
    );
  }
}

export const MockGetIsVisiblePromise = (type: string, _locale: string) => {
  if (type === product) {
    return Promise.resolve(true);
  }

  return Promise.resolve(false);
};
