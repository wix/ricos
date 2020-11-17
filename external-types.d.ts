declare module '*.scss' {
  const classes: { [key: string]: string };
  export = classes;
}
declare module '*.svg' {
  import { FunctionComponent, SVGProps } from 'react';
  const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
declare module 'postcss-rtl';
declare module 'postcss-exclude-files';
declare module 'rollup-plugin-babel';
declare module 'deep-freeze';
