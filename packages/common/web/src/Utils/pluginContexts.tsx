import { flowRight } from 'lodash';
import React, { FunctionComponent, PropsWithoutRef } from 'react';
import { RicosHooks, HooksContext } from '..';

type HooksConsumerHoc = <P>(
  Component: React.ComponentType<P & { hooks: RicosHooks }>
) => FunctionComponent<PropsWithoutRef<P>>;

const withHooks: HooksConsumerHoc = Component =>
  React.forwardRef((props, ref) => (
    <HooksContext.Consumer>
      {hooks => <Component {...props} hooks={hooks} ref={ref} />}
    </HooksContext.Consumer>
  ));

export const withPluginContexts = Component => flowRight(withHooks)(Component);
