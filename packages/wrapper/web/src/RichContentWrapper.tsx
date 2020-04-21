import React, { Component, ReactElement, forwardRef } from 'react';
import EngineWrapper from './EngineWrapper';
import themeStrategy from './themeStrategy/themeStrategy';
import pluginsStrategy from './pluginsStrategy/pluginsStrategy';
import localeStrategy from './localeStrategy/localeStrategy';
import './styles.global.css';
import { merge } from 'lodash';
import PropTypes from 'prop-types';
import { isDefined } from 'ts-is-present';
import { RichContentProps, ForwardedRef } from './RichContentProps';

export interface RichContentWrapperProps {
  children: ReactElement;
  theme?: string | object;
  locale?: string;
  palette?: Palette;
  plugins?: PluginConfig[];
  isEditor?: boolean;
  isMobile?: boolean;
  rcProps?: RichContentProps;
  textToolbarType?: TextToolbarType;
  textToolbarContainer?: HTMLElement;
  forwardedRef?: ForwardedRef;
}

export class RichContentWrapper extends Component<
  RichContentWrapperProps,
  { localeStrategy: RichContentProps }
> {
  constructor(props: RichContentWrapperProps) {
    super(props);
    this.state = {
      localeStrategy: {},
    };
  }

  static propTypes = { children: PropTypes.element.isRequired };

  static defaultProps = { locale: 'en', isMobile: false };

  updateLocale = async () => {
    const { locale, children } = this.props;
    await localeStrategy(children.props.locale || locale).then(localeData => {
      this.setState({ localeStrategy: localeData });
    });
  };

  componentDidMount() {
    this.updateLocale();
  }

  componentWillReceiveProps(newProps: RichContentWrapperProps) {
    if (newProps.locale !== this.props.locale) {
      this.updateLocale();
    }
  }

  render() {
    const {
      theme,
      palette,
      plugins = [],
      children,
      isEditor = false,
      rcProps,
      forwardedRef,
      ...rest
    } = this.props;
    const { localeStrategy } = this.state;

    const themeGenerators: ThemeGeneratorFunction[] = plugins
      .map(plugin => plugin.theme)
      .filter(isDefined);

    const { theme: finalTheme } = themeStrategy(isEditor, {
      theme,
      palette,
      themeGenerators,
    });
    const mergedRCProps = merge(
      { theme: finalTheme },
      pluginsStrategy(isEditor, plugins, children.props, finalTheme),
      localeStrategy,
      rcProps
    );

    return (
      <EngineWrapper
        rcProps={mergedRCProps}
        isEditor={isEditor}
        key={isEditor ? 'editor' : 'viewer'}
        ref={forwardedRef}
        {...rest}
      >
        {children}
      </EngineWrapper>
    );
  }
}

export default forwardRef((props: RichContentWrapperProps, ref: ForwardedRef) => (
  <RichContentWrapper {...props} forwardedRef={ref} />
));
