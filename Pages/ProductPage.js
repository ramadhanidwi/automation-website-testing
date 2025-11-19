exports.ProductPage = 
class ProductPage{
    constructor(page) {
        this.page = page; 
        this.addToCartButton = "//button[@id='add-to-cart']";
        this.removeButton = "//button[@id='remove']";
        this.backToProductsButton = "//button[@id='back-to-products']";
        this.listProduct = "(//div[@class='inventory_item_name '])";
    };

    async goToProductPage(productName){
        const names = Array.isArray(productName) ? productName : [productName];
        for(const name of names){
            const listOfProducts = await this.page.$$(this.listProduct);
            let found = false;
            for(const product of listOfProducts){
                if(await product.textContent() === name){
                    await product.click();
                    await this.page.locator(this.addToCartButton).click();
                    await this.page.locator(this.backToProductsButton).click();
                    found = true;
                    break;
                }
            }
            if(!found){
                console.warn("Product " + productName + " not found");
            }
        }
    };

    async removeProductOnProductPage(productName){
        const names = Array.isArray(productName) ? productName : [productName];
        for(const name of names){
            const listOfProducts = await this.page.$$(this.listProduct);
            let found = false;
            for(const product of listOfProducts){
                if(await product.textContent() === name){
                    await product.click();
                    await this.page.locator(this.removeButton).click();
                    await this.page.locator(this.backToProductsButton).click();
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