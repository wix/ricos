/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

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

    return (
      <div>
        <div className={cx(styles.sourcecode, { [styles.open]: open })}>
          <SyntaxHighlighter language="javascript" style={atomDark}>
            {code}
          </SyntaxHighlighter>
        </div>

        <div
          onClick={() =>
            this.setState(_state => ({
              open: !_state.open,
            }))
          }
        >
          {'</>'} {open ? 'Hide' : 'show'} Code
        </div>
      </div>
    );
  }
}

SourceCode.propTypes = {
  code: PropTypes.string,
};

export default SourceCode;
