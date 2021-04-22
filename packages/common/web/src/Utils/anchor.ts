export const anchorScroll = element => {
  const { paddingTop, marginTop } = element.style;
  const stickyHeaderHeight = document.querySelector('[id="SITE_HEADER"]')?.clientHeight || 0;
  const stickyAdd = document.querySelector('[id="WIX_ADS"]')?.clientHeight || 0;
  element.style.marginTop = `-${stickyHeaderHeight + stickyAdd}px`;
  element.style.paddingTop = `${stickyHeaderHeight + stickyAdd}px`;
  element.scrollIntoView({ behavior: 'smooth' });
  element.style.marginTop = marginTop;
  element.style.paddingTop = paddingTop;
};

export const addAnchorTagToUrl = anchorString => {
  const url = new URL(window.location.href);
  url.hash = anchorString;
  history.pushState({}, '', url.href);
};

export const isNewTab = target => target === '_blank';
