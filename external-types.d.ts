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
declare module '@rollup/plugin-babel';
declare module 'deep-freeze';
declare module 'to-*-case' {
  export default function(string: string): string;
}
declare module '!!raw-loader!*' {
  const contents: string;
  export = contents;
}
