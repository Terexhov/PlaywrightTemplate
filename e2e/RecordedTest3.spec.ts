import { test, expect } from '@playwright/test';
import { Pom } from './pom.js';

test('Создание новой роли', async ({ page }) => {
  const pom = new Pom(page);

  // Авторизация
  await pom.login('testadmin@example.ru', '0ds9fpFj4efkgqd');

  // Переход к ролям
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByText('Роли').click();
  await page.getByRole('complementary').getByRole('button').click();
  
  // Заполнение данных роли
  await page.getByRole('textbox', { name: 'Название роли' }).click();
  await page.getByRole('textbox', { name: 'Название роли' }).type('Тестовая роль');

  // Сохранение роли
  await page.getByRole('complementary').getByRole('button', { name: 'Добавить' }).click();
  await page.waitForLoadState('networkidle');

  // Выход из системы
  await pom.logout();
});