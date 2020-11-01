import { isFunction } from 'lodash';
import ContentStateBuilder from '../ContentStateBuilder/ContentStateBuilder';
import getContentStateMetadata from '../ContentStateAnalyzer/ContentStateMetadata';
import { RicosContent } from '../../types/contentTypes';
import { PreviewRule } from '../types';

interface Constructor extends PreviewRule {
  initialPreviewState?: RicosContent;
}
class ContentStateTransformation {
  rules: PreviewRule[];
  previewState?: RicosContent;

  constructor({ _if, _then, initialPreviewState }: Constructor) {
    this.rules = [];
    this.rule({ _if, _then });
    this.previewState = initialPreviewState;
  }

  rule({ _if, _then }: PreviewRule) {
    if (!isFunction(_if) || !isFunction(_then)) {
      throw new TypeError('invalid rule added: `_if` and `_then` should be functions ');
    }
    this.rules.push({ _if, _then });
    return this;
  }

  apply(contentState: RicosContent) {
    const previewStateBuilder = new ContentStateBuilder(this.previewState);
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

// TODO: Should be removed & extracted from the original class type (using typedef / equivalent).
// It doesn't work atm, probably due to tsconfig definitions.
export interface IContentStateTransformation {
  rules: PreviewRule[];
  previewState?: RicosContent;
  rule: (previewRule: PreviewRule) => ContentStateTransformation;
  apply: (contentState: RicosContent) => RicosContent;
  toObject: () => { _if: string; _then: string }[];
}

export default ContentStateTransformation;
