import React from 'react';

import { LAYOUT } from '../../constants';
import { withRCEHelpers } from '../rce-helpers-context';

import { PollGridOption } from './PollGridOption';
import { PollListOption } from './PollListOption';
import { PollListOptionWebview, PollGridOptionWebview } from './webview';

export * from './types';

export const PollOption = withRCEHelpers(props => {
  const { layout, rce } = props;

  if (rce.isWebView) {
    switch (layout.poll?.type) {
      case LAYOUT.GRID:
        return <PollGridOptionWebview {...props} />;

      case LAYOUT.LIST:
      default:
        return <PollListOptionWebview {...props} />;
    }
  }

  switch (layout.poll?.type) {
    case LAYOUT.GRID:
      return <PollGridOption {...props} />;

    case LAYOUT.LIST:
    default:
      return <PollListOption {...props} />;
  }
});
