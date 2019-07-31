import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JSONInput from 'react-json-editor-ajrm';
import { get, set } from 'lodash';

class RichContentRawDataViewer extends Component {
  constructor(props) {
    super(props);
    this.id = `rcrv_${Math.floor(Math.random() * 9999)}`;
    this.state = this.stateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.content !== nextProps.content) {
      this.setState(this.stateFromProps(nextProps));
    }
  }

  stateFromProps(props) {
    return { content: this.fixKeys(props.content) };
  }

  fixKeys(content) {
    if (content && content.entityMap) {
      const fixedEntityMap = Object.keys(content.entityMap).reduce((map, key) => {
        const entity = content.entityMap[key];
        const videoHtml = get(entity, 'data.metadata.html');
        if (videoHtml) {
          set(entity, 'data.metadata.html', this.escapeHtml(videoHtml));
        } else if (get(entity, 'data.srcType') === 'html') {
          const htmlSrc = get(entity, 'data.src');
          set(entity, 'data.src', this.escapeHtml(htmlSrc));
        }

        return Object.assign(map, { [`"${key}"`]: entity });
      }, {});

      return Object.assign({}, content, { entityMap: fixedEntityMap });
    }
  }

  escapeNewLine(text) {
    return text.replace(/[\n\r]/gimu, '\\n');
  }

  escapeHtml(text) {
    return text
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
      .replace(/\//g, '&#047;');
  }

  onChange(content) {
    if (content && content.jsObject && !content.error) {
      this.props.onChange(this.fixKeys(content.jsObject));
    }
  }

  render = () => (
    <JSONInput
      placeholder={this.state.content}
      id={this.id}
      onChange={content => this.onChange(content)}
      {...this.props}
    />
  );
}

// see https://github.com/AndrewRedican/react-json-editor-ajrm for details
RichContentRawDataViewer.propTypes = {
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

export default RichContentRawDataViewer;
