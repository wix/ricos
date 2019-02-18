import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';
import {
  sizeClassName,
  alignmentClassName,
  textWrapClassName,
  mergeStyles,
  normalizeUrl,
} from 'wix-rich-content-common';
import styles from '../statics/rich-content-viewer.scss';
class AtomicBlock extends React.Component {
  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    const {
      type,
      typeMap,
      componentData,
      children,
      theme,
      isMobile,
      anchorTarget,
      relValue,
      config,
      ...props
    } = this.props;

    const mergedStyles = mergeStyles({ theme, styles });
    const { component: Component, elementType } = typeMap[type];
    const { size, alignment, textWrap, container } = typeMap[type].classNameStrategies || {};
    const settings = (config && config[type]) || {};

    if (Component) {
      if (elementType !== 'inline') {
        const hasLink = componentData.config && componentData.config.link;
        const ContainerElement = !hasLink ? 'div' : 'a';
        const containerClassNames = classNames(
          mergedStyles.pluginContainerReadOnly,
          {
            [mergedStyles.pluginContainerMobile]: isMobile,
            [styles.anchor]: hasLink,
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
        return (
          <ContainerElement className={containerClassNames} {...containerProps}>
            {isFunction(container) ? (
              <div className={container(theme)}>
                <Component
                  componentData={componentData}
                  theme={theme}
                  settings={settings}
                  isMobile={isMobile}
                  {...props}
                >
                  {children}
                </Component>
              </div>
            ) : (
              <Component
                componentData={componentData}
                theme={theme}
                settings={settings}
                isMobile={isMobile}
                {...props}
              >
                {children}
              </Component>
            )}
          </ContainerElement>
        );
      } else {
        return (
          <Component
            componentData={componentData}
            theme={theme}
            settings={settings}
            isMobile={isMobile}
            {...props}
          >
            {children}
          </Component>
        );
      }
    }
    return null;
  }
}

AtomicBlock.propTypes = {
  type: PropTypes.string.isRequired,
  componentData: PropTypes.object.isRequired,
  typeMap: PropTypes.object,
  children: PropTypes.node,
  theme: PropTypes.object,
  isMobile: PropTypes.bool,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  config: PropTypes.object,
};

//return a list of types with a function that wraps the viewer
const getPluginsViewer = (typeMap, pluginProps) => {
  const res = {};
  Object.keys(typeMap).forEach(type => {
    res[type] = (children, entity, { key }) => (
      <AtomicBlock typeMap={typeMap} type={type} key={key} componentData={entity} {...pluginProps}>
        {children}
      </AtomicBlock>
    );
  });
  return res;
};

export default getPluginsViewer;
