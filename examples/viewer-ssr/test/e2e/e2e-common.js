import puppeteer from 'puppeteer';

before(async () => {
  global.browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
});

after(async () => {
  await global.browser.close();
});
