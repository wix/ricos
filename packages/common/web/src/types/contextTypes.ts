import { FunctionComponent } from 'react';

export type ContextProviderHOC = <P>(Component: React.ComponentType<P>) => FunctionComponent<P>;
