import { setupContentExtractor } from './RicosContentExtractor';
import { setupContentBuilder } from './RicosContentBuilder';
import { ContentBuilder, ContentExtractor } from '../types';

export type ContentAPIConfig = {
  generateKey: () => string;
};

const delegateApiToDependencies = (Class, dependencies) => {
  Object.entries(dependencies).forEach(([depName, depInstance]) => {
    Object.getOwnPropertyNames(Object.getPrototypeOf(depInstance)).forEach(methodName => {
      Class.prototype[methodName] = function(args) {
        return this[depName][methodName](args);
      };
    });
  });
};

// content API IoC container
// initializes ContentAPI with dependencies: builder, extractor
export function setupContentAPI(config: ContentAPIConfig): ContentExtractor & ContentBuilder {
  const { RicosContentBuilder } = setupContentBuilder(config.generateKey);
  const builder = new RicosContentBuilder();
  const { RicosContentExtractor } = setupContentExtractor();
  const extractor = new RicosContentExtractor();

  class ContentAPI {
    extractor: ContentExtractor;

    builder: ContentBuilder;

    constructor({ extractor, builder }) {
      this.extractor = extractor;
      this.builder = builder;
    }
  }

  delegateApiToDependencies(ContentAPI, { builder, extractor });

  const api = new ContentAPI({ builder, extractor });
  return (api as unknown) as ContentBuilder & ContentExtractor;
}
