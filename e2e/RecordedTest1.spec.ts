import { test, expect } from '@playwright/test';
import { Pom } from './pom.js';

test('Создание пользователя', async ({ page }) => {
  const pom = new Pom(page);

  // Авторизация
  await pom.login('testadmin@example.ru', '0ds9fpFj4efkgqd');

  // Переход к пользователям
  await pom.navigateToSection('Пользователи');
  await page.getByRole('complementary').getByRole('button').click();

  // Заполнение данных пользователя
  await page.getByRole('textbox', { name: 'Фамилия' }).click();
  await page.getByRole('textbox', { name: 'Фамилия' }).fill('Попов');
  await page.getByRole('textbox', { name: 'Имя' }).click();
  await page.getByRole('textbox', { name: 'Имя' }).fill('Иван');
  await page.getByRole('textbox', { name: 'Почта', exact: true }).click();
  await page.getByRole('textbox', { name: 'Почта', exact: true }).fill('pi@help.ru');

  // Выбор роли
  await page.getByRole('button', { name: 'Выберите значение' }).first().click();
  await page.getByText('Роль с длинным названием Роль с длинным названием', { exact: true }).click();
  await page.getByRole('button', { name: 'Выбрано значений:' }).click();

  // Выбор прав
  await page.getByRole('button', { name: 'Выберите значение' }).click();
  await page.getByRole('complementary').locator('div').filter({ hasText: /^1$/ }).first().click();
  await page.getByRole('button', { name: 'Выбрано значений:' }).nth(1).click();

  // Активация и сохранение
  await page.getByRole('switch').click();
  await page.getByRole('complementary').getByRole('button', { name: 'Добавить' }).click();
  await page.waitForLoadState('networkidle');

  // Debug: capture HTML and screenshot before logout
  await page.screenshot({ path: 'before-logout.png', fullPage: true });
  const html = await page.content();
  console.log('HTML before logout:', html);

  // Выход из системы
  await pom.logout();
});