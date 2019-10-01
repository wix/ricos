import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis';
import { Context, mergeStyles } from 'wix-rich-content-common';
import Styles from '../../statics/styles/read-more.scss';

class ReadMore extends PureComponent {
  static propTypes = {
    ellipsis: PropTypes.string,
    label: PropTypes.string,
    lines: PropTypes.number,
    text: PropTypes.string.isRequired,
  };

  static defaultProps = {
    ellipsis: '…',
    label: 'read more…',
    lines: 3,
  };

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles: Styles, theme: this.context.theme });
  }

  render() {
    const { lines, label, ellipsis, ...rest } = this.props;
    return (
      <LinesEllipsis
        className={this.styles.readMore}
        {...rest}
        maxLine={lines}
        ellipsis={`${ellipsis} ${label}`}
      />
    );
  }
}

ReadMore.contextType = Context.type;

export default ReadMore;
