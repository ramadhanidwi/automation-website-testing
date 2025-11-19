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

    async removeProductInCart(productName){
        const names = Array.isArray(productName) ? productName : [productName];
        for(const name of names){
            const listOfProducts = await this.page.$$(this.listProductInCart);
            let found = false;
            for(const product of listOfProducts){
                if(await product.textContent() === name){
                    await this.page.locator(this.removeProductButton(name)).click();
                    found = true;
                    break;
                }
            }
            if(!found){
                console.warn("Product " + productName + " not found");
            }
        }
    };



};