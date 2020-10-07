import { GetToolbarSettings, AnchorTarget, RelValue } from './index';

export interface ModalSettings {
  openModal?: (data: Record<string, unknown>) => void;
  closeModal?: () => void;
  ariaHiddenId?: string;
}

export interface ToolbarSettings {
  getToolbarSettings?: GetToolbarSettings;
  textToolbarContainer?: HTMLElement;
  useStaticTextToolbar?: boolean;
}

export interface MediaSettings {
  pauseMedia?: boolean;
  disableRightClick?: boolean;
}

export interface LinkSettings {
  anchorTarget?: AnchorTarget;
  relValue?: RelValue;
}

export interface LinkPanelSettings {
  blankTargetToggleVisibilityFn?: (anchorTarget?: AnchorTarget) => boolean;
  nofollowRelToggleVisibilityFn?: (relValue?: RelValue) => boolean;
  placeholder?: string;
}

export interface SEOSettings {
  paywall: {
    className: string;
    index: number;
  };
}

export interface BICallbacks {
  onPluginAdd?(pluginId: string, entryPoint: string, version: string): void;
  onPluginDelete?(pluginId: string, version: string): void;
  onPublish?(
    postId: string,
    pluginsCount: Record<string, unknown>,
    pluginsDetails: Record<string, unknown>,
    version: string
  ): void;
  onViewerAction?(pluginId: string, actionName: string, value: string): void;
  onPluginChange?(
    pluginId: string,
    changeObject: { from: string; to: string },
    version: string
  ): void;
}
