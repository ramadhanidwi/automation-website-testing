import {test,expect} from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
//locator 
const errorMessage = "h3[data-test='error']";

test('Login Success (Login-P-1)', async({page})=>{
    const login = new LoginPage(page);
    await login.gotoLoginPage();
    await login.login('standard_user','secret_sauce');
    expect(page).toHaveTitle('Swag Labs')
    await page.waitForTimeout(3000);
})

test('Login Failed (Login-N-1)', async({page})=>{
    const login = new LoginPage(page);
    await login.gotoLoginPage();
    await login.login('standard_user','secret_service');
    expect(await page.locator(errorMessage)).toBeVisible();
    expect(await page.locator(errorMessage).textContent()).toBe('Epic sadface: Username and password do not match any user in this service')
    await page.waitForTimeout(3000);
});

test('Login Failed (Login-N-2)', async({page})=>{
    const login = new LoginPage(page);
    await login.gotoLoginPage();
    await login.login('anomali_user','secret_sauce');
    expect(await page.locator(errorMessage)).toBeVisible();
    expect(await page.locator(errorMessage).textContent()).toBe('Epic sadface: Username and password do not match any user in this service')
    await page.waitForTimeout(3000);
});

test('Login Abnormal (Login-A-1)', async({page})=>{
    const login = new LoginPage(page);
    await login.gotoLoginPage();
    await login.login('standard_user','');
    expect(await page.locator(errorMessage)).toBeVisible();
    expect(await page.locator(errorMessage).textContent()).toBe('Epic sadface: Password is required')
    await page.waitForTimeout(3000);
});

test('Login Abnormal (Login-A-2)', async({page})=>{
    const login = new LoginPage(page);
    await login.gotoLoginPage();
    await login.login('','secret_sauce');
    expect(await page.locator(errorMessage)).toBeVisible();
    expect(await page.locator(errorMessage).textContent()).toBe('Epic sadface: Username is required')
    await page.waitForTimeout(3000);
});