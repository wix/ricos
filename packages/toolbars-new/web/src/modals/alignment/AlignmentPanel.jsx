/* eslint-disable react/prop-types */
import React from 'react';
import styles from '../panels/styles.scss';
import MobilePanel from '../panels/MobilePanel';
import DesktopPanel from '../panels/DesktopPanel';
import { AlignTextCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from '../../icons';
import classNames from 'classnames';

const alignments = [
  { text: 'Align left', commandKey: 'left', icon: <AlignLeftIcon /> },
  { text: 'Align center', commandKey: 'center', icon: <AlignTextCenterIcon /> },
  { text: 'Align right', commandKey: 'right', icon: <AlignRightIcon /> },
  { text: 'Justify', commandKey: 'justify', icon: <AlignJustifyIcon /> },
];

const AlignmentPanel = ({ isMobile, t, editorCommands, theme, currentSelect, onChange }) => {
  const panelHeader = t('Alignment');

  const onBlur = e => {
    const { target, relatedTarget, currentTarget } = e;
    if (!currentTarget.contains(relatedTarget)) {
      setTimeout(() => target.focus());
    }
  };
  const hasIcons = true;

  const panel = isMobile ? (
    <MobilePanel
      {...{
        currentSelect,
        panelHeader,
        options: alignments,
        onChange,
        hasIcons,
      }}
    />
  ) : (
    <DesktopPanel {...{ currentSelect, options: alignments, onChange, theme, hasIcons }} />
  );
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      onBlur={onBlur}
      className={classNames(styles.panel_Container, {
        [styles.mobile_Container]: isMobile,
      })}
    >
      {panel}
    </div>
  );
};

export default AlignmentPanel;
