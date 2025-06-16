import { test, expect } from "@playwright/test";
import PortalAuth from "@pom/PortalAuth.page.ts";
import PortalLeftMenu from "@pom/LeftMenu.page.ts";
import PortalSearch from "@pom/Search.page.ts";

test.beforeEach(async ({ page }) => {
  const Portal = new PortalAuth(page);

  await test.step("Вход на портал", async () => {
    await Portal.auth()
  });
});

test("WEB-T400: Поиск. Проверка функциональности поиска", async ({ page }) => {
  const Search = new PortalSearch(page);
  const LeftMenu = new PortalLeftMenu(page);

  await test.step("Открыть поиск", async () => {
    await LeftMenu.openSearch();
  });

  await test.step("Выполнить поиск", async () => {
    await Search.performSearch("тестовый запрос");
  });

  await test.step("Проверка результатов", async () => {
    expect(await Search.isSearchResultsVisible()).toBe(true);
    expect((await Search.getSearchResults()).length).toBeGreaterThan(0);
  });
});

test("WEB-T401: Поиск. Проверка фильтрации результатов", async ({ page }) => {
  const Search = new PortalSearch(page);
  const LeftMenu = new PortalLeftMenu(page);

  await test.step("Открыть поиск", async () => {
    await LeftMenu.openSearch();
  });

  await test.step("Выполнить поиск с фильтром", async () => {
    await Search.performSearch("тестовый запрос");
    await Search.applyFilter("Проекты");
  });

  await test.step("Проверка отфильтрованных результатов", async () => {
    expect(await Search.isFilterApplied("Проекты")).toBe(true);
    expect(await Search.getFilteredResults("Проекты").length).toBeGreaterThan(0);
  });
}); 