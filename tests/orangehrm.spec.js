import { test, expect } from '@playwright/test';

test.describe('Automação OrangeHRM - Módulo Admin e PIM', () => {

  test.beforeEach(async ({ page }) => {
    // Acessa a página inicial e realiza o login antes de cada teste
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Valida que o usuário entrou na página do Dashboard
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('Deve cadastrar um novo funcionário no módulo PIM com sucesso', async ({ page }) => {
    // Navega até o módulo PIM
    await page.getByRole('link', { name: 'PIM' }).click();

    // Clica no botão Add
    await page.getByRole('button', { name: 'Add' }).click();

    // Preenche os dados do funcionário
    await page.getByPlaceholder('First Name').fill('Barbara');
    await page.getByPlaceholder('Last Name').fill('QA');

    // Clica em Salvar
    await page.getByRole('button', { name: 'Save' }).click();

    // Valida mensagem de sucesso ou redirecionamento para o perfil do funcionário
    await expect(page.getByRole('heading', { name: 'Barbara QA' })).toBeVisible({ timeout: 10000 });
  });

  test('Deve realizar o logout do sistema', async ({ page }) => {
    // Clica no menu do usuário e realiza o logout
    await page.locator('.oxd-userdropdown-tab').click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();

    // Valida se voltou para a tela de login
    await expect(page.getByPlaceholder('Username')).toBeVisible();
  });

});