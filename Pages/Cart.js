exports.Cart = 
class Cart{
    constructor(page){
        this.page = page;
        this.backToShoppingButton = "//button[@id='continue-shopping']";
        this.checkoutButton = "//button[@id='checkout']";
        this.titleLocator = "//span[@class='title']";
        this.listProductInCart = "(//div[@class='inventory_item_name'])";
        this.removeProductButton = (productName) => `//div[contains(@class,'inventory_item')]
                                                [.//div[contains(@class,'inventory_item_name') and normalize-space(.)='${productName}']]
                                                //button[normalize-space(.)='Remove']`;
        this.priceLocator = (productName) => `//div[contains(@class,'cart_item')]
                                                [.//div[contains(@class,'inventory_item_name') and normalize-space(.)='${productName}']]
                                                //div[@class='inventory_item_price'][1]`
        this.totalPriceLabel = "//div[@class='summary_total_label'][1]";
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

    async goToCheckoutPage(){
        await this.page.locator(this.checkoutButton).click();
        await this.page.waitForTimeout(3000);
    }

    async checkOutProduct(firstName, lastName, postalCode){
        await this.page.locator(this.firstNameInput).fill(firstName);
        await this.page.locator(this.lastNameInput).fill(lastName);
        await this.page.locator(this.postalCodeInput).fill(postalCode);
    }

    async goToOverviewPage(){
        await this.page.locator(this.continueButton).click();
        await this.page.waitForTimeout(3000);
    }

    async checkProductsInOverview(productName){
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

    async checkTotalPrice(productName){
        const names = Array.isArray(productName) ? productName : [productName];
        let found = false;
        let taxPrice = 3.20; //biaya pajak tetap
        let totalPrice = 0
        for(const name of names){
            const listOfProductsInCart = await this.page.$$(this.listProductInCart);
            const priceText = await this.page.locator(this.priceLocator(name)).innerText();
            const price = parseFloat(priceText.replace(/[^\d.]/g, '')); // buang simbol non-digit/non-titik, lalu ubah ke number
            for(const product of listOfProductsInCart){
                if(await product.textContent() === name){
                    totalPrice += price;
                    found = true;
                    return true;
                }
            }
            if(!found){
                console.warn("Product " + productName + " not found");
                return false;
            }   
        }
        return totalPrice += taxPrice;
    };

    async completeOrder(){
        await this.page.locator(this.finishButton).click();
    };

    async continueShopping(){
        await this.page.locator(this.backToShoppingButton).click();
    }
};