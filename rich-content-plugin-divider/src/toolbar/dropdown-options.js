import React from 'react';

import { DEFAULTS, LINE_TYPES } from '../constants';
import DividerLine from '../components/divider-line';

const createDropdownOptionComponent = ({ type, styles }) => () => {
  return (
    <DividerLine
      type={type}
      className={styles.dropdownOption}
      styles={styles}
    />
  );
};

export const getDropdownOptions = styles => LINE_TYPES.map(type => ({
  value: type,
  component: createDropdownOptionComponent({ type, styles })
}));

export const createDropdownValueGetter = dropdownOptions => store => {
  const componentData = store.get('componentData') || {};
  const type = componentData.type || DEFAULTS.type;
  return dropdownOptions.find(x => x.value === type);
};
