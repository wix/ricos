import richContentEditorTheme from './rich-content-editor.theme.scss';
import linkTheme from './text-link.theme.scss';
import hashtagTheme from './text-hashtag.theme.scss';

import dividerTheme from './divider.theme.scss';
import htmlTheme from './html.theme.scss';
import imageTheme from './image.theme.scss';
import videoTheme from './video.theme.scss';

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

import inlineToolbarTheme from './toolbars/inline-toolbar.theme.scss';
import textStaticToolbarTheme from './toolbars/text-static-toolbar.theme.scss';
import sideToolbarTheme from './toolbars/side-toolbar.theme.scss';
import pluginToolbarTheme from './toolbars/plugin-toolbar.theme.scss';
import footerToolbarTheme from './toolbars/footer-toolbar.theme.scss';
import mobileToolbarTheme from './toolbars/mobile-toolbar.theme.scss';
import mobileAddModalTheme from './toolbars/mobile-add-modal.theme.scss';
import toolbarSeparatorTheme from './toolbars/toolbar-separator.theme.scss';
import addPluginModalTheme from './toolbars/add-plugin-modal.theme.scss';

import gallerySettingsModalTheme from './toolbars/modals/gallery/gallery-settings-modal.theme.scss';
import galleryItemsSortableTheme from './toolbars/modals/gallery/gallery-items-sortable.theme.scss';
import galleryImageSettingsTheme from './toolbars/modals/gallery/gallery-image-settings.theme.scss';
import gallerySettingsMobileHeaderTheme from './toolbars/modals/gallery/gallery-settings-mobile-header.theme.scss';
import imageRatioSelectorTheme from './toolbars/modals/gallery/image-ratio-selector.theme.scss';
import layoutSelectorTheme from './toolbars/modals/gallery/layout-selector.theme.scss';
import sliderWithInputTheme from './toolbars/modals/gallery/slider-with-input.theme.scss';
import thumbnailPlacementSelectorTheme from './toolbars/modals/gallery/thumbnail-placement-selector.theme.scss';
import videoUploadTheme from './toolbars/modals/video/video-upload-modal.theme.scss';
import imageSettingsTheme from './toolbars/modals/image/image-settings.theme.scss';
import imageSettingsMobileHeaderTheme from './toolbars/modals/image/image-settings-mobile-header.theme.scss';

const modalTheme = {
  content: {
  }
};

const theme = {
  modalTheme,
  ...richContentEditorTheme,
  ...linkTheme,
  ...hashtagTheme,

  // plugin components
  ...dividerTheme,
  ...htmlTheme,
  ...imageTheme,
  ...videoTheme,

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

  // modals
  ...gallerySettingsModalTheme,
  ...galleryItemsSortableTheme,
  ...galleryImageSettingsTheme,
  ...gallerySettingsMobileHeaderTheme,
  ...imageRatioSelectorTheme,
  ...layoutSelectorTheme,
  ...sliderWithInputTheme,
  ...thumbnailPlacementSelectorTheme,
  ...videoUploadTheme,
  ...imageSettingsTheme,
  ...imageSettingsMobileHeaderTheme,
  ...addPluginModalTheme,

  // toolbars
  ...inlineToolbarTheme,
  ...textStaticToolbarTheme,
  ...sideToolbarTheme,
  ...pluginToolbarTheme,
  ...footerToolbarTheme,
  ...mobileToolbarTheme,
  ...mobileAddModalTheme,
  ...toolbarSeparatorTheme

};

export default theme;
