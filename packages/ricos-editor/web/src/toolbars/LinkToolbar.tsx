import React, { Component } from 'react';
import { RichContentEditor } from 'wix-rich-content-editor';
import {
  RichContentTheme,
  GetToolbarSettings,
  Helpers,
  EditorCommands,
  EditorPlugin,
  LinkPanelSettings,
  getLangDir,
  ToolbarType,
} from 'wix-rich-content-common';
import { LinkSettings } from 'ricos-common';
import {
  FloatingToolbarContainer,
  RicosToolbar,
  StaticToolbarContainer,
} from 'wix-rich-content-toolbars-new';

interface LinkToolbarProps {
  activeEditor: RichContentEditor;
  textToolbarType?: string | null;
  isMobile?: boolean;
  theme?: RichContentTheme;
  locale?: string;
  getToolbarSettings?: GetToolbarSettings;
  helpers?: Helpers;
  plugins?: EditorPlugin[];
  linkPanelSettings?: LinkPanelSettings;
  linkSettings?: LinkSettings;
}

interface State {}

class LinkToolbar extends Component<LinkToolbarProps, State> {
  getPluginsKey = () => {
    const { activeEditor } = this.props;
    const rawPlugins = activeEditor?.getPlugins?.();
    const plugins = rawPlugins.filter(plugin => plugin?.blockType !== undefined);
    const pluginsKeys = plugins.map(plugin => plugin.blockType);
    return pluginsKeys;
  };

  render() {
    const { activeEditor, isMobile, theme, locale, helpers } = this.props;
    const editorCommands: EditorCommands = activeEditor.getEditorCommands();
    const selection = editorCommands.getSelection();
    const showLinkToolbar =
      selection.getIsCollapsed && selection.getIsFocused && editorCommands.hasLinkInSelection();
    const t = activeEditor.getT();
    const removeToolbarFocus = () => activeEditor.removeToolbarFocus();
    const plugins: string[] = this.getPluginsKey();
    const linkPanelData = {
      linkTypes: this.props.plugins?.find(plugin => plugin.type === 'LINK')?.config.linkTypes,
      uiSettings: { linkPanel: this.props.linkPanelSettings },
      anchorTarget: this.props.linkSettings?.anchorTarget,
      isMobile,
    };
    const baseStyles = { flex: 'none' };
    const baseMobileStyles = { ...baseStyles, position: 'sticky', top: 0, zIndex: 9 };
    const ToolbarToRender = (
      <RicosToolbar
        theme={theme}
        isMobile={isMobile}
        t={t}
        editorCommands={editorCommands}
        buttons={['goToLink', '|', 'editLink', '|', 'removeLink']}
        plugins={plugins}
        linkPanelData={linkPanelData}
        helpers={helpers}
        toolbarType={ToolbarType.LINK}
      />
    );
    const ToolbarContainer = isMobile ? StaticToolbarContainer : FloatingToolbarContainer;

    return (
      <div style={isMobile ? baseMobileStyles : baseStyles} dir={getLangDir(locale)}>
        {((isMobile && showLinkToolbar) || !isMobile) && (
          <ToolbarContainer
            isMobile={isMobile}
            showToolbar={showLinkToolbar || false}
            removeToolbarFocus={removeToolbarFocus}
          >
            {ToolbarToRender}
          </ToolbarContainer>
        )}
      </div>
    );
  }
}

export default LinkToolbar;
