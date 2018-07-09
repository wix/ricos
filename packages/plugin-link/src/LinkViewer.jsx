import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { normalizeUrl, mergeStyles, validate } from 'wix-rich-content-common';
import isEqual from 'lodash/isEqual';
import schema from './data-schema.json';

import styles from './link-viewer.scss';

class LinkViewer extends Component {

  static propTypes = {
    componentData: PropTypes.object.isRequired,
    theme: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
    anchorTarget: PropTypes.string,
    relValue: PropTypes.string,
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

  render() {
    const { styles, props } = this;
    const { componentData, anchorTarget, relValue, className, children } = props;
    const { url, target, rel } = componentData;
    const anchorProps = {
      href: normalizeUrl(url),
      target: target ? target : (anchorTarget || '_self'),
      rel: rel ? rel : (relValue || 'noopener'),
      className: classNames(styles.link, className),
    };
    return <a {...anchorProps} >{children}</a>;
  }
}

export default LinkViewer;
