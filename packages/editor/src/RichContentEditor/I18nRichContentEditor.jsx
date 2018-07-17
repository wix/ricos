import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import RichContentEditor from './RichContentEditor';

class I18nRichContentEditor extends PureComponent {

  constructor(props) {
    super(props);
    const { localeName, localeResource } = props;
    this.i18n = i18n({ localeName, localeResource });
    this.state = {
      key: `rce-${localeName}`,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.localeName !== nextProps.localeName) {
      this.changeLocale(nextProps);
    }
  }

  changeLocale({ localeName, localeResource }) {
    this.i18n.addResourceBundle(localeName, 'translation', localeResource);
    this.i18n.changeLanguage(localeName, err => {
      if (!err) {
        this.setState({ key: `rce-${this.i18n.language}` });
      }
    });
  }

  setEditorRef = editor => this.editor = editor ? editor.getWrappedInstance() : undefined;

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
  localeName: PropTypes.string.isRequired,
  localeResource: PropTypes.object.isRequired,
  helpers: PropTypes.object
};

export default I18nRichContentEditor;
