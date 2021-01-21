import { ReactElement } from 'react';

export interface ViewerTransitionManager {
  initialize(viewerChild?: ReactElement): void;
  getViewerChild(): ReactElement;
  getViewerStrategies(): Record<string, () => void>;
}
