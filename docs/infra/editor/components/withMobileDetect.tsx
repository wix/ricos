import React from 'react';
import isMobile from '../../mobileDetection';

interface Props<T> {
  children?: React.ComponentType<T>;
  rest: T;
}

export const withMobileDetection = <P extends unknown>(Component: React.ComponentType<P>) => (
  props: Props<P>
) => {
  const { children, rest } = props;
  return (
    <Component {...rest} isMobile={isMobile}>
      {children}
    </Component>
  );
};
