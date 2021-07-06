import { verticalEmbedProviders } from './constants';

export const convertDuration = (durationInMinutes, t) => {
  if (durationInMinutes < 60) {
    return t('Embed_Vertical_Units_Minute', { minutes: durationInMinutes });
  }
  const hours = durationInMinutes / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  const durationInHours =
    rminutes === 0
      ? t('Embed_Vertical_Units_Hour', { hours: rhours })
      : t('Embed_Vertical_Units_Hour', { hours: rhours }) +
        ' ' +
        t('Embed_Vertical_Units_Minute', { minutes: rminutes });
  return durationInHours;
};

const getBookingData = (data, t) => {
  const { name, imageSrc, pageUrl, description } = data;
  const content = {
    title: name,
    info: { leftSubtitle: description && convertDuration(description, t) },
    buttonText: t('bookButtonText'),
  };
  return { pageUrl, imageSrc, content };
};
const getEventData = (data, t) => {
  const { name, imageSrc, scheduling, location, pageUrl } = data;
  const content = {
    title: name,
    info: { leftSubtitle: scheduling, rightSubtitle: location },
    buttonText: t('registerButtonText'),
  };
  return { pageUrl, imageSrc, content };
};
const getProductData = (data, t) => {
  const { name, imageSrc, pageUrl } = data;
  const content = {
    title: name,
    buttonText: t('buyButtonText'),
  };
  return { pageUrl, imageSrc, content };
};

export const dataTypeMapper = {
  [verticalEmbedProviders.booking]: getBookingData,
  [verticalEmbedProviders.event]: getEventData,
  [verticalEmbedProviders.product]: getProductData,
};
