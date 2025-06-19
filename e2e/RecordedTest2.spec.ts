import { test, expect } from '@playwright/test';
import { Pom } from './pom.js';

test('Создание нового проекта', async ({ page }) => {
  const pom = new Pom(page);

  // Авторизация
  await pom.login('testadmin@example.ru', '0ds9fpFj4efkgqd');

  // Переход к проектам
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByText('Проекты').click();
  await page.getByRole('complementary').getByRole('button').click();

  // Заполнение данных проекта
  await page.getByRole('textbox', { name: 'Название' }).click();
  await page.getByRole('textbox', { name: 'Название' }).type('Тестовый проект');
  await page.getByRole('textbox', { name: 'Код' }).click();
  await page.getByRole('textbox', { name: 'Код' }).type('TEST-001');
  await page.getByRole('textbox', { name: 'Адрес' }).click();
  await page.getByRole('textbox', { name: 'Адрес' }).type('г. Москва, ул. Тестовая, д. 1');

  // Сохранение проекта
  await page.getByRole('complementary').getByRole('button', { name: 'Добавить' }).click();
  await page.waitForLoadState('networkidle');

  // Выход из системы
  await pom.logout();
});