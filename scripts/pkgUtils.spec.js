import { calcTag, shouldTestTag } from './pkgUtils';

describe('Tag Calculations', () => {
  it('should be latest', async () => {
    const tag = calcTag('7.10.3', '7.10.2');
    expect(tag).toBe('latest');
  });

  it('should be old', async () => {
    const tag = calcTag('7.10.1', '7.10.2');
    expect(tag).toBe('old');
  });

  it('should be next', async () => {
    const tag = calcTag('7.10.3-alpha.0', '7.10.2');
    expect(tag).toBe('next');
  });
});
