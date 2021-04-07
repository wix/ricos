import React, { Component } from 'react';
import { RichContentViewer, RichContentViewerProps } from 'wix-rich-content-viewer';
import { mergeStyles, DraftContent } from 'wix-rich-content-common';
import { interactionMap } from '../Interactions/interactionMap';
import { defaultTransformation } from './default-transformation';
import { ContentStateTransformation } from 'ricos-content/libs/preview';
import styles from '../../statics/styles/preview.scss';
import { merge } from 'lodash';

interface Props extends RichContentViewerProps {
  transformation: ContentStateTransformation;
  initialState: DraftContent;
}

interface State {
  isPreviewExpanded: boolean;
}

class RichContentPreview extends Component<Props, State> {
  static defaultProps = {
    transformation: defaultTransformation,
  };

  styles: Record<string, string>;

  constructor(props: Props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = { isPreviewExpanded: false };
  }

  onPreviewExpand = () => {
    this.setState({ isPreviewExpanded: true });
    this.props.config?.PREVIEW?.onPreviewExpand?.();
  };

  render() {
    const { transformation, initialState, config, ...rest } = this.props;
    const previewState = this.state.isPreviewExpanded
      ? initialState
      : transformation.apply(initialState);
    const previewConfig = {
      ...config,
      PREVIEW: {
        contentInteractionMappers: [interactionMap],
        ...config.PREVIEW,
        onPreviewExpand: this.onPreviewExpand,
      },
    };
    const isPreviewAddition = {
      helpers: {
        isPreview: () => !this.state.isPreviewExpanded,
      },
    };
    return (
      <div className={styles.preview_container}>
        <RichContentViewer
          initialState={previewState}
          config={previewConfig}
          {...merge(rest, isPreviewAddition)}
        />
      </div>
    );
  }
}

export default RichContentPreview;
