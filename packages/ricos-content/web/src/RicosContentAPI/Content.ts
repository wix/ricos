import { ContentAPI } from './ContentAPI';
import { RicosContentBuilder } from './ContentBuilder';
import { RicosContentExtractor } from './ContentExtractor';

export type ContentAPIConfig = {
  generateKey: () => string;
};

// content API IoC container
// initializes ContentAPI with dependencies: builder, extractor
export function setupContentAPI(config: ContentAPIConfig) {
  const builder = new RicosContentBuilder(config.generateKey);
  const extractor = new RicosContentExtractor();

  const api = new ContentAPI({ builder, extractor });
  return api;
}
