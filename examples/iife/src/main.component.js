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
      <div className="wrapper">
        <div className="container">
          <div className="header">
            <h1>Wix Rich Content Editor</h1>
          </div>
          <div className="content">
            <div className="columns">
              <div className="column main">
                <RichContentEditor onChange={this.onChange} editorState={this.state.editorState} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

window.DemoExample = DemoExample;
