import {
  DraftContent,
  RicosContentConvertor,
  DraftContentConvertor,
  PlainTextConvertor,
} from '../../types';

import { RichContent } from 'ricos-schema';

export declare class ProxyConvertor {
  constructor(endpoint: string);
}

export class ProxyRicosConvertor implements ProxyConvertor, RicosContentConvertor {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  toRicos(content: DraftContent) {}
}

export class ProxyDraftConvertor implements ProxyConvertor, DraftContentConvertor {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  toDraft(content: RichContent) {}
}

export class ProxyPlainTextConvertor implements ProxyConvertor, PlainTextConvertor {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  toPlainText(content: RichContent) {}
}
