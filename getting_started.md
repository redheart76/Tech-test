

\## Purpose

- Overview

This repository contains a comprehensive Playwright end-to-end testing framework integrated with Cucumber for Behavior-Driven Development (BDD) testing. The solution is designed to meet industry standards while promoting collaboration between technical and non-technical stakeholders.

Key benefits bu using Cucumber
- Enables non-technical stakeholders (product owners, business analysts) to understand and contribute to test scenarios.
- Feature files serve as always-up-to-date documentation.
- Documents system behavior in a format that's readable by humans and executable by computers.
- Encourages testing from the user's perspective.
- Reusability & Maintainability.
- Cross-Team Collaboration.
- Repository structure
  - Root directory
    - github
      - GHA config
      - settings for manually run tests on github
    - features
      - Cucumber feature files
    - reports
    - src
      - feature steps definition
      - hooks
      - utilities
      - config
      - test data 
- packages
- cucumber config
- playwright config
- Kudos

This repository is based on the [Cucumber-typescript-starter](https://github.com/hdorgeval/playwright-fluent-ts-cucumber7-starter) repo.

 What's inside
- Typescript setup for writing steps with eslint/typescript and prettier.
- Launching of Playwright browser before running all tests.
- Launching new context and page for each scenario.
- Running feature with video recording option.
- Report generated with last good image attached.
- Utilies function to help you with writing steps.
- - VScode configuration to debug a single feature or an only scenario (run when located on the feature file)


\## Getting the Latest Code

- Use VSC to clone the repo ‘https://github.com/redheart76/Tech-test.git’ to your local machine. 
- Install Playwright and Cucumber
  - Run ‘npm init playwright@latest’ in VSC terminal.
  - Run ‘npm install --save-dev @cucumber/cucumber’ in VSC terminal.
  - Run ‘npm I’ to install the necessary packages.

\## Setting Up the Environment

You don’t need to set up the environment locally.

\## Running the Tests

- To run your tests with a specified tag

npm run test -- --tags=@tag`, depending on which terminal you're using.

- To specify an environment to run your tests on.
  - Any of the above commands can be run with a suffix of `-- -p dev` or ‘-- -p test’ 
  - If you didn't specify the test environment, the test will be run on ‘dev’ by default.
  - e.g. `npm run test` or `npm run test -- --tags=@tag`
  - The test environment can be specified by adding an environment name.
  - e.g. `npm run test -- -p dev`, `npm run test -- --tags=@tag -p div`
- To run your tests in parallel
- To run tests in parallel, you can use `npm run test -- --parallel` 
- This will run the tests at the maximum available concurrent users, which is 5 at this time.
- If you wish to use a different parallel value, use: `npm run test -- --parallel=x` Where `x` is the value you want to use.

\## Additional Details

- Cucumber feature files 
  - The feature files can be created to represent the application’s core functionalities

e.g. ‘login.feature’, ‘search_product.feature’, ‘place_order.feature’

Each feature file can contain multiple scenarios that define specific test cases.

e.g. ‘scenario: Ensure a user can register a new account on the home page’

      ‘scenario: Ensure a user can search all products

- Feature files support multiple tags for better test organisation and execution control. 
- Tags can be used to
  - One or multiple tags can be added in the feature file
  - Categorize features
  - Define test suites
  - Enable framework functionality

e.g. @unauthenticated: for he test cases don’t require authentication

      @authenticated: for the tests require loggin state

      @regression: full regression test suite

      @postrelease: post-release verification
      etc.

- Reports and trace failures 
  - Upon test completion, a HTML format report is generated in the reports folder.
  - Failed tests automatically include screenshot in the report to help diagnose issues
- Add the @video tag to feature files to record test execution
     e.g. ‘npm run video -- -p dev’
- A trace file is also stored in the ‘trace’ folder, which can be used for debug
- Failed tests are logged in the <‘@rerun.txt’> file under the ‘reports’ folder, rerun them using ‘npm run rerun’.

- Github action
  - Automated Testing Workflow (run-playwright-tests.yml):
  - Playwright and dependency installation
  - Environment configuration
  - Trace file generation options
  - Manual Test Trigger (trigger-tests-manually.yml):
  - Branch selection
  - Test environment specification
  - Parallel execution configuration
  - Worker count settings
  - The workflows can be extended with additional options and functionalities to support future development needs.

- Shortcut Scripts
  - Common suite use cases have their own commands set up for ease of use. 
  - See `package.json` for script specifics.
