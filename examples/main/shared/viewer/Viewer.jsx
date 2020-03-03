import React, { PureComponent } from 'react';
import ReactModal from 'react-modal';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { isSSR } from 'wix-rich-content-common';
import * as PropTypes from 'prop-types';
import * as Plugins from './ViewerPlugins';
import theme from '../theme/theme'; // must import after custom styles
import getImagesData from 'wix-rich-content-fullscreen/src/lib/getImagesData';
import Fullscreen from 'wix-rich-content-fullscreen';
import {
  TextSelectionListener,
  ViewerInlineToolBar,
} from 'wix-rich-content-text-selection-toolbar';
import { GALLERY_TYPE } from 'wix-rich-content-plugin-gallery';
import { testImages } from '../editor/mock';

const anchorTarget = '_top';
const relValue = 'noreferrer';
const wixImagesUrl = 'https://static.wixstatic.com/media/';

export default class Viewer extends PureComponent {
  constructor(props) {
    super(props);

    if (!isSSR()) {
      ReactModal.setAppElement('#root');
      this.expandModeData = getImagesData(this.props.initialState);
    }
    this.state = {
      disabled: false,
    };

    const { scrollingElementFn } = props;
    const additionalConfig = { [GALLERY_TYPE]: { scrollingElement: scrollingElementFn } };
    this.pluginsConfig = Plugins.getConfig(additionalConfig);
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
        expendModeIsOpen: true,
        expandModeIndex: this.expandModeData.imageMap[entityIndex] + innerIndex,
      });
    },
    // onProgressChange: updatePercentage => {
    //   let percent = 0;
    //   const mockImageIndex = this.props.mockImageIndex || 0;
    //   const testImageUrl = wixImagesUrl + testImages[mockImageIndex].url;
    //   console.log(testImageUrl);
    //   updatePercentage(percent, testImageUrl);
    //   const interval = setInterval(() => {
    //     updatePercentage(percent, testImageUrl);
    //     percent += 10;
    //     if (percent === 110) clearInterval(interval);
    //   }, 100);
    // },
  };

  render() {
    const { isMobile, locale, initialState, seoMode } = this.props;
    const { expendModeIsOpen, expandModeIndex, disabled } = this.state;

    const viewerProps = {
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
        <div id="rich-content-viewer" className="viewer">
          <RichContentViewer
            helpers={this.helpers}
            typeMappers={Plugins.typeMappers}
            inlineStyleMappers={Plugins.getInlineStyleMappers(initialState)}
            decorators={Plugins.decorators}
            config={this.pluginsConfig}
            // siteDomain="https://www.wix.com"
            {...viewerProps}
          />
          {!isSSR() && (
            <Fullscreen
              isOpen={expendModeIsOpen}
              images={this.expandModeData.images}
              onClose={() => this.setState({ expendModeIsOpen: false })}
              index={expandModeIndex}
            />
          )}
        </div>
        {!isSSR() && (
          <TextSelectionListener targetId={'rich-content-viewer'} ToolBar={ViewerInlineToolBar} />
        )}
      </>
    );
  }
}

Viewer.propTypes = {
  initialState: PropTypes.any,
  isMobile: PropTypes.bool,
  locale: PropTypes.string.isRequired,
};
