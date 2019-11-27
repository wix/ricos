import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { debounce } from 'lodash';
import Measure from 'react-measure';
import { mergeStyles } from 'wix-rich-content-editor-common';
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

  onResize = debounce(({ bounds }) => this.updateBounds(bounds), 100);

  updateBounds = editorBounds => {
    this.setState({ editorBounds });
  };

  render() {
    const { transformation, initialState, config, ...rest } = this.props;
    const previewState = this.state.isPreviewExpanded
      ? initialState
      : transformation.apply(initialState);
    const previewConfig = {
      ...config,
      PREVIEW: {
        onPreviewExpand: this.onPreviewExpand,
        contentInteractionMappers: [interactionMap],
        ...config.PREVIEW,
      },
    };
    return (
      <Measure onResize={this.onResize}>
        {({ measureRef }) => (
          <div className={styles.preview_container} ref={measureRef}>
            <RichContentViewer initialState={previewState} config={previewConfig} {...rest} />
          </div>
        )}
      </Measure>
    );
  }
}

export default RichContentPreview;
