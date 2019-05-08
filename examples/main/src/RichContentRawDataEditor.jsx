import React from 'react';
import PropTypes from 'prop-types';
import JSONInput from 'react-json-editor-ajrm';
import get from 'lodash/get';
import set from 'lodash/set';
import debounce from 'lodash/debounce';

class RichContentRawDataEditor extends React.Component {
  constructor(props) {
    super(props);
    this.id = `rcrv_${Math.floor(Math.random() * 9999)}`;
    this.state = { content: fixKeys(props.content) };
  }

  forceUpdateDebounced = debounce(this.forceUpdate, 70);

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (
      this.state.editingEnabled !== nextState.editingEnabled ||
      JSON.stringify(nextProps.content) !== JSON.stringify(this.content)
    ) {
      this.content = nextProps.content;
      this.forceUpdateDebounced();
    }
    return false;
  }

  onChange = content => {
    if (content && content.jsObject && !content.error) {
      this.content = content.jsObject;
      this.props.onChange(content.jsObject);
    }
  };

  enableEditing = () => {
    this.setState({ editingEnabled: true });
  };

  render = () => (
    <div onClick={this.enableEditing}>
      <JSONInput
        viewOnly={!this.state.editingEnabled}
        placeholder={fixKeys(this.props.content)}
        id={this.id}
        onChange={this.onChange}
        waitAfterKeyPress={100}
        width={'100%'}
      />
    </div>
  );
}

function fixKeys(content) {
  let fixed = {};
  if (content && content.entityMap) {
    let fixedEntityMap = Object.keys(content.entityMap).reduce((map, key) => {
      const entity = content.entityMap[key];
      const videoHtml = get(entity, 'data.metadata.html');
      if (videoHtml) {
        set(entity, 'data.metadata.html', escapeHtml(videoHtml));
      } else if (get(entity, 'data.srcType') === 'html') {
        const htmlSrc = get(entity, 'data.src');
        set(entity, 'data.src', escapeHtml(htmlSrc));
      }

      return Object.assign(map, { [key]: entity });
    }, {});

    fixed = Object.assign({}, content, { entityMap: fixedEntityMap });
  }

  if (fixed && fixed.blocks) {
    const fixedBlocks = fixed.blocks.map(block => {
      if (block.text) {
        block.text = escapeNewLine(block.text);
      }
      return block;
    });
    return Object.assign({}, fixed, { blocks: fixedBlocks });
  }
}

function escapeNewLine(text) {
  return text.replace(/[\n\r]/gimu, '\\n');
}

function escapeHtml(text) {
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\//g, '&#047;');
}

// see https://github.com/AndrewRedican/react-json-editor-ajrm for details
RichContentRawDataEditor.propTypes = {
  content: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  viewOnly: PropTypes.bool,
  confirmGood: PropTypes.bool,
  height: PropTypes.string,
  width: PropTypes.string,
  onKeyPressUpdate: PropTypes.func,
  waitAfterKeyPress: PropTypes.func,
  theme: PropTypes.string,
  colors: PropTypes.object,
  style: PropTypes.object,
};

export default RichContentRawDataEditor;
