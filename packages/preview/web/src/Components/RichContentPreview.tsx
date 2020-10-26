import React, { Component, ComponentProps } from 'react';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { mergeStyles } from 'wix-rich-content-common';
import { interactionMap } from '../Interactions/interactionMap';
import { defaultTransformation } from './default-transformation';
import { ContentStateTransformation } from '..';
import styles from '../../statics/styles/preview.scss';

interface Props extends ComponentProps<typeof RichContentViewer> {
  transformation?: ContentStateTransformation;
}

interface State {
  isPreviewExpanded: boolean;
}

class RichContentPreview extends Component<Props, State> {
  styles: Record<string, React.CSSProperties>;
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
    const { transformation = defaultTransformation, initialState, config, ...rest } = this.props;
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
