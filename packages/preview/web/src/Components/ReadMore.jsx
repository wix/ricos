import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis';
import { getChildrenText } from '../utils';
import defaultStyles from '../../statics/styles/read-more.scss';

class ReadMore extends PureComponent {
  static propTypes = {
    ellipsis: PropTypes.string,
    label: PropTypes.string,
    lines: PropTypes.number,
    children: PropTypes.node.isRequired,
    styles: PropTypes.object.isRequired,
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
    const { lines, label, ellipsis, children, styles } = this.props;
    const text = getChildrenText(children);
    return (
      <div>
        <div className={defaultStyles.readMore_wrapper} onClick={this.onClick}/>
       <LinesEllipsis
          text={text}
          className={styles.readMore}
          maxLine={lines}
          ellipsis={`${ellipsis} ${label}`}
        />
      </div>
    );
  }
  /* eslint-enable */
}

export default ReadMore;
