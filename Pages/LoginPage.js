exports.LoginPage = 
class LoginPage{
    constructor(page){
        this.page = page;
        this.usernameBox = "//input[@id='user-name']";
        this.passwordBox = "//input[@id='password']";
        this.loginButton = "//input[@id='login-button']";
    }
    async gotoLoginPage(){
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(userName,password){
        await this.page.locator(this.usernameBox).fill(userName);
        await this.page.locator(this.passwordBox).fill(password);
        await this.page.locator(this.loginButton).click();
    }
}