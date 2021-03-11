import React from 'react';
import { RicosHooks, TranslationFunction, AvailableExperiments } from '../types';

export const GlobalContext = React.createContext<{
  experiments?: AvailableExperiments;
  isMobile: boolean;
  t?: TranslationFunction;
}>({
  isMobile: false,
});

export const HooksContext = React.createContext<RicosHooks>({});
