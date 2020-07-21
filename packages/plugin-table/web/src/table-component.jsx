/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import TableViewer from './table-viewer';
import { TABLE_TYPE } from './types';
import { DEFAULTS } from './defaults';
import { EditorState, convertToRaw } from 'wix-rich-content-editor';
import { merge } from 'lodash';

class TableComponent extends React.Component {
  static type = { TABLE_TYPE };
  constructor(props) {
    super(props);
    this.innerRCECaptionRef = {};
  }

  updateComponentData = data => {
    const { setData } = this.props.blockProps;
    const componentData = merge({}, ...this.props.componentData, ...data);
    setData(componentData);
    this.props.store.update('componentData', { ...componentData }, this.props.block.getKey());
  };

  setCellContentState = (id, contentState) => {
    this.updateComponentData({
      config: {
        cells: {
          [id]: contentState,
        },
      },
    });
  };

  renderInnerRCE = id => {
    const { innerRCEOpenModal, innerRCEReadOnly, componentData } = this.props;
    let contentState = componentData.config.cells[id];
    if (!contentState) {
      contentState = convertToRaw(EditorState.createEmpty().getCurrentContent());
      contentState.blocks[0].text = 'blabla';
      this.setCellContentState(id, contentState);
    }
    return (
      <>
        <div
          style={{ position: 'inherit', zIndex: 1, cursor: 'pointer' }}
          onClick={() =>
            innerRCEOpenModal(
              contentState,
              newContentState => this.setCellContentState(id, newContentState),
              'table',
              this.innerRCECaptionRef[id]
            )
          }
        >
          <div ref={innerRCECaptionRef => (this.innerRCECaptionRef[id] = innerRCECaptionRef)}>
            {innerRCEReadOnly(contentState)}
          </div>
        </div>
      </>
    );
  };

  render() {
    const { componentData, settings } = this.props;
    return (
      <TableViewer
        componentData={componentData}
        settings={settings}
        renderInnerRCE={this.renderInnerRCE}
      />
    );
  }
}

TableComponent.propTypes = {
  blockProps: PropTypes.object.isRequired,
  block: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  innerRCEOpenModal: PropTypes.func,
  innerRCEReadOnly: PropTypes.func,
};

export { TableComponent as Component, DEFAULTS };
