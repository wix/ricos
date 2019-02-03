import React, { Component } from 'react';
import { Modal } from 'wix-rich-content-editor';

import Styles from './Modal.scss';

class ModalWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    window.Wix.PubSub.subscribe('externalModal', event => {
      if (event.origin !== window.Wix.Utils.getCompId()) {
        //TODO: use this point if you want to show the popup in case it exists just with height 0
        console.log('externalModal got message in constructor', event, this);
      }
      //process the event which has the following format :
      // {
      //      name:eventName,
      //      data: eventData,
      //      origin: compId
      // }
    });
    window.Wix.PubSub.publish('externalModal', { value: 'modal_loaded' }, false);

    window.showModal = modalProps => {
      this.setState({ modalProps });
      console.log('Got params to show modal ', modalProps);
    };
  }

  clickMe = msg => {
    alert('hello ' + msg);
    window.Wix.PubSub.publish('externalModal', { value: 'msg from button clickme' }, false);
  };

  render() {
    return (
      <div className={Styles.app}>
        <h1>This is Blob Content</h1>
        <button onClick={() => this.clickMe('from iframe ')}>click me</button>
        <div className={Styles.appContent}>
          {this.state.modalProps && (
            <Modal
              element={this.state.modalProps.modalElement}
              theme={this.state.modalProps.theme}
              keyName={this.state.modalProps.keyName}
              store={this.state.modalProps.store}
              componentData={this.state.modalProps.componentData}
              componentState={this.state.modalProps.componentState}
              helpers={this.state.modalProps.helpers}
            />
          )}
        </div>
      </div>
    );
  }
}

export default ModalWindow;
