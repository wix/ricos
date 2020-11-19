import React, { Component } from 'react';
import { RichContentViewer, RichContentViewerProps } from 'wix-rich-content-viewer';
import { mergeStyles, RicosContent } from 'wix-rich-content-common';
import { interactionMap } from '../Interactions/interactionMap';
import { defaultTransformation } from './default-transformation';
import { ContentStateTransformation } from 'ricos-contentpreview';
import styles from '../../statics/styles/preview.scss';

interface Props extends RichContentViewerProps {
  transformation: ContentStateTransformation;
  initialState: RicosContent;
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
    return (
      <div className={styles.preview_container}>
        <RichContentViewer initialState={previewState} config={previewConfig} {...rest} />
      </div>
    );
  }
}

export default RichContentPreview;
