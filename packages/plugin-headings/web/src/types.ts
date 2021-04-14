import { EditorPluginConfig } from 'wix-rich-content-common';

export const HEADINGS_DROPDOWN_TYPE = 'wix-rich-content-plugin-headings';

type HeadingType = 'P' | 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6';

export interface HeadingsPluginEditorConfig extends EditorPluginConfig {
  inlinePopups?: boolean;
  customHeadings?: HeadingType[];
}
