import { isFunction } from 'lodash';
import ContentStateBuilder from '../ContentStateBuilder/ContentStateBuilder';
import getContentStateMetadata from '../ContentStateAnalyzer/ContentStateMetadata';
import { RicosContent } from 'wix-rich-content-common';
import { ContentStateMetadata, Preview } from '../types';

interface constructor {
  _if: (metadata: ContentStateMetadata) => boolean;
  _then: (metadata: ContentStateMetadata, preview: Preview) => void;
  initialPreviewState?: RicosContent;
}
class ContentStateTransformation {
  rules: { _if; _then }[];
  previewState?: RicosContent;

  constructor({ _if, _then, initialPreviewState }: constructor) {
    this.rules = [];
    this.rule({ _if, _then });
    this.previewState = initialPreviewState;
  }

  rule({ _if, _then }) {
    if (!isFunction(_if) || !isFunction(_then)) {
      throw new TypeError('invalid rule added: `_if` and `_then` should be functions ');
    }
    this.rules.push({ _if, _then });
    return this;
  }

  apply(contentState: RicosContent) {
    const previewState = this.previewState || {};
    const previewStateBuilder = new ContentStateBuilder(previewState);
    const metadata = getContentStateMetadata(contentState);
    const appliedRuleBuilder = this.rules.reduce((builder, rule) => {
      if (rule._if(metadata)) {
        return rule._then(metadata, builder);
      }
      return builder;
    }, previewStateBuilder);
    return appliedRuleBuilder.get();
  }

  toObject() {
    return this.rules.map(rule => ({
      _if: rule._if.toString(),
      _then: rule._then.toString(),
    }));
  }
}

export default ContentStateTransformation;
