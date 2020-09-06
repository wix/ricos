import React, { Component, Fragment, Children, ReactElement, Suspense } from 'react';
import { emptyState } from 'ricos-common';
import { Helpers } from 'wix-rich-content-common';
import { RicosContent } from '../../index';

interface Props {
  children: ReactElement;
  helpers?: Helpers;
  initialState?: RicosContent;
  isModalSuspended: boolean;
  isMobile: boolean;
}

interface State {
  isExpanded: boolean;
  index: number;
  expandModeData?: ExpandModeData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  FullscreenModal?: any;
}

export type ExpandModeData = {
  images: Record<string, unknown>;
  imageMap: Record<number, number>;
};

export default class FullscreenProvider extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      index: 0,
    };
  }

  componentDidMount() {
    this.loadEditorModalAfterLocaleResourceIsLoadedToPreventRemountHackFromBreakingModal();
  }

  loadEditorModalAfterLocaleResourceIsLoadedToPreventRemountHackFromBreakingModal() {
    const { locale, localeResource } = this.props.children.props;
    if (locale === 'en' || localeResource) {
      const FullscreenModal = React.lazy(() =>
        import(/* webpackChunkName: "RicosEditorModal"  */ './FullscreenModal')
      );
      this.setState({ FullscreenModal });
    }
  }

  onClose = () => this.setState({ isExpanded: false });

  setExpandModeData = expandModeData => this.setState({ expandModeData });

  addExpand = config => {
    const { isModalSuspended } = this.props;
    if (isModalSuspended) {
      return config;
    }
    const onExpand = (entityIndex: number, innerIndex = 0) => {
      const { expandModeData } = this.state;
      this.setState({
        isExpanded: true,
        // if expandModeData is not defined - expand the first image
        index: expandModeData ? expandModeData.imageMap[entityIndex] + innerIndex : 0,
      });
    };
    const imageConfig = config['wix-draft-plugin-image'];
    const galleryConfig = config['wix-draft-plugin-gallery'];
    if (imageConfig && !imageConfig.onExpand) {
      config['wix-draft-plugin-image'] = { ...imageConfig, onExpand };
    }
    if (galleryConfig && !galleryConfig.onExpand) {
      config['wix-draft-plugin-gallery'] = { ...galleryConfig, onExpand };
    }
    return config;
  };

  render() {
    const { FullscreenModal, isExpanded, index, expandModeData } = this.state;
    const { children, initialState, isModalSuspended, isMobile } = this.props;
    const config = this.addExpand(children.props.config);

    return (
      <Fragment>
        {Children.only(React.cloneElement(children, { config }))}
        {FullscreenModal && (
          <Suspense fallback={<div />}>
            <FullscreenModal
              dataHook={'RicosFullScreen'}
              initialState={initialState || emptyState}
              isOpen={isExpanded && !isModalSuspended}
              images={expandModeData?.images || []}
              onClose={this.onClose}
              index={index}
              isMobile={isMobile}
              setExpandModeData={this.setExpandModeData}
            />
          </Suspense>
        )}
      </Fragment>
    );
  }
}
