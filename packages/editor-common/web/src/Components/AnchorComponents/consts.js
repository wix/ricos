import React from 'react';
import {
  ImageIcon,
  VideoIcon,
  GalleryIcon,
  BlockQuoteIcon,
  CodeBlockIcon,
  TitleIcon,
  ParagraphIcon,
  MapIcon,
  ButtonIcon,
  GiphyIcon,
  FileIcon,
  H2Icon,
  H3Icon,
  H4Icon,
  H5Icon,
  H6Icon,
} from '../../Icons';

export const ANCHORABLE_BLOCKS = Object.freeze({
  unstyled: {
    thumbnail: <ParagraphIcon style={{ width: 'fit-content' }} />,
    type: 'LinkTo_Modal_Section_Item_Paragraph',
    filter: 'LinkTo_Modal_Section_Filter_Paragraphs',
  },
  header: {
    'thumbnail-header-two': <H2Icon style={{ width: 'fit-content' }} />,
    'thumbnail-header-three': <H3Icon style={{ width: 'fit-content' }} />,
    'thumbnail-header-four': <H4Icon style={{ width: 'fit-content' }} />,
    'thumbnail-header-five': <H5Icon style={{ width: 'fit-content' }} />,
    'thumbnail-header-six': <H6Icon style={{ width: 'fit-content' }} />,
    'thumbnail-old-title': <TitleIcon style={{ width: 'fit-content' }} />,
    type: 'LinkTo_Modal_Section_Item_Heading',
    filter: 'LinkTo_Modal_Section_Filter_Headings',
  },
  // 'header-two': {
  //   thumbnail: 'H',
  //   type: 'LinkTo_Modal_Section_Item_Heading',
  //   filter: 'LinkTo_Modal_Section_Filter_Headings',
  // },
  // 'header-three': {
  //   thumbnail: 'H',
  //   type: 'LinkTo_Modal_Section_Item_Heading',
  //   filter: 'LinkTo_Modal_Section_Filter_Headings',
  // },
  'code-block': {
    thumbnail: <CodeBlockIcon style={{ width: 'fit-content' }} />,
    type: 'LinkTo_Modal_Section_Item_Codeblock',
    filter: 'LinkTo_Modal_Section_Item_Codeblock',
  },
  blockquote: {
    thumbnail: <BlockQuoteIcon style={{ width: 'fit-content' }} />,
    type: 'LinkTo_Modal_Section_Item_Quote',
    filter: 'LinkTo_Modal_Section_Filter_Quotes',
  },
  'wix-draft-plugin-image': {
    thumbnail: <ImageIcon style={{ width: 'fit-content' }} />,
    visualThumbnail: true,
    type: 'LinkTo_Modal_Section_Item_Image',
    filter: 'LinkTo_Modal_Section_Filter_Images',
  },
  'wix-draft-plugin-gallery': {
    thumbnail: <GalleryIcon style={{ width: 'fit-content' }} />,
    visualThumbnail: true,
    type: 'LinkTo_Modal_Section_Item_Gallery',
    filter: 'LinkTo_Modal_Section_Filter_Galleries',
  },
  'wix-draft-plugin-video': {
    thumbnail: <VideoIcon style={{ width: 'fit-content' }} />,
    visualThumbnail: true,
    type: 'LinkTo_Modal_Section_Item_Video',
    filter: 'LinkTo_Modal_Section_Filter_Videos',
  },
  'wix-draft-plugin-map': {
    thumbnail: <MapIcon style={{ width: 'fit-content' }} />,
    type: 'LinkTo_Modal_Section_Item_Map',
    filter: 'LinkTo_Modal_Section_Filter_Maps',
    textPath: 'data.mapSettings.address',
  },
  buttons: {
    thumbnail: <ButtonIcon style={{ width: 'fit-content' }} />,
    type: 'LinkTo_Modal_Section_Item_Button',
    filter: 'LinkTo_Modal_Section_Filter_Buttons',
    textPath: 'data.button.settings.buttonText',
  },
  // 'wix-draft-plugin-link-button': {
  //   thumbnail: <ButtonIcon style={{ width: 'fit-content' }} />,
  //   type: 'LinkTo_Modal_Section_Item_Button',
  //   filter: 'LinkTo_Modal_Section_Filter_Buttons',
  // },
  // 'wix-draft-plugin-action-button': {
  //   thumbnail: <ButtonIcon style={{ width: 'fit-content' }} />,
  //   type: 'LinkTo_Modal_Section_Item_Button',
  //   filter: 'LinkTo_Modal_Section_Filter_Buttons',
  // },
  'wix-draft-plugin-giphy': {
    thumbnail: <GiphyIcon style={{ width: 'fit-content' }} />,
    visualThumbnail: true,
    type: 'LinkTo_Modal_Section_Item_GIF',
    filter: 'LinkTo_Modal_Section_Filter_GIFs',
  },
  'wix-draft-plugin-file-upload': {
    thumbnail: <FileIcon style={{ width: 'fit-content' }} />,
    type: 'LinkTo_Modal_Section_Item_File',
    filter: 'LinkTo_Modal_Section_Filter_Files',
    textPath: 'data.name',
  },
});
