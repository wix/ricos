import React, { Component } from 'react';
import { mergeStyles, RichContentTheme, TranslationFunction } from 'wix-rich-content-common';
import styles from '../statics/styles/unsupported-blocks.scss';
import CircleInfoIcon from './icons/CircleInfoIcon';

interface Props {
  theme: RichContentTheme;
  t: TranslationFunction;
}
class UnsupportedBlocks extends Component<Props> {
  unsupportedBlocksRef: React.RefObject<HTMLInputElement>;
  constructor(props) {
    super(props);
    this.unsupportedBlocksRef = React.createRef();
  }
  styles: Record<string, string>;

  fixContainerHeight = () => {
    const container = this.unsupportedBlocksRef.current?.parentElement;
    if (container?.style.height) {
      container.style.height = '100%';
    }
  };

  componentDidMount() {
    this.fixContainerHeight();
  }

  render() {
    const { t, theme } = this.props;
    const alertMessage = <p>{t('UnsupportedPlugin_message')}</p>;
    this.styles = this.styles || mergeStyles({ styles, theme });

    return (
      <div className={styles.unsupportedBlocks_alert} ref={this.unsupportedBlocksRef}>
        <CircleInfoIcon />
        {alertMessage}
      </div>
    );
  }
}

export default UnsupportedBlocks;
