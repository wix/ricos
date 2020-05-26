import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
// import { normalizeUrl, mergeStyles, validate } from 'wix-rich-content-common';
import styles from '../statics/styles/spoiler.scss';

class SpoilerViewer extends Component {
  static propTypes = {
    componentData: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    children: PropTypes.node,
    settings: PropTypes.object,
  };

  constructor(props) {
    super(props);
    const { theme } = props;
    this.state = { styles: mergeStyles({ styles, theme }), className: 'spoilerViewer_hideText' };
  }

  handleClick = event => {
    this.setState({ className: 'spoilerViewer_revealText' });
  };

  render() {
    const { children } = this.props;
    const { styles, className } = this.state;
    const anchorProps = {
      className: styles[className],
      onClick: this.handleClick,
    };
    return <div {...anchorProps}>{children}</div>;
  }
}

export default SpoilerViewer;
