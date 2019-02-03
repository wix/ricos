import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { normalizeUrl, mergeStyles, validate } from 'wix-rich-content-common';
import isEqual from 'lodash/isEqual';
import invoke from 'lodash/invoke';
import schema from '../statics/data-schema.json';
import styles from '../statics/link-viewer.scss';

class LinkViewer extends Component {
  static propTypes = {
    componentData: PropTypes.object.isRequired,
    theme: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
    anchorTarget: PropTypes.string,
    relValue: PropTypes.string,
    settings: PropTypes.object,
  };

  constructor(props) {
    super(props);
    validate(props.componentData, schema);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, schema);
    }
  }

  handleClick = event => {
    invoke(this, 'props.settings.onClick', event, this.getHref());
  };

  getHref() {
    return normalizeUrl(this.props.componentData.url);
  }

  render() {
    const { styles, props } = this;
    const { componentData, anchorTarget, relValue, className, children } = props;
    const { target, rel } = componentData;
    const anchorProps = {
      href: this.getHref(),
      target: target ? target : anchorTarget || '_self',
      rel: rel ? rel : relValue || 'noopener',
      className: classNames(styles.link, className),
      onClick: this.handleClick,
    };
    return <a {...anchorProps}>{children}</a>;
  }
}

export default LinkViewer;
