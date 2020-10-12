import React, { PureComponent, Ref, ComponentType } from 'react';
import { I18nextProvider, translate } from 'react-i18next';
import i18n from './i18n';
import createHocName from './createHocName';
import { LocaleResource } from '../types';

interface Props {
  locale: string;
  localeResource: LocaleResource;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  forwardedRef: Ref<any>;
}

// @types/react-i18next imports latest @types/i18next, this causes a mismatch, newer i18next versions have type definitions internally
type I18nLATEST = React.ComponentProps<typeof I18nextProvider>['i18n'];

export default <T, P>(Component: ComponentType, defaultLocaleResource: LocaleResource) => {
  const Translated = translate(undefined, { withRef: true })(Component);
  class I18nWrapper extends PureComponent<Props, { key: string }> {
    i18n: I18nLATEST;

    static defaultProps = {
      locale: 'en',
      localeResource: defaultLocaleResource,
    };

    static displayName = createHocName('I18nWrapper', Component);

    constructor(props: Props) {
      super(props);
      const { locale, localeResource } = props;
      this.i18n = (i18n({ locale, localeResource }) as unknown) as I18nLATEST;
      this.state = {
        key: `${I18nWrapper.displayName}-${locale}`,
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
          this.setState({ key: `${I18nWrapper.displayName}-${this.i18n.language}` });
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

  return React.forwardRef<T, P>((props, ref) => <I18nWrapper {...props} forwardedRef={ref} />);
};
