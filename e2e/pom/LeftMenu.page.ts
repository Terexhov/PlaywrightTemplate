import { Page } from '@playwright/test';
// import { EnvConfig } from '../misc/env.utils';
import PortalBasePage from '@pom/PortalBase.page.ts';


export default class PortalLeftMenu extends PortalBasePage {

    constructor(page: Page) {
        super(page);
    }

    async openProjects() {
        await this.page.getByRole('link', { name: 'П Проекты' }).click()
    }

    async openEmployeeList() {
        await this.page.getByRole('link', { name: 'СС Список сотрудников' }).click()
    }

    async openSearch() {
        await this.page.getByRole('button', { name: 'Поиск' }).click()
    }
}