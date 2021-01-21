import React from 'react';
import { DIVIDER_TYPE_RICOS } from './types';
import DividerComponent from './components/divider-component';

export default {
  type: DIVIDER_TYPE_RICOS,
  renderer: visitor =>
    visitor.renderReactComponent(({ node: { ricosDivider }, ...props }) => {
      // temp code until the plugins are not aligned with new schema
      const componentData = {
        type: ricosDivider.type.toLowerCase(),
        config: {
          size: ricosDivider.config.size.toLowerCase(),
          alignment: ricosDivider.config.alignment.toLowerCase(),
          textWrap: ricosDivider.config.textWrap.toLowerCase(),
        },
      };
      return <DividerComponent componentData={componentData} {...props} />;
    }),
};
