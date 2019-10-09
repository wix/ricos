import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { mergeStyles } from 'wix-rich-content-common';
import { interactionMap } from '../Interactions/interactionMap';
import styles from '../../statics/styles/preview.scss';

class RichContentPreview extends Component {
  static propTypes = {
    transformation: PropTypes.func.isRequired,
    ...RichContentViewer.propTypes,
  };

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = { isExpanded: false };
  }

  onExpand = () => {
    this.setState({ isExpanded: true });
  };

  render() {
    const { transformation, initialState, config, ...rest } = this.props;
    const previewState = this.state.isExpanded ? initialState : transformation.apply(initialState);
    const previewConfig = {
      ...config,
      PREVIEW: {
        onPreviewExpand: this.onExpand,
        contentInteractionMappers: [interactionMap],
        ...config.PREVIEW,
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
