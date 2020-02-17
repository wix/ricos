import React from 'react';
import { RichContentEditorBox, Page } from '../Components/StoryParts';
import exapmleState from '../../../../e2e/tests/fixtures/basic-plugins.json';
import Palette from '../Components/Palette';
import { wixPalettes } from '../palettesExample';
import { RichContentEditor, convertFromRaw, createWithContent } from 'wix-rich-content-editor';
import { RichContentWrapper } from 'wix-rich-content-wrapper';
import { pluginButton } from 'wix-rich-content-plugin-button';
import { pluginCodeBlock } from 'wix-rich-content-plugin-code-block';
import { pluginDivider } from 'wix-rich-content-plugin-divider';
import { pluginEmoji } from 'wix-rich-content-plugin-emoji';
import { pluginFileUpload } from 'wix-rich-content-plugin-file-upload';
import { pluginGallery } from 'wix-rich-content-plugin-gallery';
import { pluginGiphy } from 'wix-rich-content-plugin-giphy';
import { pluginHashtag } from 'wix-rich-content-plugin-hashtag';
import { pluginHeadersMarkdown } from 'wix-rich-content-plugin-headers-markdown';
import { pluginHtml } from 'wix-rich-content-plugin-html';
import { pluginImage } from 'wix-rich-content-plugin-image';
import { pluginLineSpacing } from 'wix-rich-content-plugin-line-spacing';
import { pluginLink } from 'wix-rich-content-plugin-link';
import { pluginMap } from 'wix-rich-content-plugin-map';
import { pluginMentions } from 'wix-rich-content-plugin-mentions';
import { pluginSoundCloud } from 'wix-rich-content-plugin-sound-cloud';
import SegmentedToggle from 'wix-style-react/SegmentedToggle';
import FormField from 'wix-style-react/FormField';
import { configs } from './pluginConfigs';
import { Layout } from 'wix-style-react/Layout';
import '../styles.global.scss';

const editorState = createWithContent(convertFromRaw(exapmleState));
const plugins = [
  pluginButton(),
  pluginCodeBlock(),
  pluginDivider(),
  pluginEmoji(),
  pluginFileUpload(configs.fileUpload),
  pluginGallery(),
  pluginGiphy(configs.giphy),
  pluginHashtag(),
  pluginHtml(),
  pluginImage(),
  pluginHeadersMarkdown(),
  pluginLineSpacing(),
  pluginLink(),
  pluginMap({ googleMapApiKey: process.env.GOOGLE_MAPS_API_KEY }),
  pluginMentions(),
  pluginSoundCloud(),
];

export default () => {
  return (
    <Page title="Palettes">
      <ThemeSelector />
    </Page>
  );
};

class ThemeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.palettes = Object.keys(wixPalettes);
    this.state = {
      selected: this.palettes[0],
    };
  }
  render() {
    const { selected = this.palettes[0] } = this.state;
    return (
      <React.Fragment>
        <Palette palette={wixPalettes[selected]} />
        <div style={{ height: '30px' }} />
        <Layout cols={1}>
          <FormField label="Choose a Palette:">
            <SegmentedToggle
              defaultSelected={this.palettes[0]}
              onClick={(evt, palette) => this.setState({ selected: palette })}
            >
              {this.palettes.map((palette, idx) => (
                <SegmentedToggle.Button
                  value={palette}
                  key={`p${idx}`}
                  selected={selected === palette}
                >
                  {palette}
                </SegmentedToggle.Button>
              ))}
            </SegmentedToggle>
          </FormField>
        </Layout>
        <RichContentEditorBox>
          <RichContentWrapper
            key={selected}
            plugins={plugins}
            theme={'Palette'}
            palette={wixPalettes[selected]}
            modalSupport
          >
            <RichContentEditor editorState={editorState} />
          </RichContentWrapper>
        </RichContentEditorBox>
      </React.Fragment>
    );
  }
}
