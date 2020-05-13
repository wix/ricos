import React, { Component, Children } from 'react';
import themeStrategy from './themeStrategy/themeStrategy';
import pluginsStrategy from './pluginsStrategy/pluginsStrategy';
import localeStrategy from './localeStrategy/localeStrategy';
import { merge } from 'lodash';
import { isDefined } from 'ts-is-present';
import RicosModal from './modals/RicosModal';

export interface EngineProps extends RicosEditorProps, RicosViewerProps {
  children: RichContentChild;
  isViewer: boolean;
}

interface EngineState {
  localeStrategy: RichContentProps;
}

export class RicosEngine extends Component<EngineProps, EngineState> {
  constructor(props: EngineProps) {
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

  componentWillReceiveProps(newProps: EngineProps) {
    if (newProps.locale !== this.props.locale) {
      this.updateLocale();
    }
  }

  runStrategies() {
    const { theme, palette, plugins = [], isViewer = false, content, children } = this.props;
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
      pluginsStrategy(isViewer, plugins, children.props, finalTheme, content),
      localeStrategy
    );
  }

  render() {
    const {
      _rcProps,
      children,
      isMobile,
      toolbarSettings,
      placeholder,
      content,
      isViewer,
      onError,
    } = this.props;

    const strategyProps = this.runStrategies();

    const { useStaticTextToolbar, textToolbarContainer, getToolbarSettings } =
      toolbarSettings || {};

    // any of ricos props that should be merged into child
    const ricosPropsToMerge: RichContentProps = {
      isMobile,
      textToolbarType: textToolbarContainer || useStaticTextToolbar ? 'static' : 'inline',
      config: { getToolbarSettings },
      initialState: content,
      placeholder,
      onError,
    };

    const mergedRCProps = merge(strategyProps, _rcProps, ricosPropsToMerge, children.props);

    return (
      <RicosModal isViewer={isViewer} {...mergedRCProps}>
        {Children.only(React.cloneElement(children, { ...mergedRCProps }))}
      </RicosModal>
    );
  }
}
