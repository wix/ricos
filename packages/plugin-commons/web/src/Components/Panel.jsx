import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from 'wix-rich-content-editor-common/dist/statics/styles/general.scss';

export default class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props.componentState);
  }

  stateFromProps = componentState => {
    const { keyName, boundingRect, isActive } = componentState.activeButton || {};
    if (keyName === this.props.keyName && boundingRect && isActive) {
      return {
        visible: true,
        style: {
          transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
        },
      };
    } else {
      return {
        visible: false,
        style: {
          transform: 'translate(-50%) scale(0)',
        },
      };
    }
  };

  componentWillReceiveProps = nextProps => {
    this.setState(this.stateFromProps(nextProps.componentState));
  };

  render = () => {
    const Content = this.props.content;
    const modalClasses = classNames(styles.panelContainer, this.props.theme.panelContainer);
    return (
      <div className={modalClasses} style={this.state.style}>
        <Content
          store={this.props.store}
          helpers={this.props.helpers}
          componentData={this.props.componentData}
          componentState={this.props.componentState}
          theme={this.props.theme}
          t={this.props.t}
          tabIndex={this.state.visible ? 0 : -1}
          getEditorBounds={this.props.getEditorBounds}
        />
      </div>
    );
  };
}

Panel.propTypes = {
  content: PropTypes.func.isRequired,
  keyName: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
  helpers: PropTypes.object,
  getEditorBounds: PropTypes.func,
  t: PropTypes.func,
};
