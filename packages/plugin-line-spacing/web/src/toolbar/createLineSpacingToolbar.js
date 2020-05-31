import React from 'react';
import LineSpacingButton from './LineSpacingButton';
import { LINE_SPACING_TYPE } from '../types';
import { LineSpacingIcon } from '../icons';
import Panel from './LineSpacingPanel';
import { BUTTON_TYPES, decorateComponentWithProps } from 'wix-rich-content-editor-common';

export default config => ({
  TextButtonMapper: () => ({
    LinsSpacing: {
      component: decorateComponentWithProps(LineSpacingButton, config[LINE_SPACING_TYPE]),
      isMobile: true,
      externalizedButtonProps: {
        modalElement: props => <Panel {...props} {...config} />,
        isActive: () => false,
        getIcon: () =>
          config[LINE_SPACING_TYPE]?.toolbar?.icons?.InsertPluginButtonIcon || LineSpacingIcon,
        tooltip: config.t('LineSpacingButton_Tooltip'),
        label: '',
        buttonType: BUTTON_TYPES.MODAL,
      },
    },
  }),
});
