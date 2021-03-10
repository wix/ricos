import React, { FunctionComponent, PropsWithoutRef } from 'react';
import { BICallbacks, TranslationFunction, AvailableExperiments } from '../types';

export const GlobalContext = React.createContext<{
  experiments?: AvailableExperiments;
  isMobile: boolean;
  t?: TranslationFunction;
}>({
  isMobile: false,
});

export const BIContext = React.createContext<BICallbacks>({});

type HooksConsumerHoc = <P>(
  Component: React.ComponentType<P & { hooks: BICallbacks }>
) => FunctionComponent<PropsWithoutRef<P>>;

export const withHooks: HooksConsumerHoc = Component =>
  React.forwardRef((props, ref) => (
    <BIContext.Consumer>
      {hooks => <Component {...props} hooks={hooks} ref={ref} />}
    </BIContext.Consumer>
  ));
