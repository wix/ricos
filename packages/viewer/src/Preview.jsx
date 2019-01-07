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

const withTextAlignment = (element, data, mergedStyles, textDirection) => {
  const appliedTextDirection = textDirection || data.textDirection || 'ltr';
  const defaultTextAlignment = appliedTextDirection === 'rtl' ? 'right' : 'left';
  const alignmentClass = data.textAlignment ? data.textAlignment : defaultTextAlignment;
  const elementProps = {
    ...element.props,
    className: classNames(
      {
        [element.props.className]: !!element.props.className,
        [mergedStyles.rtl]: appliedTextDirection === 'rtl'
      },
      mergedStyles[alignmentClass])
  };
  return React.cloneElement(element, elementProps, element.props.children);
};

const getInline = mergedStyles => {
  return {
    BOLD: (children, { key }) => <strong key={key}>{children}</strong>,
    ITALIC: (children, { key }) => <em key={key}>{children}</em>,
    UNDERLINE: (children, { key }) => <u key={key}>{children}</u>,
    CODE: (children, { key }) => <span key={key} className={mergedStyles.code}>{children}</span>
  };
};

const getList = (ordered, mergedStyles, textDirection) =>
  (children, blockProps) => {
    const fixedChildren = children.map(child => child.length ? child : [' ']);
    const className = ordered ? 'ordered' : 'unordered';
    const containerClassName = mergedStyles[`${className}ListContainer`];
    return (
      <List key={blockProps.keys[0]} keys={blockProps.keys} depth={blockProps.depth} ordered={ordered} className={containerClassName}>
        {fixedChildren.map((child, i) => {
          // NOTE: list block data is an array of data entries per list item
          const dataEntry = blockProps.data.length > i ? blockProps.data[i] : {};
          return withTextAlignment(
            <li className={mergedStyles[`${className}List`]} key={blockProps.keys[i]}>
              <p className={mergedStyles.elementSpacing}>
                {child}
              </p>
            </li>,
            dataEntry, mergedStyles, textDirection);
        })}
      </List>
    );
  };

const getBlocks = (mergedStyles, textDirection) => {
  return {
    unstyled: (children, blockProps) => children.map((child, i) =>
      withTextAlignment(
        <p className={mergedStyles.text} key={blockProps.keys[i]}>{child}</p>,
        blockProps.data[i],
        mergedStyles,
        textDirection
      )
    ),
    blockquote: (children, blockProps) => children.map((child, i) =>
      withTextAlignment(<blockquote className={mergedStyles.quote} key={blockProps.keys[i]}><div>{child}</div></blockquote>,
        blockProps.data[i], mergedStyles, textDirection)),
    'header-one': (children, blockProps) => children.map((child, i) =>
      withTextAlignment(<h1 className={mergedStyles.headerOne} key={blockProps.keys[i]}>{child}</h1>,
        blockProps.data[i], mergedStyles, textDirection)),
    'header-two': (children, blockProps) => children.map((child, i) =>
      withTextAlignment(<h2 className={mergedStyles.headerTwo} key={blockProps.keys[i]}>{child}</h2>,
        blockProps.data[i], mergedStyles, textDirection)),
    'header-three': (children, blockProps) => children.map((child, i) =>
      withTextAlignment(<h3 className={mergedStyles.headerThree} key={blockProps.keys[i]}>{child}</h3>,
        blockProps.data[i], mergedStyles, textDirection)),
    'code-block': (children, blockProps) => children.map((child, i) =>
      withTextAlignment(<pre key={blockProps.keys[i]} className={mergedStyles.codeBlock}>{child}</pre>,
        blockProps.data[i], mergedStyles, textDirection)),
    'unordered-list-item': getList(false, mergedStyles, textDirection),
    'ordered-list-item': getList(true, mergedStyles, textDirection),
  };
};

const getEntities = (typeMap, pluginProps) => ({
  ...getPluginsViewer(typeMap, pluginProps)
});

const combineTypeMappers = mappers => {
  if (!mappers || !mappers.length || mappers.some(resolver => typeof resolver !== 'function')) {
    console.warn('typeMappers is expected to be a function array'); // eslint-disable-line no-console
    return {};
  }
  return mappers.reduce((map, mapper) => Object.assign(map, mapper()), {});
};

const isEmptyRaw = raw => (!raw || !raw.blocks || (raw.blocks.length === 1 && raw.blocks[0].text === ''));

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

const Preview = ({ raw, typeMappers, theme, isMobile, decorators, anchorTarget, relValue, config, textDirection }) => {
  const mergedStyles = mergeStyles({ styles, theme });
  const isEmpty = isEmptyRaw(raw);
  const typeMap = combineTypeMappers(typeMappers);

  const className = classNames(mergedStyles.preview, textDirection === 'rtl' && mergedStyles.rtl);

  return (
    <div className={className}>
      {isEmpty && <div>There is nothing to render...</div>}
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
        )
      }
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
      })
    ])
  ),
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  config: PropTypes.object,
};

export default Preview;
