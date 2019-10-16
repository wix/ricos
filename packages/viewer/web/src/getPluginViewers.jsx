import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isFunction } from 'lodash';
import {
  sizeClassName,
  alignmentClassName,
  textWrapClassName,
  normalizeUrl,
  Context,
} from 'wix-rich-content-common';

class PluginViewer extends PureComponent {
  render() {
    const { type, pluginComponent, componentData, children, styles, entityIndex } = this.props;
    const { theme, isMobile, anchorTarget, relValue, config } = this.context;

    const { component: Component, elementType } = pluginComponent;
    const { size, alignment, textWrap, container } = pluginComponent.classNameStrategies || {};
    const settings = (config && config[type]) || {};

    const componentProps = { componentData, settings, children, entityIndex };

    if (Component) {
      Component.contextType = Context.type;
      if (elementType !== 'inline') {
        const hasLink = componentData.config && componentData.config.link;
        const ContainerElement = !hasLink ? 'div' : 'a';
        const containerClassNames = classNames(
          styles.pluginContainerReadOnly,
          {
            [styles.pluginContainerMobile]: isMobile,
            [styles.anchor]: hasLink,
            [theme.anchor]: hasLink && theme.anchor,
          },
          isFunction(alignment)
            ? alignment(componentData, theme, styles, isMobile)
            : alignmentClassName(componentData, theme, styles, isMobile),
          isFunction(size)
            ? size(componentData, theme, styles, isMobile)
            : sizeClassName(componentData, theme, styles, isMobile),
          isFunction(textWrap)
            ? textWrap(componentData, theme, styles, isMobile)
            : textWrapClassName(componentData, theme, styles, isMobile)
        );
        let containerProps = {};
        if (hasLink) {
          const { url, target, rel } = componentData.config.link;
          containerProps = {
            href: normalizeUrl(url),
            target: target || anchorTarget || '_self',
            rel: rel || relValue || 'noopener',
          };
        }
        // TODO: more generic logic?
        if (componentData.config && componentData.config.size === 'inline') {
          containerProps.style = { width: componentData.width };
        }
        return (
          <div className={styles.atomic}>
            <ContainerElement className={containerClassNames} {...containerProps}>
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
}

PluginViewer.contextType = Context.type;

PluginViewer.propTypes = {
  type: PropTypes.string.isRequired,
  componentData: PropTypes.object.isRequired,
  pluginComponent: PropTypes.object.isRequired,
  entityIndex: PropTypes.number,
  children: PropTypes.node,
  styles: PropTypes.object,
};

PluginViewer.defaultProps = {
  styles: {},
};

//return a list of types with a function that wraps the viewer
const getPluginViewers = (typeMap, pluginProps, styles) => {
  const res = {};
  Object.keys(typeMap).forEach(type => {
    res[type] = (children, entity, { key }) => {
      const pluginComponent = typeMap[type];
      const isInline = pluginComponent.elementType === 'inline';
      return (
        <PluginViewer
          type={type}
          pluginComponent={pluginComponent}
          key={key}
          componentData={entity}
          entityIndex={key}
          {...pluginProps}
          styles={styles}
        >
          {isInline ? children : null}
        </PluginViewer>
      );
    };
  });
  return res;
};

export default getPluginViewers;
