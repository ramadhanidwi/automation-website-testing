import {test,expect} from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
import { HomePage } from '../../Pages/HomePage';
import { ProductPage } from '../../Pages/ProductPage';

let page;
test.beforeEach(async({browser})=>{
    page = await browser.newPage();
    const login = new LoginPage(page);
    await login.gotoLoginPage();
    await login.login('standard_user', 'secret_sauce');
});

test('Add Product Success (Add Product-P-1)', async()=> {
    const homePage = new HomePage(page);
    await homePage.addProductOnHomePage('Sauce Labs Backpack');
    expect(await homePage.goToCartPage('Sauce Labs Backpack')).toBeTruthy();
});

test('Add Product Success (Add Product-P-2)', async()=>{
    const homePage = new HomePage(page);
    const productsToAdd = ['Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];
    await homePage.addProductOnHomePage(productsToAdd);
    for(const product of productsToAdd){
        expect(await homePage.goToCartPage(product)).toBeTruthy();
    }
});

test('Add Product Success (Add Product-P-3)', async()=>{
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const productsToAdd = ['Sauce Labs Onesie','Test.allTheThings() T-Shirt (Red)'];
    await productPage.goToProductPage(productsToAdd);
    for(const product of productsToAdd){
        expect(await homePage.goToCartPage(product)).toBeTruthy();
    }
});


test.afterEach(async()=>{
    await page.locator("//button[@id='react-burger-menu-btn']").click();
    await page.locator("//a[@id='logout_sidebar_link']").click();
    await page.close();
});