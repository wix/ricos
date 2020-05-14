import React, { Component, Fragment, Children, ReactElement, Suspense, ComponentType } from 'react';
import { emptyState } from '../../lib/utils';

interface Props {
  children: ReactElement;
  helpers?: Helpers;
  initialState?: RicosContent;
}

interface State {
  isExpanded: boolean;
  index: number;
  expandModeData?: any;
  FullscreenModal?: any;
}

export default class FullscreenProvider extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      index: 0,
    };
  }

  componentDidMount() {
    const FullscreenModal = React.lazy(() =>
      import(/* webpackChunkName: "RicosEditorModal"  */ './FullscreenModal')
    );
    this.setState({ FullscreenModal });
  }

  onExpand = (entityIndex, innerIndex = 0) =>
    this.setState({
      isExpanded: true,
      index: this.state.expandModeData?.imageMap[entityIndex] + innerIndex,
    });

  onClose = () => this.setState({ isExpanded: false });

  setExpandModeData = expandModeData => this.setState({ expandModeData });

  addExpand = (helpers: Helpers) => ({ ...helpers, onExpand: this.onExpand });

  render() {
    const { FullscreenModal, isExpanded, index, expandModeData } = this.state;
    const { children, helpers: viewerHelpers = {}, initialState } = this.props;
    const helpers = this.addExpand(viewerHelpers);

    return (
      <Fragment>
        {Children.only(React.cloneElement(children, { helpers }))}
        {FullscreenModal && (
          <Suspense fallback={<div />}>
            <FullscreenModal
              dataHook={'RicosFullScreen'}
              initialState={initialState || emptyState}
              isOpen={isExpanded}
              images={expandModeData?.images || []}
              onClose={this.onClose}
              index={index}
              setExpandModeData={this.setExpandModeData}
            />
          </Suspense>
        )}
      </Fragment>
    );
  }
}
