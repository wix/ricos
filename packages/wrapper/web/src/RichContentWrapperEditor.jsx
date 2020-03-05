import React from 'react';
import RichContentWrapper from './RichContentWrapper';
import { createEmpty } from 'wix-rich-content-editor/dist/lib/editorStateConversion';
import PropTypes from 'prop-types';

export default class RichContentWrapperEditor extends React.Component {
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
  };

  onModalClose = () =>
    this.setState({
      showModal: false,
      modalProps: null,
      modalStyles: null,
      modalContent: null,
    });

  handleChange = editorState => {
    this.setState({ editorState });
  };

  render() {
    const { children, ...rest } = this.props;
    const onChange =
      this.props.onChange &&
      (editorState => {
        this.props.onChange(editorState);
        this.handleChange(editorState);
      });
    return (
      <RichContentWrapper modalState={this.state} {...rest} onChange={onChange}>
        {children}
      </RichContentWrapper>
    );
  }
}
RichContentWrapperEditor.propTypes = {
  children: PropTypes.any,
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  locale: PropTypes.string,
  palette: PropTypes.array,
  plugins: PropTypes.arrayOf(PropTypes.object),
  strategies: PropTypes.arrayOf(PropTypes.func),
  onChange: PropTypes.func,
};
