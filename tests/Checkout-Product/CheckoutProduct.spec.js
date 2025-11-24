import {test,expect} from '@playwright/test';
import { HomePage } from '../../Pages/HomePage';
import { Cart } from '../../Pages/Cart';
import { LoginPage } from '../../Pages/LoginPage';


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

test.afterEach(async()=>{
    await page.locator("//button[@id='react-burger-menu-btn']").click();
    await page.locator("//a[@id='logout_sidebar_link']").click();
    await page.close();
});