import React, { FunctionComponent } from 'react';
import { BICallbacks, Helpers } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface CompProps extends Record<string, any> {
  helpers?: Helpers;
  onClick?: (...args: any[]) => unknown;
}

type WithToolbarBI = <T extends CompProps>(
  callback: (props: T) => Parameters<NonNullable<BICallbacks['onToolbarButtonClick']>>[0]
) => (Component: React.ComponentType<T>) => FunctionComponent<T>;

export const withToolbarBI: WithToolbarBI = callback => Component => {
  return props => {
    const onClickNew = (...args) => {
      props.helpers?.onToolbarButtonClick?.(callback(props));
      return props.onClick?.(...args);
    };
    return <Component {...props} onClick={onClickNew} />;
  };
};
