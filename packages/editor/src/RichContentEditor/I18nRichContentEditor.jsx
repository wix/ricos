import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { I18nextProvider } from 'react-i18next';
import get from 'lodash/get';
import { i18n, changeLocale } from '../i18n';
import RichContentEditor from './RichContentEditor';

class I18nRichContentEditor extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    };
  }

  async componentDidMount() {
    const { locale } = this.props;
    this.i18n = await i18n(locale);
    this.onReady();
  }

  async componentWillReceiveProps(nextProps) {
    if (this.props.locale !== nextProps.locale) {
      this.setState({ ready: false });
      await changeLocale(nextProps.locale);
      this.onReady();
    }
  }

  onReady() {
    const onReady = get(this, 'props.helpers.onReady');
    this.setState({ ready: true }, () => {
      onReady && onReady();
    });
  }

  setEditorRef = editor => {
    if (editor) {
      this.editor = editor.getWrappedInstance();
    }
  };

  getToolbars = () => this.editor.getToolbars();

  focus = () => this.editor.focus();

  blur = () => this.editor.blur();

  render() {
    if (!this.state.ready) {
      return null;
    }

    return (
      <I18nextProvider i18n={this.i18n}>
        <RichContentEditor
          key={this.state.key}
          ref={this.setEditorRef}
          {...this.props}
        />
      </I18nextProvider>
    );
  }
}

I18nRichContentEditor.propTypes = {
  locale: PropTypes.string,
  helpers: PropTypes.object
};

I18nRichContentEditor.defaultProps = {
  locale: 'en',
};

export default I18nRichContentEditor;
