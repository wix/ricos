import React from 'react';
import styles from '../statics/styles/viewer-inline-toolbar.rtlignore.scss';
import addTextSelectionListener from './TextSelectionListener';
import { debounce } from 'lodash';
import { buttonsMap } from './consts';

export default class TextSelectionToolbar extends React.Component<
  {
    container: HTMLElement;
    settings: { buttons: string[] };
    onViewerAction?: (pluginId: string, action: string, value: string) => void;
  },
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
    const { container, settings, onViewerAction } = this.props;
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
        {settings.buttons.map(buttonName => {
          const Button = buttonsMap[buttonName];
          return (
            <Button key={buttonName} selectedText={selectedText} onViewerAction={onViewerAction} />
          );
        })}
      </div>
    );
  }
}
