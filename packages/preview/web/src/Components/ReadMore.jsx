import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis';
import { getChildrenText } from '../utils';
import '../../statics/styles/read-more.scss';

class ReadMore extends PureComponent {
  static propTypes = {
    ellipsis: PropTypes.string,
    label: PropTypes.string,
    lines: PropTypes.number,
    children: PropTypes.node.isRequired,
    styles: PropTypes.object.isRequired,
  };

  static defaultProps = {
    ellipsis: '…',
    label: 'read more',
    lines: 3,
  };

  constructor(props) {
    super(props);
    this.state = {
      readMoreActive: true,
    };
  }

  onTextClick = e => {
    e.preventDefault();
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
