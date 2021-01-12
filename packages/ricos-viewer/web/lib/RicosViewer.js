import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IoC from '../src/render-infra/ioc-container';

export default class RicosViewer extends Component {
  static propTypes = {
    plugins: PropTypes.arrayOf(
      PropTypes.shape({ renderer: PropTypes.func.isRequired, type: PropTypes.string.isRequired })
    ),
    content: PropTypes.object.isRequired,
  };

  static defaultProps = {
    plugins: [],
  };

  constructor(props) {
    super(props);
    this.contentRenderer = IoC.getContentRenderer();
    console.log(this.props.plugins);
    this.contentRenderer.initializePluginRenderMap(this.props.plugins);
  }

  render() {
    return this.contentRenderer.render(this.props.content);
  }
}
