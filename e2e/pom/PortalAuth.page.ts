import { Page, expect } from '@playwright/test';
import { EnvConfig } from '@utils/env.utils.ts';
import PortalBasePage from '@pom/PortalBase.page.ts';

export default class PortalAuth extends PortalBasePage {
    constructor(page: Page) {
        super(page);
    }

    async auth() {
        try {
            await this.page.goto(EnvConfig.getSiteURL());
            console.log("Попытка входа");
            
            // Ждем загрузки страницы
            await this.page.waitForLoadState('domcontentloaded');
            
            // Проверяем, что мы на странице авторизации
            const currentUrl = this.page.url();
            console.log("Текущий URL:", currentUrl);
            
            // Ждем появления формы авторизации
            await this.page.waitForSelector('input[placeholder="Логин"]', { state: 'visible', timeout: 10000 });
            
            // Заполняем форму
            await this.page.getByPlaceholder("Логин").fill(EnvConfig.getUsername());
            await this.page.getByPlaceholder("Пароль").fill(EnvConfig.getPassword());
            
            // Проверяем, что кнопка входа активна
            const loginButton = this.page.getByRole('button', { name: 'Войти' });
            await loginButton.waitFor({ state: 'visible', timeout: 5000 });
            await loginButton.click();
            
            // Ждем завершения всех сетевых запросов
            await this.page.waitForLoadState('networkidle');
        } catch (error) {
            console.log("Не удалось выполнить вход в приложение.");
            console.log("Получен URL:", this.page.url());
            throw error;
        }

        await this.openBasePage();
        expect(await this.page.getByRole('link', { name: 'На главную страницу' }).isEnabled()).toBe(true);
    }   

    async logout() {
        await this.page.getByRole('banner').getByRole('button').filter({ hasText: /^$/ }).click();
        await this.page.getByRole('listitem').filter({ hasText: 'Выход' }).click();
        await this.page.getByRole('button', { name: 'Да, выйти' }).click();
        await this.page.waitForLoadState('networkidle');
    }
}
