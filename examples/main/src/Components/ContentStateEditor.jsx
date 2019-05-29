import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MonacoEditor from 'react-monaco-editor';
import debounce from 'lodash/debounce';

const stringifyJSON = obj => JSON.stringify(obj, null, 2);

class ContentStateEditor extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      contentState: stringifyJSON(this.props.contentState),
    };

    this.editorOptions = {
      codeLens: false,
      formatOnType: true,
      formatOnPaste: true,
      scrollBeyondLastLine: false,
      minimap: {
        enabled: false,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    const contentState = stringifyJSON(nextProps.contentState);
    if (contentState !== this.state.contentState) {
      this.setState({ contentState });
    }
  }

  onEditorChange = debounce(content => {
    if (content !== '') {
      try {
        const contentJsObj = JSON.parse(content);
        this.props.onChange(contentJsObj);
      } catch (e) {
        console.error(`Error parsing JSON: ${e.message}`);
      }
    }
  }, 500);

  refreshLayout = debounce(() => {
    this.refs.monaco && this.refs.monaco.editor.layout();
  }, 100);

  render = () => {
    const { contentState } = this.state;
    return (
      <MonacoEditor
        ref="monaco"
        language="json"
        value={contentState}
        options={this.editorOptions}
        onChange={this.onEditorChange}
      />
    );
  };
}

ContentStateEditor.propTypes = {
  contentState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ContentStateEditor;
