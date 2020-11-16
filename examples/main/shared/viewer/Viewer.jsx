import React, { PureComponent } from 'react';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { isSSR } from 'wix-rich-content-common';
import * as PropTypes from 'prop-types';
import * as Plugins from './ViewerPlugins';
import theme from '../theme/theme'; // must import after custom styles
import getImagesData from 'wix-rich-content-fullscreen/dist/lib/getImagesData';
import Fullscreen from 'wix-rich-content-fullscreen';
import 'wix-rich-content-fullscreen/dist/styles.min.css';
import { IMAGE_TYPE } from 'wix-rich-content-plugin-image/viewer';
import { TextSelectionToolbar, TwitterButton } from 'wix-rich-content-text-selection-toolbar';
import { GALLERY_TYPE } from 'wix-rich-content-plugin-gallery';
const anchorTarget = '_top';
const relValue = 'noreferrer';

export default class Viewer extends PureComponent {
  constructor(props) {
    super(props);
    if (!isSSR()) {
      this.expandModeData = getImagesData(this.props.initialState);
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
    if (prevProps.initialState !== this.props.initialState) {
      this.expandModeData = getImagesData(this.props.initialState);
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
    const { isMobile, initialState, locale, seoMode, localeResource } = this.props;
    const { expandModeIsOpen, expandModeIndex, disabled } = this.state;
    const viewerProps = {
      helpers: {
        // This is for debugging only
        onViewerAction: async (actionName, pluginId, value) =>
          console.log('onViewerAction', actionName, pluginId, value),
      },
      localeResource,
      locale,
      relValue,
      anchorTarget,
      isMobile,
      theme,
      initialState,
      disabled,
      seoMode,
    };

    return (
      <>
        <div id="rich-content-viewer" ref={this.viewerRef} className="viewer">
          <RichContentViewer
            typeMappers={Plugins.typeMappers}
            inlineStyleMappers={Plugins.getInlineStyleMappers(initialState)}
            decorators={Plugins.decorators}
            config={this.pluginsConfig}
            {...viewerProps}
          />
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

Viewer.propTypes = {
  initialState: PropTypes.any,
  isMobile: PropTypes.bool,
  locale: PropTypes.string.isRequired,
};
