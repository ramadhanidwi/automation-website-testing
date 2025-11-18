exports.HomePage = 
class HomePage{
    constructor(page){
        this.page = page;
        this.cartLink = "//a[@class='shopping_cart_link']";
        this.addProductButton = (productName) =>`//div[contains(@class,'inventory_item')]
                                                [.//div[contains(@class,'inventory_item_name') and normalize-space(.)='${productName}']]
                                                //button[normalize-space(.)='Add to cart']`;
        this.listProduct = "(//div[@class='inventory_item_name '])";
        this.buttonInProductPage = "//button[@id='add-to-cart']";
        this.removeProductButton = (productName) => `//div[contains(@class,'inventory_item')]
                                                [.//div[contains(@class,'inventory_item_name') and normalize-space(.)='${productName}']]
                                                //button[normalize-space(.)='Remove']`;
        this.listProductInCart = "(//div[@class='inventory_item_name'])";
    }

    async addProductOnHomePage(productName){
        const names = Array.isArray(productName) ? productName : [productName];
        for(const name of names){
            const listOfProducts = await this.page.$$(this.listProduct);
            let found = false;
            for(const product of listOfProducts){
                if(await product.textContent() === name){
                    await this.page.locator(this.addProductButton(name)).click();
                    found = true;
                    break;
                }
            }
            if(!found){
                console.warn("Product " + productName + " not found");
            }
        }
    };

    async removeProductOnHomePage(productName){
        const names = Array.isArray(productName) ? productName : [productName];
        for(const name of names){
            const listOfProducts = await this.page.$$(this.listProduct);
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

    async goToCartPage(productName){
        await this.page.locator(this.cartLink).click();
        await this.page.waitForTimeout(3000);
        const names = Array.isArray(productName) ? productName : [productName];
        let found = false;
        for(const name of names){
            const listOfProductsInCart = await this.page.$$(this.listProductInCart);
            for(const product of listOfProductsInCart){
                if(await product.textContent() === name){
                    found = true;
                    return true;
                }
            }
            if(!found){
                console.warn("Product " + productName + " not found");
                return false;
            }   
        }
    }
}