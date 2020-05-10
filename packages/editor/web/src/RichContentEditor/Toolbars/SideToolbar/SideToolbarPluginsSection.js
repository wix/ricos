import React from 'react';
import PropTypes from 'prop-types';
import Styles from '../../../../statics/styles/side-toolbar-panel.scss';
import { getPluginsForTag } from '../../pluginsSearchTags';
import { TOOLBARS } from 'wix-rich-content-editor-common';
import { getSortedSections } from './utils';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';

const SideToolbarPluginsSection = ({
  getEditorState,
  setEditorState,
  structure,
  searchTag,
  t,
  hidePopup,
  splitToSections,
  horizontalMenu,
  theme,
}) => {
  const styles = mergeStyles({ styles: Styles, theme });
  const pluginsForTag = searchTag && getPluginsForTag(searchTag, t);
  const plugins = !searchTag
    ? structure
    : structure.filter(({ name }) => pluginsForTag.includes(name));

  if (plugins.length === 0) {
    return (
      <div className={styles.pluginsSectionEmptyState}>{t('BlockToolbar_Search_EmptyState')}</div>
    );
  }

  const pluginSectionRenderer = section => {
    const pluginsToRender = section
      ? plugins.filter(({ section: pluginSection }) => pluginSection === section)
      : plugins;
    return (
      <div className={classNames(styles.section, horizontalMenu && styles.horizontalMenu)}>
        {section && <div className={styles.pluginsSection}>{t(section)}</div>}
        <div className={classNames(styles.buttonsWrapper, horizontalMenu && styles.horizontalMenu)}>
          {pluginsToRender.map(({ component: Component }, index) => (
            <div
              key={index}
              className={classNames(styles.buttonWrapper, horizontalMenu && styles.horizontalMenu)}
            >
              <Component
                getEditorState={getEditorState}
                setEditorState={setEditorState}
                showName={!horizontalMenu}
                toolbarName={TOOLBARS.SIDE}
                hidePopup={hidePopup}
                theme={theme}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const sections = [];
  splitToSections &&
    structure.forEach(({ section }) => !sections.includes(section) && sections.push(section));

  if (sections.length > 0) {
    return getSortedSections(sections).map(section => pluginSectionRenderer(section));
  } else {
    return pluginSectionRenderer();
  }
};

SideToolbarPluginsSection.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  structure: PropTypes.array.isRequired,
  t: PropTypes.func,
  searchTag: PropTypes.string,
  hidePopup: PropTypes.func,
  splitToSections: PropTypes.bool,
  horizontalMenu: PropTypes.bool,
  theme: PropTypes.object,
};

export default SideToolbarPluginsSection;
