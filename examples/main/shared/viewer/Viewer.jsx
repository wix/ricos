import React, { PureComponent } from 'react';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { isSSR } from 'wix-rich-content-common';
import * as PropTypes from 'prop-types';
import * as Plugins from './ViewerPlugins';
import theme from '../theme/theme'; // must import after custom styles
import getImagesData from 'wix-rich-content-fullscreen/dist/lib/getImagesData';
import Fullscreen from 'wix-rich-content-fullscreen';
import 'wix-rich-content-fullscreen/dist/styles.min.css';

import {
  TextSelectionListener,
  ViewerInlineToolBar,
} from 'wix-rich-content-text-selection-toolbar';
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

    const { scrollingElementFn } = props;
    const additionalConfig = { [GALLERY_TYPE]: { scrollingElement: scrollingElementFn } };
    this.pluginsConfig = Plugins.getConfig(additionalConfig);
    this.viewerRef = React.createRef();
  }

  componentDidMount() {
    this.shouldRenderFullscreen = true;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.initialState !== this.props.initialState) {
      this.expandModeData = getImagesData(this.props.initialState);
    }
  }

  helpers = {
    onExpand: (entityIndex, innerIndex = 0) => {
      //galleries have an innerIndex (i.e. second image will have innerIndex=1)
      this.setState({
        expandModeIsOpen: true,
        expandModeIndex: this.expandModeData.imageMap[entityIndex] + innerIndex,
      });
    },
    onAction: async (actionName, pluginId) => console.log('Viewer Action', actionName, pluginId),
  };

  viewerRect = () => {
    return viewerRef.current.getBoundingClientRect() || {};
  };

  onImageLoad = e => {
    e.target.style.opacity = 1;
    if (this.preloadRef.current) {
      this.preloadRef.current.style.opacity = 0;
    }
  };

  render() {
    const { isMobile, initialState, locale, seoMode, localeResource } = this.props;
    const { expandModeIsOpen, expandModeIndex, disabled } = this.state;
    const viewerProps = {
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
        <div id={'rich-content-viewer'} ref={this.viewerRef} className="viewer">
          <RichContentViewer
            helpers={this.helpers}
            typeMappers={Plugins.typeMappers}
            inlineStyleMappers={Plugins.getInlineStyleMappers(initialState)}
            decorators={Plugins.decorators}
            config={this.pluginsConfig}
            // siteDomain="https://www.wix.com"
            {...viewerProps}
          />
          {this.shouldRenderFullscreen && (
            <Fullscreen
              images={this.expandModeData.images}
              onClose={() => this.setState({ expandModeIsOpen: false })}
              isOpen={expandModeIsOpen}
              index={expandModeIndex}
            />
          )}
          <TextSelectionListener
            viewerRect={this.viewerRect}
            targetId={'rich-content-viewer'}
            ToolBar={ViewerInlineToolBar}
          />
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
