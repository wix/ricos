import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/read-more.scss';

class ReadMore extends PureComponent {
  static propTypes = {
    ellipsis: PropTypes.string,
    label: PropTypes.string,
    lines: PropTypes.number,
    children: PropTypes.node.isRequired,
    theme: PropTypes.object.isRequired,
    showToggle: PropTypes.bool,
    t: PropTypes.func.isRequired,
    onPreviewExpand: PropTypes.func.isRequired,
  };

  static defaultProps = {
    showToggle: true,
    ellipsis: '…',
    lines: 3,
  };

  constructor(props) {
    super(props);
    this.state = { clamped: false };
  }

  onClick = e => {
    e.preventDefault();
    this.props.onPreviewExpand();
  };

  onReflow = ({ clamped }) => {
    this.setState({ clamped });
  };

  /* eslint-disable jsx-a11y/anchor-is-valid */
  render() {
    const { clamped } = this.state;
    const { showToggle } = this.props;
    this.styles = this.styles || mergeStyles({ styles, theme: this.props.theme });
    const {
      lines,
      label = this.props.t('Preview_ReadMore_Label'),
      ellipsis,
      children,
    } = this.props;
    return (
      <Fragment>
        <div
          className={styles.readMore_wrapper}
          style={{
            WebkitLineClamp: lines,
            ellipsis,
          }}
        >
          {children}
        </div>
        {clamped && showToggle && (
          <a href="" role="button" onClick={this.onClick} className={this.styles.readMore_label}>
            {label}
          </a>
        )}
      </Fragment>
    );
  }
}

export default ReadMore;
