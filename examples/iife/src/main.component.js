const { React } = window;
const { RichContentEditor, EditorState } = window.WixRichContentEditor;

class DemoExample extends React.Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  onChange = editorState => {
    this.setState({
      editorState,
    });
  };

  render() {
    return (
      <RichContentEditor
        onChange={this.onChange}
        editorState={this.state.editorState}/>
    );
  }
}

window.DemoExample = DemoExample;
