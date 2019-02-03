import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import englishResources from '../../statics/locale/messages_en.json';
import RichContentEditor from './RichContentEditor';

class I18nRichContentEditor extends PureComponent {
  constructor(props) {
    super(props);
    const { locale, localeResource } = props;
    this.i18n = i18n({ locale, localeResource });
    this.state = {
      key: `rce-${locale}`,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.locale !== nextProps.locale) {
      this.changeLocale(nextProps);
    }
  }

  changeLocale({ locale, localeResource }) {
    this.i18n.addResourceBundle(locale, 'translation', localeResource);
    this.i18n.changeLanguage(locale, err => {
      if (!err) {
        this.setState({ key: `rce-${this.i18n.language}` });
      }
    });
  }

  setEditorRef = editor => (this.editor = editor ? editor.getWrappedInstance() : undefined);

  getToolbars = () => this.editor.getToolbars();

  focus = () => this.editor.focus();

  blur = () => this.editor.blur();

  render() {
    return (
      <I18nextProvider i18n={this.i18n}>
        <RichContentEditor key={this.state.key} ref={this.setEditorRef} {...this.props} />
      </I18nextProvider>
    );
  }
}

I18nRichContentEditor.propTypes = {
  locale: PropTypes.string,
  localeResource: PropTypes.object,
  helpers: PropTypes.object,
};

I18nRichContentEditor.defaultProps = {
  locale: 'en',
  localeResource: englishResources,
};

export default I18nRichContentEditor;
