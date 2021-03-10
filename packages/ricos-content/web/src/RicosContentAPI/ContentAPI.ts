import { ContentBuilder, ContentExtractor } from '../types/content-api';
import { RichContent, ImageData, DividerData, ParagraphData, TextData } from 'ricos-schema';

type ContentAPIDeps = {
  builder: ContentBuilder;
  extractor: ContentExtractor;
};

export class ContentAPI implements ContentBuilder, ContentExtractor {
  builder: ContentBuilder;

  extrator: ContentExtractor;

  content: RichContent = { nodes: [] };

  constructor(deps: ContentAPIDeps) {
    this.builder = deps.builder;
    this.extractor = deps.extractor;
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
}
