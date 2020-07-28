/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import TableViewer from './table-viewer';
import { TABLE_TYPE } from './types';
import { DEFAULTS } from './defaults';
import { EditorState, convertToRaw } from 'wix-rich-content-editor';

class TableComponent extends React.Component {
  static type = { TABLE_TYPE };
  constructor(props) {
    super(props);
    this.innerRCECaptionRef = {};
  }

  updateComponentData = (id, data) => {
    const { setData } = this.props.blockProps;
    const { componentData } = this.props;
    const componentDataToSave = {
      ...componentData,
      config: { ...componentData.config, cells: { ...componentData.config.cells, [id]: data } },
    };
    setData(componentDataToSave);
    this.props.store.set('componentData', { ...componentDataToSave }, this.props.block.getKey());
  };

  renderInnerRCE = id => {
    const { innerRCEOpenModal, innerRCEReadOnly, componentData } = this.props;
    let contentState = componentData.config.cells[id];
    if (!contentState) {
      contentState = convertToRaw(EditorState.createEmpty().getCurrentContent());
      contentState.blocks[0].text = 'blabla';
      this.updateComponentData(id, contentState);
    }
    return (
      <>
        <div
          style={{ position: 'inherit', zIndex: 1, cursor: 'pointer' }}
          onClick={() =>
            innerRCEOpenModal(
              contentState,
              newContentState => this.updateComponentData(id, newContentState),
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
