import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { BLOCK_TYPES } from 'wix-rich-content-common';
import redraft from 'redraft';
import classNames from 'classnames';
import endsWith from 'lodash/endsWith';
import camelCase from 'lodash/camelCase';
import List from '../List';
import getPluginsViewer from '../PluginsViewer';
import { getTextDirection } from './textUtils';

const isEmptyContentState = raw =>
  !raw || !raw.blocks || (raw.blocks.length === 1 && raw.blocks[0].text === '');

const isEmptyBlock = ([_, data]) => data && data.length === 0; //eslint-disable-line no-unused-vars

const getBlockStyleClasses = (data, mergedStyles, textDirection, classes) => {
  const rtl = textDirection || data.textDirection;
  const defaultTextAlignment = rtl ? 'right' : 'left';
  const alignmentClass = data.textAlignment || defaultTextAlignment;
  return classNames(classes, { [mergedStyles.rtl]: rtl }, mergedStyles[alignmentClass]);
};

const blockDataToStyle = ({ dynamicStyles }) =>
  dynamicStyles ? dynamicStyles.mapKeys(camelCase).toJS() : {};

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

const getBlocks = (mergedStyles, textDirection) => {
  const getList = ordered => (items, blockProps) => {
    const fixedItems = items.map(item => (item.length ? item : [' ']));

    const props = {
      key: blockProps.keys[0],
      items: fixedItems,
      ordered,
      mergedStyles,
      textDirection,
      blockProps,
      getBlockStyleClasses,
      blockDataToStyle,
    };
    return <List {...props} />;
  };

  const blockFactory = (type, style, withDiv) => {
    return (children, blockProps) =>
      children.map((child, i) => {
        const Type = typeof type === 'string' ? type : type(child);
        return (
          <Type
            className={getBlockStyleClasses(
              blockProps.data[i],
              mergedStyles,
              textDirection,
              mergedStyles[style]
            )}
            style={blockDataToStyle(blockProps.data[i])}
            key={blockProps.keys[i]}
          >
            {withDiv ? <div>{child}</div> : child}
          </Type>
        );
      });
  };

  return {
    unstyled: blockFactory(child => (isEmptyBlock(child) ? 'div' : 'p'), 'text'),
    blockquote: blockFactory('blockquote', 'quote', true),
    'header-one': blockFactory('h1', 'headerOne'),
    'header-two': blockFactory('h2', 'headerTwo'),
    'header-three': blockFactory('h3', 'headerThree'),
    'code-block': blockFactory('pre', 'codeBlock'),
    'unordered-list-item': getList(false),
    'ordered-list-item': getList(true),
  };
};

const getEntities = (typeMap, pluginProps, styles) => {
  return getPluginsViewer(typeMap, pluginProps, styles);
};

const normalizeContentState = contentState => ({
  ...contentState,
  blocks: contentState.blocks.map(block => {
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

const combineTypeMappers = mappers => {
  if (!mappers || !mappers.length || mappers.some(resolver => typeof resolver !== 'function')) {
    console.warn('typeMappers is expected to be a function array'); // eslint-disable-line no-console
    return {};
  }
  return mappers.reduce((map, mapper) => Object.assign(map, mapper()), {});
};

const redraftOptions = {
  cleanup: {
    after: BLOCK_TYPES.filter(t => t.indexOf('header') === -1),
    split: true,
    except: ['unordered-list-item', 'ordered-list-item', 'unstyled'],
  },
};

const convertToReact = (
  contentState,
  mergedStyles,
  textDirection,
  typeMap,
  entityProps,
  decorators,
  options = {}
) => {
  if (isEmptyContentState(contentState)) {
    return null;
  }

  return redraft(
    normalizeContentState(contentState),
    {
      inline: getInline(mergedStyles),
      blocks: getBlocks(mergedStyles, textDirection),
      entities: getEntities(combineTypeMappers(typeMap), entityProps, mergedStyles),
      decorators,
    },
    { ...redraftOptions, ...options }
  );
};

const convertToHTML = (
  contentState,
  mergedStyles,
  textDirection,
  typeMap,
  entityProps,
  decorators,
  options = {}
) => {
  if (isEmptyContentState(contentState)) {
    return null;
  }

  const reactOutput = convertToReact(
    contentState,
    mergedStyles,
    textDirection,
    typeMap,
    entityProps,
    decorators,
    options
  );

  return reactOutput.reduce((html, blocks) => {
    const blocksArr = blocks instanceof Array ? blocks : [blocks];
    blocksArr.forEach(c => (html += renderToStaticMarkup(c))); //eslint-disable-line no-param-reassign
    return html;
  }, '');
};

export { convertToReact, convertToHTML };
