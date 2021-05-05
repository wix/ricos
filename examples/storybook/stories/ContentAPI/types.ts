import { FC } from 'react';
import { setupContentBuilder } from 'ricos-content/libs/Content';

export type BuilderFunctions = Omit<ReturnType<typeof setupContentBuilder>, 'RicosContentBuilder'>;
export type AddFunctor = <T extends keyof BuilderFunctions>(
  element: T,
  args: Omit<Parameters<BuilderFunctions[T]>['0'], 'content'>
) => void;

export interface EditPanelProps<T extends keyof BuilderFunctions> {
  addFunc: AddFunctor;
}

export interface AbstractPanelProps<T> {
  obj: T;
  setter: (obj: T) => void;
}

export type Plugins = [string, FC<any>, FC<EditPanelProps<any>>?][];

export interface CommonBuilderFields {
  index?: number;
  before?: string;
  after?: string;
}
