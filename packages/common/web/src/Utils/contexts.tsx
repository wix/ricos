import React from 'react';
import { BICallbacks, TranslationFunction } from '../types';

export const GlobalContext = React.createContext<{ isMobile: boolean; t?: TranslationFunction }>({
  isMobile: false,
});

export const BIContext = React.createContext<BICallbacks>({});
