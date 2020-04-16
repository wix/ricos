import React, { Component, Fragment, Suspense, Children, ReactElement } from 'react';
import { RichContentProps } from './RichContentWrapperTypes';

interface Props {
  children: ReactElement;
}

interface State {
  isExpanded: boolean;
  index?: number;
  data?: any;
  Fullscreen?: any;
}

export default class FullscreenRenderer extends Component<Props, State> {
  childProps: RichContentProps;

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
    this.childProps = {
      ...props.children.props,
      helpers: {
        ...props.children.props.helpers,
        onExpand: this.onExpand,
      },
    };
  }

  componentDidMount() {
    const Fullscreen = React.lazy(() =>
      import(/* webpackChunkName: "rce-ViewerModal"  */ './ViewerModal')
    );
    this.setState({ Fullscreen });
  }

  onExpand = (entityIndex, innerIndex = 0) =>
    this.setState({
      isExpanded: true,
      index: this.state.data?.imageMap[entityIndex] + innerIndex,
    });

  onClose = () => this.setState({ isExpanded: false });

  setData = data => this.setState({ data });

  render() {
    const { isExpanded, index, data, Fullscreen } = this.state;
    const { children } = this.props;
    return (
      <Fragment>
        {Children.only(React.cloneElement(children, this.childProps))}
        {Fullscreen && (
          <Suspense fallback={<div />}>
            <Fullscreen
              dataHook={'WrapperFullScreen'}
              initialState={children.props.initialState || { entityMap: {} }}
              isOpen={isExpanded}
              images={data?.images || []}
              onClose={this.onClose}
              index={index}
              setExpandModeData={this.setData}
            />
          </Suspense>
        )}
      </Fragment>
    );
  }
}
