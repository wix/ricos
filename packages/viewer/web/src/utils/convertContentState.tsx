import React from 'react';
import {
  BLOCK_TYPES,
  depthClassName,
  getTextDirection,
  getDirectionFromAlignmentAndTextDirection,
  DraftContent,
  TextDirection,
  PluginMapping,
  ViewerContextType,
  Decorator,
  PluginTypeMapper,
  LegacyViewerPluginConfig,
  InlineStyleMapperFunction,
} from 'wix-rich-content-common';
import redraft from 'wix-redraft';
import classNames from 'classnames';
import { endsWith } from 'lodash';
import List from '../List';
import { isPaywallSeo, getPaywallSeoClass } from './paywallSeo';
import getPluginViewers from '../getPluginViewers';
import { kebabToCamelObjectKeys, hasText } from './textUtils';
import { staticInlineStyleMapper } from '../staticInlineStyleMapper';
import { combineMappers } from './combineMappers';
import Anchor from '../components/Anchor';
import styles from '../../statics/rich-content-viewer.scss';
import { withInteraction } from '../withInteraction';

const isEmptyContentState = (raw?: DraftContent) =>
  !raw ||
  !raw.blocks ||
  (raw.blocks.length === 1 && raw.blocks[0].text === '' && raw.blocks[0].type === 'unstyled');

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const isEmptyBlock = ([_, data]) => data && data.length === 0;

const getBlockStyleClasses = (
  mergedStyles: Record<string, string>,
  textDirection: TextDirection,
  textAlignment: 'left' | 'right',
  classes?: string,
  isListItem?: boolean
) => {
  const rtl = textDirection === 'rtl';
  const defaultTextAlignment = rtl ? 'right' : 'left';
  const languageDirection = textDirection || 'ltr';
  const alignmentClass = textAlignment || defaultTextAlignment;
  const directionRTL = isListItem ? rtl : languageDirection !== 'ltr';
  const directionClass = directionRTL ? mergedStyles.rtl : mergedStyles.ltr;

  return classNames(classes, directionClass, mergedStyles[alignmentClass]);
};

const blockDataToStyle = ({ dynamicStyles }) => kebabToCamelObjectKeys(dynamicStyles);

const getInline = (inlineStyleMappers, mergedStyles) =>
  combineMappers([...inlineStyleMappers, staticInlineStyleMapper], mergedStyles);

const getBlocks = (mergedStyles, textDirection, context, addAnchorsPrefix) => {
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
      context,
    };
    return <List {...props} />;
  };

  const blockFactory = (type, style) => {
    return (children, blockProps) =>
      children.map((child, i) => {
        const alignment = blockProps.data[i]?.textAlignment || context.textAlignment;
        const depth = blockProps.data[i].depth;
        const blockDirection = getDirectionFromAlignmentAndTextDirection(
          alignment,
          textDirection || blockProps.data[i]?.textDirection
        );

        const hasJustifyText = alignment === 'justify' && hasText(child);
        const directionBlockClassName = `public-DraftStyleDefault-text-${blockDirection}`;
        const directionTextClassName = `public-DraftStyleDefault-${textDirection ||
          blockProps.data[i]?.textDirection ||
          'ltr'}`;

        const ChildTag = typeof type === 'string' ? type : type(child);
        const blockIndex = blockProps.data[i].index;
        const { interactions } = blockProps.data[i];

        const _child = isEmptyBlock(child) ? <br /> : child;

        const inner = (
          <React.Fragment key={blockProps.keys[i]}>
            <ChildTag
              id={`viewer-${blockProps.keys[i]}`}
              className={classNames(
                getBlockStyleClasses(
                  mergedStyles,
                  textDirection || blockProps.data[i]?.textDirection,
                  alignment,
                  mergedStyles[style]
                ),
                depthClassName(depth),
                directionBlockClassName,
                isPaywallSeo(context.seoMode) &&
                  getPaywallSeoClass(context.seoMode.paywall, blockIndex)
              )}
              style={blockDataToStyle(blockProps.data[i])}
            >
              <span
                className={classNames(
                  styles.child,
                  directionTextClassName,
                  hasJustifyText && styles.hasJustifyText
                )}
              >
                {_child}
              </span>
            </ChildTag>
          </React.Fragment>
        );

        const wrappedBlock = withInteraction(inner, interactions, context);
        const wrapperKey = `${blockProps.keys[i]}_wrap`;
        let resultBlock = <React.Fragment key={wrapperKey}>{wrappedBlock}</React.Fragment>;

        const getAnchorType = () => {
          if (isEmptyBlock(child)) {
            return 'empty-line';
          }
          return typeof type === 'string' ? type : 'paragraph';
        };

        if (addAnchorsPrefix) {
          const anchorKey = `${addAnchorsPrefix}${blockIndex + 1}`;
          resultBlock = (
            <React.Fragment key={wrapperKey}>
              {wrappedBlock}
              <Anchor type={getAnchorType()} key={anchorKey} anchorKey={anchorKey} />
            </React.Fragment>
          );
        }

        return resultBlock;
      });
  };

  return {
    unstyled: blockFactory(child => (isEmptyBlock(child) ? 'div' : 'p'), 'text'),
    blockquote: blockFactory('blockquote', 'quote'),
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

const getEntities = (
  typeMappers,
  context,
  styles,
  addAnchorsPrefix,
  innerRCEViewerProps,
  SpoilerViewerWrapper
) => {
  const emojiViewerFn = (emojiUnicode, data, { key }) => {
    return (
      <span key={key} style={{ fontFamily: 'cursive' }}>
        {emojiUnicode}
      </span>
    );
  };

  return {
    EMOJI_TYPE: emojiViewerFn,
    ...getPluginViewers(
      SpoilerViewerWrapper,
      typeMappers,
      context,
      styles,
      addAnchorsPrefix,
      innerRCEViewerProps
    ),
  };
};

const normalizeContentState = (contentState: DraftContent): DraftContent => ({
  ...contentState,
  blocks: contentState.blocks.map((block, index) => {
    if (block.type === 'atomic') {
      return {
        ...block,
        data: { index },
      };
    }

    const textDirection = getTextDirection(block.text);
    const data = {
      ...block.data,
      depth: block.depth,
      index,
      ...(textDirection === 'rtl' && { textDirection }),
    };

    let text = block.text;
    if (endsWith(text, '\n')) {
      text += '\n';
    }

    return {
      ...block,
      depth: 0,
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
      'header-four',
      'header-five',
      'header-six',
    ],
  },
  convertFromRaw: contentState => contentState,
};

const convertToReact = (
  mergedStyles: Record<string, string>,
  textDirection: TextDirection | undefined,
  typeMappers: PluginMapping,
  context: ViewerContextType,
  decorators: Decorator[],
  inlineStyleMappers: InlineStyleMapperFunction[],
  initSpoilers: (content?: DraftContent) => DraftContent | undefined,
  SpoilerViewerWrapper: unknown,
  options: { addAnchors?: boolean | string; [key: string]: unknown } = {},
  innerRCEViewerProps?: {
    typeMappers: PluginTypeMapper[];
    inlineStyleMappers: InlineStyleMapperFunction[];
    decorators: Decorator[];
    config: LegacyViewerPluginConfig;
  }
) => {
  if (isEmptyContentState(context.contentState)) {
    return null;
  }
  const { addAnchors, ...restOptions } = options;
  const normalizedContentState = context.contentState
    ? normalizeContentState(context.contentState)
    : context.contentState;
  const newContentState = initSpoilers
    ? initSpoilers(normalizedContentState)
    : normalizedContentState;

  const addAnchorsPrefix = addAnchors && (addAnchors === true ? 'rcv-block' : addAnchors);

  let result = redraft(
    newContentState,
    {
      inline: getInline(inlineStyleMappers, mergedStyles),
      blocks: getBlocks(mergedStyles, textDirection, context, addAnchorsPrefix),
      entities: getEntities(
        typeMappers,
        context,
        mergedStyles,
        addAnchorsPrefix,
        innerRCEViewerProps,
        SpoilerViewerWrapper
      ),
      decorators,
    },
    { ...redraftOptions, ...restOptions }
  );
  if (addAnchors) {
    const firstAnchorKey = `${addAnchorsPrefix}-first`;
    const lastAnchorKey = `${addAnchorsPrefix}-last`;
    result = (
      <>
        <Anchor type={'first'} anchorKey={firstAnchorKey} />
        {result}
        <Anchor type={'last'} anchorKey={lastAnchorKey} />
      </>
    );
  }
  return result;
};

// renderToStaticMarkup param should be imported 'react-dom/server' (in order reduce viewer bundle size and probably not used anyhow)
// TODO: need to check if it's been used
const convertToHTML = (reactOutput, renderToStaticMarkup) => {
  if (!reactOutput) {
    return null;
  }
  return reactOutput.reduce((html, blocks) => {
    const blocksArr = blocks instanceof Array ? blocks : [blocks];
    blocksArr.forEach(c => (html += renderToStaticMarkup(c))); //eslint-disable-line no-param-reassign
    return html;
  }, '');
};

export { convertToReact, convertToHTML };
