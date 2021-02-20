import React from 'react';
import { TranslationFunction, AvailableExperiments } from '../types';

export const GlobalContext = React.createContext<{
  experiments?: AvailableExperiments;
  isMobile: boolean;
  t?: TranslationFunction;
  containerWidth?: number;
}>({
  isMobile: false,
});
