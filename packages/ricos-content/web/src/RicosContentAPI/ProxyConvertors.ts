import {
  DraftContent,
  RicosContentConvertor,
  DraftContentConvertor,
  PlainTextConvertor,
  ConversionService,
} from '../types';

import { RichContent } from 'ricos-schema';

export declare class ProxyConvertor<S, T> {
  constructor(conversionService: ConversionService<S, T>);

  configureService(endpoint: string): void;
}

export class ProxyRicosConvertor
  implements ProxyConvertor<DraftContent, RichContent>, RicosContentConvertor {
  conversionService: ConversionService<DraftContent, RichContent>;

  constructor(conversionService: ConversionService<DraftContent, RichContent>) {
    this.conversionService = conversionService;
  }

  configureService(endpoint: string) {
    this.conversionService.configure(endpoint);
  }

  toRicos(content: DraftContent) {
    return this.conversionService.convert(content);
  }
}

export class ProxyDraftConvertor
  implements ProxyConvertor<RichContent, DraftContent>, DraftContentConvertor {
  conversionService: ConversionService<RichContent, DraftContent>;

  constructor(conversionService: ConversionService<RichContent, DraftContent>) {
    this.conversionService = conversionService;
  }

  configureService(endpoint: string) {
    this.conversionService.configure(endpoint);
  }

  toDraft(content: RichContent) {
    return this.conversionService.convert(content);
  }
}

export class ProxyPlainTextConvertor
  implements ProxyConvertor<RichContent, string>, PlainTextConvertor {
  conversionService: ConversionService<RichContent, string>;

  constructor(conversionService: ConversionService<RichContent, string>) {
    this.conversionService = conversionService;
  }

  configureService(endpoint: string) {
    this.conversionService.configure(endpoint);
  }

  toPlainText(content: RichContent) {
    return this.conversionService.convert(content);
  }
}
