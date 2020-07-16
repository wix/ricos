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
    theme: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
  };

  static defaultProps = {
    ellipsis: '…',
    lines: 3,
  };

  constructor(props) {
    super(props);
    this.state = { clamped: false, expanded: false };
  }

  onClick = e => {
    e.preventDefault();
    this.setState(prevState => ({ expanded: !prevState.expanded }));
  };

  renderChildren(children) {
    const html = ReactDOMServer.renderToString(children);
    return html;
  }

  onReflow = ({ clamped }) => {
    this.setState({ clamped });
  };

  /* eslint-disable jsx-a11y/anchor-is-valid */
  render() {
    const { clamped, expanded } = this.state;
    if (expanded) {
      return (
        <>
          {this.props.children}
          {clamped && (
            <a href="" role="button" onClick={this.onClick} className={this.styles.readMore_label}>
              {'See less'}
            </a>
          )}
        </>
      );
    }
    this.styles = this.styles || mergeStyles({ styles, theme: this.props.theme });
    const {
      lines,
      label = this.props.t('Preview_ReadMore_Label'),
      ellipsis,
      children,
    } = this.props;
    return (
      <Fragment>
        <HTMLEllipsis
          unsafeHTML={this.renderChildren(children)}
          className={this.styles.readMore}
          maxLine={lines}
          ellipsis={ellipsis}
          onReflow={this.onReflow}
        />
        {clamped && (
          <a href="#" role="button" onClick={this.onClick} className={this.styles.readMore_label}>
            {label}
          </a>
        )}
      </Fragment>
    );
  }
}

export default ReadMore;
