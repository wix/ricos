import React, { PureComponent, Fragment } from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import { Context, mergeStyles } from 'wix-rich-content-common';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import styles from '../../statics/styles/read-more.scss';

class ReadMore extends PureComponent {
  static propTypes = {
    ellipsis: PropTypes.string,
    label: PropTypes.string,
    lines: PropTypes.number,
    children: PropTypes.node.isRequired,
    onPreviewExpand: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    text: PropTypes.string,
  };

  static defaultProps = {
    ellipsis: '…',
    lines: 3,
    onClick: () => {},
  };

  onClick = e => {
    const { onClick, onPreviewExpand } = this.props;
    e.preventDefault();
    onClick();
    onPreviewExpand();
  };

  renderChildren(children) {
    const html = ReactDOMServer.renderToString(children);
    return html;
  }

  /* eslint-disable */
  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.context.theme });
    const {
      lines,
      label = this.context.t('Preview_ReadMore_Label'),
      ellipsis,
      children,
      text,
    } = this.props;
    // const textToCollapse = text || getChildrenText(children);
    return (
      <Fragment>
        <HTMLEllipsis
          unsafeHTML={this.renderChildren(children)}
          className={this.styles.readMore}
          maxLine={lines}
          ellipsisHTML={`${ellipsis} <a href="#">${label}</a>`}
        />
      </Fragment>
    );
  }
  /* eslint-enable */
}

ReadMore.contextType = Context.type;

export default ReadMore;
