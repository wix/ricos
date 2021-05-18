import React from 'react';
import { TextSelectionToolbar, TwitterButton } from 'wix-rich-content-text-selection-toolbar';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onButtonClick?: (pluginId: string, action: string, value: string) => void;
  container: HTMLElement;
}

const SelectionToolbar: React.FC<Props> = ({ onButtonClick, container }) => {
  return (
    <TextSelectionToolbar container={container}>
      {selectedText => (
        <TwitterButton
          selectedText={selectedText}
          onClick={selectedText => onButtonClick?.('TWITTER', 'Click', selectedText)}
        />
      )}
    </TextSelectionToolbar>
  );
};

export default SelectionToolbar;
