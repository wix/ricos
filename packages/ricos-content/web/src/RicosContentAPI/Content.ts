import { isString } from 'lodash';
import { RichContent } from 'ricos-schema';
import { ContentAPI } from './ContentAPI';
import { RicosContentBuilder } from './ContentBuilder';
import { RicosContentExtractor } from './ContentExtractor';
import {
  ProxyPlainTextConvertor,
  ProxyDraftConvertor,
  ProxyRicosConvertor,
} from './ProxyConvertors';
import { ConversionServiceClient } from './ConversionService';
import {
  PlainTextConvertor,
  RicosContentConvertor,
  DraftContentConvertor,
  DraftContent,
  Convertors,
} from '../types';

export type ContentAPIConfig = {
  generateKey: () => string;
  convertors: {
    toPlainText: PlainTextConvertor | string;
    toDraft: DraftContentConvertor | string;
    toRicos: RicosContentConvertor | string;
  };
};

const ProxyConvertors = {
  toPlainText: new ProxyPlainTextConvertor(new ConversionServiceClient<RichContent, string>()),
  toDraft: new ProxyDraftConvertor(new ConversionServiceClient<RichContent, DraftContent>()),
  toRicos: new ProxyRicosConvertor(new ConversionServiceClient<DraftContent, RichContent>()),
};

// content API IoC container
// initializes ContentAPI with dependencies: builder, extractor, convertors
export function setupContentAPI(config: ContentAPIConfig) {
  const builder = new RicosContentBuilder(config.generateKey);
  const extractor = new RicosContentExtractor();
  const convertors = Object.entries(config.convertors).reduce((convertorList, [key, value]) => {
    if (isString(value)) {
      const convertor = ProxyConvertors[key];
      convertor.configure(value);
      convertorList[key] = convertor;
    } else {
      convertorList[key] = value;
    }
    return convertorList;
  }, {}) as Convertors;

  const api = new ContentAPI({ builder, extractor, convertors });
  return api;
}
