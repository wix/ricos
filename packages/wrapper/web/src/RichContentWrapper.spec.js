import React from 'react';
import RichContentWrapper from './RichContentWrapper';
import { RichContentEditor } from 'wix-rich-content-editor';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { pluginHashtag } from '../../../plugin-hashtag/web/src/editor';
import introState from '../../../../e2e/tests/fixtures/intro.json';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EditorModal from './EditorModal';
import ViewerModal from './ViewerModal';

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
      const editorProps = renderResult.props.children[1].props;
      expect(editorProps).toHaveProperty('config');
      expect(editorProps.config).toHaveProperty('wix-draft-plugin-hashtag');
    });
    it('should render with themeStrategy output', () => {
      const element = shallow(wrapper({ editor: true, theme: 'Default' }).withEditor());
      const instance = element.dive().instance();
      const renderResult = instance.render();
      const editorProps = renderResult.props.children[1].props;
      expect(editorProps).toHaveProperty('theme');
      expect(editorProps.theme).toHaveProperty('modalTheme');
    });
    // it('should render with localeStrategy output', () => {
    //   const element = shallow(wrapper({ editor: true, locale: 'he' }).withEditor());
    //   const instance = element.dive().instance();
    //   const renderResult = instance.render();
    //   const editorProps = renderResult.props.children[1].props;
    //   expect(editorProps).toHaveProperty('locale');
    //   expect(editorProps).toHaveProperty('localeResources');
    // });
    it('should render EditorModal if supplied', () => {
      const element = shallow(wrapper({ editor: true }).withEditor());
      const instance = element.dive().instance();
      instance.componentDidMount();
      instance.setState({ EditorModal });
      const renderResult = instance.render();
      const modalSuspenseProps = renderResult.props.children[2].props;
      expect(modalSuspenseProps).toBeTruthy();
      expect(modalSuspenseProps.children).toMatchObject(<EditorModal />);
      const editorModalProps = modalSuspenseProps.children.props;
      expect(editorModalProps).toHaveProperty('dataHook');
      expect(editorModalProps.dataHook).toBe('WrapperEditorModal');
    });
    it('should not render EditorModal if asked', () => {
      const element = shallow(wrapper({ editor: true, modalSupport: false }).withEditor());
      const instance = element.dive().instance();
      instance.componentDidMount();
      const renderResult = instance.render();
      const modalSuspenseProps = renderResult.props.children[2].props;
      expect(modalSuspenseProps).toBeTruthy();
      expect(modalSuspenseProps.children).not.toMatchObject(<EditorModal />);
    });
    it('should not render fullscreen', () => {
      const element = shallow(wrapper({ editor: true, modalSupport: false }).withEditor());
      const instance = element.dive().instance();
      instance.componentDidMount();
      const renderResult = instance.render();
      const fullscreenModalSuspense = renderResult.props.children[3];
      expect(fullscreenModalSuspense).toBeUndefined();
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
      const viewerProps = renderResult.props.children[1].props;
      expect(viewerProps).toHaveProperty('config');
      expect(viewerProps.config).toHaveProperty('wix-draft-plugin-hashtag');
    });
    it('should render with themeStrategy output', () => {
      const element = shallow(wrapper({ theme: 'Default' }).withViewer());
      const instance = element.dive().instance();
      const renderResult = instance.render();
      const viewerProps = renderResult.props.children[1].props;
      expect(viewerProps).toHaveProperty('theme');
      expect(viewerProps).toHaveProperty('decorators');
      expect(viewerProps.theme).toHaveProperty('modalTheme');
    });
    it('should render Fullscreen if supplied', () => {
      const element = shallow(wrapper().withViewer());
      const instance = element.dive().instance();
      instance.componentDidMount();
      instance.setState({ Fullscreen: ViewerModal });
      const renderResult = instance.render();
      const modalSuspenseProps = renderResult.props.children[3].props;
      expect(modalSuspenseProps).toBeTruthy();
      expect(modalSuspenseProps.children).toMatchObject(<ViewerModal />);
      const viewerModalProps = modalSuspenseProps.children.props;
      expect(viewerModalProps).toHaveProperty('dataHook');
      expect(viewerModalProps.dataHook).toBe('WrapperFullScreen');
    });
    it('should not render Fullscreen if asked', () => {
      const element = shallow(wrapper({ modalSupport: false }).withViewer());
      const instance = element.dive().instance();
      instance.componentDidMount();
      const renderResult = instance.render();
      const modalSuspenseProps = renderResult.props.children[3].props;
      expect(modalSuspenseProps).toBeTruthy();
      expect(modalSuspenseProps.children).not.toMatchObject(<ViewerModal />);
    });
    it('should not render EditorModal', () => {
      const element = shallow(wrapper().withViewer());
      const instance = element.dive().instance();
      instance.componentDidMount();
      const renderResult = instance.render();
      const fullscreenModalSuspense = renderResult.props.children[2];
      expect(fullscreenModalSuspense).toBeUndefined();
    });
  });
});
