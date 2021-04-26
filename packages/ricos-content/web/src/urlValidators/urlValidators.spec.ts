import { isValidExactUrl, isValidUrl } from './urlValidators';
describe('URL Validators', () => {
  it('should verify string with url in it', () => {
    const iframeCode =
      '<iframe title="vimeo-player" src="https://player.vimeo.com/video/393348113"></iframe>';
    expect(isValidUrl(iframeCode)).toBe(true);
    expect(isValidExactUrl(iframeCode)).toBe(false);
  });

  it('should verify string with url in it', () => {
    const wixUrl = 'https://wix.com';
    expect(isValidUrl(wixUrl)).toBe(true);
    expect(isValidExactUrl(wixUrl)).toBe(true);
  });
});
