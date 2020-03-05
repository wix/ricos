import React from 'react';
import RichContentWrapper from './lib/RichContentWrapper';
import { createEmpty } from 'wix-rich-content-editor/dist/lib/editorStateConversion';
import PropTypes from 'prop-types';

export default class RichContentEditorWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      editorState: createEmpty(),
    };
  }

  onModalOpen = data => {
    const { modalStyles, ...modalProps } = data;
    this.setState({
      showModal: true,
      modalProps,
      modalStyles,
    });
    this.props.onModalOpen?.(data);
  };

  onModalClose = () => {
    this.setState({
      showModal: false,
      modalProps: null,
      modalStyles: null,
      modalContent: null,
    });
    this.props.onModalClose?.();
  };

  handleChange = editorState => {
    this.setState({ editorState });
  };

  render() {
    const { children, ...rest } = this.props;
    const onChange = editorState => {
      this.props?.onChange?.(editorState);
      this.handleChange(editorState);
    };
    return (
      <RichContentWrapper
        modalState={this.state}
        {...rest}
        onModalOpen={this.onModalOpen}
        onModalClose={this.onModalClose}
        onChange={onChange}
      >
        {children}
      </RichContentWrapper>
    );
  }
}
RichContentEditorWrapper.propTypes = {
  children: PropTypes.any,
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  locale: PropTypes.string,
  palette: PropTypes.array,
  plugins: PropTypes.arrayOf(PropTypes.object),
  strategies: PropTypes.arrayOf(PropTypes.func),
  onChange: PropTypes.func,
  onModalOpen: PropTypes.func,
  onModalClose: PropTypes.func,
};
