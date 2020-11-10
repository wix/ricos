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
