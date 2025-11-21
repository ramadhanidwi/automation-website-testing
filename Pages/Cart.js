exports.Cart = 
class Cart{
    constructor(page){
        this.page = page;
        this.backToShopingButton = "//button[@id='continue-shopping']";
        this.checkoutButton = "//button[@id='checkout']";
        this.titleLocator = "//span[@class='title']";
        this.listProductInCart = "(//div[@class='inventory_item_name'])";
        this.removeProductButton = (productName) => `//div[contains(@class,'inventory_item')]
                                                [.//div[contains(@class,'inventory_item_name') and normalize-space(.)='${productName}']]
                                                //button[normalize-space(.)='Remove']`;
        this.cartLink = "//a[@class='shopping_cart_link']";
        this.firstNameInput = "//input[@id='first-name']";
        this.lastNameInput = "//input[@id='last-name']";
        this.postalCodeInput = "//input[@id='postal-code']";
        this.continueButton = "//input[@id='continue']";
        this.cancelButton = "//button[@id='cancel']";
        // this.checkInformationTitle = "//span[@class='title']";
        // this.overviewTitle = "//span[@class='title']";
        this.finishButton = "//button[@id='finish']";
        this.letterCompleteTitle = "//h2[normalize-space()='Thank you for your order!']";
        this.backToHomeButton = "//button[@id='back-to-products']";
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

    async checkProductInCart(productName){
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

};