import React, { useState } from 'react';
import { SettingsMobileHeader } from 'wix-rich-content-plugin-commons';
import { Button } from 'wix-style-react';

import { Section, Page } from '../Components/StoryParts';
import styles from './TextInputStory.scss';
export default () => {
  const [withMoreTab, setMoreTab] = useState(false);

  return (
    <Page title="Mobile Setting Header">
      <Section>
        <div className={styles.container} dir="ltr">
          <div>import {'{ SettingsMobileHeader }'} from 'wix-rich-content-plugin-commons';</div>
          <Button onClick={() => setMoreTab(!withMoreTab)}>
            {withMoreTab ? 'Without' : 'With'} More Tab
          </Button>
          <div className={styles.section} style={{ position: 'relative' }}>
            <SettingsMobileHeader
              cancelLabel="Cancel"
              saveLabel="Save"
              otherTab={withMoreTab && 'One more tab'}
              switchTab={() => console.log('tab switched')}
            />
          </div>
        </div>
      </Section>
    </Page>
  );
};
