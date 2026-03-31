import puppeteer from 'puppeteer';

describe('Popover widget', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({ headless: 'new' });
    page = await browser.newPage();
    await page.goto('http://localhost:8080');
  });

  afterEach(async () => {
    await browser.close();
  });

  test('popover appears on button click', async () => {
    const button = await page.$('#popover-button');
    await button.click();

    const popover = await page.$('.popover');
    expect(popover).not.toBeNull();

    const title = await page.$eval('.popover-header', el => el.textContent);
    const body = await page.$eval('.popover-body', el => el.textContent);

    expect(title).toBe('Заголовок popover');
    expect(body).toBe('Текст popover');
  });

  test('popover hides when clicking outside', async () => {
    const button = await page.$('#popover-button');
    await button.click();

    let popover = await page.$('.popover');
    expect(popover).not.toBeNull();

    await page.click('body');
    popover = await page.$('.popover');
    expect(popover).toBeNull();
  });
});