/* eslint-disable max-len */
import React from 'react';
import { RicosEditor, RicosViewer } from './index';
import { RichContentEditor } from 'wix-rich-content-editor';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { pluginHashtag } from '../../../plugin-hashtag/web/src/editor';
import introState from '../../../../e2e/tests/fixtures/intro.json';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { default as hebResource } from 'wix-rich-content-common/dist/statics/locale/messages_he.json';

Enzyme.configure({ adapter: new Adapter() });
const { shallow } = Enzyme;

const wrapper = (wrapperProps?: any) => ({
  withEditor: (editorProps?: RichContentProps) => (
    <RicosEditor {...(wrapperProps || {})}>
      <RichContentEditor {...(editorProps || {})} />
    </RicosEditor>
  ),
  withViewer: (viewerProps?: RichContentProps) => (
    <RicosViewer {...(wrapperProps || {})}>
      <RichContentViewer {...(viewerProps || { initialState: introState })} />
    </RicosViewer>
  ),
});

// eslint-disable-next-line no-unused-vars
const plugins = [pluginHashtag()];

const getEditorWrapperElement = wrapper =>
  shallow(wrapper)
    .children()
    .last();
const getViewerWrapperElement = wrapper => shallow(wrapper);

const getChildElement = wrapperElement => wrapperElement.dive().children();
const getEditorWrapperChildElement = wrapper => getChildElement(getEditorWrapperElement(wrapper));
const getViewerWrapperChildElement = wrapper => getChildElement(getViewerWrapperElement(wrapper));

// eslint-disable-next-line mocha/no-skipped-tests
describe('Wrapper', () => {
  it('should render editor', () => {
    const element = shallow(wrapper().withEditor());
    expect(element).toBeTruthy();
    expect(element.find('#engine_wrapper')).toBeTruthy();
  });

  it('should render editor with locale', () => {
    const element = shallow(wrapper({ locale: 'he' }).withEditor());
    expect(element).toBeTruthy();
  });

  it('should render viewer', () => {
    const element = shallow(wrapper().withViewer());
    expect(element).toBeTruthy();
  });

  describe('Editor', () => {
    it('should render locale="en" if unspecified', () => {
      const wrapperElementProps = getEditorWrapperElement(wrapper().withEditor()).props();
      expect(wrapperElementProps).toHaveProperty('locale');
      expect(wrapperElementProps.locale).toEqual('en');
    });
    it('should render editor child if provided', () => {
      const wrapperElementProps = getEditorWrapperElement(wrapper().withEditor()).props();
      expect(wrapperElementProps).toHaveProperty('children');
      expect(wrapperElementProps.children.type.displayName).toEqual('RichContentEditor');
    });
    it('should render with pluginsStrategy output', () => {
      const wrapperChildElementProps = getEditorWrapperChildElement(
        wrapper({ plugins }).withEditor()
      ).props();
      expect(wrapperChildElementProps).toHaveProperty('config');
      expect(wrapperChildElementProps.config).toHaveProperty('wix-draft-plugin-hashtag');
    });
    it('should render with themeStrategy output', () => {
      const wrapperChildElementProps = getEditorWrapperChildElement(
        wrapper({ theme: 'Default' }).withEditor()
      ).props();
      expect(wrapperChildElementProps).toHaveProperty('theme');
      expect(wrapperChildElementProps.theme).toHaveProperty('modalTheme');
    });
    it('should call updateLocale on componentDidMount', () => {
      const wrapperElement = getEditorWrapperElement(wrapper().withEditor());
      const instance = wrapperElement.dive().instance();
      const spyUpdate = spyOn(instance, 'updateLocale');
      instance.componentDidMount();
      expect(spyUpdate.calls.count()).toEqual(1);
    });
    it('should render localeStrategy in strategies', async () => {
      const wrapperElement = getEditorWrapperElement(wrapper({ locale: 'he' }).withEditor());
      const instance = wrapperElement.dive().instance();
      await instance.updateLocale();
      const renderResult = instance.render();
      expect(renderResult.props).toMatchObject({
        locale: 'he',
        localeResource: hebResource,
      });
    });
  });

  describe('Viewer', () => {
    it('should render locale="en" if unspecified', () => {
      const wrapperElementProps = getViewerWrapperElement(wrapper().withViewer()).props();
      expect(wrapperElementProps).toHaveProperty('locale');
      expect(wrapperElementProps.locale).toEqual('en');
    });
    it('should render viewer child if provided', () => {
      const wrapperElementProps = getViewerWrapperElement(wrapper().withViewer()).props();
      expect(wrapperElementProps).toHaveProperty('children');
      expect(wrapperElementProps.children.type.displayName).toEqual('RichContentViewer');
    });
    it('should render with pluginsStrategy output', () => {
      const wrapperChildElementProps = getViewerWrapperChildElement(
        wrapper({ plugins }).withViewer()
      ).props();
      expect(wrapperChildElementProps).toHaveProperty('config');
      expect(wrapperChildElementProps.config).toHaveProperty('wix-draft-plugin-hashtag');
    });
    it('should render with themeStrategy output', () => {
      const wrapperChildElementProps = getViewerWrapperChildElement(
        wrapper({ theme: 'Default' }).withViewer()
      ).props();
      expect(wrapperChildElementProps).toHaveProperty('theme');
      expect(wrapperChildElementProps).toHaveProperty('decorators');
      expect(wrapperChildElementProps.theme).toHaveProperty('modalTheme');
    });
  });
});
