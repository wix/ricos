import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BlockSpoilerComponent from './BlockSpoilerComponent';
import { GlobalContext } from 'wix-rich-content-common';

export default class SpoilerViewerWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasSpoiler: props.componentData?.config?.spoiler?.enabled || false,
    };
  }

  static contextType = GlobalContext;
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
    const { isMobile, t } = this.context;

    return hasSpoiler ? (
      <BlockSpoilerComponent pluginType={pluginType} isMobile={isMobile} t={t} {...this.props}>
        {children}
      </BlockSpoilerComponent>
    ) : (
      children
    );
  }
}
