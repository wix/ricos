import React, { FC } from 'react';
import { Layout, Cell } from 'wix-style-react';

interface Props {
  label?: string;
}
export const HorizontalField: FC<Props> = ({ label, children }) => {
  return (
    <Layout cols={3}>
      <Cell span={1}>{label}</Cell>
      <Cell span={2}>{children}</Cell>
    </Layout>
  );
};
