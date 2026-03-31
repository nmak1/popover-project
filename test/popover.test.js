const puppeteer = require('puppeteer');

describe('Popover widget', () => {
  let browser;
  let page;
  const PORT = process.env.PORT || 8080;

  beforeEach(async () => {
    browser = await puppeteer.launch({ 
      headless: "new", // Используем новый headless режим
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    page = await browser.newPage();
    await page.goto(`http://localhost:${PORT}`);
  });

  afterEach(async () => {
    await browser.close();
  });

  test('popover appears on button click', async () => {
    await page.waitForSelector('#popover-button', { timeout: 5000 });
    await page.click('#popover-button');
    await page.waitForSelector('.popover', { timeout: 3000 });
    
    const popover = await page.$('.popover');
    expect(popover).not.toBeNull();
    
    const title = await page.$eval('.popover-header', el => el.textContent);
    const body = await page.$eval('.popover-body', el => el.textContent);
    
    expect(title).toBe('Заголовок popover');
    expect(body).toBe('Текст popover');
  });

  test('popover hides when clicking outside', async () => {
    // Ждем загрузки кнопки
    await page.waitForSelector('#popover-button', { timeout: 5000 });
    
    // Показываем popover
    await page.click('#popover-button');
    
    // Ждем появления popover
    await page.waitForSelector('.popover', { timeout: 3000 });
    
    // Проверяем, что popover виден
    let popover = await page.$('.popover');
    expect(popover).not.toBeNull();
    
    // Получаем координаты кнопки и кликаем рядом с ней (вне popover)
    const button = await page.$('#popover-button');
    const buttonBox = await button.boundingBox();
    
    // Кликаем на 50px левее кнопки (вне области popover)
    await page.mouse.click(buttonBox.x - 50, buttonBox.y);
    
    // Ждем, пока popover исчезнет с помощью waitForFunction
    try {
      await page.waitForFunction(
        () => !document.querySelector('.popover'),
        { timeout: 3000 }
      );
    } catch (error) {
      // Если waitForFunction не сработал, проверяем еще раз
      console.log('Waiting for popover to disappear...');
    }
    
    // Небольшая задержка для завершения анимации
    await page.waitForTimeout(200);
    
    // Проверяем, что popover исчез
    popover = await page.$('.popover');
    expect(popover).toBeNull();
  });
});