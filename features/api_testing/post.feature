@api
Feature: API Testing Post Request

Background: 
    Given I am on the homepage
    And I click on the "Sign Up" button
    And I fill in the registration form with valid details

Scenario: We can use the POST request to verify login with valid details
    When I send a POST request to the login endpoint to verify the new account
    Then I should receive a correct response

Scenario: We can use the POST request to verify login with invalid details
    When I send a POST request to the login endpoint to verify login with invalid details
    Then I should receive an error response

Scenario: We can use the POST request to verify login without email
    When I send a POST request to the login endpoint to verify login without email
    Then I should receive a response says email is missing

Scenario: We can not use the Delete request to verify login
    When I send a DELETE request to the login endpoint to verify login
    Then I should receive a response says method not supported