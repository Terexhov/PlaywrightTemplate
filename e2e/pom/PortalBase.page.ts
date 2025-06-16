import { expect, Page } from '@playwright/test';
import { EnvConfig } from '@utils/env.utils.ts';


export default class PortalBasePage {
    protected page: Page

    constructor(page: Page) {
        this.page = page;
    }
    
    public pageBody = () => this.page.locator('body')
    public someButton = (buttonText: string) => this.page.getByRole('button', { name: buttonText })
    public someText = (text: string) => this.page.getByText(text, {exact: false});
    private someButtonLike = (buttonText: string) => this.page.locator('button', { hasText: buttonText });
    public firstRowStatus = () => this.page.getByRole('row').nth(1).locator('xpath=//*[@data-field="statusActName"]');
    public allRowsStatus = () => this.page.getByRole('row').locator('xpath=//*[@data-field="statusActName"]').all();


    async openBasePage() {
        await this.page.goto(EnvConfig.getSiteURL());
    }
    
    async clickButton(button_text: string) {
        await this.page.waitForTimeout(2000);
        const button = this.someButton(button_text);
        await expect(button).toBeEnabled();
        await button.click();
    }

    async clickButtonFirst(button_text: string) {
        const button = this.someButton(button_text).first();
        await expect(button).toBeEnabled();
        await button.click();
    }

    async clickButtonLike(button_text: string) {
        const button = this.someButtonLike(button_text);
        await expect(button).toBeEnabled();
        await button.click();
    }

    async isButtonExists(button_text: string) {
        let result;
        try {
            result = await this.someButton(button_text).isEnabled();
        } catch {
            result = false
        }
        return result
    }

    async isTextExists(text: string): Promise<boolean> {
        try {
            const element = this.someText(text).first();
            return await element.isEnabled();
        } catch {
            return false;
        }
    }

    async isTextVisible(text: string): Promise<boolean> {
        try {
            const element = this.someText(text).first();
            await element.waitFor({state: "visible", timeout: 4000});
            return await element.isVisible();
        } catch {
            return false;
        }
    }

    async isNewTabHasOpened(tabName?: string) {
        try {
            await this.page.waitForTimeout(5000);
            const pages = this.page.context().pages();
            const mapPage = pages[pages.length - 1];
            await mapPage.waitForLoadState();
            await mapPage.bringToFront();

            if (tabName) {
                expect(await mapPage.title()).toContain(tabName)
            }

            return true;
        } catch {
            return false;
        }
    }    

    async clickByCoord(x?: number, y?: number) {
        const viewportSize = this.page.viewportSize();
        if (!viewportSize) {
            throw new Error("Не удалось определить координаты для клика");
        }

        if (x === undefined) x = viewportSize.width / 2;
        if (y === undefined) y = viewportSize.height / 2;
        await this.page.mouse.click(x, y);
        console.log(`Выполнен клик по координатам ${x}:${y}`);
    }
}
