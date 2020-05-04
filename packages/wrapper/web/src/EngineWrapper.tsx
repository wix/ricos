import React, { Component, Children, Fragment } from 'react';
import themeStrategy from './themeStrategy/themeStrategy';
import pluginsStrategy from './pluginsStrategy/pluginsStrategy';
import localeStrategy from './localeStrategy/localeStrategy';
import './styles.global.css';
import FullscreenProvider from './FullscreenProvider';
import ModalDialogProvider from './ModalDialogProvider';
import { merge } from 'lodash';
import { isDefined } from 'ts-is-present';

interface Props extends WixRichContentEditorProps, WixRichContentViewerProps {
  children: RichContentChild;
  isViewer: boolean;
}

interface State {
  ModalityProvider: typeof Fragment | typeof ModalDialogProvider | typeof FullscreenProvider;
  localeStrategy: RichContentProps;
}

export default class EngineWrapper extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { ModalityProvider: this.getModalityPropvider(props), localeStrategy: {} };
  }

  getModalityPropvider(props: Props) {
    const { isViewer, children } = props;
    const { closeModal, openModal, onExpand } = children.props?.helpers || {};
    if (!isViewer && !closeModal && !openModal) {
      return ModalDialogProvider;
    } else if (isViewer && !onExpand) {
      return FullscreenProvider;
    }
    return Fragment;
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

  runStrategies() {
    const { theme, palette, plugins = [], isViewer = false, contentState, children } = this.props;
    const { localeStrategy } = this.state;

    const themeGenerators: ThemeGeneratorFunction[] = plugins
      .map(plugin => plugin.theme)
      .filter(isDefined);

    const { theme: finalTheme } = themeStrategy(isViewer, {
      theme,
      palette,
      themeGenerators,
    });

    return merge(
      { theme: finalTheme },
      pluginsStrategy(isViewer, plugins, children.props, finalTheme, contentState),
      localeStrategy
    );
  }

  render() {
    const {
      rcProps,
      children,
      isMobile,
      textToolbarType,
      textToolbarContainer,
      placeholder,
      contentState,
    } = this.props;
    const { ModalityProvider } = this.state;

    const strategyProps = this.runStrategies();

    // any of wrapper props that should be merged into child
    const wrapperPropsToMerge: RichContentProps = {
      isMobile,
      textToolbarType: isMobile ? 'inline' : textToolbarType, // optimization - don't need static toolbar when isMobile
      initialState: contentState,
      placeholder,
    };

    const mergedRCProps = merge(strategyProps, rcProps, wrapperPropsToMerge, children.props);

    return (
      <ModalityProvider {...mergedRCProps} textToolbarContainer={textToolbarContainer}>
        {Children.only(React.cloneElement(children, { ...mergedRCProps }))}
      </ModalityProvider>
    );
  }
}
