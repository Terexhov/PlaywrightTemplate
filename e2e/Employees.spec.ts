import { test, expect } from "@playwright/test";
// import * as testData from './misc/testData.json' assert {type: "json"};
import PortalEmployees from "@pom/Employees.page.ts";
import PortalAuth from "@pom/PortalAuth.page.ts";
import PortalLeftMenu from "@pom/LeftMenu.page.ts";
import PortalEmployeeProfile from "@pom/EmployeeProfile.page.ts";
import ClientSQL from "@utils/sql.utils.ts";


test.beforeEach(async ({ page }) => {
  const Portal = new PortalAuth(page);

  await test.step("Вход на портал", async () => {
    await Portal.auth();
  });
});


test("WEB-362: Список сотрудников. Отображение структуры сотрудников", async ({ page }) => {
  const Employees = new PortalEmployees(page);
  const LeftMenu = new PortalLeftMenu(page);

  await test.step("Открыть список сотрудников", async () => {
    await LeftMenu.openEmployeeList();
  });

  await test.step("Выбор отображения", async () => {
    await Employees.setView("Структура");
  });

  await test.step("Проверка", async () => {
    expect(await Employees.isCurrentView("Структура")).toBe(true)
  });
});


test("WEB-361: Список сотрудников. Отображение списка сотрудников", async ({ page }) => {
  const Employees = new PortalEmployees(page);
  const LeftMenu = new PortalLeftMenu(page);

  await test.step("Открыть список сотрудников", async () => {
    await LeftMenu.openEmployeeList();
  });

  await test.step("Выбор отображения", async () => {
    await Employees.setView("Список");
  });

  await test.step("Проверка", async () => {
    expect(await Employees.isCurrentView("Список")).toBe(true)
  });
});

