import React from 'react';
import RichContentWrapper from './RichContentWrapper';
import { RichContentEditor } from 'wix-rich-content-editor';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { pluginHashtag } from '../../../plugin-hashtag/web/src/editor';
import introState from '../../../../e2e/tests/fixtures/intro.json';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import localeStrategyProvider from './localeStrategy/localeStrategyProvider';

Enzyme.configure({ adapter: new Adapter() });
const { shallow, mount } = Enzyme;

const wrapper = wrapperProps => ({
  withEditor: editorProps => (
    <RichContentWrapper {...(wrapperProps || {})} editor>
      <RichContentEditor {...(editorProps || {})} />
    </RichContentWrapper>
  ),
  withViewer: viewerProps => (
    <RichContentWrapper {...(wrapperProps || {})}>
      <RichContentViewer {...(viewerProps || { initialState: introState })} />
    </RichContentWrapper>
  ),
});

// eslint-disable-next-line no-unused-vars
const plugins = [pluginHashtag()];

describe('Wrapper', () => {
  it('should render editor', () => {
    const element = shallow(wrapper({ editor: true }).withEditor());
    expect(element).toBeTruthy();
    expect(element.find('#engine_wrapper')).toBeTruthy();
  });

  it('should render editor with locale', () => {
    const element = shallow(wrapper({ editor: true, locale: 'he' }).withEditor());
    expect(element).toBeTruthy();
  });

  it('should render viewer', () => {
    const element = shallow(wrapper().withViewer());
    expect(element).toBeTruthy();
  });

  describe('Editor', () => {
    it('should render locale="en" if unspecified', () => {
      const element = mount(wrapper({ editor: true }).withEditor());
      expect(element.props()).toHaveProperty('locale');
      expect(element.props().locale).toEqual('en');
    });
    it('should render editor child if provided', () => {
      const element = mount(wrapper({ editor: true }).withEditor());
      expect(element.props()).toHaveProperty('children');
    });
    it('should render with pluginsStrategy output', () => {
      const element = shallow(wrapper({ editor: true, plugins }).withEditor());
      const instance = element.dive().instance();
      const renderResult = instance.render();
      const editorProps = renderResult.props.children.props;
      expect(editorProps).toHaveProperty('config');
      expect(editorProps.config).toHaveProperty('wix-draft-plugin-hashtag');
    });
    it('should render with themeStrategy output', () => {
      const element = shallow(wrapper({ editor: true, theme: 'Default' }).withEditor());
      const instance = element.dive().instance();
      const renderResult = instance.render();
      const editorProps = renderResult.props.children.props;
      expect(editorProps).toHaveProperty('theme');
      expect(editorProps.theme).toHaveProperty('modalTheme');
    });
    it('should call updateLocale on componentDidMount', () => {
      const element = shallow(wrapper({ editor: true, locale: 'en' }).withEditor());
      const instance = element.instance();
      const spyUpdate = spyOn(instance, 'updateLocale');
      instance.componentDidMount();
      expect(spyUpdate.calls.count()).toEqual(1);
    });
    it('should render localeStrategy in strategies', async () => {
      const element = shallow(wrapper({ editor: true, locale: 'he' }).withEditor());
      const instance = element.instance();
      const renderResult = instance.render();
      await instance.updateLocale();
      const engineProps = renderResult.props;
      expect(engineProps).toHaveProperty('strategies');
      expect(instance.state.localeStrategy()).toEqual(
        await localeStrategyProvider({ locale: 'he' })()
      );
    });
  });

  describe('Viewer', () => {
    it('should render locale="en" if unspecified', () => {
      const element = mount(wrapper().withViewer());
      expect(element.props()).toHaveProperty('locale');
      expect(element.props().locale).toEqual('en');
    });
    it('should render viewer child if provided', () => {
      const element = mount(wrapper().withViewer());
      expect(element.props()).toHaveProperty('children');
    });
    it('should render with pluginsStrategy output', () => {
      const element = shallow(wrapper({ plugins }).withViewer());
      const instance = element.dive().instance();
      const renderResult = instance.render();
      const viewerProps = renderResult.props.children.props;
      expect(viewerProps).toHaveProperty('config');
      expect(viewerProps.config).toHaveProperty('wix-draft-plugin-hashtag');
    });
    it('should render with themeStrategy output', () => {
      const element = shallow(wrapper({ theme: 'Default' }).withViewer());
      const instance = element.dive().instance();
      const renderResult = instance.render();
      const viewerProps = renderResult.props.children.props;
      expect(viewerProps).toHaveProperty('theme');
      expect(viewerProps).toHaveProperty('decorators');
      expect(viewerProps.theme).toHaveProperty('modalTheme');
    });
  });
});
