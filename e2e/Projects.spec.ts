import { test, expect } from "@playwright/test";
// import * as Utils from "./misc/misc.utils";
// import { readDataFromDatabase } from "./misc/sql.utils";
// import * as testData from './misc/testData.json' assert {type: "json"};
import PortalAuth from "@pom/PortalAuth.page.ts";
import PortalLeftMenu from "@pom/LeftMenu.page.ts";
import PortalProjectTeams from "@pom/ProjectList.page.ts";
import PortalProject from "@pom/Project.page.ts";
import PortalEmployees from "@pom/Employees.page.ts";


test.beforeEach(async ({ page }) => {
  const Portal = new PortalAuth(page);

  await test.step("Вход на портал", async () => {
    await Portal.auth()
  });
});


test("WEB-T309: Проектные команды. Отображение проектов", async ({ page }) => {
  const Projectlist = new PortalProjectTeams(page);
  const LeftMenu = new PortalLeftMenu(page);

  await test.step("Открыть проекты", async () => {
    await LeftMenu.openProjects();
  });

  await test.step("Проверка", async () => {
    expect(await Projectlist.isTextExists("Список проектов"));
    expect((await Projectlist.getAllProjectCards()).length).toBeGreaterThan(5);
  });
});


test("WEB-310: Проектные команды. Открытие страницы проекта", async ({ page }) => {
  const Projectlist = new PortalProjectTeams(page);
  const Project = new PortalProject(page);
  const LeftMenu = new PortalLeftMenu(page);

  await test.step("Открыть проекты", async () => {
    await LeftMenu.openProjects();
  });

  await test.step("Открыть проект", async () => {
    await Projectlist.openProject();
  });

  await test.step("Проверка", async () => {
    expect(await Project.isPageOpen()).toBe(true);
  });
});

