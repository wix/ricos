import React, { RefObject } from 'react';
import { TranslationFunction, AvailableExperiments } from '../types';

export interface GlobalContextInterface {
  experiments?: AvailableExperiments;
  isMobile: boolean;
  t?: TranslationFunction;
  editorWrapper?: RefObject<HTMLDivElement>;
}

export const GlobalContext = React.createContext<GlobalContextInterface>({
  isMobile: false,
});
