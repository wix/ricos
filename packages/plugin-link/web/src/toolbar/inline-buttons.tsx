import React from 'react';
import { BUTTONS, updateLinkAtCurrentSelection, EditIcon } from 'wix-rich-content-plugin-commons';
import TextLinkButton from './TextLinkButton';
import RemoveLinkButton from './RemoveLinkButton';
import UrlLinkButton from './UrlLinkButton';
import { CreateInlineButtons } from 'wix-rich-content-common';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createInlineButtons: CreateInlineButtons<any> = config => {
  return [
    {
      keyName: 'url',
      component: props => <UrlLinkButton {...config} {...props} />,
      mobile: true,
      type: BUTTONS.CUSTOM,
    },
    { keyName: 'separator1', type: BUTTONS.SEPARATOR, mobile: true },
    {
      keyName: 'edit',
      component: props => (
        <div data-hook={'EditLinkButton'} style={{ margin: '0 2px 0 -7px' }}>
          <TextLinkButton
            insertLinkFn={updateLinkAtCurrentSelection}
            icon={EditIcon}
            tooltipText={config.t('LinkTo_Edit_Tooltip')}
            {...config}
            {...props}
          />
        </div>
      ),
      mobile: true,
      type: BUTTONS.CUSTOM,
    },
    { keyName: 'separator2', type: BUTTONS.SEPARATOR, mobile: true },
    {
      keyName: 'remove',
      component: props => (
        <div style={{ margin: '0 -6px 0 -6px' }}>
          <RemoveLinkButton {...config} {...props} />
        </div>
      ),
      mobile: true,
      type: BUTTONS.CUSTOM,
    },
  ];
};

export default createInlineButtons;
