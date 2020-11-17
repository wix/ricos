import React, { useState, useRef, useEffect } from 'react';
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
  const modalEl = useRef(null);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isMobile = mobileDetect.mobile() !== null;
  const [ariaHiddenId, setAriaHiddenId] = useState('');
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
    setAriaHiddenId(e.target.value);
  }

  const hashPrefix = value => value && `#${value}`;

  return (
    <div id="modal-root" ref={modalEl}>
      <Page title="Ricos Modal API: ariaHiddenId attribute">
        <div style={{ background: 'red', zIndex: 2, position: 'absolute', width: '100%' }}>
          Some annoying div that demonstrate the usage of
          <a
            target="_blank"
            href="https://wix-incubator.github.io/rich-content/docs/ricos/ricos-api#modalsettings"
          >
            {' '}
            modalSettings' container
          </a>
        </div>
        <div style={{ zIndex: 1, position: 'absolute' }}>
          <Layout>
            <Cell>
              <FormField label="Please type in an elementID so the React Modal will implement the aria-hide attribute">
                <Input
                  size="small"
                  placeholder="body"
                  value={ariaHiddenId}
                  onChange={onChange}
                  status={!inputValidity.valid}
                  statusMessage={inputValidity.errorMessage}
                />
              </FormField>
            </Cell>
          </Layout>

          <Section>
            <RichContentEditorBox>
              {isMounted && (
                <RicosEditor
                  content={galleryState}
                  isMobile={isMobile}
                  plugins={plugins}
                  key={'editor1'}
                  modalSettings={{
                    ariaHiddenId: inputValidity.valid && hashPrefix(ariaHiddenId),
                    container: modalEl.current,
                  }}
                />
              )}
            </RichContentEditorBox>

            <div id="uniqueOne" />
          </Section>
        </div>
      </Page>
    </div>
  );
};
