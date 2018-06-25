import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { I18nextProvider } from 'react-i18next';
import { i18n, changeLocale } from '../i18n';
import RichContentEditor from './RichContentEditor';

class I18nRichContentEditor extends PureComponent {

  constructor(props) {
    super(props);
    this.i18n = i18n();
    this.state = {
      key: 'rce',
    };
  }

  componentDidMount() {
    const { locale } = this.props;
    if (locale !== 'en') {
      this.setLocale(locale);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.locale !== nextProps.locale) {
      this.setLocale(nextProps.locale);
    }
  }

  setLocale = async locale => {
    await changeLocale(locale);
    this.setState({ key: `rce-${locale}` });
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
  locale: PropTypes.string
};

export default I18nRichContentEditor;
