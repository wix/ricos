import React, { FC, useMemo } from 'react';
import { mergeStyles, RichContentTheme, ComponentData } from 'wix-rich-content-common';
import styles from '../statics/styles/yourDpluginDname.scss';
import { YourPluginNamePluginViewerConfig } from './types';

interface Props {
  componentData: ComponentData;
  settings: YourPluginNamePluginViewerConfig;
  theme: RichContentTheme;
}

const YourPluginNameViewer: FC<Props> = ({ theme }) => {
  const classes = useMemo(() => mergeStyles({ styles, theme }), [theme]);
  return (
    <div className={classes.container} data-hook="yourDpluginDname-container">
      This is my new yourDpluginDname plugin!
    </div>
  );
};

export default YourPluginNameViewer;
