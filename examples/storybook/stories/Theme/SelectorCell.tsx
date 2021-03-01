import React from 'react';
import Styles from './SelectorCell.scss';
import { Pagination, Cell, Heading, Box } from 'wix-style-react';
const SelectorCell = ({ type, index, setIndex, length, children }) => {
  return (
    <Cell>
      <div className={Styles.cellContainer}>
        <Heading appearance={'H2'} style={{ marginBottom: '16px' }}>
          Choose {type}
        </Heading>
        <div style={{ marginBottom: 8 }}>
          <Box width="200px" height="50px">
            {children}
          </Box>
        </div>
        <Pagination
          currentPage={index + 1}
          totalPages={length}
          onChange={({ page }) => setIndex(page - 1)}
        />
      </div>
    </Cell>
  );
};
export { SelectorCell };
