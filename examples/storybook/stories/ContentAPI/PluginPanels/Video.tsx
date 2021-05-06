import React, { FC, useState } from 'react';
import { Layout, Cell, Button } from 'wix-style-react';
import {
  emptyCommonBuilderFields,
  emptyMedia,
  emptyPluginContainerData,
  PNLCommonFields,
  PNLMedia,
  PNLContainerData,
} from '../AbstractPanels';
import { EditPanelProps } from '../types';

export const Video: FC<EditPanelProps<'addVideo'>> = ({ addFunc }) => {
  const [commonFields, setCommonFields] = useState(emptyCommonBuilderFields);
  const [thumbnail, setThumbnail] = useState(emptyMedia);
  const [video, setVideo] = useState(emptyMedia);
  const [containerData, setContainerData] = useState(emptyPluginContainerData);
  const onAdd = () => {
    addFunc('addVideo', {
      data: {
        containerData,
        thumbnail,
        video,
      },
      ...commonFields,
    });
  };
  return (
    <Layout>
      <Cell>
        <PNLMedia obj={video} setter={setVideo} title="Video" />
        <PNLMedia obj={thumbnail} setter={setThumbnail} title="Thumbnail" />
        <PNLContainerData obj={containerData} setter={setContainerData} />
        <PNLCommonFields obj={commonFields} setter={setCommonFields} />
        <Button onClick={onAdd}>Add</Button>
      </Cell>
    </Layout>
  );
};
