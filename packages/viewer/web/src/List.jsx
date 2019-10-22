import React from 'react';
import PropTypes from 'prop-types';

const List = ({
  ordered,
  items,
  mergedStyles,
  textDirection,
  blockProps,
  getBlockStyleClasses,
  blockDataToStyle,
}) => {
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
        const elementProps = key => ({ className: mergedStyles.elementSpacing, key });
        React.Children.forEach(children, (child, i) => {
          if (child) {
            if (/h\d/.exec(child.type)) {
              if (paragraphGroup.length) {
                result.push(<p {...elementProps(i)}>{paragraphGroup}</p>);
                paragraphGroup = [];
              }
              result.push(React.cloneElement(child, elementProps(i)));
            } else {
              paragraphGroup.push(child);
            }
          }
        });
        if (paragraphGroup.length) {
          result.push(<p {...elementProps('just_some_key')}>{paragraphGroup}</p>);
        }

        return (
          <li
            className={getBlockStyleClasses(
              dataEntry,
              mergedStyles,
              textDirection,
              mergedStyles[`${listType}List`]
            )}
            key={blockProps.keys[i]}
            style={blockDataToStyle(blockProps.data[i])}
          >
            {result}
          </li>
        );
      })}
    </Component>
  );
};

List.propTypes = {
  blockDataToStyle: PropTypes.func,
  blockProps: PropTypes.object,
  getBlockStyleClasses: PropTypes.func,
  items: PropTypes.array,
  mergedStyles: PropTypes.object,
  ordered: PropTypes.bool,
  textDirection: PropTypes.oneOf(['rtl', 'ltr']),
};

export default List;
