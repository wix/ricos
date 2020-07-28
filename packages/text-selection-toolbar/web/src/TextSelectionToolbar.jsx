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
    const { container } = this.props;
    this.removeTextSelectionListener = addTextSelectionListener(container, this.setSelectedText);
  }

  componentWillUnmount() {
    this.removeTextSelectionListener();
  }

  setSelectedText = debounce(
    (selectedText, selectedTextPosition) => this.setState({ selectedText, selectedTextPosition }),
    50
  );

  render() {
    const { selectedText, selectedTextPosition } = this.state;
    if (!selectedText) {
      return null;
    }
    const { container, children } = this.props;
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
