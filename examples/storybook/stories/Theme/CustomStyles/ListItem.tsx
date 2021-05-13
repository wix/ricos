import React, { FunctionComponent } from 'react';
import { CloseButton, Dropdown, Input } from 'wix-style-react';
import { StyleAttr } from './types';
import styles from './StylesPanel.scss';

interface Props {
  item: StyleAttr;
  updateStyle: (item: StyleAttr) => void;
  close: () => void;
}

const propertyList = (element: string) =>
  (element === 'button'
    ? ['color']
    : [
        'fontSize',
        'fontFamily',
        'fontWeight',
        'fontStyle',
        'textDecoration',
        'lineHeight',
        'minHeight',
        'color',
      ].concat(element === 'quote' ? ['borderColor'] : [])
  ).map(value => ({ id: value, value }));

const ListItem: FunctionComponent<Props> = ({ item, updateStyle, close }) => {
  const [element, property, value] = item;
  return (
    <div className={styles.container}>
      <CloseButton skin="standardFilled" size="medium" onClick={close} className={styles.close} />
      <Dropdown
        placeholder="Element"
        selectedId={element}
        onSelect={({ id }) => updateStyle([id as string, property, value])}
        options={[
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'p',
          'link',
          'hashtag',
          'quote',
          'button',
        ].map(value => ({ id: value, value }))}
      />
      <Dropdown
        placeholder="Property"
        selectedId={property}
        onSelect={({ id }) => updateStyle([element, id as string, value])}
        options={propertyList(element)}
      />
      <Input
        placeholder="Value"
        value={value}
        onChange={e => updateStyle([element, property, e.currentTarget.value])}
      />
    </div>
  );
};

export default ListItem;
