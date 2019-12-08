import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { BLOCK_TYPES } from 'wix-rich-content-common';
import redraft from 'redraft';
import classNames from 'classnames';
import { endsWith, isEmpty, isArray } from 'lodash';
import List from '../List';
import getPluginViewers from '../getPluginViewers';
import { getTextDirection, kebabToCamelObjectKeys } from './textUtils';
import { staticInlineStyleMapper } from '../staticInlineStyleMapper';
import { combineMappers } from './combineMappers';
import { getInteractionWrapper, DefaultInteractionWrapper } from './getInteractionWrapper';

const isEmptyContentState = raw =>
  !raw || !raw.blocks || (raw.blocks.length === 1 && raw.blocks[0].text === '');

const isEmptyBlock = ([_, data]) => data && data.length === 0; //eslint-disable-line no-unused-vars

const getBlockStyleClasses = (data, mergedStyles, textDirection, classes) => {
  const rtl = textDirection === 'rtl' || data.textDirection === 'rtl';
  const defaultTextAlignment = rtl ? 'right' : 'left';
  const alignmentClass = data.textAlignment || defaultTextAlignment;
  return classNames(
    classes,
    { [mergedStyles.rtl]: rtl, [mergedStyles.ltr]: !rtl },
    mergedStyles[alignmentClass]
  );
};

const blockDataToStyle = ({ dynamicStyles }) => kebabToCamelObjectKeys(dynamicStyles);

const getInline = (inlineStyleMappers, mergedStyles) =>
  combineMappers([...inlineStyleMappers, staticInlineStyleMapper], mergedStyles);

const getBlocks = (mergedStyles, textDirection, { config }) => {
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
        const { interactions } = blockProps.data[i];
        const BlockWrapper = isArray(interactions)
          ? getInteractionWrapper({ interactions, config, mergedStyles })
          : DefaultInteractionWrapper;

        return (
          <BlockWrapper key={`${blockProps.keys[i]}_wrap`}>
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
          </BlockWrapper>
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
  return getPluginViewers(typeMap, pluginProps, styles);
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

    if (block.type === 'unstyled' && isEmpty(text.trim())) {
      text = '\u00A0'; // non-breaking space
    }

    return {
      ...block,
      data,
      text,
    };
  }),
});

const redraftOptions = {
  cleanup: {
    after: BLOCK_TYPES.filter(t => t.indexOf('header') === -1),
    split: true,
    except: [
      'unordered-list-item',
      'ordered-list-item',
      'unstyled',
      'header-one',
      'header-two',
      'header-three',
    ],
  },
  convertFromRaw: contentState => contentState,
};

const convertToReact = (
  contentState,
  mergedStyles,
  textDirection,
  typeMap,
  entityProps,
  decorators,
  inlineStyleMappers,
  options = {}
) => {
  if (isEmptyContentState(contentState)) {
    return null;
  }

  return redraft(
    normalizeContentState(contentState),
    {
      inline: getInline(inlineStyleMappers, mergedStyles),
      blocks: getBlocks(mergedStyles, textDirection, entityProps),
      entities: getEntities(combineMappers(typeMap), entityProps, mergedStyles),
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
