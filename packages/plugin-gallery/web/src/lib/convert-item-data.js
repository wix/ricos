import { normalizeUrl } from 'wix-rich-content-common';
import { getAbsoluteUrl } from './baseUrlConverter';

/**
 * convertItemData - converts the old gallery metadata format to the new metaData format
 *
 * @param {object[]} items - gallery item data
 * @param {string} anchorTarget - link target attribute
 * @param {string} relValue - link rel attribute
 */
export const convertItemData = ({ items, anchorTarget, relValue }) =>
  items.map(item => {
    const { metadata, metaData } = item;
    if (metaData) {
      return item;
    }

    const convertedData = {
      metaData: {
        link: {
          type: 'none',
          target: '_blank',
        },
      },
      directLink: {},
    };

    if (metadata) {
      convertedData.metaData = {
        ...metadata,
        link: {
          type: 'none',
          target: '_blank',
        },
      };
      if (item.metadata.type === 'video') {
        convertedData.metaData.link = {
          target: '_blank',
          rel: 'noopener',
          url: normalizeUrl(item.url || ''),
        };
        const {
          pathname,
          thumbnail: { pathname: thumbPathname } = {},
        } = convertedData.metaData.poster;
        if (pathname && thumbPathname) {
          convertedData.metaData.poster = getAbsoluteUrl(thumbPathname, 'image');
        }
      }

      convertedData.metaData.alt = metadata.altText;

      if (item.metadata.link) {
        convertedData.metaData.link = {
          type: 'wix',
          target: item.metadata.link.target || anchorTarget || '_self',
          data: {
            type: 'ExternalLink',
            target: item.metadata.link.target || anchorTarget || '_self',
            rel: item.metadata.link.rel || relValue || 'noopener',
            url: normalizeUrl(item.metadata.link.url || ''),
          },
        };
        convertedData.directLink = {
          url: normalizeUrl(item.metadata.link.url || ''),
          target: item.metadata.link.target || anchorTarget || '_self',
          rel: item.metadata.link.rel || relValue || 'noopener',
        };
      }
    }

    return { ...item, metadata: undefined, ...convertedData };
  });
