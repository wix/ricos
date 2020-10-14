import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getBlockIndex } from './utils/draftUtils';
import { hasText } from './utils/textUtils';
import { isPaywallSeo, getPaywallSeoClass } from './utils/paywallSeo';
import { getDirectionFromAlignmentAndTextDirection } from 'wix-rich-content-common';
import { getInteractionWrapper, DefaultInteractionWrapper } from './utils/getInteractionWrapper';
import styles from '../statics/rich-content-viewer.scss';

const draftPublic = 'public-DraftStyleDefault';
const draftClassNames = (listType, depth, textDirection) =>
  `${draftPublic}-${listType}ListItem
   ${draftPublic}-depth${depth}
   ${draftPublic}-list-${textDirection}`;

const getBlockClassName = (isNewList, direction, listType, depth) => {
  let className = draftClassNames(listType, depth, direction);
  if (isNewList) {
    className += ` ${draftPublic}-reset`;
  }
  return className;
};

const List = ({
  ordered,
  items,
  mergedStyles,
  textDirection,
  blockProps,
  getBlockStyleClasses,
  blockDataToStyle,
  getBlockDepth,
  context,
}) => {
  const Component = ordered ? 'ol' : 'ul';
  const listType = ordered ? 'ordered' : 'unordered';
  const containerClassName = `${draftPublic}-${Component}`;
  const listItemTypeClassName = `${listType}List`;
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
        const alignment = dataEntry?.textAlignment || context.textAlignment;
        const textClassName = getBlockStyleClasses(
          mergedStyles,
          textDirection || dataEntry.textDirection,
          alignment
        );
        const hasJustifyText = alignment === 'justify' && hasText(children);
        const elementProps = key => ({
          className: classNames(mergedStyles.elementSpacing, textClassName, {
            [styles.hasJustifyText]: hasJustifyText,
          }),
          key,
          style: { display: alignment === 'center' ? 'inline' : undefined },
        });
        React.Children.forEach(children, (child, i) => {
          if (child) {
            if (typeof child.type === 'string' && /h\d/.exec(child.type)) {
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

        const depth = getBlockDepth(context.contentState, blockProps.keys[childIndex]);
        const isNewList = childIndex === 0 || depth > prevDepth;
        const listItemDirection = getDirectionFromAlignmentAndTextDirection(
          alignment,
          textDirection || dataEntry.textDirection
        );
        const className = getBlockClassName(isNewList, listItemDirection, listType, depth);
        prevDepth = depth;
        const blockIndex = getBlockIndex(context.contentState, blockProps.keys[childIndex]);

        return (
          <li
            id={`viewer-${blockProps.keys[childIndex]}`}
            className={classNames(
              context.theme[listItemTypeClassName],
              styles[listItemTypeClassName],
              styles[alignment],
              getBlockStyleClasses(mergedStyles, listItemDirection, alignment, className, true),
              isPaywallSeo(context.seoMode) &&
                getPaywallSeoClass(context.seoMode.paywall, blockIndex)
            )}
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
  getBlockDepth: PropTypes.func,
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
    contentState: PropTypes.object,
    disableRightClick: PropTypes.bool,
    textAlignment: PropTypes.oneOf(['left', 'right']),
  }).isRequired,
};

export default List;
