import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { mergeStyles } from 'wix-rich-content-common';
import { interactionMap } from '../Interactions/interactionMap';
import { defaultTransformation } from './default-transformation';
import styles from '../../statics/styles/preview.scss';

class RichContentPreview extends Component {
  static propTypes = {
    transformation: PropTypes.object,
    ...RichContentViewer.propTypes,
  };

  static defaultProps = {
    transformation: defaultTransformation,
  };

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = { isPreviewExpanded: false };
  }

  onPreviewExpand = () => {
    this.setState({ isPreviewExpanded: true });
  };

  render() {
    const { transformation, initialState, config, ...rest } = this.props;
    const previewState = this.state.isPreviewExpanded
      ? initialState
      : transformation.apply(initialState);
    const previewSettings = {
      ...config,
      PREVIEW: {
        onPreviewExpand: this.onPreviewExpand,
        contentInteractionMappers: [interactionMap],
        ...config.PREVIEW,
      },
    };
    return (
      <div className={styles.preview_container}>
        <RichContentViewer initialState={previewState} config={previewSettings} {...rest} />
      </div>
    );
  }
}

export default RichContentPreview;
