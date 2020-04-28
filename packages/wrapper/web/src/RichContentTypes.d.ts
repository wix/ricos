type Theme = {
  modalTheme: { content: any };
  [propName: string]: any;
};

type TextToolbarType = 'inline' | 'static';

type Helpers = { [propName: string]: (...args: any[]) => any };

type DraftContentState = import('draft-js').RawDraftContentState;

interface ContentState extends DraftContentState {
  VERSION?: string;
}
