import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { normalizeUrl, mergeStyles, validate } from 'wix-rich-content-common';
import pluginLinkSchema from 'wix-rich-content-common/dist/statics/schemas/plugin-link.schema.json';
import { isEqual } from 'lodash';
import styles from '../statics/link-viewer.scss';

class LinkViewer extends Component {
  static propTypes = {
    componentData: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    children: PropTypes.node,
    anchorTarget: PropTypes.string,
    relValue: PropTypes.string,
    settings: PropTypes.object,
    isInEditor: PropTypes.bool,
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
    const { componentData, isInEditor } = this.props;
    const { anchor } = componentData;
    this.props?.settings?.onClick(event, anchor || this.getHref());
    if (anchor && !isInEditor) {
      const element = document.getElementById(`viewer-${anchor}`);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  getHref() {
    return normalizeUrl(this.props.componentData.url);
  }

  render() {
    const { componentData, anchorTarget, relValue, children, isInEditor } = this.props;
    const { url, anchor, target, rel } = componentData;
    const anchorProps = {
      href: url && this.getHref(),
      target: target ? target : anchorTarget || '_self',
      rel: rel ? rel : relValue || 'noopener',
      className: classNames(this.state.styles.link, {
        [this.state.styles.linkToAnchorInViewer]: anchor && !isInEditor,
      }),
      onClick: this.handleClick,
    };
    return <a {...anchorProps}>{children}</a>;
  }
}

export default LinkViewer;
