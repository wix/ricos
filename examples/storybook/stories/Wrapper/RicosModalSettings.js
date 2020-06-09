import React, { useState } from 'react';
import { RicosEditor } from 'ricos-editor';
import { RichContentEditorBox, Section, Page } from '../Components/StoryParts';
import { pluginImage } from 'wix-rich-content-plugin-image';
import { pluginGallery } from 'wix-rich-content-plugin-gallery';
import MobileDetect from 'mobile-detect';
import { Layout, Cell, FormField, Input } from 'wix-style-react';

import galleryState from '../../../../e2e/tests/fixtures/gallery-simple.json';

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const plugins = [pluginImage(), pluginGallery()];
const validInputState = { valid: true, errorMessage: undefined };

export default () => {
  const isMobile = mobileDetect.mobile() !== null;
  const [modalContainer, setModalContainer] = useState('');
  const [inputValidity, setInputValidity] = useState(validInputState);

  const verifyElement = value => {
    if (!value) {
      setInputValidity(validInputState);
      return;
    }
    const element = document.getElementById(value);
    if (!element) {
      setInputValidity({
        valid: false,
        errorMessage: `Couldn't find #${value} in the DOM. Using default behavior instead (<body />)`,
      });
    } else setInputValidity(validInputState);
  };

  function onChange(e) {
    verifyElement(e.target.value);
    setModalContainer(e.target.value);
  }

  const hashPrefix = value => value && `#${value}`;

  return (
    <Page title="Ricos Modal API: Container">
      <Layout>
        <Cell>
          <FormField label="Please type in an elementID so the React Modal will attach itself to it">
            <Input
              size="small"
              placeholder="body"
              value={modalContainer}
              onChange={onChange}
              status={!inputValidity.valid}
              statusMessage={inputValidity.errorMessage}
            />
          </FormField>
        </Cell>
      </Layout>
      <Section>
        <RichContentEditorBox>
          <RicosEditor
            content={galleryState}
            isMobile={isMobile}
            plugins={plugins}
            key={'editor1'}
            modalSettings={{
              modalContainer: inputValidity.valid && hashPrefix(modalContainer),
            }}
          />
        </RichContentEditorBox>
        <div id="uniqueOne" />
      </Section>
    </Page>
  );
};
