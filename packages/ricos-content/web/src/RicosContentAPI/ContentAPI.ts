import { ContentBuilder, ContentExtractor } from '../types/content-api';
import {
  DraftContentConvertor,
  RicosContentContvertor,
  PlainTextConvertor,
} from '../types/contentTypes';
type ContentAPIDeps = {
  builder: ContentBuilder;
  extractor: ContentExtractor;
  convertors: DraftContentConvertor & RicosContentContvertor & PlainTextConvertor;
};

export class ContentAPI implements ContentBuilder, ContentExtractor {
  builder: ContentBuilder;
  extractor: ContentExtractor;
  convertors: DraftContentConvertor & RicosContentContvertor & PlainTextConvertor;
  constructor(deps: ContentAPIDeps) {
    this.builder = deps.builder;
    this.extractor = deps.extractor;
    this.convertors = deps.convertors;
  }

  addImage(data) {
    this.builder.addImage(data);
  }

  addDivider(data) {
    this.builder.addDivider(data);
  }

  getImages() {
    return this.extractor.getImages();
  }

  getDividers() {
    return this.extractor.getDividers();
  }

  toDraft() {
    return this.convertors.toDraft();
  }

  toRicos() {
    return this.convertors.toRicos();
  }

  toPlainText() {
    return this.convertors.toPlainText();
  }
}
