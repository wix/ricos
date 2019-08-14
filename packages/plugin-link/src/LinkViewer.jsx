import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { normalizeUrl, mergeStyles, validate, Context } from 'wix-rich-content-common';
import { invoke, isEqual } from 'lodash';
import schema from '../statics/data-schema.json';
import styles from '../statics/link-viewer.scss';

class LinkViewer extends Component {
  static propTypes = {
    componentData: PropTypes.object.isRequired,
    theme: PropTypes.object,
    children: PropTypes.node,
    anchorTarget: PropTypes.string,
    relValue: PropTypes.string,
    settings: PropTypes.object,
  };

  constructor(props) {
    super(props);
    validate(props.componentData, schema);
    this.state = { styles };
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, schema);
    }
  }

  componentDidMount() {
    const theme = this.context && this.context.theme;
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

LinkViewer.contextType = Context.type;

export default LinkViewer;
