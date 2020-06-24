import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  BLOCK_TYPES,
  depthClassName,
  getTextDirection,
  getDirectionFromAlignmentAndTextDirection,
} from 'wix-rich-content-common';
import redraft from 'wix-redraft';
import classNames from 'classnames';
import { endsWith } from 'lodash';
import List from '../List';
import { isPaywallSeo, getPaywallSeoClass } from './paywallSeo';
import getPluginViewers from '../getPluginViewers';
import { kebabToCamelObjectKeys } from './textUtils';
import { staticInlineStyleMapper } from '../staticInlineStyleMapper';
import { combineMappers } from './combineMappers';
import { getInteractionWrapper, DefaultInteractionWrapper } from './getInteractionWrapper';
import Anchor from '../components/Anchor';

const isEmptyContentState = raw =>
  !raw ||
  !raw.blocks ||
  (raw.blocks.length === 1 && raw.blocks[0].text === '' && raw.blocks[0].type === 'unstyled');

const isEmptyBlock = ([_, data]) => data && data.length === 0; //eslint-disable-line no-unused-vars

const getBlockDepth = (contentState, key) =>
  contentState.blocks.find(block => block.key === key).depth || 0;

const getBlockStyleClasses = (data, mergedStyles, textDirection, classes) => {
  const rtl =
    getDirectionFromAlignmentAndTextDirection(
      data.textAlignment,
      textDirection || data.textDirection
    ) === 'rtl';
  const defaultTextAlignment = rtl ? 'right' : 'left';
  const alignmentClass = data.textAlignment || defaultTextAlignment;
  return classNames(
    classes,
    { [mergedStyles.rtl]: rtl, [mergedStyles.ltr]: !rtl },
    mergedStyles[alignmentClass]
  );
};

let blockCount = 0;

const blockDataToStyle = ({ dynamicStyles }) => kebabToCamelObjectKeys(dynamicStyles);

const getInline = (inlineStyleMappers, mergedStyles) =>
  combineMappers([...inlineStyleMappers, staticInlineStyleMapper], mergedStyles);

const getBlocks = (contentState, mergedStyles, textDirection, context, addAnchors) => {
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
      contentState,
      getBlockDepth,
      context,
    };
    return <List {...props} />;
  };

  const blockFactory = (type, style, withDiv) => {
    return (children, blockProps) =>
      children.map((child, i) => {
        const depth = getBlockDepth(contentState, blockProps.keys[i]);
        const direction = getDirectionFromAlignmentAndTextDirection(
          blockProps.data[0]?.textAlignment,
          blockProps.data[0]?.textDirection
        );
        const directionClassName = `public-DraftStyleDefault-text-${direction}`;
        const ChildTag = typeof type === 'string' ? type : type(child);

        const { interactions } = blockProps.data[i];
        const BlockWrapper = Array.isArray(interactions)
          ? getInteractionWrapper({ interactions, context })
          : DefaultInteractionWrapper;

        const _child = isEmptyBlock(child) ? <br /> : withDiv ? <div>{child}</div> : child;
        const inner = (
          <ChildTag
            id={`viewer-${blockProps.keys[i]}`}
            className={classNames(
              getBlockStyleClasses(
                blockProps.data[i],
                mergedStyles,
                textDirection,
                mergedStyles[style]
              ),
              depthClassName(depth),
              directionClassName,
              isPaywallSeo(context.seoMode) &&
                getPaywallSeoClass(context.seoMode, blockProps.data[i].blockIndex)
            )}
            style={blockDataToStyle(blockProps.data[i])}
            key={blockProps.keys[i]}
          >
            {_child}
          </ChildTag>
        );

        const blockWrapper = (
          <BlockWrapper key={`${blockProps.keys[i]}_wrap`}>{inner}</BlockWrapper>
        );

        const shouldAddAnchors = addAnchors && !isEmptyBlock(child);
        let resultBlock = blockWrapper;

        if (shouldAddAnchors) {
          blockCount++;
          const anchorKey = `${addAnchors}${blockCount}`;
          resultBlock = (
            <>
              {blockWrapper}
              <Anchor key={anchorKey} anchorKey={anchorKey} />
            </>
          );
        }

        return resultBlock;
      });
  };

  return {
    unstyled: blockFactory(child => (isEmptyBlock(child) ? 'div' : 'p'), 'text'),
    blockquote: blockFactory('blockquote', 'quote', true),
    'header-one': blockFactory('h1', 'headerOne'),
    'header-two': blockFactory('h2', 'headerTwo'),
    'header-three': blockFactory('h3', 'headerThree'),
    'header-four': blockFactory('h4', 'headerFour'),
    'header-five': blockFactory('h5', 'headerFive'),
    'header-six': blockFactory('h6', 'headerSix'),
    'code-block': blockFactory('pre', 'codeBlock'),
    'unordered-list-item': getList(false),
    'ordered-list-item': getList(true),
  };
};

const getEntities = (typeMap, pluginProps, styles) => {
  const emojiViewerFn = (emojiUnicode, data, { key }) => {
    return (
      <span key={key} style={{ fontFamily: 'cursive' }}>
        {emojiUnicode}
      </span>
    );
  };
  return {
    EMOJI_TYPE: emojiViewerFn,
    ...getPluginViewers(typeMap, pluginProps, styles),
  };
};

const normalizeContentState = contentState => ({
  ...contentState,
  blocks: contentState.blocks.map((block, blockIndex) => {
    if (block.type === 'atomic') {
      return { ...block, data: { ...block.data, blockIndex } };
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
      depth: 0,
      data: { ...data, blockIndex },
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
      'header-four',
      'header-five',
      'header-six',
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
  const { addAnchors, ...restOptions } = options;

  const parsedAddAnchors = addAnchors && (addAnchors === true ? 'rcv-block' : addAnchors);
  blockCount = 0;
  return redraft(
    normalizeContentState(contentState),
    {
      inline: getInline(inlineStyleMappers, mergedStyles),
      blocks: getBlocks(contentState, mergedStyles, textDirection, entityProps, parsedAddAnchors),
      entities: getEntities(combineMappers(typeMap), entityProps, mergedStyles),
      decorators,
    },
    { ...redraftOptions, ...restOptions }
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

  blockCount = 0;
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
