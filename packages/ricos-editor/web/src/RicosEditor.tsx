import React, { Component, Fragment, ElementType, FunctionComponent, forwardRef } from 'react';
import {
  RicosEngine,
  shouldRenderChild,
  localeStrategy,
  getBiCallback as getCallback,
} from 'ricos-common';
import { RichContentEditor, RichContentEditorProps } from 'wix-rich-content-editor';
import { createDataConverter, filterDraftEditorSettings } from './utils/editorUtils';
import ReactDOM from 'react-dom';
import { EditorState, ContentState } from 'draft-js';
import RicosModal from './modals/RicosModal';
import './styles.css';
import { RicosEditorProps, EditorDataInstance } from '.';
import { hasActiveUploads } from './utils/hasActiveUploads';
import {
  convertToRaw,
  convertFromRaw,
  createWithContent,
} from 'wix-rich-content-editor/libs/editorStateConversion';
import { isEqual } from 'lodash';
import {
  EditorEventsContext,
  EditorEvents,
} from 'wix-rich-content-editor-common/libs/EditorEventsContext';
import { ToolbarType, Version, getLangDir, TextButtons } from 'wix-rich-content-common';
import {
  FloatingToolbarContainer,
  Toolbar,
  StaticToolbarContainer,
} from 'wix-rich-content-toolbars-new';
import { TOOLBARS } from 'wix-rich-content-editor-common';
import { mobileTextButtonList, desktopTextButtonList } from './';

// eslint-disable-next-line
const PUBLISH_DEPRECATION_WARNING_v9 = `Please provide the postId via RicosEditor biSettings prop and use one of editorRef.publish() or editorEvents.publish() APIs for publishing.
The getContent(postId, isPublishing) API is deprecated and will be removed in ricos v9.0.0`;

interface State {
  StaticToolbar?: ElementType;
  localeData: { locale?: string; localeResource?: Record<string, string> };
  remountKey: boolean;
  editorState?: EditorState;
  initialContentChanged: boolean;
  activeEditor?: RichContentEditor | null;
}

export class RicosEditor extends Component<RicosEditorProps, State> {
  editor!: RichContentEditor;

  dataInstance: EditorDataInstance;

  isBusy = false;

  getBiCallback: typeof getCallback;

  currentEditorRef!: ElementType;

  constructor(props: RicosEditorProps) {
    super(props);
    this.dataInstance = createDataConverter(props.onChange, props.content);
    this.getBiCallback = getCallback.bind(this);
    this.state = {
      localeData: { locale: props.locale },
      remountKey: false,
      initialContentChanged: true,
      activeEditor: null,
    };
  }

  static defaultProps = { locale: 'en' };

  updateLocale = async () => {
    const { children, _rcProps } = this.props;
    const locale = children?.props.locale || this.props.locale;
    await localeStrategy(locale, _rcProps?.experiments).then(localeData =>
      this.setState({ localeData, remountKey: !this.state.remountKey })
    );
  };

  componentDidMount() {
    this.updateLocale();
    const { children } = this.props;
    const onOpenEditorSuccess =
      children?.props.helpers?.onOpenEditorSuccess ||
      this.props._rcProps?.helpers?.onOpenEditorSuccess;
    onOpenEditorSuccess?.(Version.currentVersion);
    this.props.editorEvents?.subscribe(EditorEvents.RICOS_PUBLISH, this.onPublish);
    this.setState({ activeEditor: this.editor });
  }

  componentWillUnmount() {
    this.props.editorEvents?.unsubscribe(EditorEvents.RICOS_PUBLISH, this.onPublish);
  }

  onPublish = async () => {
    // TODO: remove this param after getContent(postId) is deprecated
    await this.editor.publish((undefined as unknown) as string);
    console.debug('editor publish callback'); // eslint-disable-line
    return {
      type: 'EDITOR_PUBLISH',
      data: await this.getContent(),
    };
  };

  publish = async () => {
    const publishResponse = await this.onPublish();
    return publishResponse.data;
  };

  setActiveEditor = ref => {
    if (ref && ref !== this.currentEditorRef) {
      this.currentEditorRef = ref;
      const { MobileToolbar, TextToolbar } = ref.getToolbars();
      this.setState({ StaticToolbar: MobileToolbar || TextToolbar, activeEditor: ref });
    }
  };

  componentWillReceiveProps(newProps: RicosEditorProps) {
    if (newProps.locale !== this.props.locale) {
      this.updateLocale();
    }
    if (
      newProps.injectedContent &&
      !isEqual(this.props.injectedContent, newProps.injectedContent)
    ) {
      console.debug('new content provided as editorState'); // eslint-disable-line
      const editorState = createWithContent(convertFromRaw(newProps.injectedContent));
      this.setState({ editorState }, () => {
        this.dataInstance = createDataConverter(this.props.onChange, this.props.injectedContent);
        this.dataInstance.refresh(editorState);
      });
    }
  }

  onInitialContentChanged = () => {
    const { initialContentChanged } = this.state;
    if (initialContentChanged) {
      this.getBiCallback('onContentEdited')?.({ version: Version.currentVersion });
      this.setState({ initialContentChanged: false });
    }
  };

  onChange = (childOnChange?: RichContentEditorProps['onChange']) => (editorState: EditorState) => {
    this.dataInstance.refresh(editorState);
    if (this.getContentTraits().isContentChanged) {
      this.onInitialContentChanged();
    }
    childOnChange?.(editorState);
    this.onBusyChange(editorState.getCurrentContent());
  };

  getToolbarProps = (type: ToolbarType) => this.editor.getToolbarProps(type);

  focus = () => this.editor.focus();

  blur = () => this.editor.blur();

  getToolbars = () => this.editor.getToolbars();

  getContentTraits = () => this.dataInstance.getContentTraits();

  getContent = async (postId?: string, forPublish?: boolean, shouldRemoveErrorBlocks = true) => {
    const { getContentState } = this.dataInstance;
    if (postId && forPublish) {
      console.warn(PUBLISH_DEPRECATION_WARNING_v9); // eslint-disable-line
      await this.editor.publish(postId); //async
    }
    return getContentState({ shouldRemoveErrorBlocks });
  };

  getContentPromise = async ({
    publishId,
    flush,
  }: { flush?: boolean; publishId?: string } = {}) => {
    const { getContentStatePromise, waitForUpdate } = this.dataInstance;
    if (flush) {
      waitForUpdate();
      this.blur();
    }
    const res = await getContentStatePromise();
    if (publishId) {
      console.warn(PUBLISH_DEPRECATION_WARNING_v9); // eslint-disable-line
      await this.editor.publish(publishId);
    }
    return res;
  };

  onBusyChange = (contentState: ContentState) => {
    const { onBusyChange, onChange } = this.props;
    const isBusy = hasActiveUploads(contentState);
    if (this.isBusy !== isBusy) {
      this.isBusy = isBusy;
      onBusyChange?.(isBusy);
      onChange?.(convertToRaw(contentState));
    }
  };

  setEditorRef = (ref: RichContentEditor) => {
    this.editor = ref;
    this.setActiveEditor(ref);
  };

  getEditorCommands = () => this.editor.getEditorCommands();

  getT = () => this.editor.getT();

  removeToolbarFocus = () => this.editor.removeToolbarFocus();

  getPluginsKey = () => {
    const { activeEditor } = this.state;
    const rawPlugins = activeEditor?.getPlugins?.();
    const plugins = rawPlugins.filter(plugin => plugin?.blockType !== undefined);
    const pluginsKeys = plugins.map(plugin => plugin.blockType);
    return pluginsKeys;
  };

  renderTextFormattingToolbar() {
    const { activeEditor } = this.state;
    if (activeEditor) {
      const { buttons } = activeEditor.getToolbarProps(TOOLBARS.FORMATTING);
      const { StaticToolbar } = this.state;
      const {
        isMobile,
        theme,
        locale,
        toolbarSettings: { getToolbarSettings = () => [] } = {},
      } = this.props;
      const buttonsAsArray = Object.values(buttons);
      const editorCommands = activeEditor.getEditorCommands();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const selection = (editorCommands as any)._getSelection();
      const showFormattingToolbar = !selection.isCollapsed() && selection.getHasFocus();
      const t = activeEditor.getT();
      const removeToolbarFocus = () => activeEditor.removeToolbarFocus();
      const textButtons: TextButtons = {
        mobile: mobileTextButtonList,
        desktop: desktopTextButtonList,
      };
      const formattingToolbarSetting = getToolbarSettings({ textButtons }).find(
        toolbar => toolbar?.name === 'INLINE'
      );
      const allFormattingToolbarButtons = formattingToolbarSetting?.getButtons?.();
      const formattingToolbarButtons = isMobile
        ? allFormattingToolbarButtons?.mobile
        : allFormattingToolbarButtons?.desktop;
      const plugins = this.getPluginsKey();
      const ToolbarToRender = (
        <Toolbar
          theme={theme}
          isMobile={isMobile}
          t={t}
          buttons={buttonsAsArray}
          editorCommands={editorCommands}
          formattingToolbarButtonsKeys={formattingToolbarButtons}
          plugins={plugins}
        />
      );
      const textToolbarType = StaticToolbar && !isMobile ? 'static' : null;
      return textToolbarType === 'static' ? (
        <div style={{ flex: 'none' }} dir={getLangDir(locale)}>
          <StaticToolbarContainer>{ToolbarToRender}</StaticToolbarContainer>
        </div>
      ) : (
        <div style={{ flex: 'none' }} dir={getLangDir(locale)}>
          <FloatingToolbarContainer
            isMobile={isMobile}
            showFormattingToolbar={showFormattingToolbar}
            removeToolbarFocus={removeToolbarFocus}
          >
            {ToolbarToRender}
          </FloatingToolbarContainer>
        </div>
      );
    }
    return null;
  }

  render() {
    const { children, toolbarSettings, draftEditorSettings = {}, content, ...props } = this.props;
    const { StaticToolbar, localeData, remountKey, editorState } = this.state;

    const contentProp = editorState
      ? { editorState: { editorState }, content: {} }
      : { editorState: {}, content: { content } };

    const supportedDraftEditorSettings = filterDraftEditorSettings(draftEditorSettings);

    const child =
      children && shouldRenderChild('RichContentEditor', children) ? (
        children
      ) : (
        <RichContentEditor />
      );

    const newFormattingToolbar = this.props._rcProps?.experiments?.newFormattingToolbar?.enabled;

    return (
      <Fragment key={`${remountKey}`}>
        {!newFormattingToolbar && (
          <StaticToolbarPortal
            StaticToolbar={StaticToolbar}
            textToolbarContainer={toolbarSettings?.textToolbarContainer}
          />
        )}
        {newFormattingToolbar && this.renderTextFormattingToolbar()}
        <RicosEngine
          RicosModal={RicosModal}
          isViewer={false}
          key={'editor'}
          toolbarSettings={toolbarSettings}
          {...contentProp.content}
          {...props}
        >
          {React.cloneElement(child, {
            onChange: this.onChange(child.props.onChange),
            ref: this.setEditorRef,
            editorKey: 'editor',
            setEditorToolbars: this.setActiveEditor,
            ...contentProp.editorState,
            ...supportedDraftEditorSettings,
            ...localeData,
          })}
        </RicosEngine>
      </Fragment>
    );
  }
}

export default forwardRef<RicosEditor, RicosEditorProps>((props, ref) => (
  <EditorEventsContext.Consumer>
    {contextValue => <RicosEditor editorEvents={contextValue} {...props} ref={ref} />}
  </EditorEventsContext.Consumer>
));

const StaticToolbarPortal: FunctionComponent<{
  StaticToolbar?: ElementType;
  textToolbarContainer?: HTMLElement;
}> = ({ StaticToolbar, textToolbarContainer }) => {
  if (!StaticToolbar) return null;

  if (textToolbarContainer) {
    return ReactDOM.createPortal(<StaticToolbar />, textToolbarContainer);
  }
  return <StaticToolbar />;
};
