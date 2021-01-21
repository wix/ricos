import React, { ReactElement } from 'react';
import { Fab as FabButton, Action } from 'react-tiny-fab';
import { MdAdd, MdEdit, MdRemoveRedEye, MdCode } from 'react-icons/md';
import 'react-tiny-fab/dist/styles.min.css';
import { OnVisibilityChanged } from '../types';

const Fab = React.memo<{
  isMobile: boolean;
  isEditorShown: boolean;
  isPreviewShown: boolean;
  isViewerShown: boolean;
  isContentStateShown: boolean;
  toggleSectionVisibility: OnVisibilityChanged;
}>(
  ({
    isMobile,
    isEditorShown,
    isPreviewShown,
    isViewerShown,
    isContentStateShown,
    toggleSectionVisibility,
  }) => {
    let hideFab = true;
    if (!isMobile) {
      hideFab = isEditorShown && isViewerShown && isContentStateShown && isPreviewShown;
    } else {
      hideFab = isEditorShown || isViewerShown || isContentStateShown || isPreviewShown;
    }
    if (hideFab) {
      return null;
    }

    const FabActions: ReactElement[] = [];
    if (!isEditorShown) {
      FabActions.push(
        <Action
          text="Editor"
          key="editor-action"
          onClick={() => toggleSectionVisibility('Editor', true)}
        >
          <MdEdit />
        </Action>
      );
    }
    if (!isViewerShown) {
      FabActions.push(
        <Action
          text="Viewer"
          key="viewer-action"
          onClick={() => toggleSectionVisibility('Viewer', true)}
        >
          <MdRemoveRedEye />
        </Action>
      );
    }
    if (!isPreviewShown) {
      FabActions.push(
        <Action
          text="Preview"
          key="preview-action"
          onClick={() => toggleSectionVisibility('Preview', true)}
        >
          <MdRemoveRedEye />
        </Action>
      );
    }
    if (!isContentStateShown) {
      FabActions.push(
        <Action
          text="Content State"
          key="content-state-action"
          onClick={() => toggleSectionVisibility('ContentState', true)}
        >
          <MdCode />
        </Action>
      );
    }

    return (
      <FabButton icon={<MdAdd />} event={!isMobile ? 'hover' : 'click'}>
        {FabActions}
      </FabButton>
    );
  }
);

export default Fab;
