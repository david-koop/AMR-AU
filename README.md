# AMR Automation

AMR Automation is a project focused on performing sanity tests on a web application (site). The project utilizes industry-leading tools like Playwright, Allure, Node.js, and Jenkins to automate the tests and generate quality reports.

## Project Goal

The goal of this project is to perform sanity tests on a website to ensure that various contents, functions, and features of the website are working as expected. By using automation tools, we can perform the tests quickly and accurately.

The project includes the following tools:
- **Playwright**: For automated testing of the website.
- **Allure**: For generating quality reports after test execution.
- **Node.js**: The environment for running Playwright.
- **Jenkins**: For CI/CD automation.
- **Docker** (optional): You can use Docker for running the tests.

## System Requirements

Before you begin, ensure that you have the following dependencies:
- [Node.js](https://nodejs.org/) version 14 or higher.
- [Playwright](https://playwright.dev/) installed in the project.
- [Allure CLI](https://allure.qatools.ru/) for generating test reports.
- If you are using Jenkins, make sure Jenkins is installed and properly configured.

## Installation

Follow these steps to get started with the project:

1. **Clone the project**:
   ```bash
   git clone https://github.com/david-koop/AMR-Automation.git
   cd AMR-Automation

2. **Install dependencies**: Use NPM to install the required dependencies:
   ```bash
   npm install
   ```

3. **Set up the environment:** If needed, create an .env file in the root directory of the project. This file will be loaded by Jenkins before running the tests.

## Running the Tests

The tests are automatically run via Jenkins, but you can also run them manually using Playwright.
1. **Run the tests**: To run the tests, use the following command:
   
   ```bash
   npx playwright test <test-file>.spec.ts --reporter=allure-playwright
   ```
   For example, to run the login tests:
   ```bash
   npx playwright test LoginTest.spec.ts --reporter=allure-playwright
   ```
2. **Generate Allure Reports**: After running the tests, Allure reports will be generated in the allure-results directory. Use the following command to open the report:
   ```
   allure open
   ```


   
## Project Directory Structure

Here is the directory structure of the project:
```
C:.
├───.github
│   └───workflows
├───allure-report
├───allure-results
├───downloads
│   ├───allure-playwright
│   ├───playwright
├───playwright-report
├───src
│   ├───locators
│   ├───pages
│   ├───tests
│   └───utils
├───test-results
└───upload-files
```


## Contact
If you have any questions or suggestions, feel free to contact us via GitHub Issues or by email at Dudikoop@gmail.com.
