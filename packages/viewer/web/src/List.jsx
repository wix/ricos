import React from 'react';
import PropTypes from 'prop-types';
import { getInteractionWrapper, DefaultInteractionWrapper } from './utils/getInteractionWrapper';
const draftPublic = 'public-DraftStyleDefault';
const draftClassNames = (listType, depth, textDirection) =>
  `${draftPublic}-${listType}ListItem
   ${draftPublic}-depth${depth}
   ${draftPublic}-list${textDirection}`;

const getBlockClassName = (isNewList, dataEntry, textDirection, listType, depth) => {
  const rtl = textDirection === 'rtl' || dataEntry.textDirection === 'rtl';
  const direction = rtl ? 'RTL' : 'LTR';
  let className = draftClassNames(listType, depth, direction);
  if (isNewList) {
    className += ` ${draftPublic}-reset`;
  }
  return className;
};

const getBlockDepth = (contentState, key) =>
  contentState.blocks.find(block => block.key === key).depth;

const List = ({
  ordered,
  items,
  mergedStyles,
  textDirection,
  blockProps,
  getBlockStyleClasses,
  blockDataToStyle,
  contentState,
  context,
}) => {
  const Component = ordered ? 'ol' : 'ul';
  const listType = ordered ? 'ordered' : 'unordered';
  const containerClassName = `${draftPublic}-${Component}`;
  let prevDepth = 0;
  return (
    <Component className={containerClassName}>
      {items.map((children, childIndex) => {
        // NOTE: list block data is an array of data entries per list item
        const dataEntry = blockProps.data.length > childIndex ? blockProps.data[childIndex] : {};

        const { interactions } = blockProps.data[childIndex];
        const BlockWrapper = Array.isArray(interactions)
          ? getInteractionWrapper({ interactions, context })
          : DefaultInteractionWrapper;

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

        const depth = getBlockDepth(contentState, blockProps.keys[childIndex]);
        const isNewList = childIndex === 0 || depth > prevDepth;
        const className = getBlockClassName(isNewList, dataEntry, textDirection, listType, depth);
        prevDepth = depth;

        return (
          <li
            className={getBlockStyleClasses(dataEntry, mergedStyles, textDirection, className)}
            key={blockProps.keys[childIndex]}
            style={blockDataToStyle(blockProps.data[childIndex])}
          >
            <BlockWrapper>{result.length === 0 ? ' ' : result}</BlockWrapper>
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
  context: PropTypes.shape({
    theme: PropTypes.object.isRequired,
    anchorTarget: PropTypes.string.isRequired,
    relValue: PropTypes.string.isRequired,
    config: PropTypes.object.isRequired,
    isMobile: PropTypes.bool.isRequired,
    helpers: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    seoMode: PropTypes.bool,
    siteDomain: PropTypes.string,
    disableRightClick: PropTypes.bool,
  }).isRequired,
};

export default List;
