import { Page } from '@playwright/test';
import { EnvConfig } from './utils/env.utils.js';

export class Pom {
  constructor(private page: Page) {}

  // ... existing code ...

  /**
   * Авторизация в системе
   * @param username - логин пользователя
   * @param password - пароль пользователя
   */
  async login(username: string, password: string) {
    // Устанавливаем увеличенный таймаут для всей страницы
    this.page.setDefaultTimeout(30000);

    // Переходим на страницу авторизации
    await this.page.goto('https://tepcontrol-tst.sminex.com/auth/signin');
    await this.page.waitForLoadState('networkidle');
    
    // Проверяем, что страница загрузилась
    const currentUrl = this.page.url();
    console.log('Текущий URL:', currentUrl);
    
    // Получаем HTML страницы для отладки
    const bodyHtml = await this.page.locator('body').innerHTML();
    console.log('HTML страницы:', bodyHtml);
    
    // Ждем и заполняем поля по name
    const loginInput = this.page.locator('input[name="userName"]');
    const passwordInput = this.page.locator('input[name="password"]');
    await loginInput.waitFor({ state: 'visible', timeout: 30000 });
    await loginInput.fill(username);
    await passwordInput.waitFor({ state: 'visible', timeout: 30000 });
    await passwordInput.fill(password);
    
    // Кликаем по кнопке submit
    const loginButton = this.page.locator('button[type="submit"]');
    await loginButton.waitFor({ state: 'visible', timeout: 30000 });
    await loginButton.click();
    
    // Ждем завершения авторизации
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Выход из системы
   */
  async logout() {
    try {
      await this.page.waitForLoadState('networkidle');
      // Кликаем по кнопке профиля/меню (без текста, внутри complementary)
      await this.page.getByRole('complementary').getByRole('button').filter({ hasText: /^$/ }).click();
      // Кликаем по пункту "Выход"
      await this.page.getByRole('listitem').filter({ hasText: 'Выход' }).click();
      // Подтверждаем выход
      await this.page.getByRole('button', { name: 'Да, выйти' }).click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForURL('**/auth/signin', { timeout: 10000 });
    } catch (error) {
      console.error('Ошибка при выходе из системы:', error);
      throw error;
    }
  }

  async navigateToSection(section: 'Пользователи' | 'Проекты' | 'Роли') {
    // Открываем меню через конкретную кнопку внутри complementary
    await this.page.getByRole('complementary').getByRole('button').filter({ hasText: /^$/ }).waitFor({state: 'visible'});
    await this.page.getByRole('complementary').getByRole('button').filter({ hasText: /^$/ }).click();
    await this.page.getByRole('listitem').filter({ hasText: section }).click();
    await this.page.waitForLoadState('networkidle');
  }
} 