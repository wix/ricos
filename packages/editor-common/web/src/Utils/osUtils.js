export function isiOS() {
  return (
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !window.MSStream
  );
}

export function isWin() {
  return typeof navigator !== 'undefined' && /Win/.test(navigator.userAgent);
}
