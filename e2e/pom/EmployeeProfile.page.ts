import { Page } from '@playwright/test';
// import * as Utils from '../misc/misc.utils';
// import * as testData from '../misc/testData.json' assert {type: "json"};
import PortalBasePage from '@pom/PortalBase.page.ts';


export default class PortalEmployeeProfile extends PortalBasePage {

    constructor(page: Page) {
        super(page);
    }

    private profileIframe = () => this.page.locator('iframe[class*="side-panel-iframe"]').contentFrame()
    
    async isPageOpen() {
        const el = this.profileIframe().getByText("Контактная информация");
        return await el.isEnabled();

    }
}
