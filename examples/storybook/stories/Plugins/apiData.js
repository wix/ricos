export default {
  LINK_PREVIEW: [
    {
      name: 'enableEmbed',
      type: 'one of boolean, array',
      defaultValue: 'true',
      required: '',
      description:
        'Allows to display provider embed if exist (can be true/false/[Twitter, YouTube,..]',
    },
    {
      name: 'enableLinkPreview',
      type: 'boolean',
      defaultValue: 'true',
      required: '',
      description: 'Allows to display link preview if exist',
    },
    {
      name: 'fetchData',
      type: 'function',
      defaultValue: '',
      required: 'required',
      description:
        'A func that gets url and returns an object with title, image_url, description (optional) that related to the given url',
    },
    {
      name: 'exposeEmbedButtons',
      type: 'array',
      defaultValue: '[]',
      required: '',
      description:
        'Which embed buttons will display - array with LinkPreviewProvider types [Instagram, Twitter, ...] ',
    },
  ],
  VERTICAL_EMBED: [
    {
      name: 'verticalsApi',
      type: 'function',
      defaultValue: '',
      required: 'required',
      description:
        'a func that gets vertical type and returns the vertical fetch function (for example: {product: () => {fetch function..}})',
    },
    {
      name: 'exposeEmbedButtons',
      type: 'array',
      defaultValue: '[]',
      required: '',
      description:
        'Which vertical embed buttons will display - array with verticalEmbedProvider types [product, event, booking, ...] ',
    },
  ],
  BUTTON: [
    {
      name: 'onClick',
      type: 'function',
      defaultValue: '',
      required: '',
      description: 'when clicking the button it triggers the `onClick` action',
    },
    {
      name: 'palette',
      type: 'array',
      defaultValue: '',
      required: '',
      description:
        'An array of colors code strings - for example [#FEFDFD, #D5D4D4, #ABCAFF, #81B0FF, #0261FF, #0141AA]',
    },
    {
      name: 'selectionBackgroundColor',
      type: 'string',
      defaultValue: '',
      required: '',
      description: 'button selection background color ',
    },
    {
      name: 'selectionBorderColor',
      type: 'string',
      defaultValue: '',
      required: '',
      description: 'button selection border color ',
    },
    {
      name: 'selectionTextColor',
      type: 'string',
      defaultValue: '',
      required: '',
      description: 'button selection text color ',
    },
    {
      name: 'colors',
      type: 'object',
      defaultValue: '',
      required: '',
      description: '',
    },
    {
      name: 'onTextColorAdded',
      type: 'function',
      defaultValue: '',
      required: '',
      description: 'A function that gets color and returns userButtonTextColors',
    },
    {
      name: 'onBackgroundColorAdded',
      type: 'function',
      defaultValue: '',
      required: '',
      description: 'A function that gets color and returns userButtonBackgroundColors',
    },
    {
      name: 'onBorderColorAdded',
      type: 'function',
      defaultValue: '',
      required: '',
      description: 'A function that gets color and returns userButtonBorderColors',
    },
    {
      name: 'getTextColors',
      type: 'function',
      defaultValue: '',
      required: '',
      description: 'A function that returns userButtonTextColors',
    },
    {
      name: 'getBorderColors',
      type: 'function',
      defaultValue: '',
      required: '',
      description: 'A function that returns getBorderColors',
    },
    {
      name: 'getBackgroundColors',
      type: 'function',
      defaultValue: '',
      required: '',
      description: 'A function that returns getBackgroundColors',
    },
  ],
  VIDEO: [
    {
      name: 'handleFileSelection',
      type: 'function',
      defaultValue: '',
      required: '',
      description:
        'media manager - here you can call your custom video upload functionality (comment function to disable custom upload)',
    },
    {
      name: 'handleFileUpload',
      type: 'function',
      defaultValue: '',
      required: '',
      description: 'for native file upload',
    },
    {
      name: 'enableCustomUploadOnMobile',
      type: 'boolean',
      defaultValue: '',
      required: '',
      description: 'allows custom upload from mobile',
    },
    {
      name: 'getVideoUrl',
      type: 'function',
      defaultValue: '',
      required: '',
      description:
        'A function that invoked when rendering video which has relative URL - take the pathname and form a full URL',
    },
  ],
  FOOTER_TOOLBAR: [
    {
      name: 'pluginsToDisplayInToolbar',
      type: 'array',
      defaultValue: 'the first 8 plugins',
      required: '',
      description:
        'plugins type array which defines which plugins will display in the footer toolbar - all remain plugins will be display in the plugin menu',
    },
    {
      name: 'morePluginsMenu',
      type: 'object',
      defaultValue: '',
      required: '',
      description:
        'plugin menu config- object with the values `showSearch`, `splitToSections` which defines how plugin menu will be displayed, if this object is supplied the shortcut menu will be displayed- otherwise, no',
    },
  ],
};
