import React, { Component, Fragment, ElementType, FunctionComponent } from 'react';
import { RicosEngine, shouldRenderChild, localeStrategy } from 'ricos-common';
import { RichContentEditor } from 'wix-rich-content-editor';
import { createDataConverter } from './utils/editorUtils';
import ReactDOM from 'react-dom';
import { EditorState, ContentState, EditorProps } from 'draft-js';
import RicosModal from './modals/RicosModal';
import './styles.css';
import { RicosEditorProps, EditorDataInstance, RichContentChild } from './index';
import { hasActiveUploads } from './utils/hasActiveUploads';
import { DRAFT_EDITOR_PROPS } from './consts';

const filterDraftEditorSettings = (draftEditorSettings: Partial<EditorProps>) =>
  Object.entries(draftEditorSettings).map(([k, v]) => DRAFT_EDITOR_PROPS.includes(k) && v);

interface State {
  StaticToolbar?: ElementType;
  localeStrategy: { locale?: string; localeResource?: Record<string, string> };
  remountKey: boolean;
}

export class RicosEditor extends Component<RicosEditorProps, State> {
  editor: RichContentEditor;
  dataInstance: EditorDataInstance;
  isUploading = false;

  constructor(props: RicosEditorProps) {
    super(props);
    this.dataInstance = createDataConverter(props.onChange);
    this.state = { localeStrategy: { locale: props.locale }, remountKey: false };
  }

  static defaultProps = { locale: 'en' };

  updateLocale = async () => {
    const { locale, children } = this.props;
    await localeStrategy(children?.props.locale || locale).then(localeData => {
      this.setState(
        { localeStrategy: localeData, remountKey: !this.state.remountKey },
        this.setStaticToolbar
      );
    });
  };

  componentDidMount() {
    this.setStaticToolbar();
    this.updateLocale();
  }

  setStaticToolbar = () => {
    if (this.editor) {
      const { MobileToolbar, TextToolbar } = this.editor.getToolbars();
      this.setState({ StaticToolbar: MobileToolbar || TextToolbar });
    }
  };

  componentWillReceiveProps(newProps: RicosEditorProps) {
    if (newProps.locale !== this.props.locale) {
      this.updateLocale();
    }
  }

  onChange = (childOnChange?: (editorState: EditorState) => void) => (editorState: EditorState) => {
    this.dataInstance.refresh(editorState);
    childOnChange?.(editorState);
    this.onUploadMedia(editorState.getCurrentContent());
  };

  getToolbarProps = () => this.editor.getToolbarProps();

  focus = () => this.editor.focus();

  blur = () => this.editor.blur();

  getToolbars = () => this.editor.getToolbars();

  getContent = (postId?: string, forPublish?: boolean) => {
    const { getContentState } = this.dataInstance;
    if (postId && forPublish) {
      this.editor.publish(postId); //async
    }
    return getContentState();
  };

  onUploadMedia = (contentState: ContentState) => {
    const isUploading = hasActiveUploads(contentState);
    if (this.isUploading !== isUploading) {
      this.isUploading = isUploading;
      this.props.mediaSettings?.onUpload?.(isUploading);
    }
  };

  render() {
    const { children, toolbarSettings, draftEditorSettings = {}, ...props } = this.props;
    const { StaticToolbar, localeStrategy, remountKey } = this.state;

    const supportedDraftEditorSettings = filterDraftEditorSettings(draftEditorSettings);

    const child: RichContentChild =
      children && shouldRenderChild('RichContentEditor', children) ? (
        children
      ) : (
        <RichContentEditor />
      );

    return (
      <Fragment key={`${remountKey}`}>
        <StaticToolbarPortal
          StaticToolbar={StaticToolbar}
          textToolbarContainer={toolbarSettings?.textToolbarContainer}
        />
        <RicosEngine
          RicosModal={RicosModal}
          isViewer={false}
          key={'editor'}
          toolbarSettings={toolbarSettings}
          {...props}
        >
          {React.cloneElement(child, {
            onChange: this.onChange(child.props.onChange),
            ref: ref => (this.editor = ref),
            editorKey: 'editor',
            ...supportedDraftEditorSettings,
            ...localeStrategy,
          })}
        </RicosEngine>
      </Fragment>
    );
  }
}

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
