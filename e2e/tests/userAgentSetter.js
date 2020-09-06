function setUserAgent(userAgent) {
  if (navigator.__defineGetter__) {
    // eslint-disable-next-line fp/no-get-set
    navigator.__defineGetter__('userAgent', () => {
      return userAgent;
    });
  } else if (Object.defineProperty) {
    Object.defineProperty(navigator, 'userAgent', {
      get() {
        return userAgent;
      },
    });
  }
}
export default setUserAgent;
