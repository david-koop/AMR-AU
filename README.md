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

Install dependencies: Use NPM to install the required dependencies:

npm install

Set up the environment: If needed, create an .env file in the root directory of the project. This file will be loaded by Jenkins before running the tests.

Directory Structure
Here's a general overview of the project directory:

C:.
├───allure-results
├───node_modules
├───src
│   ├───locators
│   ├───pages
│   ├───tests
│   └───utils
├───test-results
└───upload-files
