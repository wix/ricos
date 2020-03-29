import React from 'react';
import PropTypes from 'prop-types';

const draftPublic = 'public-DraftStyleDefault';
const blockClassName = (listType, depth, textDirection) =>
  `${draftPublic}-${listType}ListItem
   ${draftPublic}-depth${depth}
   ${draftPublic}-list${textDirection}`;

const getBlockClassName = (
  contentState,
  blockProps,
  i,
  dataEntry,
  textDirection,
  listType,
  prevDepth
) => {
  const rtl = textDirection === 'rtl' || dataEntry.textDirection === 'rtl';
  const direction = rtl ? 'RTL' : 'LTR';
  const depth = getBlockDepth(contentState, blockProps.keys[i]);

  let className = blockClassName(listType, depth, direction);
  if (i === 0 || depth > prevDepth[0]) {
    className += ` ${draftPublic}-reset`;
  }
  prevDepth[0] = depth;
  return className;
};

const getBlockDepth = (contentState, key) =>
  contentState.blocks.filter(block => block.key === key)[0].depth;

const List = ({
  ordered,
  items,
  mergedStyles,
  textDirection,
  blockProps,
  blockDataToStyle,
  contentState,
}) => {
  const Component = ordered ? 'ol' : 'ul';
  const listType = ordered ? 'ordered' : 'unordered';
  const containerClassName = mergedStyles[`${draftPublic}-${Component}`];
  const prevDepth = [0];
  return (
    <Component className={containerClassName}>
      {items.map((children, i) => {
        // NOTE: list block data is an array of data entries per list item
        const dataEntry = blockProps.data.length > i ? blockProps.data[i] : {};
        let paragraphGroup = [];
        const result = [];
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
            className={getBlockClassName(
              contentState,
              blockProps,
              i,
              dataEntry,
              textDirection,
              listType,
              prevDepth
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
  contentState: PropTypes.object,
};

export default List;
