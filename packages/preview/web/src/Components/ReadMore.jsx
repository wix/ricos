import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis';
import { EXPAND_MODES } from '../const';
import { getChildrenText } from '../utils';
import '../../statics/styles/read-more.scss';

class ReadMore extends PureComponent {
  static propTypes = {
    ellipsis: PropTypes.string,
    label: PropTypes.string,
    lines: PropTypes.number,
    children: PropTypes.node.isRequired,
    styles: PropTypes.object.isRequired,
    expandMode: PropTypes.oneOf([EXPAND_MODES.BLOCK, EXPAND_MODES.FULL_CONTENT]),
    onClick: PropTypes.func,
  };

  static defaultProps = {
    ellipsis: '…',
    label: 'read more',
    lines: 3,
    expandMode: EXPAND_MODES.FULL_CONTENT,
    onClick: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      readMoreActive: true,
    };
  }

  onTextClick = e => {
    e.preventDefault();
    this.props.onClick();
    this.setState({ readMoreActive: false });
  };

  render() {
    const { lines, label, ellipsis, children, styles } = this.props;
    const text = getChildrenText(children);
    return (
      <LinesEllipsis
        onClick={this.onTextClick}
        text={text}
        className={styles.readMore}
        maxLine={this.state.readMoreActive ? lines : Infinity}
        ellipsis={`${ellipsis} ${label}`}
      />
    );
  }
}

export default ReadMore;
