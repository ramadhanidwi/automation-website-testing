import {test,expect} from '@playwright/test';
import { HomePage } from '../../Pages/HomePage';
import { Cart } from '../../Pages/Cart';
import { LoginPage } from '../../Pages/LoginPage';

//locator
const errorMessage = "h3[data-test='error']";

let page;
test.beforeEach(async({browser})=>{
    page = await browser.newPage();
    const login = new LoginPage(page);
    await login.gotoLoginPage();
    await login.login('standard_user', 'secret_sauce');
});

test('Checkout Product Success (Checkout Product-P-1)', async()=> {
    const homePage = new HomePage(page);
    const cartPage = new Cart(page);
    const productsToAdd = ['Sauce Labs Backpack', 'Sauce Labs Fleece Jacket'];
    //first, add to cart and check products in cart
    await homePage.addProductOnHomePage(productsToAdd);
    await homePage.goToCartPage();
    for(const product of productsToAdd){
        expect(await cartPage.checkProductInCart(product)).toBeTruthy();
    }
    await cartPage.goToCheckoutPage();
    //expect(await this.page.locator(this.titleLocator).textContent()).toBe('Checkout: Your Information');
    await cartPage.checkOutProduct('John', 'Doe', '12345');
    await cartPage.goToOverviewPage();
    //expect(await this.page.locator(this.titleLocator).textContent()).toBe('Checkout: Overview');
    for(const product of productsToAdd){
        expect(await cartPage.checkProductsInOverview(product)).toBeTruthy();
    }
    //expect(await cartPage.overviewProducts(productsToAdd)).toBe('Total: $' + totalPrice.toFixed(2));
    await cartPage.completeOrder();
    //expect(await this.page.locator(this.titleLocator).textContent()).toBe('Checkout: Complete!');
    //expect(await this.page.locator(this.letterCompleteTitle).textContent()).toBe('Thank you for your order!');
});

test('Checkout Product Failed (Checkout Product-N-1)', async()=>{
    const homePage = new HomePage(page);
    const cartPage = new Cart(page);
    const productsToAdd = ['Sauce Labs Backpack', 'Sauce Labs Fleece Jacket'];
    await homePage.addProductOnHomePage(productsToAdd);
    await homePage.goToCartPage();
    for(const product of productsToAdd){
        expect(await cartPage.checkProductInCart(product)).toBeTruthy();
    }
    await cartPage.goToCheckoutPage();
    await cartPage.checkOutProduct('John', '','');
    expect(await page.locator(errorMessage)).toBeVisible();
    expect(await page.locator(errorMessage).textContent()).toBe('Error: Last Name is required)');
});

test('Checkout Product Failed (Checkout Product-N-2)', async()=>{
    const homePage = new HomePage(page);
    const cartPage = new Cart(page);
    const productsToAdd = ['Sauce Labs Backpack', 'Sauce Labs Fleece Jacket'];
    await homePage.addProductOnHomePage(productsToAdd);
    await homePage.goToCartPage();
    for(const product of productsToAdd){
        expect(await cartPage.checkProductInCart(product)).toBeTruthy();
    }
    await cartPage.goToCheckoutPage();
    await cartPage.checkOutProduct('', 'Doe','');
    expect(await page.locator(errorMessage)).toBeVisible();
    expect(await page.locator(errorMessage).textContent()).toBe('Error: First Name is required)');
});

test('Checkout Product Failed (Checkout Product-N-3)', async()=>{
    const homePage = new HomePage(page);
    const cartPage = new Cart(page);
    const productsToAdd = ['Sauce Labs Backpack', 'Sauce Labs Fleece Jacket'];
    await homePage.addProductOnHomePage(productsToAdd);
    await homePage.goToCartPage();
    for(const product of productsToAdd){
        expect(await cartPage.checkProductInCart(product)).toBeTruthy();
    }
    await cartPage.goToCheckoutPage();
    await cartPage.checkOutProduct('', '','12345');
    expect(await page.locator(errorMessage)).toBeVisible();
    expect(await page.locator(errorMessage).textContent()).toBe('Error: First Name is required)');
});

test('Checkout Product Failed (Checkout Product-N-4)', async()=>{
    const homePage = new HomePage(page);
    const cartPage = new Cart(page);
    const productsToAdd = ['Sauce Labs Backpack', 'Sauce Labs Fleece Jacket'];
    await homePage.addProductOnHomePage(productsToAdd);
    await homePage.goToCartPage();
    for(const product of productsToAdd){
        expect(await cartPage.checkProductInCart(product)).toBeTruthy();
    }
    await cartPage.goToCheckoutPage();
    await cartPage.checkOutProduct('John', 'Doe','');
    expect(await page.locator(errorMessage)).toBeVisible();
    expect(await page.locator(errorMessage).textContent()).toBe('Error: Postal Code is required)');
});

test('Checkout Product Failed (Checkout Product-N-5)', async()=>{
    const homePage = new HomePage(page);
    const cartPage = new Cart(page);
    const productsToAdd = ['Sauce Labs Backpack', 'Sauce Labs Fleece Jacket'];
    await homePage.addProductOnHomePage(productsToAdd);
    await homePage.goToCartPage();
    for(const product of productsToAdd){
        expect(await cartPage.checkProductInCart(product)).toBeTruthy();
    }
    await cartPage.goToCheckoutPage();
    await cartPage.checkOutProduct('John', '','12345');
    expect(await page.locator(errorMessage)).toBeVisible();
    expect(await page.locator(errorMessage).textContent()).toBe('Error: Last Name is required)');
});

test('Checkout Product Failed (Checkout Product-N-6)', async()=>{
    const homePage = new HomePage(page);
    const cartPage = new Cart(page);
    const productsToAdd = ['Sauce Labs Backpack', 'Sauce Labs Fleece Jacket'];
    await homePage.addProductOnHomePage(productsToAdd);
    await homePage.goToCartPage();
    for(const product of productsToAdd){
        expect(await cartPage.checkProductInCart(product)).toBeTruthy();
    }
    await cartPage.goToCheckoutPage();
    await cartPage.checkOutProduct('John', '','12345');
    expect(await page.locator(errorMessage)).toBeVisible();
    expect(await page.locator(errorMessage).textContent()).toBe('Error: Last Name is required)');
});

test('Checkout Product Abnormal (Checkout Product-A-1)', async()=>{
    const homePage = new HomePage(page);
    const cartPage = new Cart(page);
    const productsToAdd = ['Sauce Labs Backpack', 'Sauce Labs Fleece Jacket'];
    await homePage.addProductOnHomePage(productsToAdd);
    await homePage.goToCartPage();
    for(const product of productsToAdd){
        expect(await cartPage.checkProductInCart(product)).toBeFalsy();
    }
    await cartPage.goToCheckoutPage();
    await cartPage.checkOutProduct('John', 'Doe','12345');
    await cartPage.goToOverviewPage();
    for(const product of productsToAdd){
        expect(await cartPage.checkProductsInOverview(product)).toBeFalsy();
    }
    await cartPage.completeOrder();
});

test.afterEach(async()=>{
    await page.locator("//button[@id='react-burger-menu-btn']").click();
    await page.locator("//a[@id='logout_sidebar_link']").click();
    await page.close();
});