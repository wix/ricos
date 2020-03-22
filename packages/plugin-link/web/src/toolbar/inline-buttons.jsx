/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import ReactTooltip from 'react-tooltip';
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
        <div
          data-hook={'EditLinkButton'}
          style={{ margin: '0 2px 0 -7px' }}
          onClick={ReactTooltip.hide()}
        >
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
    },
  ];
};
