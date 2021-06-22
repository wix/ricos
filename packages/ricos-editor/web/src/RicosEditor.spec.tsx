/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import React from 'react';
import { version } from '../package.json';
import { RicosEditorType as RicosEditor, RicosEditorProps, DraftEditorSettings } from './index';
import { RichContentEditor } from 'wix-rich-content-editor';
import { BICallbacks, RICOS_MENTION_TYPE } from 'wix-rich-content-common';
import introState from '../../../../e2e/tests/fixtures/intro.json';
import { pluginHashtag, HASHTAG_TYPE } from '../../../plugin-hashtag/web/src';
import { pluginDivider } from '../../../plugin-divider/web/src';
import { pluginGiphy } from '../../../plugin-giphy/web/src';
import { pluginHtml } from '../../../plugin-html/web/src';
import { pluginGallery } from '../../../plugin-gallery/web/src';
import { pluginPoll } from '../../../plugin-social-polls/web/src';
import { pluginVideo } from '../../../plugin-video/web/src';
import { pluginFileUpload } from '../../../plugin-file-upload/web/src';
import { pluginImage } from '../../../plugin-image/web/src';
import { pluginLink } from '../../../plugin-link/web/src';
import { pluginMentions } from '../../../plugin-mentions/web/src';
import { pluginSpoiler } from '../../../plugin-spoiler/web/src';
import { convertNodeDataToDraft } from 'ricos-content/libs/toDraftData';
import {
  content,
  blockKey,
  selection,
  inlineStylesTestConfig,
  pluginsTestConfig,
  decorationsTestConfig,
} from './utils/editorCommandsTestsUtil';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { default as hebResource } from 'wix-rich-content-common/dist/statics/locale/messages_he.json';

Enzyme.configure({ adapter: new Adapter() });
const { shallow, mount } = Enzyme;

const plugins = [
  pluginDivider(),
  pluginGiphy(),
  pluginHtml(),
  pluginGallery(),
  pluginPoll(),
  pluginVideo(),
  pluginFileUpload(),
  pluginImage(),
  pluginLink(),
  pluginHashtag(),
  pluginMentions(),
  pluginSpoiler(),
];

const getRicosEditor = (ricosEditorProps?: RicosEditorProps) =>
  mount(<RicosEditor {...(ricosEditorProps || {})} />);

const getStaticToolbar = ricosEditor => ricosEditor.children().first();

// const getRicosEngine = (ricosEditorProps?: RicosEditorProps) =>
//   getRicosEditor(ricosEditorProps)
//     .children()
//     .last()
//     .instance();

const getRicosEditorInstance = (ricosEditorProps?: RicosEditorProps) =>
  getRicosEditor(ricosEditorProps).instance();

const getRCE = (ricosEditorProps?: RicosEditorProps, asWrapper?: boolean) => {
  const toRender = !asWrapper ? (
    <RicosEditor {...(ricosEditorProps || {})} />
  ) : (
    <RicosEditor {...(ricosEditorProps || {})}>
      <RichContentEditor />
    </RicosEditor>
  );

  const element = shallow(toRender)
    .children()
    .last()
    .dive()
    .children();

  return element.at(element.length - 1); // due to add html by strategies
};

type Settings = { isRicosSchema?: boolean };

const isMention = type => type === RICOS_MENTION_TYPE;

const toggleInlineStyleTest = result => inlineStyle =>
  it(`should ${result ? '' : 'not '}have ${inlineStyle} inline style`, () => {
    const ricosEditor = getRicosEditorInstance({ plugins, content }) as RicosEditor;
    ricosEditor.getEditorCommands().setSelection(blockKey, selection);
    ricosEditor.getEditorCommands().toggleInlineStyle(inlineStyle);
    !result && ricosEditor.getEditorCommands().toggleInlineStyle(inlineStyle);
    expect(ricosEditor.getEditorCommands().hasInlineStyle(inlineStyle)).toEqual(result);
  });

const insertPluginTest = (settings: Settings) => ([
  pluginName,
  { type, nodeType, data1, expectedData1 },
]) =>
  it(`should insert ${pluginName}`, () => {
    const ricosEditor = getRicosEditorInstance({ plugins, content }) as RicosEditor;
    data1 = settings?.isRicosSchema ? data1 : convertNodeDataToDraft(nodeType, data1);
    ricosEditor.getEditorCommands().insertBlock(type, data1, settings);
    expect(ricosEditor.getEditorCommands().getSelectedData()).toEqual(expectedData1);
  });

const setPluginTest = (settings: Settings) => ([
  pluginName,
  { type, nodeType, data1, data2, expectedData2 },
]) =>
  it(`should set ${pluginName}`, () => {
    const ricosEditor = getRicosEditorInstance({ plugins, content }) as RicosEditor;
    data1 = settings?.isRicosSchema ? data1 : convertNodeDataToDraft(nodeType, data1);
    data2 = settings?.isRicosSchema ? data2 : convertNodeDataToDraft(nodeType, data2);
    const blockKey = ricosEditor.getEditorCommands().insertBlock(type, data1, settings);
    ricosEditor.getEditorCommands().setBlock(blockKey, type, data2, settings);
    expect(ricosEditor.getEditorCommands().getSelectedData()).toEqual(expectedData2);
  });

const deletePluginTest = (settings: Settings) => ([pluginName, { type, nodeType, data1 }]) =>
  it(`should remove ${pluginName}`, () => {
    const ricosEditor = getRicosEditorInstance({ plugins, content }) as RicosEditor;
    data1 = settings?.isRicosSchema ? data1 : convertNodeDataToDraft(nodeType, data1);
    const blockKey = ricosEditor.getEditorCommands().insertBlock(type, data1, settings);
    ricosEditor.getEditorCommands().deleteBlock(blockKey);
    expect(ricosEditor.getEditorCommands().getSelectedData()).toEqual({});
  });

const insertDecorationTest = (settings: Settings) => ([
  pluginName,
  { type, data1, selection1, expectedData1, selection2 },
]) =>
  it(`should insert ${pluginName}`, () => {
    const ricosEditor = getRicosEditorInstance({ plugins, content }) as RicosEditor;
    ricosEditor.getEditorCommands().setSelection(blockKey, selection1);
    isMention(type) && ricosEditor.getEditorCommands().triggerDecoration(type);
    ricosEditor.getEditorCommands().insertDecoration(type, data1, settings);
    ricosEditor.getEditorCommands().setSelection(blockKey, selection2);
    expect(ricosEditor.getEditorCommands().getSelectedData()).toEqual(expectedData1);
  });

const setDecorationTest = (settings: Settings) => ([
  pluginName,
  { type, data1, selection1, data2, selection2, expectedData2 },
]) =>
  !isMention(type) &&
  it(`should set ${pluginName}`, () => {
    const ricosEditor = getRicosEditorInstance({ plugins, content }) as RicosEditor;
    ricosEditor.getEditorCommands().setSelection(blockKey, selection1);
    ricosEditor.getEditorCommands().insertDecoration(type, data1, settings);
    ricosEditor.getEditorCommands().setSelection(blockKey, selection1);
    ricosEditor.getEditorCommands().insertDecoration(type, data2, settings);
    ricosEditor.getEditorCommands().setSelection(blockKey, selection2);
    expect(ricosEditor.getEditorCommands().getSelectedData()).toEqual(expectedData2);
  });

const deleteDecorationTest = (settings: Settings) => ([
  pluginName,
  { type, data1, selection1, selection2 },
]) =>
  !isMention(type) &&
  it(`should remove ${pluginName}`, () => {
    const ricosEditor = getRicosEditorInstance({ plugins, content }) as RicosEditor;
    ricosEditor.getEditorCommands().setSelection(blockKey, selection1);
    ricosEditor.getEditorCommands().insertDecoration(type, data1, settings);
    ricosEditor.getEditorCommands().setSelection(blockKey, selection2);
    ricosEditor.getEditorCommands().deleteDecoration(type);
    expect(ricosEditor.getEditorCommands().getSelectedData()).toEqual({});
  });

describe('RicosEditor', () => {
  it('should render editor', () => {
    const element = getRicosEditor();
    expect(element).toBeTruthy();
  });
  it('should render editor with locale', () => {
    const element = getRicosEditor({ locale: 'he' });
    expect(element).toBeTruthy();
  });
  it('should render locale="en" if unspecified', () => {
    const rceProps = getRCE().props();
    expect(rceProps).toHaveProperty('locale');
    expect(rceProps.locale).toEqual('en');
  });
  it('should render locale="he"', () => {
    const rceProps = getRCE({ locale: 'he' }).props();
    expect(rceProps).toHaveProperty('locale');
    expect(rceProps.locale).toEqual('he');
  });
  it('should render with pluginsStrategy output', () => {
    const rceProps = getRCE({ plugins }).props();
    expect(rceProps).toHaveProperty('config');
    expect(rceProps.config).toHaveProperty('wix-draft-plugin-hashtag');
  });
  it('should render with themeStrategy output', () => {
    const rceProps = getRCE({ theme: { palette: 'darkTheme' } }).props();
    expect(rceProps).toHaveProperty('theme');
    expect(rceProps.theme).toHaveProperty('modalTheme');
  });
  // locale strategy moved from RicosEngine to RicosEditor/RicosViewer
  //
  // it('should call updateLocale on componentDidMount', () => {
  //   const ricosEngineInstance = getRicosEngine() as RicosEngine;
  //   const spyUpdate = spyOn(ricosEngineInstance, 'updateLocale');
  //   ricosEngineInstance.componentDidMount();
  //   expect(spyUpdate.calls.count()).toEqual(1);
  // });
  // it('should render localeStrategy in strategies', async () => {
  //   const ricosEngineInstance = getRicosEngine({ locale: 'he' }) as RicosEngine;
  //   await ricosEngineInstance.updateLocale();
  //   const renderResult = ricosEngineInstance.render();
  //   expect(renderResult[1].props).toMatchObject({
  //     locale: 'he',
  //     localeResource: hebResource,
  //   });
  // });
  it('should call updateLocale on componentDidMount', () => {
    const ricosEditor = getRicosEditorInstance() as RicosEditor;
    const spyUpdate = spyOn(ricosEditor, 'updateLocale');
    ricosEditor.componentDidMount();
    expect(spyUpdate.calls.count()).toEqual(1);
  });
  it('should render localeStrategy in strategies', async () => {
    const ricosEditor = getRicosEditorInstance({ locale: 'he' }) as RicosEditor;
    await ricosEditor.updateLocale();
    expect(ricosEditor.state.localeData).toMatchObject({
      locale: 'he',
      localeResource: hebResource,
    });
  });
  it('should render a static text toolbar', () => {
    const ricosEditor = getRicosEditor({ toolbarSettings: { useStaticTextToolbar: true } });
    const staticToolbar = getStaticToolbar(ricosEditor);
    expect(staticToolbar.props().StaticToolbar).toBeTruthy();
  });
  it('should render a static text toolbar', () => {
    const container = document.createElement('div');
    const ricosEditor = getRicosEditor({ toolbarSettings: { textToolbarContainer: container } });
    const staticToolbarProps = getStaticToolbar(ricosEditor).props();
    expect(staticToolbarProps.StaticToolbar).toBeTruthy();
    expect(staticToolbarProps.textToolbarContainer).toEqual(container);
  });
  it('should create same props with & without a wrapping component', () => {
    const props: RicosEditorProps = {
      theme: { palette: 'darkTheme' },
      locale: 'fr',
      content: introState,
      isMobile: true,
      _rcProps: {
        helpers: { dummyFunction: () => true },
        config: { [HASHTAG_TYPE]: {} },
      },
      plugins,
      placeholder: 'dummyPlaceHolder',
      onError: () => true,
    };
    const rceProps = getRCE(props).props();
    const rcePropsWrapped = getRCE(props, true).props();
    // hashed theme classnames can be different; assert keys only.
    const themeKeys = Object.keys(rceProps.theme);
    const themeKeys_wrapped = Object.keys(rcePropsWrapped.theme);
    expect(themeKeys).toStrictEqual(themeKeys_wrapped);
    const rceProps_noTheme = JSON.stringify({ ...rceProps, theme: {} });
    const rcePropsWrapped_noTheme = JSON.stringify({ ...rcePropsWrapped, theme: {} });
    expect(rceProps_noTheme).toStrictEqual(rcePropsWrapped_noTheme);
  });
  it('should only accept valid Draft-js editor props', () => {
    const draftEditorSettings: DraftEditorSettings & { notADraftSetting: boolean } = {
      tabIndex: -1,
      spellCheck: true,
      stripPastedStyles: false,
      notADraftSetting: false,
    };
    const rceProps = getRCE({ draftEditorSettings }).props();
    expect(rceProps).toHaveProperty('theme');
    expect(rceProps.tabIndex).toEqual(-1);
    expect(rceProps.spellCheck).toEqual(true);
    expect(rceProps).not.toHaveProperty('notADraftSetting');
  });
  it('should trigger onOpenEditorSuccess upon mount', () => {
    let reportedVersion = '';
    const onOpenEditorSuccessMock: BICallbacks['onOpenEditorSuccess'] = v => (reportedVersion = v);
    const fn = jest.fn(onOpenEditorSuccessMock);
    getRicosEditor({ _rcProps: { helpers: { onOpenEditorSuccess: fn } } });
    expect(fn).toBeCalledTimes(1);
    expect(reportedVersion).toEqual(version);
  });
  describe('Modal API', () => {
    it('should pass openModal & closeModal to helpers', () => {
      const modalSettings = { openModal: () => 'open', closeModal: () => 'close' };
      const rceProps = getRCE({ modalSettings }).props();
      expect(rceProps).toHaveProperty('helpers');
      const { openModal, closeModal } = rceProps.helpers;
      expect({ openModal, closeModal }).toStrictEqual(modalSettings);
    });
  });
  describe('Editor Commands API', () => {
    beforeEach(() => {
      global.window.getSelection = jest.fn().mockImplementation(() => {
        return {
          removeAllRanges: () => {},
        };
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any).MutationObserver = class {
        disconnect() {}

        observe() {}
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any).ResizeObserver = class {
        observe() {}

        unobserve() {}
      };
    });

    describe('Editor text formatting API', () => {
      it('should have left text alignment', () => {
        const ricosEditor = getRicosEditorInstance({ content }) as RicosEditor;
        const textAlignment = ricosEditor.getEditorCommands().getTextAlignment();
        expect(textAlignment).toEqual('left');
      });
      it('should have right text alignment', () => {
        const ricosEditor = getRicosEditorInstance({ content }) as RicosEditor;
        const alignment = 'right';
        ricosEditor.getEditorCommands().setTextAlignment(alignment);
        const textAlignment = ricosEditor.getEditorCommands().getTextAlignment();
        expect(textAlignment).toEqual(alignment);
      });
      inlineStylesTestConfig.forEach(toggleInlineStyleTest(true));
      inlineStylesTestConfig.forEach(toggleInlineStyleTest(false));
      it('should undo stack be empty', async () => {
        const ricosEditor = getRicosEditorInstance({ content }) as RicosEditor;
        expect(ricosEditor.getEditorCommands().isUndoStackEmpty()).toBeTruthy();
      });
      it('should redo stack be empty', async () => {
        const ricosEditor = getRicosEditorInstance({ content }) as RicosEditor;
        expect(ricosEditor.getEditorCommands().isRedoStackEmpty()).toBeTruthy();
      });
      it('should undo stack be not empty', async () => {
        const ricosEditor = getRicosEditorInstance({ content }) as RicosEditor;
        ricosEditor.getEditorCommands().setSelection(blockKey, selection);
        ricosEditor.getEditorCommands().toggleInlineStyle('bold');
        expect(ricosEditor.getEditorCommands().isUndoStackEmpty()).toBeFalsy();
      });
      it('should redo stack be not empty', async () => {
        const ricosEditor = getRicosEditorInstance({ content }) as RicosEditor;
        ricosEditor.getEditorCommands().setSelection(blockKey, selection);
        ricosEditor.getEditorCommands().toggleInlineStyle('bold');
        ricosEditor.getEditorCommands().undo();
        expect(ricosEditor.getEditorCommands().isRedoStackEmpty()).toBeFalsy();
      });
      it('should change block to numbered list', async () => {
        const ricosEditor = getRicosEditorInstance({ content }) as RicosEditor;
        ricosEditor.getEditorCommands().setSelection(blockKey, selection);
        ricosEditor.getEditorCommands().setBlockType('ordered-list-item');
        expect(
          ricosEditor.getEditorCommands().isBlockTypeSelected('ordered-list-item')
        ).toBeTruthy();
      });
    });
    describe('Editor Decorations API (Ricos Schema)', () => {
      const settings = { isRicosSchema: true };
      Object.entries(decorationsTestConfig).forEach(insertDecorationTest(settings));
      Object.entries(decorationsTestConfig).forEach(setDecorationTest(settings));
      Object.entries(decorationsTestConfig).forEach(deleteDecorationTest(settings));
    });
    describe('Editor Plugins API (Ricos Schema)', () => {
      const settings = { isRicosSchema: true };
      Object.entries(pluginsTestConfig).forEach(insertPluginTest(settings));
      Object.entries(pluginsTestConfig).forEach(setPluginTest(settings));
      Object.entries(pluginsTestConfig).forEach(deletePluginTest(settings));
    });
    describe('Editor Plugins API (Old Schema)', () => {
      const settings = {};
      Object.entries(pluginsTestConfig).forEach(insertPluginTest(settings));
      Object.entries(pluginsTestConfig).forEach(setPluginTest(settings));
      Object.entries(pluginsTestConfig).forEach(deletePluginTest(settings));
    });
  });
});
