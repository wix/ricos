import React, { FunctionComponent } from 'react';
import { CloseButton, Dropdown, Input } from 'wix-style-react';
import { StyleAttr } from './types';

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
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: '6px 0px 6px 0px',
      }}
    >
      <Dropdown
        placeholder="Element"
        selectedId={element}
        onSelect={({ id }) => updateStyle([id as string, property, value])}
        options={[
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
      <CloseButton skin="standardFilled" size="medium" onClick={close} />
    </div>
  );
};

export default ListItem;
