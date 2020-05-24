import { storiesOf } from '@storybook/react';
import LinkPreviewStory from './LinkPreview';
import GalleryPlugin from './GalleryPlugin';
import DividerPluginStory from './Divider';
import HeadingsPluginStory from './Headings';
import ButtonsPluginStory from './Buttons';
import Image from './Image';
import Video from './Video';
import VerticalEmbedStory from './VerticalEmbed';
import HtmlPluginStory from './HtmlPlugin';
import FileUploadStory from './FileUpload';

storiesOf('Plugins')
  .add('Divider', DividerPluginStory)
  .add('Headings', HeadingsPluginStory)
  .add('Image', Image)
  .add('Video', Video)
  .add('Gallery', GalleryPlugin)
  .add('Link Preview', LinkPreviewStory)
  .add('Buttons', ButtonsPluginStory)
  .add('Vertical Embed', VerticalEmbedStory)
  .add('HTML Plugin', HtmlPluginStory)
  .add('File Upload', FileUploadStory);
