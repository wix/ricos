export const getPaywallSeoClass = ({ className = 'paywall', index = 3 }, blockIndex) =>
  blockIndex < index && className;

export const isPaywallSeo = seoMode =>
  typeof seoMode === 'object' && typeof seoMode.paywall === 'object';
