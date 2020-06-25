export const getPaywallSeoClass = ({ className = 'paywall', size = 3 }, blockIndex) =>
  blockIndex < size && className;

export const isPaywallSeo = seoMode =>
  typeof seoMode === 'object' && typeof seoMode.paywall === 'object';
