import { isString } from 'lodash';
import { generateKey } from 'wix-rich-content-common';
import { ContentAPI } from './ContentAPI';
import { ContentBuilder } from './ContentBuilder';
import { ContentExtractor } from './ContentExtractor';
import {
  ProxyPlainTextConvertor,
  ProxyDraftConvertor,
  ProxyRicosConvertor,
} from './ProxyConvertors';
import { PlainTextConvertor, RicosContentContvertor, DraftContentConvertor } from '../types';

export type ContentAPIConfig = {
  convertors: {
    // TODO: use URL instead of string?
    toPlainText: PlainTextConvertor | string;
    toDraft: DraftContentConvertor | string;
    toRicos: RicosContentContvertor | string;
  };
};

const ProxyConvertors = {
  toPlainText: ProxyPlainTextConvertor,
  toDraft: ProxyDraftConvertor,
  toRicos: ProxyRicosConvertor,
};

// content API IoC container
// initializes ContentAPI with dependencies: builder, extractor, convertors
export function setupContentAPI(config: ContentAPIConfig) {
  const builder = new ContentBuilder(generateKey);
  const extractor = new ContentExtractor();
  const convertors = Object.entries(config.convertors).reduce((convertorList, [key, value]) => {
    if (isString(value)) {
      convertorList[key] = new ProxyConvertors[key](value);
    } else {
      convertorList[key] = value;
    }
    return convertorList;
  }, {});

  const api = new ContentAPI({ builder, extractor, convertors });
  return api;
}
