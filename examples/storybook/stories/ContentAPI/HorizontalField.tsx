import React, { FC } from 'react';
import { Layout, Cell } from 'wix-style-react';

interface Props {
  label?: string;
  withStartPadding?: boolean;
}
export const HorizontalField: FC<Props> = ({ label, withStartPadding, children }) => {
  const paddingInlineStart = withStartPadding ? '60px' : undefined;
  return (
    <div style={{ paddingInlineStart }}>
      <Layout cols={3}>
        <Cell span={1}>{label}</Cell>
        <Cell span={2}>{children}</Cell>
      </Layout>
    </div>
  );
};
