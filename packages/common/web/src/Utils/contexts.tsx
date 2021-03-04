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

type BIConsumerHoc = <P>(
  Component: React.ComponentType<P & { biCallbacks: BICallbacks }>
) => FunctionComponent<PropsWithoutRef<P>>;

export const withBICallbacks: BIConsumerHoc = Component =>
  React.forwardRef((props, ref) => (
    <BIContext.Consumer>
      {biCallbacks => <Component {...props} biCallbacks={biCallbacks} ref={ref} />}
    </BIContext.Consumer>
  ));
