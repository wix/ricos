const isSSR = () => typeof window === 'undefined'; //TODO Code duplication with examples/main utils.js
export const getBaseUrl = () => {
  if (isSSR()) {
    return null;
  }

  const { hostname, port, protocol } = window.location;
  const baseUrl = `${protocol}//${hostname}`;
  return port ? `${baseUrl}:${port}` : baseUrl;
};
