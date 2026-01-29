# automation-website-testing
Automation Website Testing Using Playwright. 
website used for testing :  https://www.saucedemo.com/ 


## Tech Stack 
- Programming Language : JavaScript (Node.js) 
- Automation Tool : Playwright 
- Build Tool : Node Package Manager (NPM)
- Browser : Chromium 


## Project Structure
/test → Contains Test Scenario   

/pages → Storing locators and actions (Page Object Model)

/playwright-report → Storing test result reports 

JenkinsFile → Jenkins Configuration

playwrigt.config.js → global Playwright Configuration

## How To Run 
The test can be run using the command: 
```bash
npx playwright tests test/{Scenario Test Name}
```