import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Context, mergeStyles } from 'wix-rich-content-common';
import LinesEllipsis from 'react-lines-ellipsis';
import { getChildrenText } from '../utils';
import styles from '../../statics/styles/read-more.scss';

class ReadMore extends PureComponent {
  static propTypes = {
    ellipsis: PropTypes.string,
    label: PropTypes.string,
    lines: PropTypes.number,
    children: PropTypes.node.isRequired,
    onPreviewExpand: PropTypes.func.isRequired,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    ellipsis: '…',
    label: 'read more',
    lines: 3,
    onClick: () => {},
  };

  onClick = e => {
    const { onClick, onPreviewExpand } = this.props;
    e.preventDefault();
    onClick();
    onPreviewExpand();
  };

  /* eslint-disable */
  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.context.theme });
    const { lines, label, ellipsis, children } = this.props;
    const text = getChildrenText(children);
    return (
      <div>
        <div className={this.styles.readMore_wrapper} onClick={this.onClick}/>
       <LinesEllipsis
          text={text}
          className={this.styles.readMore}
          maxLine={lines}
          ellipsis={`${ellipsis} ${label}`}
        />
      </div>
    );
  }
  /* eslint-enable */
}

ReadMore.contextType = Context.type;

export default ReadMore;
