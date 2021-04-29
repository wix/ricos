import React from 'react';
import styles from '../statics/styles/viewer-inline-toolbar.rtlignore.scss';
import addTextSelectionListener from './TextSelectionListener';
import { debounce } from 'lodash';

export default class TextSelectionToolbar extends React.Component<
  { container: HTMLElement; children: (string) => JSX.Element },
  { selectedText: string; selectedTextPosition?: { x: number; y: number } }
> {
  constructor(props) {
    super(props);
    this.state = { selectedText: '' };
  }

  removeTextSelectionListener!: () => void | null;

  componentDidMount() {
    this.addTextSelectionListener(this.props.container);
  }

  componentWillUnmount() {
    this.removeTextSelectionListener();
  }

  componentWillReceiveProps(nextPros) {
    this.addTextSelectionListener(nextPros.container);
  }

  addTextSelectionListener = container => {
    if (container && !this.removeTextSelectionListener) {
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
    if (!selectedText || !selectedTextPosition) {
      return null;
    }
    const { left } = container.getBoundingClientRect();
    const topOffset = 5;
    const containerOffset = this.props.container.getBoundingClientRect().top;
    const style = {
      top: selectedTextPosition.y - containerOffset - topOffset,
      left: selectedTextPosition.x - left,
    };

    return (
      <div className={styles.toolbar} style={style}>
        {children(selectedText)}
      </div>
    );
  }
}
