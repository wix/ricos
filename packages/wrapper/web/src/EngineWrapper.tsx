import React, { Component, Children } from 'react';
import themeStrategy from './themeStrategy/themeStrategy';
import pluginsStrategy from './pluginsStrategy/pluginsStrategy';
import localeStrategy from './localeStrategy/localeStrategy';
import './styles.global.css';
import { merge } from 'lodash';
import { isDefined } from 'ts-is-present';

interface Props extends RicosEditorProps, RicosViewerProps {
  children: RichContentChild;
  isViewer: boolean;
  modalityProvider: any;
}

interface State {
  localeStrategy: RichContentProps;
}

export default class EngineWrapper extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { localeStrategy: {} };
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

  componentWillReceiveProps(newProps: Props) {
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
      _rcProps,
      children,
      isMobile,
      textToolbarType,
      placeholder,
      contentState,
      toolbarsConfig,
      modalityProvider: ModalityProvider,
    } = this.props;

    const strategyProps = this.runStrategies();

    // any of wrapper props that should be merged into child
    const wrapperPropsToMerge: RichContentProps = {
      isMobile,
      textToolbarType: isMobile ? 'inline' : textToolbarType, // optimization - don't need static toolbar when isMobile
      initialState: contentState,
      placeholder,
      toolbarsConfig,
    };

    const mergedRCProps = merge(strategyProps, _rcProps, wrapperPropsToMerge, children.props);

    return (
      <ModalityProvider {...mergedRCProps}>
        {Children.only(React.cloneElement(children, { ...mergedRCProps }))}
      </ModalityProvider>
    );
  }
}
