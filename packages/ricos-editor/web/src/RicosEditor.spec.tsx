/* eslint-disable max-len */
import React from 'react';
import { RicosEditorType as RicosEditor, RicosEditorProps, DraftEditorSettings } from './index';
import { RichContentEditor } from 'wix-rich-content-editor';
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
import {
  content,
  blockKey,
  selectionState1,
  selectionState2,
  pluginsTestConfig,
  decorationsTestConfig,
} from './utils/editorCommandsUtil';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'mutationobserver-shim';
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

const forceSelection = true;

const isRicosSchema = true;

const useCurrentData = true;

const insertPluginTest = ([pluginName, { type, data, expectedData }]) =>
  it(`should insert ${pluginName}`, () => {
    const ricosEditor = getRicosEditorInstance({ plugins, content }) as RicosEditor;
    ricosEditor.getEditorCommands().insertBlock(type, data, forceSelection, isRicosSchema);
    expect(ricosEditor.getEditorCommands().getSelectedBlockData()).toEqual(expectedData);
  });

const updatePluginTest = ([pluginName, { type, data, updatedData, expectedUpdatedData }]) =>
  it(`should update ${pluginName}`, () => {
    const ricosEditor = getRicosEditorInstance({ plugins, content }) as RicosEditor;
    ricosEditor.getEditorCommands().insertBlock(type, data, forceSelection, isRicosSchema);
    const blockKey = ricosEditor.getEditorCommands().getSelectedBlockKey();
    ricosEditor
      .getEditorCommands()
      .updateBlock(blockKey, type, updatedData, forceSelection, isRicosSchema, useCurrentData);
    expect(ricosEditor.getEditorCommands().getSelectedBlockData()).toEqual(expectedUpdatedData);
  });

const deletePluginTest = ([pluginName, { type, data }]) =>
  it(`should remove ${pluginName}`, () => {
    const ricosEditor = getRicosEditorInstance({ plugins, content }) as RicosEditor;
    ricosEditor.getEditorCommands().insertBlock(type, data, forceSelection, isRicosSchema);
    const blockKey = ricosEditor.getEditorCommands().getSelectedBlockKey();
    ricosEditor.getEditorCommands().deleteBlock(blockKey);
    expect(ricosEditor.getEditorCommands().getSelectedBlockData()).toEqual({});
  });

const insertDecorationTest = ([pluginName, { type, data, expectedData }]) =>
  it(`should insert ${pluginName}`, () => {
    const ricosEditor = getRicosEditorInstance({ plugins, content }) as RicosEditor;
    ricosEditor.getEditorCommands().setSelection(blockKey, selectionState1);
    ricosEditor.getEditorCommands().insertDecoration(type, data, isRicosSchema);
    // TODO: check this behaviour
    ricosEditor.getEditorCommands().setSelection(blockKey, selectionState2);
    expect(ricosEditor.getEditorCommands().getSelectedBlockData()).toEqual(expectedData);
  });

const updateDecorationTest = ([pluginName, { type, data, updatedData, expectedUpdatedData }]) =>
  it(`should update ${pluginName}`, () => {
    const ricosEditor = getRicosEditorInstance({ plugins, content }) as RicosEditor;
    ricosEditor.getEditorCommands().setSelection(blockKey, selectionState1);
    ricosEditor.getEditorCommands().insertDecoration(type, data, isRicosSchema);
    // TODO: check this behaviour
    ricosEditor.getEditorCommands().setSelection(blockKey, selectionState1);
    ricosEditor.getEditorCommands().insertDecoration(type, updatedData, isRicosSchema);
    // TODO: check this behaviour
    ricosEditor.getEditorCommands().setSelection(blockKey, selectionState2);
    expect(ricosEditor.getEditorCommands().getSelectedBlockData()).toEqual(expectedUpdatedData);
  });

const deleteDecorationTest = ([pluginName, { type, data }]) =>
  it(`should remove ${pluginName}`, () => {
    const ricosEditor = getRicosEditorInstance({ plugins, content }) as RicosEditor;
    ricosEditor.getEditorCommands().setSelection(blockKey, selectionState1);
    ricosEditor.getEditorCommands().insertDecoration(type, data, isRicosSchema);
    // TODO: check this behaviour
    ricosEditor.getEditorCommands().setSelection(blockKey, selectionState2);
    ricosEditor.getEditorCommands().deleteDecoration(type);
    expect(ricosEditor.getEditorCommands().getSelectedBlockData()).toEqual({});
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
    describe('Editor text formatting API', () => {
      it('should have left text alignment', () => {
        const ricosEditor = getRicosEditorInstance({ content }) as RicosEditor;
        ricosEditor.getEditorCommands().setSelection('o12', {});
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
      it('should have bold inline style', async () => {
        const ricosEditor = getRicosEditorInstance({ content }) as RicosEditor;
        ricosEditor.getEditorCommands().setSelection(blockKey, selectionState1);
        ricosEditor.getEditorCommands().toggleInlineStyle('bold');
        expect(ricosEditor.getEditorCommands().hasInlineStyle('bold')).toBeTruthy();
      });
      it('should not have bold inline style', async () => {
        const ricosEditor = getRicosEditorInstance({ content }) as RicosEditor;
        ricosEditor.getEditorCommands().setSelection(blockKey, selectionState1);
        ricosEditor.getEditorCommands().toggleInlineStyle('bold');
        ricosEditor.getEditorCommands().toggleInlineStyle('bold');
        expect(ricosEditor.getEditorCommands().hasInlineStyle('bold')).toBeFalsy();
      });
      it('should have italic inline style', async () => {
        const ricosEditor = getRicosEditorInstance({ content }) as RicosEditor;
        ricosEditor.getEditorCommands().setSelection(blockKey, selectionState1);
        ricosEditor.getEditorCommands().toggleInlineStyle('italic');
        expect(ricosEditor.getEditorCommands().hasInlineStyle('italic')).toBeTruthy();
      });
      it('should not have italic inline style', async () => {
        const ricosEditor = getRicosEditorInstance({ content }) as RicosEditor;
        ricosEditor.getEditorCommands().setSelection(blockKey, selectionState1);
        ricosEditor.getEditorCommands().toggleInlineStyle('italic');
        ricosEditor.getEditorCommands().toggleInlineStyle('italic');
        expect(ricosEditor.getEditorCommands().hasInlineStyle('italic')).toBeFalsy();
      });
      it('should have underline inline style', async () => {
        const ricosEditor = getRicosEditorInstance({ content }) as RicosEditor;
        ricosEditor.getEditorCommands().setSelection(blockKey, selectionState1);
        ricosEditor.getEditorCommands().toggleInlineStyle('underline');
        expect(ricosEditor.getEditorCommands().hasInlineStyle('underline')).toBeTruthy();
      });
      it('should not have underline inline style', async () => {
        const ricosEditor = getRicosEditorInstance({ content }) as RicosEditor;
        ricosEditor.getEditorCommands().setSelection(blockKey, selectionState1);
        ricosEditor.getEditorCommands().toggleInlineStyle('underline');
        ricosEditor.getEditorCommands().toggleInlineStyle('underline');
        expect(ricosEditor.getEditorCommands().hasInlineStyle('underline')).toBeFalsy();
      });
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
        ricosEditor.getEditorCommands().setSelection(blockKey, selectionState1);
        ricosEditor.getEditorCommands().toggleInlineStyle('bold');
        expect(ricosEditor.getEditorCommands().isUndoStackEmpty()).toBeFalsy();
      });
      it('should redo stack be not empty', async () => {
        const ricosEditor = getRicosEditorInstance({ content }) as RicosEditor;
        ricosEditor.getEditorCommands().setSelection(blockKey, selectionState1);
        ricosEditor.getEditorCommands().toggleInlineStyle('bold');
        ricosEditor.getEditorCommands().undo();
        expect(ricosEditor.getEditorCommands().isRedoStackEmpty()).toBeFalsy();
      });
      it('should change block to numbered list', async () => {
        const ricosEditor = getRicosEditorInstance({ content }) as RicosEditor;
        ricosEditor.getEditorCommands().setSelection(blockKey, selectionState1);
        ricosEditor.getEditorCommands().setBlockType('ordered-list-item');
        expect(
          ricosEditor.getEditorCommands().isBlockTypeSelected('ordered-list-item')
        ).toBeTruthy();
      });
    });
    describe('Editor Decorations API', () => {
      Object.entries(decorationsTestConfig).forEach(insertDecorationTest);
      Object.entries(decorationsTestConfig).forEach(updateDecorationTest);
      Object.entries(decorationsTestConfig).forEach(deleteDecorationTest);
    });
    describe('Editor Plugins API', () => {
      Object.entries(pluginsTestConfig).forEach(insertPluginTest);
      Object.entries(pluginsTestConfig).forEach(updatePluginTest);
      Object.entries(pluginsTestConfig).forEach(deletePluginTest);
    });
  });
});
