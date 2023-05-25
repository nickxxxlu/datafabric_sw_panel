const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs-extra');
const packageJson = require('./package.json');
const pluginJson = require('./src/plugin.json');

/* spell-checker: disable */
(async () => {
  const { name, version } = packageJson;
  const { name: pluginName, id: pluginId } = pluginJson;
  const fileName = `${name}-${version}.zip`;
  const filePath = path.join(__dirname, fileName);
  if (!fs.existsSync(filePath)) {
    throw new Error('Plugin zip file not exists, must pack before upload');
  }

  const WISE_DASHBOARD_URL =
    process.env.WISE_DASHBOARD_URL || 'http://localhost:8080';
  const WISE_USER = process.env.WISE_USER || 'admin';
  const WISE_PASSWORD = process.env.WISE_PASSWORD || 'admin';

  const browser = await puppeteer.launch();
  // const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  console.log(`Login '${WISE_DASHBOARD_URL}/login'...`);
  await page.goto(`${WISE_DASHBOARD_URL}/login`, {
    waitUntil: 'networkidle0',
  });
  const userInput = '#login-form > div.noShowDiv > div:nth-child(1) > input';
  await page.type(userInput, WISE_USER);
  const passwordInput = '#login-form > div.noShowDiv > input';
  await page.type(passwordInput, WISE_PASSWORD);
  const loginButton = '#login-btn-noldap > input';
  await page.click(loginButton);
  await page.waitForNavigation();
  await page.goto(`${WISE_DASHBOARD_URL}/admin/pluginUpload`);

  console.log(`Check plugin '${pluginId}' exists...`);
  const elements = await page.$x(
    '/html/body/grafana-app/div/div/div/div/div/div[2]/table/tbody/' +
      `tr[td[1][img[contains(@ng-src, "public/plugins/${pluginId}/img/logo.svg")]]` +
      ` and td[2][contains(@title, "${pluginName}")]]/td[7]/button`,
  );
  if (elements.length) {
    console.log(`Delete plugin '${pluginId}'...`);
    await elements[0].click();
    const deleteButton = 'div.confirm-modal-buttons > button.btn.btn-danger';
    await Promise.all([
      page.click(deleteButton),
      page.waitForResponse(
        response =>
          response.url() ===
            `${WISE_DASHBOARD_URL}/api/plugins-ex/${pluginId}` &&
          response.status() === 200,
      ),
    ]);
    await page.waitForTimeout(500);
  }

  console.log(`Upload plugin '${fileName}'...`);
  const inputUploadHandle = await page.$('#pluginUploadInput');
  await inputUploadHandle.uploadFile(fileName);

  const uploadButton =
    'body > grafana-app > div > div > div > div > div > upload-plugin-file' +
    ' > div > div:nth-child(3) > div:nth-child(2)' +
    ' > button.btn.gf-form-btn.btn-success.plugin_btn';
  await Promise.all([
    page.click(uploadButton),
    page.waitForResponse(
      response =>
        response.url() === `${WISE_DASHBOARD_URL}/api/file/up` &&
        response.status() === 200,
    ),
  ]);

  const duplicateConfirmButton =
    'div.confirm-modal-buttons > button.btn.btn-danger';
  if ((await page.$(duplicateConfirmButton)) !== null) {
    await Promise.all([
      page.click(duplicateConfirmButton),
      page.waitForResponse(
        response =>
          response.url() === `${WISE_DASHBOARD_URL}/api/file/overwrite` &&
          response.status() === 200,
      ),
    ]);
  }

  // await page.screenshot({ path: 'screenshot.png' });
  await browser.close();

  console.log(`Upload plugin to '${WISE_DASHBOARD_URL}' complete`);
})();
