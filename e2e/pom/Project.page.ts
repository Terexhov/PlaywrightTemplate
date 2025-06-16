import { Page } from '@playwright/test';
// import * as Utils from '../misc/misc.utils';
// import * as testData from '../misc/testData.json' assert {type: "json"};
import PortalBasePage from '@pom/PortalBase.page.ts';


export default class PortalProject extends PortalBasePage {

    constructor(page: Page) {
        super(page);
    }

    private expandDepartmentButton = (name: string) => 
        this.page.locator(".ui-accordion-group")
        .filter({ hasText: name })
        .locator(".ui-accordion__item-trigger-icon")
        .first();
    private portalLink = () => this.page.getByRole('link', { name: 'Портал продукта', exact: true })
    private siteLink = () => this.page.getByRole('link', { name: 'Сайт проекта', exact: true })
    private tooltip = () => this.page.getByRole('heading', { name: 'Рабочая группа' }).getByRole('img')
    private profile = () => this.page.locator("[full_name]")


    async isPageOpen() {
        return await this.page.getByText('Проектная команда').isEnabled();
    }

    async openDepartment(name: string) {
        await this.page.waitForTimeout(2000);
        const dep = this.expandDepartmentButton(name);
        await dep.click();
    }

    async openProjectPortal() {
        await this.portalLink().click();
    }

    async openProjectSite() {
        await this.siteLink().click();
    }

    async hoverTooltip() {
        await this.tooltip().hover();
    }

    async getEmployees() {
        try {
            const result = await this.profile().all();
            return result
        } catch {
            return [];
        }
    }
  
}