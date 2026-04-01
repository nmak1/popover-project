const puppeteer = require('puppeteer');

describe('Popover widget', () => {
  let browser;
  let page;
  const PORT = 8080;

  beforeEach(async () => {
    browser = await puppeteer.launch({ 
      headless: true,  // В новой версии headless: true работает как "new"
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ]
    });
    page = await browser.newPage();
    await page.goto(`http://localhost:${PORT}`);
  });

  afterEach(async () => {
    await browser.close();
  });

  test('popover appears on button click', async () => {
    await page.waitForSelector('#popover-button');
    await page.click('#popover-button');
    await page.waitForSelector('.popover');
    
    const popover = await page.$('.popover');
    expect(popover).not.toBeNull();
    
    const title = await page.$eval('.popover-header', el => el.textContent);
    const body = await page.$eval('.popover-body', el => el.textContent);
    
    expect(title).toBe('Заголовок popover');
    expect(body).toBe('Текст popover');
  });

  test('popover hides when clicking outside', async () => {
    await page.waitForSelector('#popover-button');
    await page.click('#popover-button');
    await page.waitForSelector('.popover');
    
    let popover = await page.$('.popover');
    expect(popover).not.toBeNull();
    
    await page.mouse.click(10, 10);
    
    await page.waitForFunction(
      () => !document.querySelector('.popover'),
      { timeout: 5000 }
    );
    
    popover = await page.$('.popover');
    expect(popover).toBeNull();
  });
});