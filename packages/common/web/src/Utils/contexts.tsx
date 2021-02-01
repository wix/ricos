import React from 'react';
import { TranslationFunction } from '../types';

export const GlobalContext = React.createContext<{
  experiments?: Record<string, string>;
  isMobile: boolean;
  t?: TranslationFunction;
}>({
  isMobile: false,
});
