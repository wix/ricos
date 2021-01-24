import React from 'react';
import { TextInput } from 'wix-rich-content-plugin-commons';
import { Input } from 'wix-style-react';
import Search from 'wix-ui-icons-common/Search';
import { Section, Page } from '../Components/StoryParts';
import styles from './TextInputStory.scss';
export default () => {
  return (
    <Page title="Text Input">
      <Section type={Section.Types.COMPARISON}>
        <div className={styles.container} dir="ltr">
          <h2>Ricos</h2>
          <div>import {'{ ֿTextInput }'} from 'wix-rich-content-plugin-commons';</div>
          <div className={styles.section}>
            <label>Plain</label>
            <TextInput placeholder="Placeholder" />
          </div>
          <div className={styles.section}>
            <label>With Search Icon</label>
            <TextInput placeholder="Placeholder" searchIcon={true} />
          </div>
          <div className={styles.section}>
            <label>Error State</label>
            <TextInput placeholder="Placeholder" error={'Oh no!!!'} />
          </div>
        </div>
        <div className={styles.container}>
          <h2>WSR</h2>
          <div>import {'{ Input }'} from 'wix-style-react';</div>
          <div className={styles.section}>
            <label>Plain</label>
            <Input size="large" placeholder="Placeholder" />
          </div>
          <div className={styles.section}>
            <label>With Search Icon</label>
            <Input
              size="large"
              placeholder="Placeholder"
              prefix={
                <Input.IconAffix>
                  <Search />
                </Input.IconAffix>
              }
            />
          </div>
          <div className={styles.section}>
            <label>Error State</label>
            <Input size="large" status="error" placeholder="Placeholder" />
          </div>
        </div>
      </Section>
    </Page>
  );
};
