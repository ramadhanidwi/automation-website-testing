import {test,expect} from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
import { HomePage } from '../../Pages/HomePage';

let page;
test.beforeEach(async({browser})=>{
    page = await browser.newPage();
    const login = new LoginPage(page);
    await login.gotoLoginPage();
    await login.login('standard_user', 'secret_sauce');
});

test('Remove Product Success (Add Product-P-3)', async()=>{
    const homePage = new HomePage(page);
    const productsToAdd = ['Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];
    await homePage.addProductButton(productsToAdd);
    await homePage.removeProductButton(productsToAdd);
    for(const product of productsToAdd){
        expect(await homePage.goToCartPage(product)).toBeFalsy();
    }
});

test.afterEach(async()=>{
    await page.locator("//button[@id='react-burger-menu-btn']").click();
    await page.locator("//a[@id='logout_sidebar_link']").click();
    await page.close();
});