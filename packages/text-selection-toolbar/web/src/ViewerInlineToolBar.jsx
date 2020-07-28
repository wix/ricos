import PropTypes from 'prop-types';
import React from 'react';
import styles from '../statics/styles/viewer-inline-toolbar.rtlignore.scss';
import addTextSelectionListener from './TextSelectionToolbar';
import { debounce } from 'lodash';

export default class ViewerInlineToolBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedText: '' };
    this.toolbarRef = React.createRef();
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
    const { children } = this.props;
    const style = {
      top: selectedTextPosition.y,
      left: selectedTextPosition.x,
    };

    return (
      <div ref={this.toolbarRef} className={styles.toolbar} style={style}>
        {children(selectedText)}
      </div>
    );
  }
}

ViewerInlineToolBar.propTypes = {
  position: PropTypes.object.isRequired,
  children: PropTypes.any,
  container: PropTypes.object.isRequired,
};
