import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { debounce } from 'lodash';
import Measure from 'react-measure';
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

  onResize = debounce(({ bounds }) => this.updateBounds(bounds), 100);

  updateBounds = editorBounds => {
    this.setState({ editorBounds });
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
      <Measure bounds onResize={this.onResize}>
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
