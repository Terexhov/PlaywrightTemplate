import { Page, expect } from '@playwright/test';
// import * as Utils from '../misc/misc.utils';
// import * as testData from '../misc/testData.json' assert {type: "json"};
import PortalBasePage from '@pom/PortalBase.page.ts';


export default class PortalEmployees extends PortalBasePage {

    constructor(page: Page) {
        super(page);
    }

    private expandDepartmentButton = (name: string) => this.page.locator(".ui-accordion__item").filter({ hasText: name })
    private collapseDepartmentButton = (name: string) => this.page.locator(".ui-accordion__item").filter({ hasText: name }).locator(".ui-accordion__caption.spoiler-caption.active")
    private profileButton = (name: string) => this.page.locator(".ui-accordion__item-child").filter({ hasText: name }).locator(".ui-accordion__item-image")
    private locationButton = (name: string) => this.page.locator(".ui-accordion__item-child").filter({ hasText: name }).getByRole('link', { name: 'Рабочее место' })
    private viewStructure = (name: string) => this.page.locator(".page-toolbar").getByRole('link', { name: name })
    private searchField = () => this.page.locator(".ui-search__input")
    private searchResultItems = () => this.page.locator("[class*='ui-search__item']").all()
    private departmentLaw = () => this.page.getByRole('link', { name: 'Скачать положение' });


    async openFirstProfile() {
        await this.openDepartment("Руководство Компании");
        await this.openProfile("Дарья Клюева");
    }

    async openProfile(name: string) {
        await this.profileButton(name).click();
    }

    async openLocation(name: string) {
        await this.page.waitForTimeout(2000);
        await this.locationButton(name).click();

        const pages = this.page.context().pages();
        const lastPage = pages[pages.length - 1];
        await lastPage.bringToFront();
    }

    async openDepartment(name: string) {
        await this.page.waitForTimeout(2000);
        const dep = this.expandDepartmentButton(name);
        await dep.click();
    }

    async collapseDepartment(name: string) {
        await this.page.waitForTimeout(2000);
        const dep = this.collapseDepartmentButton(name);
        await dep.click();
    }

    async setView(name: "Структура" | "Список" | "Схема") {
        await this.viewStructure(name).click();
    }

    async isCurrentView(name: "Структура" | "Список" | "Схема") {
        try {
            switch (name) {
                case "Структура": {
                    expect(await this.isTextExists("Структура компании")).toBe(true);
                    return true;
                };

                case "Список": {
                    expect(await this.isTextExists("Поиск сотрудника")).toBe(true);
                    expect(await this.isTextExists("Структура компании")).toBe(false);
                    return true;
                };

                case "Схема": {
                    expect(await this.isTextExists("Организационная структура")).toBe(true);
                    await expect(this.page.locator("#bx_visual_structure")).toBeAttached();
                    return true;
                };

                default:
                    return false;
            }
        } catch {
            return false;
        }
    }

    async getDepartments(): Promise<string[]> {
        const deps = await this.page.locator(".ui-accordion__item").all();
        let result = [];

        for (const dep of deps) {
            const text = await dep.innerText();
            result.push(text.split("\n")[0]);
        }
        return result.sort();
    }

    async getAllDivisions() {
        const deps = await this.page.locator(".ui-accordion__item-title").all();
        let result = [];

        for (const dep of deps) {
            const text = await dep.innerText();
            result.push(text.split("\n")[0]);
        }
        return result.sort();
    }

    async getEmployeesNumber() {
        const deps = await this.page.locator(".ui-accordion__item").all();
        let result = [];

        for (const dep of deps) {
            const text = await dep.innerText();
            const [departmentName, employeeNumberText = ""] = text.split("\n");
            const employeeNumber = employeeNumberText.match(/\d+/)?.[0] || "";

            result.push({ departmentName, employeeNumber });
        }

        return result;
    }

    async getEmployeesOnVacation() {
        try {
            const result = await this.page.getByText("В отпуске").all();
            return result
        } catch {
            return [];
        }
    }

    async search(name: string) {
        await this.searchField().fill(name);
    }

    async clearSearch() {
        await this.searchField().clear();
    }

    async getSearchResult() {
        try {
            const result = await this.searchResultItems();
            return result
        } catch {
            return [];
        }
    }

    async downloadStatement() {
        const [newPage] = await Promise.all([
            this.page.waitForEvent("download"),
            await this.departmentLaw().click()
        ]);

        expect(newPage).toBeDefined();
    }
}
