import React, { FC, useState } from 'react';
import { Layout, Cell, InputWithLabel, Button, ToggleSwitch } from 'wix-style-react';
import {
  emptyCommonBuilderFields,
  emptyLink,
  emptyMedia,
  PNLCommonFields,
  PNLLink,
  PNLMedia,
} from '../AbstractPanels';
import { HorizontalField } from '../HorizontalField';
import { EditPanelProps } from '../types';

export const Image: FC<EditPanelProps<'addImage'>> = ({ addFunc }) => {
  const [commonFields, setCommonFields] = useState(emptyCommonBuilderFields);
  const [link, setLink] = useState(emptyLink);
  const [media, setMedia] = useState(emptyMedia);
  const [altText, setAltText] = useState(undefined as string);
  const [caption, setCaption] = useState(undefined as string);
  const [disableExpand, setDisableExpand] = useState(undefined as boolean);
  const onAdd = () => {
    addFunc('addImage', {
      data: {
        altText,
        caption,
        disableExpand,
        link,
        image: media,
      },
      ...commonFields,
    });
  };
  return (
    <Layout>
      <Cell>
        <InputWithLabel
          label="altText"
          value={altText}
          onChange={e => setAltText(e.currentTarget.value)}
        />
        <InputWithLabel
          label="caption"
          value={caption}
          onChange={e => setCaption(e.currentTarget.value)}
        />
        <HorizontalField label="disableExpand">
          <ToggleSwitch
            checked={disableExpand}
            onChange={e => setDisableExpand(e.currentTarget.checked)}
          />
        </HorizontalField>
      </Cell>
      <Cell>
        <PNLMedia obj={media} setter={setMedia} />
        <PNLLink obj={link} setter={setLink} />
        <PNLCommonFields obj={commonFields} setter={setCommonFields} />
        <Button onClick={onAdd}>Add</Button>
      </Cell>
    </Layout>
  );
};
