
require('dotenv').config();

const { test, expect } = require('@playwright/test');

test('Открывается страница входа Music Rating', async ({ page }) => {
    await page.goto('http://localhost/MUSIC_site_portfolio/login.php');

    await expect(
        page.getByRole('heading', { name: 'Вход' })
    ).toBeVisible();
});


test('Ввод логина в форму авторизации', async ({ page }) => {
    await page.goto('http://localhost/MUSIC_site_portfolio/login.php');

    await page.getByPlaceholder('Имя пользователя').fill('qa_demo_user');

    await expect(
        page.getByPlaceholder('Имя пользователя')
    ).toHaveValue('qa_demo_user');
});


test('TC-008 — Успешная авторизация', async ({ page }) => {
    await page.goto('http://localhost/MUSIC_site_portfolio/login.php');

    await page.getByPlaceholder('Имя пользователя').fill(process.env.TEST_USERNAME);
    await page.getByPlaceholder('Пароль').fill(process.env.TEST_PASSWORD);

    await page.getByRole('button', { name: 'Войти' }).click();

    await expect(page).toHaveURL(
        'http://localhost/MUSIC_site_portfolio/index.php'
    );

    await expect(
        page.getByText(process.env.TEST_USERNAME, { exact: true })
    ).toBeVisible();
});
