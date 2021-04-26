import { AvailableExperiments } from 'wix-rich-content-common';

//eslint-disable-next-line
export default async function localeStrategy(locale = 'en', experiments?: AvailableExperiments) {
  if (locale === 'en') {
    return { locale };
  }
  try {
    const localeResource = await import(
      /* webpackChunkName: "messages_${locale}" */
      `wix-rich-content-common/dist/statics/locale/messages_${locale}.json`
    ).then(res => res.default);
    return { locale, localeResource };
  } catch (err) {
    throw new Error(`error while loading locale ${locale}:\n${err}`);
  }
}
