import React, { Component } from 'react';
import { compare } from 'ricos-content';
import { fromDraft, toDraft } from 'ricos-content/libs/migrateSchema';
import { RichContent } from 'ricos-schema';
import { RicosContent, RicosEditor, RicosEditorProps } from '.';

export interface RicosEditorNewContentProps
  extends Omit<RicosEditorProps, 'content' | 'onChange' | 'injectedContent'> {
  content?: RichContent;
  injectedContent?: RichContent;
  onChange?: (content: RichContent) => void;
}

interface RicosEditorNewContentState {
  content?: RichContent;
  draftContent?: RicosContent;
}

export class RicosEditorNewContent extends Component<
  RicosEditorNewContentProps,
  RicosEditorNewContentState
> {
  constructor(props: RicosEditorNewContentProps) {
    super(props);
    this.state = {
      content: props.content,
      draftContent: props.content && toDraft(props.content),
    };
  }

  static getDerivedStateFromProps(
    props: RicosEditorNewContentProps,
    state: RicosEditorNewContentState
  ) {
    const diff = compare(props.content, state.content, { ignoredKeys: ['key'] });
    if (props.content && Object.keys(diff).length > 0) {
      return { content: props.content, draftContent: toDraft(props.content) };
    }
    return null;
  }

  onChange = (content: RicosContent) => {
    const newContent: RichContent = fromDraft(content);
    this.props.onChange?.(newContent);
  };

  render() {
    const { injectedContent, ...ricosEditorProps } = this.props;
    const { draftContent } = this.state;
    const draftInjectedContent: RicosContent | undefined =
      injectedContent && toDraft(injectedContent);
    return (
      <RicosEditor
        {...ricosEditorProps}
        content={draftContent}
        injectedContent={draftInjectedContent}
        onChange={this.onChange}
      />
    );
  }
}
