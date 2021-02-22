import { findIndex, isEqual } from 'lodash';
import React, { FunctionComponent } from 'react';
import { AddItem } from 'wix-style-react';
import ListItem from './ListItem';
import { StyleAttr } from './types';

const replace = (array: StyleAttr[], existingItem: StyleAttr, newItem: StyleAttr) => {
  const index = findIndex(array, item => isEqual(item, existingItem));
  return array.map((item, idx) => (idx === index ? newItem : item));
};

interface Props {
  stylesArray: StyleAttr[];
  setStyles: (items: StyleAttr[]) => void;
}

const CustomStylesCreator: FunctionComponent<Props> = ({ stylesArray, setStyles }) => {
  return (
    <div style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
      {stylesArray.map((item, idx) => (
        <ListItem
          item={item}
          updateStyle={newItem => setStyles(replace(stylesArray, item, newItem))}
          close={() => setStyles(stylesArray.filter((_, index) => index !== idx))}
        />
      ))}
      <AddItem onClick={() => setStyles([...stylesArray, ['', '', '']])}>Add Style</AddItem>
    </div>
  );
};

export default CustomStylesCreator;
