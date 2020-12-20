import classNames from 'classnames';
import { mapKeys, upperFirst } from 'lodash';
import stylesOOI from './styles/theme-ooi.scss';

const createToolbarTheme = (toolbarName, theme) =>
  mapKeys(theme, (value, key) => `${toolbarName}${upperFirst(key)}`);

export default function BlogTheme({ isViewer, isSeo, isMobile }) {
  let advancedPostOpts;
  let useDescriptionFontInEditor;
  let readOnly;
  let isCompact;
  let richContentFontClassName;
  const styles = stylesOOI;
  const tooltipsEnabled = true;
  const linkHashtagColor = '#44C2BC';
  const imageContainerClass = 'image-container';
  const imageCaptionClass = 'image-caption';
  const toolbarButtonWrapperClass = 'rce-toolbar-button-wrapper';
  const toolbarButtonActiveClass = 'rce-toolbar-button-active';

  const blogSharedValues = {
    colors: {
      linkHashtagColor,
    },
    classes: {
      imageContainerClass,
      imageCaptionClass,
      toolbarButtonWrapperClass,
      toolbarButtonActiveClass,
    },
  };

  const defaultToolbarTheme = {
    toolbar: classNames(
      styles.opaqueBackgroundColor,
      styles.dividerBorderColor,
      styles.toolbarShadow
    ),
    toolbarButton_wrapper: classNames(toolbarButtonWrapperClass, styles.toolbarButtonWrapper),
    toolbarButton_active: toolbarButtonActiveClass,
    toolbarButton: styles.toolbarButton,
    toolbarButton_icon: classNames(styles.textColor, styles.toolbarButtonIcon),
    toolbarSeparator: styles.dividerBackgroundColor,
    toolbar_scrollableContainer: styles.toolbarScrollableContainer,
  };

  const headerTwoStyles = advancedPostOpts
    ? classNames('blog-post-header-two-font', 'blog-post-header-two-color', {
        [styles.mobileHeaderTwoFontSize]: isMobile,
      })
    : classNames('blog-post-title-font', styles.headerTwo, styles.headerTwoFontSize, {
        [styles.mobileHeaderTwoFontSize]: isMobile,
      });

  const headerThreeStyles = advancedPostOpts
    ? classNames('blog-post-header-three-font', 'blog-post-header-three-color', {
        [styles.mobileHeaderThreeFontSize]: isMobile,
      })
    : classNames('blog-post-title-font', styles.headerThree, styles.headerThreeFontSize, {
        [styles.mobileHeaderThreeFontSize]: isMobile,
      });

  const quoteStyles = advancedPostOpts
    ? classNames(
        styles.quote,
        'blog-post-quote-font',
        'blog-post-quote-color',
        'blog-quote-border-color',
        {
          [styles.mobileQuotesFontSize]: isMobile,
        }
      )
    : classNames(styles.quote, styles.advancedQuoteStylesOff, 'blog-quote-border-color', {
        [styles.mobileQuotesFontSize]: isMobile,
      });

  return {
    advancedPostOpts,
    blogSharedValues,
    editor: classNames(
      styles.editor,
      isSeo && styles.seo,
      useDescriptionFontInEditor ? richContentFontClassName : styles.editorDesktopFontSize,
      isMobile && styles.mobileFontSize,
      styles.editorImageCaption
    ),
    wrapper: classNames(styles.wrapper, richContentFontClassName, {
      [styles.readOnly]: readOnly,
      [styles.sizeCompact]: isCompact,
    }),
    overlay: styles.overlay,
    desktop: styles.desktop,
    android: styles.android,

    sizeFullWidth: styles.sizeFullWidth,
    sizeSmall: styles.sizeSmall,
    textWrapNowrap: styles.textWrapNowrap,

    text: classNames(styles.text, 'blog-post-text-font', 'blog-post-text-color'),
    quote: quoteStyles,
    headerOne: classNames('blog-post-title-font', styles.headerTwo, styles.headerTwoFontSize),
    headerTwo: headerTwoStyles,
    headerThree: headerThreeStyles,
    orderedList: classNames(
      styles.text,
      styles.listItem,
      isViewer ? styles.orderedListItem : undefined
    ),
    orderedListContainer: styles.orderedListContainer,
    unorderedList: classNames(styles.text, styles.listItem, styles.unorderedListItem),
    unorderedListContainer: styles.unorderedListContainer,
    atomic: styles.atomic,

    link: classNames('blog-link-hashtag-color', styles.link),
    hashtag: classNames('blog-link-hashtag-color', styles.hashtag),

    pluginContainer: classNames(
      styles.highlightedBorderColor,
      styles.pluginContainer,
      styles.pluginContainerImageCaption
    ),
    panelContainer: classNames(
      styles.opaqueBackgroundColor,
      styles.dividerBorderColor,
      styles.toolbarShadow
    ),
    hasFocus: classNames(styles.highlightedBorderColor, styles.hasFocus),
    focused: styles.focused,
    alignLeft: styles.alignLeft,
    alignRight: styles.alignRight,
    alignCenter: styles.alignCenter,

    htmlComponent: isViewer && styles.htmlComponent,
    pluginContainerMobile: isViewer && styles.pluginContainerMobile,

    left: isViewer && classNames(styles.left, styles.text),
    center: isViewer && classNames(styles.center, styles.text),
    right: isViewer && classNames(styles.right, styles.text),
    justify: isViewer && classNames(styles.justify, styles.text),

    ...createToolbarTheme('inline', {
      ...defaultToolbarTheme,
      toolbar_buttonWrapper: styles.inlineToolbarButtonWrapper,
    }),
    ...createToolbarTheme('side', {
      ...defaultToolbarTheme,
      toolbar_floatingIcon: styles.toolbarFloatingIcon,
    }),
    ...createToolbarTheme('plugin', {
      ...defaultToolbarTheme,
      toolbar_inlinePanel: styles.dividerBorderColor,
    }),
    ...createToolbarTheme('mobile', {
      ...defaultToolbarTheme,
      toolbar_fixed: styles.mobileToolbarFixed,
      toolbar_responsiveArrow: classNames(styles.opaqueBackgroundColor, styles.dividerBorderColor),
      toolbar_responsiveArrowLeft_icon: styles.textBorderColor,
      toolbar_responsiveArrowRight_icon: styles.textBorderColor,
      toolbar_scrollableContainer: styles.mobileToolbar_scrollableContainer,
    }),
    ...createToolbarTheme('footer', {
      ...defaultToolbarTheme,
      toolbar: classNames(styles.footerToolbar, styles.dividerBorderColor),
    }),
    inlineToolbarDropdown_options: styles.inlineToolbarDropdownOptions,
    inlineToolbarDropdownButton_icon: styles.inlineToolbarDropdownButtonIcon,
    'Dropdown-root': classNames(richContentFontClassName, styles.dropdownRoot),
    'Dropdown-control': classNames(
      'blog-text-color',
      styles.dropdownControl,
      styles.dropdownControlHover
    ),
    'Dropdown-menu': classNames(styles.opaqueBackgroundColor, styles.dividerBorderColor),
    'Dropdown-arrow': styles.dropdownArrow,
    'Dropdown-option': classNames('blog-text-color', styles.dropdownOptionHover),

    tooltip: classNames(styles.tooltipHover, styles.tooltip, {
      [styles.tooltipHidden]: !tooltipsEnabled,
    }),

    tabs_headers: styles.dividerBorderColor,
    tabs_headers_option: styles.tabsHeadersOption,
    tabs_headers_option_selected: styles.highlightedBorderColor,
    tabs_headers_option_label: classNames(richContentFontClassName, styles.tabsHeadersOptionLabel),

    button_primary: classNames(
      richContentFontClassName,
      'blog-button-background-color',
      'blog-button-primary-text-color',
      styles.button
    ),
    button_secondary: classNames(
      richContentFontClassName,
      styles.highlightedBorderColor,
      'blog-button-secondary-text-color',
      'blog-button-secondary-text-hover-color',
      styles.button,
      styles.buttonSecondary
    ),

    checkbox_icon: classNames(
      styles.checkboxIcon,
      styles.highlightedBorderColor,
      styles.checkboxIcon
    ),
    checkbox_icon_checked: classNames(
      styles.checkboxIconChecked,
      styles.highlightedBackgroundColor,
      'blog-button-primary-text-color'
    ),

    'divider-container': isViewer && styles.dividerContainer,
    gallery_container: isViewer && styles.gallery_container,

    inputWithLabel_input: classNames(
      'blog-text-color',
      styles.dividerBorderColor,
      styles.focusedInputBorderColor,
      styles.inputWithLabelInput
    ),

    linkPanel_Content: classNames(richContentFontClassName, 'blog-text-color'),
    linkPanel_textInput: classNames(
      'blog-text-color',
      styles.dividerBorderColor,
      styles.linkPanelTextInputFocus,
      styles.linkPanelTextInput
    ),

    radioGroup: classNames(richContentFontClassName, styles.radioGroup),
    radioGroup_input: styles.radioGroupInput,
    radioGroup_button: classNames('blog-button-color', styles.radioGroupButton),

    radioGroupHorizontal_title: classNames(
      richContentFontClassName,
      styles.radioGroupHorizontalTitle
    ),

    slider: classNames('blog-button-color', styles.slider),

    sliderWithInput_label: classNames(richContentFontClassName, styles.sliderWithInputLabel),
    sliderWithInput_input: classNames(
      richContentFontClassName,
      'blog-text-color',
      styles.sliderWithInputInput,
      styles.dividerBorderColor
    ),

    selectionListOption_selected: 'blog-text-color',

    layoutsSelector_label: classNames(richContentFontClassName, styles.layoutsSelectorLabel),
    layoutsSelector_tile_label: classNames(
      richContentFontClassName,
      styles.layoutsSelectorTitleLabel
    ),
    layoutsSelector_icon_selected: styles.highlightedColor,

    thumbnailPlacementSelector_label: classNames(
      richContentFontClassName,
      styles.thumbnailPlacementSelectorLabel
    ),
    thumbnailPlacementSelector_icon_selected: styles.highlightedColor,

    imageContainer: imageContainerClass,
    video_container: styles.video_container,

    imageRatioSelector_label: classNames(richContentFontClassName, styles.imageRatioSelectorLabel),
    imageRatioSelector_ratioLabel: classNames(
      richContentFontClassName,
      styles.imageRatioSelectorRatioLabel
    ),
    imageRatioSelector_ratioButton: classNames(
      'blog-text-after-background-color',
      styles.imageRatioSelectorRatioButton
    ),
    imageRatioSelector_ratioButton_selected: classNames(
      'blog-button-background-color',
      styles.imageRatioSelectorRatioButtonSelected
    ),
    imageRatioSelector_ratioIcon: classNames(
      'blog-text-border-color',
      styles.imageRatioSelectorRatioIcon
    ),
    imageRatioSelector_ratioIcon_selected: classNames(
      'blog-button-primary-text-border-color',
      styles.imageRatioSelectorRatioIconSelected
    ),

    settingsPanel_footer: classNames(styles.opaqueBackgroundColor, styles.dividerBorderColor),
    section: classNames('blog-text-color', richContentFontClassName),

    imageSettings: classNames('blog-text-color', styles.imageSettings),
    imageSettingsTitle: classNames('blog-post-title-font', styles.imageSettingsTitle),
    imageCaption: imageCaptionClass,

    topBar: classNames(richContentFontClassName),
    topBarLink: classNames('blog-text-color', 'blog-button-hover-color'),
    filesButton: classNames('blog-text-color', 'blog-button-hover-color'),
    filesItem: classNames('blog-text-color', styles.dividerBorderColor),
    itemContainer: styles.itemContainer,
    itemContainerSelected: classNames('blog-button-color', styles.itemContainerSelected),
    gallerySettings_title: classNames(
      'blog-post-title-font',
      'blog-text-color',
      styles.gallerySettingsTitle,
      styles.opaqueBackgroundColor,
      styles.dividerBorderColor
    ),
    gallerySettings_divider: styles.dividerBorderColor,

    cameraIcon: 'blog-icon-fill',
    video_modal_container_big: classNames(styles.opaqueBackgroundColor),
    video_modal_container_small: classNames(styles.opaqueBackgroundColor),
    video_modal_add_a_Video: classNames(
      'blog-post-title-font',
      'blog-post-title-color',
      styles.addVideo
    ),
    video_modal_header_text: classNames(
      'blog-post-description-font',
      'blog-text-color',
      styles.headerText
    ),
    video_modal_add_button_inline: classNames('blog-button-background-color'),
    video_modal_add_button_inMiddle: classNames('blog-button-background-color'),
    video_modal_or_upload_video_from: classNames(
      'blog-post-description-font',
      'blog-text-color',
      styles.orUploadVideoFrom
    ),
    video_modal_upload_video: classNames(
      'blog-post-description-font',
      'blog-button-color',
      'blog-button-hover-color',
      styles.orUploadVideoFrom
    ),
    textInput_input: classNames(
      'blog-text-color',
      richContentFontClassName,
      styles.dividerBorderColor,
      styles.focusedInputBorderColor,
      styles.textInputInput
    ),

    galleryImageSettings: classNames(styles.galleryImageSettings, richContentFontClassName),
    galleryImageSettings_title: classNames(
      styles.galleryImageSettingsTitle,
      styles.opaqueBackgroundColor,
      'blog-text-color',
      'blog-post-title-font'
    ),
    galleryImageSettings_backIcon: 'blog-text-color',
    galleryImageSettings_delete: classNames(styles.galleryImageSettingsDelete, 'blog-text-color'),
    galleryImageSettings_replace: 'blog-text-color',

    htmlEditPanel_primaryButton: 'blog-button-color',
    htmlEditPanel_secondaryButton: 'blog-text-color',

    textColorModal: classNames(styles.opaqueBackgroundColor, styles.dividerBorderColor),
    textColorModal_mobile: styles.opaqueBackgroundColor,

    colorPicker_separator: styles.colorPickerSeparator,
    colorPicker_add_color_label: 'blog-button-color',
    colorPicker_button: styles.colorPickerButton,
    colorPicker_button_selected: classNames(
      styles.colorPickerButtonSelectedAfter,
      styles.colorPickerButtonSelected
    ),
    colorPickerDialog_separator: classNames(
      styles.dividerBackgroundColor,
      styles.colorPickerDialogSeparator
    ),
    colorPickerDialog_buttons: 'blog-post-description-font',
    colorPickerDialog_button: classNames(styles.colorPickerDialogButton, 'blog-text-color'),
    colorPickerDialog_button_update: 'blog-button-color',

    customColorPicker_editable_input_container: classNames(
      'blog-post-description-font',
      'blog-text-color'
    ),
    customColorPicker_input_container: styles.customColorPickerInputContainer,
    customColorPicker_input_label: styles.customColorPickerInputLabel,

    giphy_api_input_modal_container: 'blog-post-description-font',
    giphy_api_input_modal_search_textinput_group: styles.dividerBorderColor,
    giphy_api_input_modal_search: classNames('blog-text-color', styles.giphyModalSearchInput),
    giphy_modal_arrow_up: styles.giphyModalArrow,
    giphy_modal_arrow_down: styles.giphyModalArrow,

    overrideDefaultTheme: styles.overrideDefaultTheme,
    overrideAppSettings: styles.overrideAppSettings,

    modal: styles.modal,
    codeBlock: styles.codeBlock,

    file_upload_container: styles.fileUploadContainer,
    file_upload_icon: styles.fileUploadIcon,
    file_upload_icon_background: styles.fileUploadIconBackground,
    file_upload_icon_frame: styles.fileUploadIconFrame,
    file_upload_name: styles.fileUploadName,
    file_upload_state: styles.fileUploadState,
    file_upload_extension: styles.fileUploadExtension,
    file_upload_type: styles.fileUploadType,
    file_upload_link: styles.fileUploadLink,
    file_loader_icon: styles.fileLoaderIcon,
  };
}
