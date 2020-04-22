import { isFunction } from 'lodash';
import ContentStateBuilder from '../ContentStateBuilder/ContentStateBuilder';
import getContentStateMetadata from '../ContentStateAnalyzer/ContentStateMetadata';

class ContentStateTransformation {
  constructor({ _if, _then, initialPreviewState }) {
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

  apply(contentState) {
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
