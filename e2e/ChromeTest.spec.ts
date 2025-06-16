import { test, expect } from "@playwright/test";

test("Тестирование в Chrome", async ({ page }) => {
    // Шаг 1: Открытие браузера и переход на страницу
    await test.step("Открытие браузера", async () => {
        await page.goto("about:blank"); // Пустая страница для начала
        // Здесь мы будем добавлять следующие шаги
    });
}); 