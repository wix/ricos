import React, { Component } from 'react';
import classNames from 'classnames';
import {
  mergeStyles,
  AccessibilityListener,
  normalizeInitialState,
  getLangDir,
  SPOILER_TYPE,
  GlobalContext,
  Version,
  RicosContent,
  TranslationFunction,
  SEOSettings,
  Helpers,
  PluginTypeMapper,
  Decorator,
  RichContentTheme,
  AnchorTarget,
  RelValue,
  LegacyViewerPluginConfig,
  OnErrorFunction,
  NormalizeConfig,
  PluginMapping,
  TextDirection,
  ViewerContextType,
  InlineStyleMapperFunction,
} from 'wix-rich-content-common';
import 'wix-rich-content-common/dist/statics/styles/draftDefault.rtlignore.scss';
import { convertToReact } from './utils/convertContentState';
import viewerStyles from '../statics/rich-content-viewer.scss';
import viewerAlignmentStyles from '../statics/rich-content-viewer-alignment.rtlignore.scss';
import rtlStyle from '../statics/rich-content-viewer-rtl.rtlignore.scss';
import { deprecateHelpers } from 'wix-rich-content-common/libs/deprecateHelpers';
import { combineMappers } from './utils/combineMappers';

export interface RichContentViewerProps {
  /** This is a legacy API, chagnes should be made also in the new Ricos Viewer API **/
  initialState?: RicosContent;
  isMobile?: boolean;
  renderStaticHtml?: boolean;
  helpers?: Helpers;
  platform?: string;
  locale: string;
  typeMappers: PluginTypeMapper[];
  inlineStyleMappers: InlineStyleMapperFunction[];
  decorators: Decorator[];
  t: TranslationFunction;
  theme: RichContentTheme;
  anchorTarget?: AnchorTarget;
  relValue?: RelValue;
  config: LegacyViewerPluginConfig;
  textDirection?: TextDirection;
  direction?: TextDirection;
  textAlignment?: 'left' | 'right';
  disabled?: boolean;
  seoMode?: SEOSettings;
  iframeSandboxDomain?: string;
  onError: OnErrorFunction;
  addAnchors?: boolean | string;
  normalize: NormalizeConfig;
  /** This is a legacy API, chagnes should be made also in the new Ricos Viewer API **/
}

class RichContentViewer extends Component<
  RichContentViewerProps,
  { raw?: RicosContent; error?: string }
> {
  styles: Record<string, string>;
  typeMappers: PluginMapping;

  static defaultProps: Partial<RichContentViewerProps> = {
    theme: {},
    decorators: [],
    typeMappers: [],
    inlineStyleMappers: [],
    locale: 'en',
    onError: err => {
      throw err;
    },
    normalize: {},
    config: {},
  };

  constructor(props) {
    super(props);
    const styles = { ...viewerStyles, ...viewerAlignmentStyles, ...rtlStyle };
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.typeMappers = combineMappers(props.typeMappers);
  }

  static getInitialState = (props: RichContentViewerProps) => {
    const {
      initialState,
      anchorTarget,
      relValue,
      normalize: { disableInlineImages = false, removeInvalidInlinePlugins = false },
    } = props;
    return initialState
      ? normalizeInitialState(initialState, {
          anchorTarget,
          relValue,
          disableInlineImages,
          removeInvalidInlinePlugins,
        })
      : undefined;
  };

  getContextualData = (
    {
      t,
      theme,
      isMobile = false,
      anchorTarget,
      relValue,
      config,
      helpers = {},
      locale,
      disabled,
      seoMode,
      iframeSandboxDomain,
      textAlignment,
    }: RichContentViewerProps,
    contentState?: RicosContent
  ): ViewerContextType => {
    deprecateHelpers(helpers, config);
    return {
      t,
      theme,
      isMobile,
      anchorTarget,
      relValue,
      config,
      helpers,
      locale,
      disabled,
      seoMode,
      contentState,
      iframeSandboxDomain,
      disableRightClick: config?.uiSettings?.disableRightClick,
      textAlignment,
    };
  };

  static getDerivedStateFromProps(props: RichContentViewerProps) {
    return {
      raw: RichContentViewer.getInitialState(props),
    };
  }

  static getDerivedStateFromError(error: string) {
    return { error };
  }

  componentDidMount() {
    this.reportDebuggingInfo();
  }

  reportDebuggingInfo() {
    if (typeof window === 'undefined') {
      return;
    }
    if (/debug/i.test(window.location.search) && !window.__RICOS_INFO__) {
      import(
        /* webpackChunkName: debugging-info */
        'wix-rich-content-common/libs/debugging-info'
      ).then(({ reportDebuggingInfo }) => {
        reportDebuggingInfo({
          version: Version.currentVersion,
          reporter: 'Rich Content Viewer',
          plugins: Object.keys(this.typeMappers),
          getContent: () => this.props.initialState,
          getConfig: () => this.props.config,
        });
      });
    }
  }

  render() {
    const { onError, config = {} } = this.props;
    try {
      if (this.state.error) {
        onError(this.state.error);
        return null;
      }
      const { styles } = this;
      const {
        textDirection,
        direction,
        decorators,
        inlineStyleMappers,
        locale,
        addAnchors,
        isMobile = false,
        t,
      } = this.props;
      const wrapperClassName = classNames(styles.wrapper, {
        [styles.desktop]: !this.props.platform || this.props.platform === 'desktop',
      });
      const editorClassName = classNames(styles.editor, {
        [styles.rtl]: textDirection === 'rtl',
      });

      const initSpoilers = config[SPOILER_TYPE]?.initSpoilersContentState;
      const SpoilerViewerWrapper = config[SPOILER_TYPE]?.SpoilerViewerWrapper;
      const contextualData = this.getContextualData(this.props, this.state.raw);
      const innerRCEViewerProps = {
        typeMappers: this.props.typeMappers,
        inlineStyleMappers: this.props.inlineStyleMappers,
        decorators: this.props.decorators,
        config: this.props.config,
      };

      const output = convertToReact(
        styles,
        textDirection,
        this.typeMappers,
        contextualData,
        decorators,
        inlineStyleMappers,
        initSpoilers,
        SpoilerViewerWrapper,
        { addAnchors },
        innerRCEViewerProps
      );

      return (
        <GlobalContext.Provider value={{ isMobile, t }}>
          <div className={wrapperClassName} dir={direction || getLangDir(locale)}>
            <div className={editorClassName}>{output}</div>
            <AccessibilityListener isMobile={this.props.isMobile} />
          </div>
        </GlobalContext.Provider>
      );
    } catch (err) {
      onError(err);
      return null;
    }
  }
}

export default RichContentViewer;
