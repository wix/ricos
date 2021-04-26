import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getGalleryLayouts } from '../../layout-helper';
import { mergeStyles } from 'wix-rich-content-common';
import { SelectionList } from 'wix-rich-content-plugin-commons';
import styles from '../../../statics/styles/layout-selector.scss';

class LayoutSelector extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  getLayouts = t => {
    return getGalleryLayouts(t).map(layout => {
      return {
        layoutId: layout.value,
        name: layout.label,
        icon: layout.icon,
        dataHook: `layoutSelector_${layout.label}`,
      };
    });
  };

  dataMapper = ({ layoutId }) => ({ value: layoutId });

  renderOption = ({ item, selected }) => (
    <div className={this.styles.layoutsSelector_tile}>
      <item.icon
        className={classNames(this.styles.layoutsSelector_icon, {
          [this.styles.layoutsSelector_icon_selected]: selected,
        })}
      />
      <span className={this.styles.layoutsSelector_tile_label}>{item.name}</span>
    </div>
  );

  render() {
    const styles = this.styles;
    const { value, theme, onChange, t } = this.props;
    const layoutsLabel = t('GalleryPlugin_Layouts_Title');
    return (
      <div>
        <span className={styles.layoutsSelector_label}>{layoutsLabel}</span>
        <SelectionList
          theme={theme}
          className={styles.layoutsSelector_grid}
          dataSource={this.getLayouts(t)}
          dataMapper={this.dataMapper}
          renderItem={this.renderOption}
          value={value}
          onChange={value => onChange(value)}
          optionClassName={styles.layoutsSelector_option}
        />
      </div>
    );
  }
}

LayoutSelector.propTypes = {
  value: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  t: PropTypes.func,
};

export default LayoutSelector;
