import React, { Children, Fragment } from 'react';
import PropTypes from 'prop-types';
import FullscreenRenderer from './FullscreenRenderer';
import ModalRenderer from './ModalRenderer';
import { assert } from './utils';

class EngineWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);
    if (props.editor) {
      import(
        // eslint-disable-next-line max-len
        /* webpackChunkName: "rce-editorStateConversion"  */ `wix-rich-content-editor/dist/lib/editorStateConversion.js`
      ).then(module => this.setState({ editorState: module.createEmpty() }));
    }
  }

  stateFromProps(props) {
    const { editor, children } = props;
    const { closeModal, openModal, onExpand } = children.props?.helpers || {};
    let ModalityProvider = Fragment;
    if (editor && !closeModal && !openModal) {
      ModalityProvider = ModalRenderer;
    } else if (!editor && !onExpand) {
      ModalityProvider = FullscreenRenderer;
    }
    return { ModalityProvider };
  }

  handleChange = editorState => {
    this.setState({ editorState });
  };

  render() {
    const { strategies = [], children, editor } = this.props;

    const childProps = strategies.reduce(
      (props, strategy) => ({ ...props, ...strategy(props) }),
      children.props
    );

    assert(childProps.theme && childProps.config, '[EngineWrapper] invalid strategy reduce');

    // BARAK: why do we need this?
    if (editor) {
      const { onChange } = childProps;
      childProps.onChange = editorState => {
        onChange?.(editorState);
        this.handleChange(editorState);
      };
    }

    const { ModalityProvider } = this.state;

    return (
      <ModalityProvider {...childProps}>
        {Children.only(React.cloneElement(children, { ...childProps }))}
      </ModalityProvider>
    );
  }
}
EngineWrapper.propTypes = {
  strategies: PropTypes.array,
  plugins: PropTypes.arrayOf(PropTypes.object),
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.object,
  editor: PropTypes.bool,
};
export default EngineWrapper;
