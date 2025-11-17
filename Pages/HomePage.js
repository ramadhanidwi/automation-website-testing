exports.HomePage = 
class HomePage{
    constructor(page){
        this.page = page;
        this.cartLink = "//a[@class='shopping_cart_link']";
        this.addProductButton = (productName) => `//div[text()='${productName}']/following-sibling::div/button`
        this.listProduct = "(//div[@class='inventory_item_name '])";
        this.buttonInProductPage = "//button[@id='add-to-cart']";
        this.backToShopingButton = "//button[@id='continue-shopping']";
    }

    async addProductOnHomePage(productName){
        const names = Array.isArray(productName) ? productName : [productName];
        for(const name of names){
            const listOfProducts = await this.page.$$(this.listProduct);
            let found = false;
            for(product of listOfProducts){
                if(await product.textContent() === productName){
                    await this.page.locator(this.addProductButton(productName)).click();
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
            for(product of listOfProducts){
                if(await product.textContent() === productName){
                    await this.page.locator(this.addProductButton(productName)).click();
                    found = true;
                    break;
                }
            }
            if(!found){
                console.warn("Product " + productName + " not found");
            }
        }
    };
}