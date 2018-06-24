import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { I18nextProvider } from 'react-i18next';
import translations from '../Locale';
import i18n from '../i18n';
import RichContentEditor from './RichContentEditor';

class I18nRichContentEditor extends PureComponent {

  constructor(props) {
    super(props);
    const { locale } = props;
    this.i18n = i18n({ locale, translations });
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
