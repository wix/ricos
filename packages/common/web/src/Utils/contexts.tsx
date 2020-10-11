import React from 'react';
import { TranslateFunction } from '../types';

export const GlobalContext = React.createContext<{ isMobile: boolean; t?: TranslateFunction }>({
  isMobile: false,
});
