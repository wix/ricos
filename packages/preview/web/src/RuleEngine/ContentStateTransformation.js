import ContentStateBuilder from '../ContentStateBuilder/ContentStateBuilder';
import getContentStateMetadata from '../ContentStateAnalyzer/ContentStateMetadata';

class ContentStateTransformation {
  constructor({ _if, _then, initialPreviewState }) {
    this._if = _if;
    this._then = _then;
    this.initialPreviewState = initialPreviewState;
  }

  apply(contentState) {
    const previewState = this.initialPreviewState || {};
    const previewStateBuilder = new ContentStateBuilder(previewState);
    const metadata = getContentStateMetadata(contentState);

    if (this._if(metadata)) {
      return this._then(metadata, previewStateBuilder);
    }
    return previewStateBuilder;
  }
}

export default ContentStateTransformation;
