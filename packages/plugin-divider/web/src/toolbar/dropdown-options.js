import React from 'react';

import { DEFAULTS, LINE_TYPES } from '../defaults';
import DividerLine from '../components/divider-line';

const createDropdownOptionComponent = ({ type, styles }) => () => {
  return (
    <div className={styles['divider-dropdown__option']}>
      <DividerLine
        type={type}
        styles={styles}
        width={60}
        fillParent
        multilineDinstance={4}
        className={styles['divider-dropdown__divider']}
      />
    </div>
  );
};

export const getDropdownOptions = styles =>
  LINE_TYPES.map(type => ({
    value: type,
    component: createDropdownOptionComponent({ type, styles }),
  }));

export const createDropdownValueGetter = dropdownOptions => store => {
  const componentData = store.get('componentData') || {};
  const type = componentData.type || DEFAULTS.type;
  return dropdownOptions.find(x => x.value === type);
};
