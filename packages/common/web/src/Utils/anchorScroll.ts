export const anchorScroll = (e, element) => {
  e.preventDefault();
  const url = getUrlWithAnchorTag(element.id);
  if (url) {
    history.pushState({}, '', url);
  }
  const stickyHeaderHeight = document.querySelector('[id="SITE_HEADER"]')?.clientHeight || 0;
  const stickyAdd = document.querySelector('[id="WIX_ADS"]')?.clientHeight || 0;
  element.style.marginTop = `-${stickyHeaderHeight + stickyAdd}px`;
  element.style.paddingTop = `${stickyHeaderHeight + stickyAdd}px`;
  element.scrollIntoView({ behavior: 'smooth' });
  element.style.marginTop = null;
  element.style.paddingTop = null;
};

const getUrlWithAnchorTag = anchorString => {
  const url = new URL(window.location.href);
  url.hash = anchorString;
  return url.href;
};
