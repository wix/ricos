import { ContentBuilder, ContentExtractor } from '../types/content-api';
import { Convertors } from '../types';
import { RichContent, ImageData, DividerData, ParagraphData, TextData } from 'ricos-schema';

type ContentAPIDeps = {
  builder: ContentBuilder;
  extractor: ContentExtractor;
  convertors: Convertors;
};

export class ContentAPI implements ContentBuilder, ContentExtractor, Convertors {
  builder: ContentBuilder;

  extractor: ContentExtractor;

  convertors: Convertors;

  content: RichContent;

  constructor(deps: ContentAPIDeps) {
    this.builder = deps.builder;
    this.extractor = deps.extractor;
    this.convertors = deps.convertors;
  }

  addImage(data: ImageData) {
    this.content = this.builder.addImage(data, this.content);
    return this.content;
  }

  addDivider(data: DividerData) {
    this.content = this.builder.addDivider(data, this.content);
    return this.content;
  }

  addParagraph(text: string | TextData, data: ParagraphData) {
    this.content = this.builder.addParagraph(text, data, this.content);
    return this.content;
  }

  getImages() {
    return this.extractor.getImages(this.content);
  }

  getDividers() {
    return this.extractor.getDividers(this.content);
  }

  getParagraphs() {
    return this.extractor.getParagraphs(this.content);
  }

  toDraft() {
    return this.convertors.toDraft(this.content);
  }

  toRicos() {
    return Promise.resolve(this.content);
  }

  toPlainText() {
    return this.convertors.toPlainText(this.content);
  }
}
