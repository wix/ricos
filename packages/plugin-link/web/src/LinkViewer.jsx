import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  normalizeUrl,
  mergeStyles,
  validate,
  anchorScroll,
  addAnchorTagToUrl,
} from 'wix-rich-content-common';
import pluginLinkSchema from 'wix-rich-content-common/dist/statics/schemas/plugin-link.schema.json';
import { isEqual } from 'lodash';
import styles from '../statics/link-viewer.scss';
import { LINK_TYPE } from './types';

class LinkViewer extends Component {
  static propTypes = {
    componentData: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    children: PropTypes.node,
    anchorTarget: PropTypes.string,
    relValue: PropTypes.string,
    settings: PropTypes.object,
    isInEditor: PropTypes.bool,
    config: PropTypes.object,
    helpers: PropTypes.object,
  };

  constructor(props) {
    super(props);
    validate(props.componentData, pluginLinkSchema);
    const theme = this.props.theme;
    this.styles = mergeStyles({ styles, theme });
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, pluginLinkSchema);
    }
  }

  handleClick = event => {
    const { componentData, isInEditor, config, helpers } = this.props;
    const settings = config?.[LINK_TYPE];
    if (settings) {
      const { onClick, customAnchorScroll } = settings;
      const { anchor, url } = componentData;
      helpers?.onViewerAction?.(LINK_TYPE, 'Click', componentData);
      onClick?.(event, componentData?.customData || this.getHref(url, anchor));
      if (anchor) {
        event.stopPropagation(); // fix problem with wix platform, where it wouldn't scroll and sometimes jump to different page
        if (!isInEditor) {
          event.preventDefault();
          if (customAnchorScroll) {
            customAnchorScroll(event, anchor);
          } else {
            const anchorString = `viewer-${anchor}`;
            const element = document.getElementById(anchorString);
            addAnchorTagToUrl(anchorString);
            anchorScroll(element);
          }
        }
      }
    }
  };

  getHref = (url, anchor) => (url ? normalizeUrl(url) : `#viewer-${anchor}`);

  getTarget(anchor, target, anchorTarget) {
    if (anchor) {
      return '_self';
    } else {
      return target ? target : anchorTarget || '_self';
    }
  }

  render() {
    const { componentData, anchorTarget, relValue, children, isInEditor } = this.props;
    const { url, anchor, target, rel } = componentData;
    const anchorProps = {
      href: this.getHref(url, anchor),
      target: this.getTarget(anchor, target, anchorTarget),
      rel: rel ? rel : relValue || 'noopener',
      className: classNames(this.styles.link, {
        [this.styles.linkInEditor]: isInEditor,
        [this.styles.linkInViewer]: !isInEditor,
      }),
      onClick: this.handleClick,
    };
    return <a {...anchorProps}>{children}</a>;
  }
}

export default LinkViewer;
