import React from 'react';
import PropTypes from 'prop-types';

const draftPublic = 'public-DraftStyleDefault';
const getBlockClassName = (listType, depth, textDirection) =>
  `${draftPublic}-${listType}ListItem
   ${draftPublic}-depth${depth}
   ${draftPublic}-list${textDirection}`;

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
  let isFirst = true;
  return (
    <Component className={containerClassName}>
      {items.map((children, i) => {
        // NOTE: list block data is an array of data entries per list item
        const dataEntry = blockProps.data.length > i ? blockProps.data[i] : {};

        const rtl = textDirection === 'rtl' || dataEntry.textDirection === 'rtl';
        const direction = rtl ? 'RTL' : 'LTR';
        let paragraphGroup = [];
        const result = [];
        let blockClassName = getBlockClassName(listType, blockProps.depth, direction);
        if (isFirst) {
          blockClassName += ` ${draftPublic}-reset`;
          isFirst = !isFirst;
        }
        const elementProps = key => ({ className: mergedStyles.elementSpacing, key });
        React.Children.forEach(children, (child, i) => {
          if (child && typeof child.type === 'string') {
            if (/h\d/.exec(child.type)) {
              if (paragraphGroup.length) {
                result.push(<p {...elementProps(i)}>{paragraphGroup}</p>);
                paragraphGroup = [];
              }
              result.push(React.cloneElement(child, elementProps(i)));
            } else {
              paragraphGroup.push(child);
            }
          } else if (child) {
            result.push(child);
          }
        });
        if (paragraphGroup.length) {
          result.push(<p {...elementProps('just_some_key')}>{paragraphGroup}</p>);
        }

        return (
          <li
            className={
              (getBlockStyleClasses(
                dataEntry,
                mergedStyles,
                textDirection,
                mergedStyles[`${listType}List`]
              ),
              blockClassName)
            }
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
