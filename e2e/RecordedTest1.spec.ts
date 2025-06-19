import { test, expect } from '@playwright/test';
import { Pom } from './pom.js';

test('Создание пользователя', async ({ page }) => {
  const pom = new Pom(page);

  // Авторизация
  await pom.login('testadmin@example.ru', '0ds9fpFj4efkgqd');

  // Переход к пользователям
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('listitem').filter({ hasText: 'Пользователи' }).click();
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
  await page.locator('._option_pjq32_15').first().click();
  await page.getByRole('button', { name: 'Выбрано значений:' }).click();

  // Выбор прав
  console.log('Кликаю по кнопке "Выберите значение" для прав');
  await page.getByRole('button', { name: 'Выберите значение' }).click();
  console.log('Кликаю по первой опции с классом ._option_pjq32_15');
  await page.getByRole('complementary').locator('div').filter({ hasText: /^1$/ }).first().click();
  console.log('Кликаю по кнопке "Выбрано значений:" для прав');
  await page.getByRole('button', { name: 'Выбрано значений:' }).nth(1).click();

  // // Активация и сохранение
  // await page.getByRole('switch').click();
  // await page.getByRole('complementary').getByRole('button', { name: 'Добавить' }).click();
  // await page.waitForLoadState('networkidle');

  // Debug: capture HTML and screenshot before logout


  // Выход из системы
  await pom.logout();
});