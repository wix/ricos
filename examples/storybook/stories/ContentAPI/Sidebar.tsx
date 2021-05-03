import React, { FC, useState } from 'react';
import * as Icons from 'wix-ui-icons-common';
import styles from './ContentBuilder.scss';
import { ComposerSidebar, ComposerSidebarItem } from 'wix-style-react';

export const Sidebar: FC = () => {
  const [selected, setSelected] = useState(0);
  const onSelect = (id: number) => setSelected(selected !== id ? id : -1);
  const plugins = [
    ['Text', Icons.SentenceCase],
    ['Image', Icons.Image],
    ['Video', Icons.VideoCamera],
    ['File', Icons.Attachment],
    ['Divider', Icons.Divider],
    ['Button', Icons.SquareRatio],
    ['Gallery', Icons.LayoutGallery],
    ['Html', Icons.Code],
  ].map(([label, Icon], id) => ({
    id,
    label,
    icon: <Icon />,
    onClick: () => onSelect(id),
  })) as ComposerSidebarItem[];

  return (
    <ComposerSidebar
      className={styles.composer}
      size="large"
      labelPlacement="end"
      items={plugins}
      selectedId={selected}
    />
  );
};
