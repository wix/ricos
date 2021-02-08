/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import React from 'react';
import cx from 'classnames';
import SyntaxHighlighter from './SyntaxHighlighter';
import styles from './SourceCode.scss';

class SourceCode extends React.Component<{ code: string }, { open: boolean }> {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    const { code } = this.props;
    const { open } = this.state;

    const toggleButton = (
      <div
        onClick={() =>
          this.setState(_state => ({
            open: !_state.open,
          }))
        }
      >
        {'</>'} {open ? 'Hide' : 'show'} Code
      </div>
    );
    return (
      <div>
        {toggleButton}
        <div className={cx(styles.sourcecode, { [styles.open]: open })}>
          <SyntaxHighlighter code={code} />
        </div>
      </div>
    );
  }
}

export default SourceCode;
