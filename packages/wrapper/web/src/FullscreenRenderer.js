import React, { Component, Fragment, Suspense, Children } from 'react';
import PropTypes from 'prop-types';

export default class FullscreenRenderer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      Fullscreen: () => undefined,
      isReady: false,
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
    this.setState({ Fullscreen, isReady: true });
  }

  onExpand = (entityIndex, innerIndex = 0) =>
    this.setState({
      isExpanded: true,
      index: this.state.data?.imageMap[entityIndex] + innerIndex,
    });

  onClose = () => this.setState({ isExpanded: false });

  setData = data => this.setState({ data });

  render() {
    const { isExpanded, index, data, Fullscreen, isReady } = this.state;
    const { children } = this.props;
    return (
      <Fragment>
        {Children.only(React.cloneElement(children, this.childProps))}
        {isReady && (
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
