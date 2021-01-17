import React, { PureComponent, RefObject } from 'react';
import { RichContentViewer, RichContentViewerProps } from 'wix-rich-content-viewer';
import { RicosViewer } from 'ricos-viewer';
import { isSSR, RicosContent as RicosDraftContent, SEOSettings } from 'wix-rich-content-common';
import * as Plugins from './ViewerPlugins';
import theme from '../theme/theme'; // must import after custom styles
import getImagesData from 'wix-rich-content-fullscreen/libs/getImagesData';
import Fullscreen from 'wix-rich-content-fullscreen';
import 'wix-rich-content-fullscreen/dist/styles.min.css';
import { IMAGE_TYPE } from 'wix-rich-content-plugin-image/viewer';
import { TextSelectionToolbar, TwitterButton } from 'wix-rich-content-text-selection-toolbar';
import { GALLERY_TYPE } from 'wix-rich-content-plugin-gallery';
import { RicosContent } from 'ricos-schema';
import { convertToDraft } from '../utils/contentConversion';
const anchorTarget = '_top';
const relValue = 'noreferrer';

interface ExampleViewerProps {
  content?: RicosContent | RicosDraftContent;
  isMobile?: boolean;
  locale: string;
  scrollingElementFn?: any;
  seoMode?: SEOSettings;
  localeResource?: Record<string, string>;
  shouldUseRicos?: boolean;
}

interface ExampleViewerState {
  expandModeIsOpen?: boolean;
  expandModeIndex?: number;
  disabled: boolean;
}

export default class Viewer extends PureComponent<ExampleViewerProps, ExampleViewerState> {
  expandModeData;
  viewerRef: RefObject<any>;
  pluginsConfig: RichContentViewerProps['config'];
  shouldRenderFullscreen: boolean;

  constructor(props: ExampleViewerProps) {
    super(props);
    if (!isSSR()) {
      this.expandModeData = getImagesData(convertToDraft(this.props.content));
    }
    this.state = {
      disabled: false,
    };
    this.viewerRef = React.createRef();
    this.pluginsConfig = this.getConfig();
  }

  componentDidMount() {
    this.shouldRenderFullscreen = true;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.content !== this.props.content) {
      this.expandModeData = getImagesData(convertToDraft(this.props.content));
    }
  }

  getConfig = () => {
    const { scrollingElementFn } = this.props;
    const onExpand = (entityIndex, innerIndex = 0) => {
      //galleries have an innerIndex (i.e. second image will have innerIndex=1)
      this.setState({
        expandModeIsOpen: true,
        expandModeIndex: this.expandModeData.imageMap[entityIndex] + innerIndex,
      });
    };
    const additionalConfig = {
      [GALLERY_TYPE]: { onExpand, scrollingElement: scrollingElementFn },
      [IMAGE_TYPE]: { onExpand },
    };
    return Plugins.getConfig(additionalConfig);
  };

  render() {
    const { isMobile, content, locale, seoMode, localeResource, shouldUseRicos } = this.props;
    const { expandModeIsOpen, expandModeIndex, disabled } = this.state;
    const viewerProps = {
      helpers: {
        // This is for debugging only
        onViewerAction: async (actionName, pluginId, value) =>
          console.log('onViewerAction', actionName, pluginId, value),
        onViewerLoaded: async (...args) => console.log('onViewerLoaded', ...args),
      },
      localeResource,
      locale,
      relValue,
      anchorTarget,
      isMobile,
      theme,
      initialState: content,
      disabled,
      seoMode,
    };

    return (
      <>
        <div id="rich-content-viewer" ref={this.viewerRef} className="viewer">
          {shouldUseRicos ? (
            <RicosViewer
              locale={locale}
              linkSettings={{ anchorTarget, relValue }}
              isMobile={isMobile}
              cssOverride={theme}
              content={content}
              mediaSettings={{ pauseMedia: disabled }}
              seoSettings={seoMode}
              plugins={Plugins.viewerPlugins}
            >
              <RichContentViewer helpers={viewerProps.helpers} />
            </RicosViewer>
          ) : (
            <RichContentViewer
              typeMappers={Plugins.typeMappers}
              // @ts-ignore
              inlineStyleMappers={Plugins.getInlineStyleMappers(initialState)}
              decorators={Plugins.decorators}
              config={this.pluginsConfig}
              {...viewerProps}
            />
          )}
          {this.shouldRenderFullscreen && (
            <Fullscreen
              images={this.expandModeData.images}
              onClose={() => this.setState({ expandModeIsOpen: false })}
              isOpen={expandModeIsOpen}
              index={expandModeIndex}
              isMobile={isMobile}
            />
          )}
          {!isMobile ? (
            <TextSelectionToolbar container={this.viewerRef.current}>
              {selectedText => <TwitterButton selectedText={selectedText} />}
            </TextSelectionToolbar>
          ) : null}
        </div>
      </>
    );
  }
}
