import PropTypes from 'prop-types';
import React from 'react';
import styles from '../statics/styles/viewer-inline-toolbar.rtlignore.scss';
import addTextSelectionListener from './TextSelectionListener';
import { debounce } from 'lodash';

export default class TextSelectionToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedText: '' };
  }

  componentDidMount() {
    this.addTextSelectionListener(this.props.container);
  }

  componentWillUnmount() {
    this?.removeTextSelectionListener();
  }

  componentWillReceiveProps(nextPros) {
    this.addTextSelectionListener(nextPros.container);
  }

  addTextSelectionListener = container => {
    if (!this.removeTextSelectionListene && container) {
      this.removeTextSelectionListener = addTextSelectionListener(container, this.setSelectedText);
    }
  };

  setSelectedText = debounce(
    (selectedText, selectedTextPosition) => this.setState({ selectedText, selectedTextPosition }),
    50
  );

  render() {
    const { selectedText, selectedTextPosition } = this.state;
    const { container, children } = this.props;
    if (!selectedText || !container) {
      return null;
    }
    const { left } = container.getBoundingClientRect();
    const style = {
      top: selectedTextPosition.y,
      left: selectedTextPosition.x - left,
    };

    return (
      <div className={styles.toolbar} style={style}>
        {children(selectedText)}
      </div>
    );
  }
}

TextSelectionToolbar.propTypes = {
  position: PropTypes.object.isRequired,
  children: PropTypes.any,
  container: PropTypes.object.isRequired,
};
