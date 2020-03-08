import React from 'react';
import { BUTTONS, updateLinkAtCurrentSelection, EditIcon } from 'wix-rich-content-editor-common';
import TextLinkButton from './TextLinkButton';
import RemoveLinkButton from './RemoveLinkButton';
import UrlLinkButton from './UrlLinkButton';

export default config => {
  return [
    {
      keyName: 'url',
      component: props => <UrlLinkButton {...config} {...props} />,
      mobile: true,
    },
    { keyName: 'separator1', type: BUTTONS.SEPARATOR, mobile: true },
    {
      keyName: 'edit',
      component: props => (
        <TextLinkButton
          insertLinkFn={updateLinkAtCurrentSelection}
          icon={EditIcon}
          {...config}
          {...props}
        />
      ),
      mobile: true,
    },
    { keyName: 'separator2', type: BUTTONS.SEPARATOR, mobile: true },
    {
      keyName: 'remove',
      component: props => <RemoveLinkButton {...config} {...props} />,
      mobile: true,
    },
  ];
};
