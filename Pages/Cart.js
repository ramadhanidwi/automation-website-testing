exports.Cart = 
class Cart{
    constructor(page){
        this.page = page;
        this.backToShopingButton = "//button[@id='continue-shopping']";
        this.checkoutButton = "//button[@id='checkout']";
        this.titleCartPage = "//span[@class='title']";
        this.listProductInCart = "(//div[@class='inventory_item_name'])";
        this.removeProductButton = (productName) => `//div[text()='${productName}']/following-sibling::div/button`;
        this.cartLink = "//a[@class='shopping_cart_link']";
    }

    async goToCartPage(){
        await this.page.locator(this.cartLink).click();
    }



};