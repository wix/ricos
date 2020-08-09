import React from 'react';
import PropTypes from 'prop-types';
import Styles from '../../../../statics/styles/side-toolbar-panel.scss';
import { getPluginsForTag } from '../../pluginsSearchTags';
import { getSortedSections } from './utils';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';

const PluginMenuPluginsSection = ({
  getEditorState,
  setEditorState,
  plugins,
  searchTag,
  t,
  hidePopup,
  splitToSections,
  horizontalMenu,
  pluginMenuButtonRef,
  toolbarName,
  theme = {},
  isMobile,
  searchablePlugins,
}) => {
  const styles = mergeStyles({ styles: Styles, theme });
  const pluginsForTag = searchTag && getPluginsForTag(searchTag.toLowerCase(), t);
  const filteredPluginsBySearchTag = (pluginsArray = []) =>
    pluginsArray.filter(({ name }) => pluginsForTag.includes(name));
  const pluginsToDisplay = !searchTag
    ? plugins
    : filteredPluginsBySearchTag(searchablePlugins || plugins);

  if (pluginsToDisplay.length === 0) {
    return (
      <div className={styles.pluginsSectionEmptyState}>{t('BlockToolbar_Search_EmptyState')}</div>
    );
  }

  const pluginSectionRenderer = section => {
    const pluginsToRender = section
      ? pluginsToDisplay.filter(
          ({ section: pluginSection = 'BlockToolbar_Section_Basic' }) => pluginSection === section
        )
      : pluginsToDisplay;
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
                pluginMenuButtonRef={pluginMenuButtonRef}
                getEditorState={getEditorState}
                setEditorState={setEditorState}
                showName={!horizontalMenu}
                toolbarName={toolbarName}
                hidePopup={hidePopup}
                theme={theme}
                closePluginMenu={!isMobile && hidePopup}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const sections = [];
  splitToSections &&
    pluginsToDisplay.forEach(
      ({ section = 'BlockToolbar_Section_Basic' }) =>
        !sections.includes(section) && sections.push(section)
    );

  if (sections.length > 0) {
    return getSortedSections(sections).map(section => pluginSectionRenderer(section));
  } else {
    return pluginSectionRenderer();
  }
};

PluginMenuPluginsSection.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  plugins: PropTypes.array.isRequired,
  t: PropTypes.func,
  searchTag: PropTypes.string,
  hidePopup: PropTypes.func,
  splitToSections: PropTypes.bool,
  horizontalMenu: PropTypes.bool,
  theme: PropTypes.object,
  searchablePlugins: PropTypes.array,
};

export default PluginMenuPluginsSection;
