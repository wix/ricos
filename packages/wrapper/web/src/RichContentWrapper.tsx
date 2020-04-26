import React, { Component, ReactElement, forwardRef, Suspense } from 'react';
import EngineWrapper from './EngineWrapper';
import themeStrategy from './themeStrategy/themeStrategy';
import pluginsStrategy from './pluginsStrategy/pluginsStrategy';
import localeStrategy from './localeStrategy/localeStrategy';
import './styles.global.css';
import { merge } from 'lodash';
import { isDefined } from 'ts-is-present';
import { RichContentProps, ForwardedRef } from './RichContentProps';

export interface RichContentWrapperProps {
  contentState?: ContentState;
  children?: ReactElement;
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

class RichContentWrapper extends Component<
  RichContentWrapperProps,
  { localeStrategy: RichContentProps }
> {
  constructor(props: RichContentWrapperProps) {
    super(props);
    this.state = {
      localeStrategy: {},
    };
  }

  static defaultProps = { locale: 'en', isMobile: false };

  updateLocale = async () => {
    const { locale, children } = this.props;
    await localeStrategy(children?.props.locale || locale).then(localeData => {
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

  getChildComponent(): ReactElement<RichContentProps> {
    const { children, isEditor, contentState } = this.props;
    if (children) {
      return children;
    }
    const ChildComponent = isEditor
      ? React.lazy(() =>
          import('wix-rich-content-editor').then(({ RichContentEditor }) => ({
            default: RichContentEditor,
          }))
        )
      : React.lazy(() =>
          import('wix-rich-content-viewer').then(({ RichContentViewer }) => ({
            default: RichContentViewer,
          }))
        );
    return <ChildComponent initialState={contentState} />;
  }

  render() {
    const {
      theme,
      palette,
      plugins = [],
      isEditor = false,
      rcProps,
      forwardedRef,
      ...rest
    } = this.props;

    const child = this.getChildComponent();
    const { initialState } = child.props;

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
      pluginsStrategy(isEditor, plugins, child.props, finalTheme, initialState),
      localeStrategy,
      rcProps
    );

    return (
      <Suspense fallback={<div />}>
        <EngineWrapper
          rcProps={mergedRCProps}
          isEditor={isEditor}
          key={isEditor ? 'editor' : 'viewer'}
          ref={forwardedRef}
          {...rest}
        >
          {child}
        </EngineWrapper>
      </Suspense>
    );
  }
}

const exportedComp = forwardRef((props: RichContentWrapperProps, ref: ForwardedRef) => (
  <RichContentWrapper {...props} forwardedRef={ref} />
));

export { exportedComp as RichContentWrapper };
