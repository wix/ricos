import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { normalizeUrl, mergeStyles, validate } from 'wix-rich-content-common';
// eslint-disable-next-line max-len
import pluginLinkSchema from 'wix-rich-content-common/dist/statics/schemas/plugin-link.schema.json';
import { invoke, isEqual } from 'lodash';
import styles from '../statics/link-viewer.scss';

class LinkViewer extends Component {
  static propTypes = {
    componentData: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    children: PropTypes.node,
    anchorTarget: PropTypes.string,
    relValue: PropTypes.string,
    settings: PropTypes.object,
  };

  constructor(props) {
    super(props);
    validate(props.componentData, pluginLinkSchema);
    this.state = { styles };
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, pluginLinkSchema);
    }
  }

  componentDidMount() {
    const theme = this.props.theme;
    this.setState({ styles: mergeStyles({ styles, theme }) });
  }

  handleClick = event => {
    invoke(this, 'props.settings.onClick', event, this.getHref());
  };

  getHref() {
    return normalizeUrl(this.props.componentData.url);
  }

  render() {
    const { componentData, anchorTarget, relValue, children } = this.props;
    const { target, rel } = componentData;
    const anchorProps = {
      href: this.getHref(),
      target: target ? target : anchorTarget || '_self',
      rel: rel ? rel : relValue || 'noopener',
      className: this.state.styles.link,
      onClick: this.handleClick,
    };
    return <a {...anchorProps}>{children}</a>;
  }
}

export default LinkViewer;
