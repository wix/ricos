import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { I18nextProvider, translate } from 'react-i18next';
import i18n from './i18n';
import createHocName from './createHocName';

export default (Component, defaultLocaleResource) => {
  const Translated = translate(null, { withRef: true })(Component);
  class I18nWrapper extends PureComponent {
    static propTypes = {
      locale: PropTypes.string,
      localeResource: PropTypes.object,
      forwardedRef: PropTypes.any,
    };

    static defaultProps = {
      locale: 'en',
      localeResource: defaultLocaleResource,
    };

    constructor(props) {
      super(props);
      const { locale, localeResource } = props;
      this.i18n = i18n({ locale, localeResource });
      this.state = {
        key: `${I18nWrapper.DisplayName}-${locale}`,
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
          this.setState({ key: `${I18nWrapper.DisplayName}-${this.i18n.language}` });
        }
      });
    }

    render() {
      const { forwardedRef, ...rest } = this.props;
      return (
        <I18nextProvider i18n={this.i18n}>
          <Translated key={this.state.key} {...rest} ref={forwardedRef} />
        </I18nextProvider>
      );
    }
  }

  I18nWrapper.DisplayName = createHocName('I18nWrapper', Component);
  return React.forwardRef((props, ref) => <I18nWrapper {...props} forwardedRef={ref} />);
};
