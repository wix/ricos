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
    this.state = { localeStrategy: { locale: props.locale } };
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
    const { cssOverride, theme, plugins = [], isViewer = false, content, children } = this.props;
    const { localeStrategy } = this.state;

    const themeGeneratorFunctions: ThemeGeneratorFunction[] = plugins
      .map(plugin => plugin.theme)
      .filter(isDefined);

    const { theme: themeStrategyResult, rawCss } = themeStrategy(
      isViewer,
      themeGeneratorFunctions,
      theme?.palette,
      cssOverride
    );

    return {
      strategyProps: merge(
        { theme: themeStrategyResult },
        pluginsStrategy(isViewer, plugins, children.props, themeStrategyResult, content),
        localeStrategy
      ),
      rawCss,
    };
  }

  render() {
    const {
      _rcProps,
      children,
      isMobile,
      toolbarSettings,
      modalSettings = {},
      placeholder,
      onExpand,
      content,
      isViewer,
      onError,
    } = this.props;

    const { strategyProps, rawCss } = this.runStrategies();

    const { useStaticTextToolbar, textToolbarContainer, getToolbarSettings } =
      toolbarSettings || {};

    const { openModal, closeModal, container } = modalSettings;

    // any of ricos props that should be merged into child
    const ricosPropsToMerge: RichContentProps = {
      isMobile,
      textToolbarType:
        !isMobile && (textToolbarContainer || useStaticTextToolbar) ? 'static' : 'inline',
      config: { getToolbarSettings },
      initialState: content,
      placeholder,
      onError,
      helpers: {
        openModal,
        closeModal,
        onExpand,
      },
    };

    const mergedRCProps = merge(strategyProps, _rcProps, ricosPropsToMerge, children.props);

    return [
      <style type="text/css" key={'styleElement'}>
        {rawCss}
      </style>,
      <RicosModal
        isViewer={isViewer}
        modalContainer={container}
        {...mergedRCProps}
        key={'ricosElement'}
      >
        {Children.only(React.cloneElement(children, { ...mergedRCProps }))}
      </RicosModal>,
    ];
  }
}
