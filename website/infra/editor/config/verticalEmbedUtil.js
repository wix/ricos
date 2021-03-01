import mockProductsData from './mockProductsData';
import mockEventsData from './mockEventsData';
import mockBookingsData from './mockBookingsData';
import { verticalEmbedProviders } from 'ricos/vertical-embed/editor';

const { event, booking, product } = verticalEmbedProviders;
const mockDataMap = {
  [event]: mockEventsData,
  [booking]: mockBookingsData,
  [product]: mockProductsData,
};

export const mockFetchVerticalEmbedFunc = vertical => {
  return () => Promise.resolve(mockDataMap[vertical]);
};
