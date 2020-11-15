import React from 'react';
import { TranslationFunction } from '../types';

export const GlobalContext = () =>
  React.createContext<{ isMobile: boolean; t?: TranslationFunction }>({
    isMobile: false,
  });
