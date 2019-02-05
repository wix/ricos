import React from 'react';
import PropTypes from 'prop-types';

const List = ({ ordered, items, mergedStyles, textDirection, blockProps, textAlignmentStyle }) => {
  const Component = ordered ? 'ol' : 'ul';
  const listType = ordered ? 'ordered' : 'unordered';
  const containerClassName = mergedStyles[`${listType}ListContainer`];
  return (
    <Component className={containerClassName}>
      {items.map((children, i) => {
        // NOTE: list block data is an array of data entries per list item
        const dataEntry = blockProps.data.length > i ? blockProps.data[i] : {};

        let paragraphGroup = [];
        const result = [];
        const elementProps = { className: mergedStyles.elementSpacing };
        React.Children.forEach(children, child => {
          if (child) {
            if (/h\d/.exec(child.type)) {
              if (paragraphGroup.length) {
                result.push(<p {...elementProps}>{paragraphGroup}</p>);
                paragraphGroup = [];
              }
              result.push(React.cloneElement(child, elementProps));
            } else {
              paragraphGroup.push(child);
            }
          }
        });
        if (paragraphGroup.length) {
          result.push(<p {...elementProps}>{paragraphGroup}</p>);
        }

        return (
          <li
            className={textAlignmentStyle(
              dataEntry,
              mergedStyles,
              textDirection,
              mergedStyles[`${listType}List`]
            )}
            key={blockProps.keys[i]}
          >
            {result}
          </li>
        );
      })}
    </Component>
  );
};

List.propTypes = {
  ordered: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  items: PropTypes.array,
  mergedStyles: PropTypes.object,
  textDirection: PropTypes.oneOf(['rtl', 'ltr']),
  blockProps: PropTypes.object,
  textAlignmentStyle: PropTypes.func,
};

export default List;
