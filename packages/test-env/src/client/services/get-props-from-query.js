import qs from 'qs';

export default function getPropsFromQuery() {
  const query = qs.parse(window.location.search.replace(/^\?/, ''));
  return {
    isMobile: query.mobile === 'true',
  };
}
