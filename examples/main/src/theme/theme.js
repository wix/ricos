import richContentEditorTheme from './rich-content-editor.theme.scss';
import pluginLinkTheme from './plugin-link.theme.scss';
import linkTheme from './text-link.theme.scss';
import hashtagTheme from './text-hashtag.theme.scss';

import dividerTheme from './divider.theme.scss';
import htmlTheme from './html.theme.scss';
import imageTheme from './image.theme.scss';
import videoTheme from './video.theme.scss';
import fileUploadTheme from './file-upload.theme.scss';

import commonTheme from './global.theme.scss';
import checkboxTheme from './checkbox.theme.scss';
import loaderTheme from './loader.theme.scss';
import dropdownTheme from './dropdown.theme.scss';
import buttonTheme from './button.theme.scss';
import imageComponentTheme from './image_component.theme.scss';
import inputWithLabelTheme from './input-with-label.theme.scss';
import radioGroupHorizontalTheme from './radio-group-horizontal.theme.scss';
import radioGroupTheme from './radio-group.theme.scss';
import settingsPanelFooterTheme from './settings-panel-footer.theme.scss';
import settingsSectionTheme from './settings-section.theme.scss';
import selectionListTheme from './selection-list.theme.scss';
import sliderTheme from './slider.theme.scss';
import tabsTheme from './tabs.theme.scss';
import tooltipTheme from './tooltip.theme.scss';
import placeholderTheme from './placeholder.theme.scss';

import inlineToolbarTheme from './toolbars/inline-toolbar.theme.scss';
import textStaticToolbarTheme from './toolbars/text-static-toolbar.theme.scss';
import sideToolbarTheme from './toolbars/side-toolbar.theme.scss';
import pluginToolbarTheme from './toolbars/plugin-toolbar.theme.scss';
import footerToolbarTheme from './toolbars/footer-toolbar.theme.scss';
import mobileToolbarTheme from './toolbars/mobile-toolbar.theme.scss';
import mobileAddModalTheme from './toolbars/mobile-add-modal.theme.scss';
import toolbarSeparatorTheme from './toolbars/toolbar-separator.theme.scss';
import addPluginModalTheme from './toolbars/add-plugin-modal.theme.scss';
import videoUploadTheme from './toolbars/modals/video/video-upload-modal.theme.scss';

const modalTheme = {
  content: {},
};

const theme = {
  modalTheme,
  ...richContentEditorTheme,
  ...linkTheme,
  ...pluginLinkTheme,
  ...hashtagTheme,

  // plugin components
  ...dividerTheme,
  ...htmlTheme,
  ...imageTheme,
  ...videoTheme,
  ...fileUploadTheme,

  // common
  ...commonTheme,
  ...checkboxTheme,
  ...dropdownTheme,
  ...buttonTheme,
  ...loaderTheme,
  ...imageComponentTheme,
  ...inputWithLabelTheme,
  ...radioGroupHorizontalTheme,
  ...radioGroupTheme,
  ...settingsPanelFooterTheme,
  ...settingsSectionTheme,
  ...selectionListTheme,
  ...sliderTheme,
  ...tabsTheme,
  ...tooltipTheme,
  ...placeholderTheme,

  // modals
  ...videoUploadTheme,
  ...addPluginModalTheme,

  // toolbars
  ...inlineToolbarTheme,
  ...textStaticToolbarTheme,
  ...sideToolbarTheme,
  ...pluginToolbarTheme,
  ...footerToolbarTheme,
  ...mobileToolbarTheme,
  ...mobileAddModalTheme,
  ...toolbarSeparatorTheme,
};

export default theme;
