import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isFunction, isArray } from 'lodash';
import { isPaywallSeo, getPaywallSeoClass } from './utils/paywallSeo';
import {
  sizeClassName,
  alignmentClassName,
  textWrapClassName,
  normalizeUrl,
} from 'wix-rich-content-common';
import { getBlockIndex } from './utils/draftUtils';
import { getInteractionWrapper, DefaultInteractionWrapper } from './utils/getInteractionWrapper';
import RichContentViewer from './RichContentViewer';

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
    return this.props?.componentData?.config?.link;
  };

  viewerForInnerRCE = contentState => {
    const { innerRCEViewerProps } = this.props;
    return <RichContentViewer initialState={contentState} {...innerRCEViewerProps} />;
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
    } = this.props;
    const { component: Component, elementType } = pluginComponent;
    const { container } = pluginComponent.classNameStrategies || {};
    const { anchorTarget, relValue, config, theme } = context;
    const settings = config?.[type] || {};
    const componentProps = {
      componentData,
      settings,
      children,
      entityIndex,
      ...context,
      viewerForInnerRCE: this.viewerForInnerRCE,
    };

    if (Component) {
      if (elementType !== 'inline') {
        const { config = {} } = componentData;
        const hasLink = this.componentHasLink();
        const ContainerElement = hasLink ? 'a' : 'div';
        let containerProps = {};
        if (hasLink) {
          const { url, target, rel } = config.link;
          containerProps = {
            href: normalizeUrl(url),
            target: target || anchorTarget || '_self',
            rel: rel || relValue || 'noopener noreferrer',
          };
        }

        // TODO: more generic logic?
        let customStyles;
        if (config.size === 'inline' || type === 'wix-draft-plugin-html') {
          customStyles = { width: config.width };
        }
        if (type === 'wix-draft-plugin-image') {
          const { src = {} } = componentData;
          const { size } = config;
          if (size === 'original' && src.width) {
            customStyles = { width: src.width, maxWidth: '100%' };
          }
        }
        if (customStyles) {
          containerProps.style = customStyles;
        }

        return (
          <div
            id={id}
            className={classNames(
              styles.atomic,
              isPaywallSeo(context.seoMode) &&
                getPaywallSeoClass(context.seoMode.paywall, blockIndex)
            )}
          >
            <ContainerElement className={this.getContainerClassNames()} {...containerProps}>
              {isFunction(container) ? (
                <div className={container(theme)}>
                  <Component {...componentProps} />
                </div>
              ) : (
                <Component {...componentProps} />
              )}
            </ContainerElement>
          </div>
        );
      } else {
        return <Component {...componentProps} />;
      }
    }
    return null;
  }
  /* eslint-enable complexity */
}

PluginViewer.propTypes = {
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
    relValue: PropTypes.string.isRequired,
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
};

PluginViewer.defaultProps = {
  styles: {},
};

//return a list of types with a function that wraps the viewer
const getPluginViewers = (typeMappers, context, styles, addAnchorFnc, innerRCEViewerProps) => {
  const res = {};
  Object.keys(typeMappers).forEach((type, i) => {
    res[type] = (children, entity, { key, block }) => {
      const pluginComponent = typeMappers[type];
      const isInline = pluginComponent.elementType === 'inline';
      const { interactions } = entity;

      const ViewerWrapper = isArray(interactions)
        ? getInteractionWrapper({ interactions, context })
        : DefaultInteractionWrapper;

      return (
        <>
          <ViewerWrapper key={`${i}_${key}`}>
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
            >
              {isInline ? children : null}
            </PluginViewer>
          </ViewerWrapper>
          {addAnchorFnc && addAnchorFnc(type.replace('wix-draft-plugin-', '').toLowerCase())}
        </>
      );
    };
  });
  return res;
};

export default getPluginViewers;
