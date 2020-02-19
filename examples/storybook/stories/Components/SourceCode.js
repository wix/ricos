import React from 'react';
import PropTypes from 'prop-types';
import styles from './SourceCode.scss';

class SourceCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    const { code } = this.props;
    const { open } = this.state;

    if (open) {
      return <div className={styles.sourcecode}>{code}</div>;
    } else {
      return <div>See Source Code</div>;
    }
  }
}

SourceCode.propTypes = {
  code: PropTypes.string,
};

export default SourceCode;
