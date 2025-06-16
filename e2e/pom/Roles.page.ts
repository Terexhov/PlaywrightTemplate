import { Page, expect } from '@playwright/test';
import PortalBasePage from '@pom/PortalBase.page.ts';

export default class PortalRoles extends PortalBasePage {
    constructor(page: Page) {
        super(page);
    }

    // Locators
    private createRoleButton = () => this.page.getByRole('complementary').getByRole('button', { name: 'Добавить' });
    private roleNameInput = () => this.page.getByPlaceholder('Введите название роли');
    private roleDescriptionInput = () => this.page.getByPlaceholder('Введите описание роли');
    private saveButton = () => this.page.getByRole('button', { name: 'Сохранить' });
    private cancelButton = () => this.page.getByRole('button', { name: 'Отмена' });
    private roleRow = (roleName: string) => this.page.getByRole('row').filter({ hasText: roleName });
    private deleteRoleButton = (roleName: string) => this.roleRow(roleName).getByRole('button', { name: 'Удалить' });
    private confirmDeleteButton = () => this.page.getByRole('button', { name: 'Да, удалить' });

    // Actions
    async navigateToRoles() {
        await this.page.getByRole('button').filter({ hasText: /^$/ }).waitFor({state: 'visible'});
        await this.page.getByRole('button').filter({ hasText: /^$/ }).click();
        await this.page.getByRole('listitem').filter({ hasText: 'Роли' }).click();
        await this.page.waitForLoadState('networkidle');
    }

    async createRole(name: string, description: string) {
        await this.createRoleButton().click();
        await this.page.waitForLoadState('networkidle');
    }

    async deleteRole(roleName: string) {
        await this.deleteRoleButton(roleName).click();
        await this.confirmDeleteButton().click();
        await this.page.waitForLoadState('networkidle');
    }

    async isRoleExists(roleName: string): Promise<boolean> {
        try {
            await this.roleRow(roleName).waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }
} 