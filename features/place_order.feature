Feature: Place Order

        Scenario: Ensure a cusstomer can register a new account while checking out
            Given I have added a product to my cart
             When I process to checkout
             And I fill in the checkout form with valid details
             Then I should be able to signup and create a new account