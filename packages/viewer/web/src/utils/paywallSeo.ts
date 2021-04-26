import { SEOSettings } from 'wix-rich-content-common';

export const getPaywallSeoClass = ({ className = 'paywall', index = 3 }, blockIndex: number) =>
  blockIndex < index && className;

export const isPaywallSeo = (seoMode: SEOSettings) =>
  typeof seoMode === 'object' && typeof seoMode.paywall === 'object';
