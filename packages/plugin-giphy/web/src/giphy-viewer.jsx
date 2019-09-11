import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles, validate, Context, ViewportRenderer } from 'wix-rich-content-common';
import { isEqual } from 'lodash';
import schema from '../statics/data-schema.json';
import styles from '../statics/styles/giphy-viewer.scss';

class GiphyViewer extends Component {
  constructor(props) {
    super(props);
    validate(props.componentData, schema);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, schema);
    }
  }

  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.context.theme });
    const { componentData } = this.props;
    return (
      <ViewportRenderer>
        <img className={this.styles.giphy_player} src={componentData.gif.originalUrl} alt="gif" />
      </ViewportRenderer>
    );
  }
}

GiphyViewer.contextType = Context.type;

GiphyViewer.propTypes = {
  componentData: PropTypes.object.isRequired,
  onReady: PropTypes.func,
  onStart: PropTypes.func,
  controls: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
};

GiphyViewer.defaultProps = {
  width: '100%',
  height: '100%',
  controls: true,
};

export default GiphyViewer;
