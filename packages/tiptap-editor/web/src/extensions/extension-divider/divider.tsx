import React from 'react';
import { DividerComponent } from 'wix-rich-content-plugin-divider';
import { PluginProps } from '../../types';

const Divider: React.FC<PluginProps> = ({ context, componentData }) => {
  const { isMobile, theme } = context;
  console.log({ componentData });
  return (
    <div>
      <DividerComponent componentData={componentData} isMobile={isMobile} theme={theme} />
    </div>
  );
};

export default Divider;
