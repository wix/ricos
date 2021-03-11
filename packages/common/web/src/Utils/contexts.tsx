import React, { FunctionComponent, PropsWithoutRef } from 'react';
import { RicosHooks, TranslationFunction, AvailableExperiments } from '../types';

export const GlobalContext = React.createContext<{
  experiments?: AvailableExperiments;
  isMobile: boolean;
  t?: TranslationFunction;
}>({
  isMobile: false,
});

export const HooksContext = React.createContext<RicosHooks>({});

type HooksConsumerHoc = <P>(
  Component: React.ComponentType<P & { hooks: RicosHooks }>
) => FunctionComponent<PropsWithoutRef<P>>;

export const withHooks: HooksConsumerHoc = Component =>
  React.forwardRef((props, ref) => (
    <HooksContext.Consumer>
      {hooks => <Component {...props} hooks={hooks} ref={ref} />}
    </HooksContext.Consumer>
  ));
