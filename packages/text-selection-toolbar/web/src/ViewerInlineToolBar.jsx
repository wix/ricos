import PropTypes from 'prop-types';
import React from 'react';
import styles from '../statics/styles/viewer-inline-toolbar.rtlignore.scss';
import addTextSelectionListener from './TextSelectionToolbar';
import { debounce } from 'lodash';

export default class ViewerInlineToolBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedText: '' };
  }

  componentDidUpdate() {
    const { container } = this.props;
    if (container !== this.state.container) {
      this.removeTextSelectionListener = addTextSelectionListener(
        container,
        debounce((selectedText, position) => this.setState({ selectedText, position }), 50)
      );
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ container });
    }
  }

  componentDidMount() {
    this.setState({ container: this.props.container });
  }

  componentWillUnmount() {
    this.removeTextSelectionListener();
  }

  render() {
    const { selectedText, position = {} } = this.state;
    const { container, children } = this.props;
    const left = container?.getBoundingClientRect().left;
    const toolbarWidth = 44;
    const padding = 44;
    return (
      selectedText && (
        <div
          className={styles.container}
          style={{
            top: position.y - padding,
            left: position.x - left - toolbarWidth / 2,
          }}
        >
          {children(selectedText)}
        </div>
      )
    );
  }
}

ViewerInlineToolBar.propTypes = {
  position: PropTypes.object.isRequired,
  children: PropTypes.any,
  container: PropTypes.object.isRequired,
};
