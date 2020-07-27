import { RicosContent } from 'wix-rich-content-common';

export interface PreviewRule {
  _if: unknown;
  _then: unknown;
}

export interface ContentStateTransformation {
  apply: (content: RicosContent) => RicosContent;
  rule: (ruleProps: PreviewRule) => ContentStateTransformation;
  toObject: () => unknown;
}

export interface PreviewSettings {
  transformation?: ContentStateTransformation;
  contentInteractionMappers?: unknown;
  onPreviewExpand?: () => void;
}
