import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isFunction, isNumber } from 'lodash';
import { isPaywallSeo, getPaywallSeoClass } from './utils/paywallSeo';
import {
  sizeClassName,
  alignmentClassName,
  textWrapClassName,
  normalizeUrl,
  TABLE_TYPE,
  IMAGE_TYPE,
  HTML_TYPE,
  ACTION_BUTTON_TYPE,
  LINK_BUTTON_TYPE,
} from 'wix-rich-content-common';
import { getBlockIndex } from './utils/draftUtils';
import RichContentViewer from './RichContentViewer';
import { withInteraction } from './withInteraction';
import Anchor from './components/Anchor.tsx';
class PluginViewer extends PureComponent {
  getContainerClassNames = () => {
    const {
      pluginComponent,
      componentData,
      styles,
      context: { theme, isMobile },
    } = this.props;
    const { size, alignment, textWrap, custom } = pluginComponent.classNameStrategies || {};
    const hasLink = this.componentHasLink();
    const { html } = componentData;
    return classNames(
      styles.pluginContainerReadOnly,
      {
        [styles.pluginContainerMobile]: isMobile,
        [styles.anchor]: hasLink,
        [theme.anchor]: hasLink && theme.anchor,
        [styles.embed]: hasLink && html,
        [styles.horizontalScrollbar]: pluginComponent.withHorizontalScroll,
      },
      isFunction(alignment)
        ? alignment(componentData, theme, styles, isMobile)
        : alignmentClassName(componentData, theme, styles, isMobile),
      isFunction(size)
        ? size(componentData, theme, styles, isMobile)
        : sizeClassName(componentData, theme, styles, isMobile),
      isFunction(textWrap)
        ? textWrap(componentData, theme, styles, isMobile)
        : textWrapClassName(componentData, theme, styles, isMobile),
      isFunction(custom) ? custom(componentData, theme, styles, isMobile) : null
    );
  };

  componentHasLink = () => {
    return this.props?.componentData?.config?.link?.url;
  };

  componentHasAnchor = () => {
    return this.props?.componentData?.config?.link?.anchor;
  };

  innerRCV = ({ contentState, textAlignment, direction, renderedIn }) => {
    const { innerRCEViewerProps } = this.props;
    const renderedInTable = renderedIn === TABLE_TYPE;
    return (
      <RichContentViewer
        initialState={contentState}
        textAlignment={textAlignment}
        direction={direction}
        {...innerRCEViewerProps}
        isInnerRcv
        renderedInTable={renderedInTable}
      />
    );
  };

  /* eslint-disable complexity */
  render() {
    const {
      id,
      type,
      pluginComponent,
      componentData,
      children,
      styles,
      entityIndex,
      context,
      blockIndex,
      SpoilerViewerWrapper,
      blockKey,
    } = this.props;
    const { component: Component, elementType } = pluginComponent;
    const { container } = pluginComponent.classNameStrategies || {};
    const { anchorTarget, config, theme, isMobile } = context;
    const settings = config?.[type] || {};
    const componentProps = {
      type,
      componentData,
      settings,
      children,
      entityIndex,
      ...context,
      innerRCV: this.innerRCV,
      blockKey,
    };

    if (Component) {
      if (elementType !== 'inline') {
        const { config = {} } = componentData;
        const hasLink = this.componentHasLink();
        const hasAnchor = this.componentHasAnchor();
        const ContainerElement = hasLink || hasAnchor ? 'a' : 'div';
        let containerProps = {};
        if (hasLink) {
          const { url, target, rel } = config.link;
          containerProps = {
            href: normalizeUrl(url),
            target: target || anchorTarget || '_self',
            rel: `noopener noreferrer ${rel}`,
          };
        }
        if (hasAnchor) {
          const { anchor } = config.link;
          const href = `#viewer-${anchor}`;
          containerProps = {
            href,
            target: '_self',
          };
        }

        // TODO: more generic logic?
        let customStyles;
        if (config.size === 'inline' || type === HTML_TYPE) {
          customStyles = { width: config.width };
        }
        if (type === IMAGE_TYPE) {
          const { src = {} } = componentData;
          const { size } = config;
          if (
            src.width &&
            (size === 'original' ||
              (isMobile && size === 'inline' && config.width && config.width > 150))
          ) {
            customStyles = { width: src.width, maxWidth: '100%' };
          }
        }

        if ((type === ACTION_BUTTON_TYPE || type === LINK_BUTTON_TYPE) && isNumber(config.width)) {
          componentProps.style = { width: config.width };
        }
        if (customStyles) {
          containerProps.style = customStyles;
        }
        const ContainerClassName = this.getContainerClassNames();

        const ContainerComponent = (
          <ContainerElement className={ContainerClassName} {...containerProps}>
            {isFunction(container) ? (
              <div className={container(theme)}>
                <Component {...componentProps} />
              </div>
            ) : (
              <Component {...componentProps} />
            )}
          </ContainerElement>
        );

        return (
          <div
            id={id}
            className={classNames(
              styles.atomic,
              isPaywallSeo(context.seoMode) &&
                getPaywallSeoClass(context.seoMode.paywall, blockIndex)
            )}
          >
            {SpoilerViewerWrapper ? (
              <SpoilerViewerWrapper
                {...componentProps}
                className={ContainerClassName}
                width={containerProps?.style?.width}
              >
                {ContainerComponent}
              </SpoilerViewerWrapper>
            ) : (
              ContainerComponent
            )}
          </div>
        );
      } else {
        return SpoilerViewerWrapper ? (
          <SpoilerViewerWrapper {...componentProps}>
            <Component {...componentProps} />
          </SpoilerViewerWrapper>
        ) : (
          <Component {...componentProps} />
        );
      }
    }
    return null;
  }
  /* eslint-enable complexity */
}

PluginViewer.propTypes = {
  SpoilerViewerWrapper: PropTypes.func,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  componentData: PropTypes.object.isRequired,
  pluginComponent: PropTypes.object.isRequired,
  entityIndex: PropTypes.number.isRequired,
  children: PropTypes.node,
  styles: PropTypes.object,
  context: PropTypes.shape({
    theme: PropTypes.object.isRequired,
    anchorTarget: PropTypes.string.isRequired,
    config: PropTypes.object.isRequired,
    isMobile: PropTypes.bool.isRequired,
    helpers: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    seoMode: PropTypes.bool,
    iframeSandboxDomain: PropTypes.string,
    disableRightClick: PropTypes.bool,
  }).isRequired,
  innerRCEViewerProps: PropTypes.object,
  blockIndex: PropTypes.number,
  blockKey: PropTypes.string,
};

PluginViewer.defaultProps = {
  styles: {},
};

//return a list of types with a function that wraps the viewer
const getPluginViewers = (
  SpoilerViewerWrapper,
  typeMappers,
  context,
  styles,
  addAnchorsPrefix,
  innerRCEViewerProps
) => {
  const res = {};
  Object.keys(typeMappers).forEach((type, i) => {
    res[type] = (children, entity, { key, block }) => {
      const pluginComponent = typeMappers[type];
      const isInline = pluginComponent.elementType === 'inline';
      const { interactions } = entity;

      const pluginViewer = (
        <PluginViewer
          id={`viewer-${block.key}`}
          type={type}
          pluginComponent={pluginComponent}
          componentData={entity}
          entityIndex={key}
          context={context}
          styles={styles}
          blockIndex={getBlockIndex(context.contentState, block.key)}
          typeMap={typeMappers}
          innerRCEViewerProps={innerRCEViewerProps}
          SpoilerViewerWrapper={SpoilerViewerWrapper}
          withHorizontalScroll
          blockKey={block.key}
        >
          {isInline ? children : null}
        </PluginViewer>
      );

      const wrappedPluginViewer = withInteraction(pluginViewer, interactions, context);

      let anchorElement;
      if (addAnchorsPrefix && !isInline) {
        const anchorType = type.replace('wix-draft-plugin-', '').toLowerCase();
        const anchorKey = `${addAnchorsPrefix}${block.data.index + 1}`;
        anchorElement = <Anchor type={anchorType} anchorKey={anchorKey} />;
      }
      return (
        <React.Fragment key={`${i}_${key}`}>
          {wrappedPluginViewer}
          {anchorElement}
        </React.Fragment>
      );
    };
  });
  return res;
};

export default getPluginViewers;
