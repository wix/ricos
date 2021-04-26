import React, { useState } from 'react';
import { UrlInputModal, MODAL_CONTROLS_POSITION } from 'wix-rich-content-plugin-commons';
import { Section, Page } from '../Components/StoryParts';
import styles from './TextInputStory.scss';
import { Dropdown } from 'wix-style-react';

const trans = {
  EmbedURL_Common_CTA_Secondary: 'Secondary',
  EmbedURL_Common_CTA_Primary: 'Primary',
};

const UrlInputModalWrapper = ({ children, ...props }) => {
  const [input, setInput] = useState('');
  return (
    <UrlInputModal
      save={() => console.log('Save!')}
      cancel={() => console.log('Cancel!')}
      placeholder={placeholder}
      t={x => trans[x] || x}
      onInputChange={setInput}
      input={input}
      {...props}
    >
      {children}
    </UrlInputModal>
  );
};

const placeholder = 'Placeholder';
const UrlInputModalDesktop = () => {
  return (
    <Page title="URL Input Modal">
      <Section>
        <div className={styles.container} dir="ltr">
          <div>import {'{ UrlInputModal }'} from 'wix-rich-content-plugin-commons';</div>
          <div className={styles.section}>
            <div style={{ border: '1px dashed pink', position: 'relative' }}>
              <UrlInputModalWrapper title={'Default URL input modal'}>
                <div>I'm the inner content, you can place here whatever you like</div>
              </UrlInputModalWrapper>
            </div>
          </div>
        </div>
      </Section>
    </Page>
  );
};

const options = [
  { id: 1, value: MODAL_CONTROLS_POSITION.BOTTOM },
  { id: 2, value: MODAL_CONTROLS_POSITION.TOP },
];

const UrlInputModalMobile = () => {
  const initialId = 1;

  const [controlsPosition, setControlsPositions] = useState(1);
  const onSelect = ({ id }) => {
    setControlsPositions(id);
  };

  const controlsPosValue = options[controlsPosition - 1].value;
  return (
    <div dir="ltr">
      <UrlInputModalWrapper
        title={'Mobile Input Modal Example'}
        controlsPosition={controlsPosValue}
        t={x => trans[x] || x}
      >
        <div>
          <div>I'm the inner content - select an options to change controlsPosition</div>
          <div>{controlsPosValue}</div>
          <Dropdown
            initialSelectedId={initialId}
            itemHeight="small"
            maxHeightPixels="5x"
            onSelect={onSelect}
            options={options}
          />
        </div>
      </UrlInputModalWrapper>
    </div>
  );
};

export { UrlInputModalDesktop, UrlInputModalMobile };
