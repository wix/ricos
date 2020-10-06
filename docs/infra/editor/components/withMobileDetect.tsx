import React from 'react';
import isMobile from '../../mobileDetection';

type ExtraInfoType = {
  isMobile: boolean;
};

export const withMobileDetection = <P extends unknown>(Component: React.ComponentType<P>) => (
  props: P
) => {
  return <Component {...props} isMobile={isMobile} />;
};
