import { createImagePlugin } from './createImagePlugin';
import { IMAGE_TYPE } from './types';
import { ModalsMap } from './modals';

const config = {
  // defaultData: {
  //   config: {
  //     alignment: 'left',
  //     size: 'content',
  //     showTitle: true,
  //     showDescription: true,
  //   },
  // },
  imageEditorWixSettings: {
    initiator: 'some-initiator',
    siteToken: `JWS.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im5FUXljQzlOIn0.eyJpYXQiOj
      E1Njc1MjY3NzQsImRhdGEiOiJ7XCJ1c2VySWRcIjpcIjE5YTY0YT
      RjLWVlZTAtNGYxNC1iNjI3LTY3MmQ1ZjE2OGJkNFwiLFwibWV0YXNpdGVJZFwiOlwiNTM4ZmE2YzYtYz
      k1My00Y2RkLTg2YzQtNGI4NjlhZWNmOTgwXCJ9IiwiZXhwIjoxNTY
      4NzM2Mzc0fQ.n21OxIzSbqi8N3v30b6cIxMdshBnkkf2WQLWEFVXsLk`,
    metaSiteId: '538fa6c6-c953-4cdd-86c4-4b869aecf980',
    mediaRoot: 'some-mediaRoot',
  },
  // eslint-disable-next-line no-console
  onImageEditorOpen: () => console.log('Media Studio Launched'),
  // createGalleryForMultipleImages: true,
  // toolbar: {
  //   icons: {
  //     Image: MyCustomIcon, // insert plugin icon
  //     alignLeft: MyCustomIcon,
  //     link: MyCustomIcon,
  //     sizeOriginal: MyCustomIcon,
  //     sizeSmallCenter: MyCustomIcon,
  //     sizeContent: MyCustomIcon,
  //     imageEditor: MyCustomIcon,
  //     sizeFullWidth: MyCustomIcon,
  //     alignCenter: MyCustomIcon,
  //     alignRight: MyCustomIcon,
  //     settings: MyCustomIcon,
  //     replace: MyCustomIcon,
  //     delete: SizeSmallRightIcon,
  //   },
  // },
};

export const pluginImage = {
  config,
  type: IMAGE_TYPE,
  createPlugin: createImagePlugin,
  ModalsMap,
};
