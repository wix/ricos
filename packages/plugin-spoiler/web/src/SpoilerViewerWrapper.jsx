import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BlockSpoilerComponent from './BlockSpoilerComponent';

export default class SpoilerViewerWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasSpoiler: props.componentData?.config?.spoiler?.enabled || false,
    };
  }

  static propTypes = {
    children: PropTypes.node,
    componentData: PropTypes.object,
    type: PropTypes.string,
  };

  componentWillReceiveProps(props) {
    const hasSpoiler = props.componentData?.config?.spoiler?.enabled || false;
    this.setState({ hasSpoiler });
  }

  render() {
    const { hasSpoiler } = this.state;
    const type = this.props.type.replace('wix-draft-plugin-', '');
    const pluginType = type[0].toUpperCase() + type.slice(1);
    const { children } = this.props;

    return hasSpoiler ? (
      <BlockSpoilerComponent pluginType={pluginType} {...this.props}>
        {children}
      </BlockSpoilerComponent>
    ) : (
      children
    );
  }
}
