import React, { PureComponent, Fragment } from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
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
    theme: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
  };

  static defaultProps = {
    ellipsis: '…',
    lines: 3,
    onClick: () => {},
  };

  constructor(props) {
    super(props);
    this.state = { clamped: false };
  }

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

  onReflow = ({ clamped }) => {
    this.setState({ clamped });
  };

  /* eslint-disable */
  render() {
    const { clamped } = this.state;
    this.styles = this.styles || mergeStyles({ styles, theme: this.props.theme });
    const {
      lines,
      label = this.props.t('Preview_ReadMore_Label'),
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
          ellipsis={ellipsis}
          onReflow={this.onReflow}
        />
        {clamped && <a href="#" onClick={this.onClick} className={this.styles.readMore_label}>{label}</a>}
      </Fragment>
    );
  }
  /* eslint-enable */
}

export default ReadMore;
