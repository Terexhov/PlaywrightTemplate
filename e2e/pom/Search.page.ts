import { Page } from "@playwright/test";
import PortalBase from "./PortalBase.page";

export default class PortalSearch extends PortalBase {
    constructor(page: Page) {
        super(page);
    }

    async performSearch(searchQuery: string) {
        await this.page.fill('[data-testid="search-input"]', searchQuery);
        await this.page.press('[data-testid="search-input"]', 'Enter');
    }

    async isSearchResultsVisible() {
        return await this.page.isVisible('[data-testid="search-results"]');
    }

    async getSearchResults() {
        return await this.page.$$('[data-testid="search-result-item"]');
    }

    async applyFilter(filterName: string) {
        await this.page.click(`[data-testid="filter-${filterName}"]`);
    }

    async isFilterApplied(filterName: string) {
        const filterElement = await this.page.$(`[data-testid="filter-${filterName}"]`);
        return await filterElement?.getAttribute('aria-selected') === 'true';
    }

    async getFilteredResults(filterType: string) {
        return await this.page.$$(`[data-testid="search-result-item"][data-type="${filterType}"]`);
    }
} 