import { Page } from '@playwright/test';
// import * as Utils from '../misc/misc.utils';
// import * as testData from '../misc/testData.json' assert {type: "json"};
import PortalBasePage from '@pom/PortalBase.page.ts';


export default class PortalProjectTeams extends PortalBasePage {

    constructor(page: Page) {
        super(page);
    }

    private projectCard = () => this.page.locator(".projects-card-item")
    private projectCardByName = (name: string) => this.page.locator(".projects-card-item").filter({hasText: name})
    private projectCardLink = () => this.page.locator(".projects-card-item").first().locator(".projects-card-item__caption").first();
    private projectCardLinkByName = (name: string) => this.page.locator(".projects-card-item").filter({hasText: name}).locator(".projects-card-item__caption")


    async isPageOpen(): Promise<boolean> {
        return await this.page.getByText('Новый акт осмотра').isEnabled();
    }

    async getAllProjectCards() {
        try {
            const result = this.projectCard().all();
            return result
        } catch {
            return [];
        }
    }

    async openProject(name?: string) {
        if (name) {
            await this.projectCardLinkByName(name).click();
        } else {
            await this.projectCardLink().click();
        }
    }
}
