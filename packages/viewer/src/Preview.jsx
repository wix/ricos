import React from 'react';
import PropTypes from 'prop-types';
import redraft from 'redraft';
import classNames from 'classnames';
import endsWith from 'lodash/endsWith';
import { mergeStyles } from 'wix-rich-content-common';
import getPluginsViewer from './PluginsViewer';
import { getTextDirection } from './utils/textUtils';
import List from './List';
import styles from '../statics/rich-content-viewer.scss';

const isEmptyBlock = ([_, data]) => data && data.length === 0; //eslint-disable-line no-unused-vars

const textAlignmentStyle = (data, mergedStyles, textDirection, classes) => {
  const rtl = textDirection || data.textDirection;
  const defaultTextAlignment = rtl ? 'right' : 'left';
  const alignmentClass = data.textAlignment || defaultTextAlignment;
  return classNames(classes, { [mergedStyles.rtl]: rtl }, mergedStyles[alignmentClass]);
};

const getInline = mergedStyles => {
  return {
    BOLD: (children, { key }) => <strong key={key}>{children}</strong>,
    ITALIC: (children, { key }) => <em key={key}>{children}</em>,
    UNDERLINE: (children, { key }) => <u key={key}>{children}</u>,
    CODE: (children, { key }) => (
      <span key={key} className={mergedStyles.code}>
        {children}
      </span>
    ),
  };
};

const getList = (ordered, mergedStyles, textDirection) => (items, blockProps) => {
  const fixedItems = items.map(item => (item.length ? item : [' ']));

  const props = {
    key: blockProps.keys[0],
    items: fixedItems,
    ordered,
    mergedStyles,
    textDirection,
    blockProps,
    textAlignmentStyle,
  };
  return <List key={blockProps.keys[0]} {...props} />;
};

const getUnstyledBlocks = (mergedStyles, textDirection) => (children, blockProps) =>
  children.map((child, i) => {
    if (!isEmptyBlock(child)) {
      return (
        <p
          className={textAlignmentStyle(
            blockProps.data[i],
            mergedStyles,
            textDirection,
            mergedStyles.text
          )}
          key={blockProps.keys[i]}
        >
          {child}
        </p>
      );
    } else {
      return <div className={mergedStyles.text} />;
    }
  });

const getBlocks = (mergedStyles, textDirection) => {
  const blockFactory = (Type, style, withDiv) => {
    return (children, blockProps) =>
      children.map((child, i) => (
        <Type
          className={textAlignmentStyle(
            blockProps.data[i],
            mergedStyles,
            textDirection,
            mergedStyles[style]
          )}
          key={blockProps.keys[i]}
        >
          {withDiv ? <div>{child}</div> : child}
        </Type>
      ));
  };

  return {
    unstyled: getUnstyledBlocks(mergedStyles, textDirection),
    blockquote: blockFactory('blockquote', 'quote', true),
    'header-one': blockFactory('h1', 'headerOne'),
    'header-two': blockFactory('h2', 'headerTwo'),
    'header-three': blockFactory('h3', 'headerThree'),
    'code-block': blockFactory('pre', 'codeBlock'),
    'unordered-list-item': getList(false, mergedStyles, textDirection),
    'ordered-list-item': getList(true, mergedStyles, textDirection),
  };
};

const getEntities = (typeMap, pluginProps) => ({
  ...getPluginsViewer(typeMap, pluginProps),
});

const combineTypeMappers = mappers => {
  if (!mappers || !mappers.length || mappers.some(resolver => typeof resolver !== 'function')) {
    console.warn('typeMappers is expected to be a function array'); // eslint-disable-line no-console
    return {};
  }
  return mappers.reduce((map, mapper) => Object.assign(map, mapper()), {});
};

const isEmptyRaw = raw =>
  !raw || !raw.blocks || (raw.blocks.length === 1 && raw.blocks[0].text === '');

const options = {
  cleanup: {
    after: 'all',
    split: true,
    except: ['unordered-list-item', 'ordered-list-item', 'unstyled'],
  },
};

const augmentRaw = raw => ({
  ...raw,
  blocks: raw.blocks.map(block => {
    if (block.type === 'atomic') {
      return block;
    }

    const data = { ...block.data };
    const direction = getTextDirection(block.text);
    if (direction === 'rtl') {
      data.textDirection = direction;
    }

    let text = block.text;
    if (endsWith(text, '\n')) {
      text += '\n';
    }

    return {
      ...block,
      data,
      text,
    };
  }),
});

const Preview = ({
  raw,
  typeMappers,
  theme,
  isMobile,
  decorators,
  anchorTarget,
  relValue,
  config,
  textDirection,
}) => {
  const mergedStyles = mergeStyles({ styles, theme });
  const isEmpty = isEmptyRaw(raw);
  const typeMap = combineTypeMappers(typeMappers);

  const className = classNames(mergedStyles.preview, textDirection === 'rtl' && mergedStyles.rtl);

  return (
    <div className={className}>
      {!isEmpty &&
        redraft(
          augmentRaw(raw),
          {
            inline: getInline(mergedStyles),
            blocks: getBlocks(mergedStyles, textDirection),
            entities: getEntities(typeMap, { theme, isMobile, anchorTarget, relValue, config }),
            decorators,
          },
          options
        )}
    </div>
  );
};

Preview.propTypes = {
  raw: PropTypes.shape({
    blocks: PropTypes.array.isRequired,
    entityMap: PropTypes.object.isRequired,
  }).isRequired,
  typeMappers: PropTypes.arrayOf(PropTypes.func),
  theme: PropTypes.object,
  isMobile: PropTypes.bool,
  textDirection: PropTypes.oneOf(['rtl', 'ltr']),
  decorators: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        getDecorations: PropTypes.func.isRequired,
        getComponentForKey: PropTypes.func.isRequired,
        getPropsForKey: PropTypes.func.isRequired,
      }),
      PropTypes.shape({
        component: PropTypes.func.isRequired,
        strategy: PropTypes.func.isRequired,
      }),
    ])
  ),
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  config: PropTypes.object,
};

export default Preview;
