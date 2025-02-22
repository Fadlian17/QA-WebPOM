Feature: Full Payment Process

  Scenario: Complete a payment successfully
    Given I am logged in as "standard_user" with password "secret_sauce"
    When I add an item to the cart
    And I proceed to checkout
    And I enter checkout information "John", "Doe", "12345"
    Then the checkout should be complete

  Scenario: Fail login with incorrect credentials
    Given I am logged in as "invalid_user" with password "wrong_password"
    Then I should see a login error

  Scenario: Not proceed to checkout with incomplete information
    Given I am logged in as "standard_user" with password "secret_sauce"
    When I add an item to the cart
    And I proceed to checkout
    And I enter checkout information "John", "", "12345"
    Then I should see a checkout error

  Scenario: Handle multiple items transaction
    Given I am logged in as "standard_user" with password "secret_sauce"
    When I add multiple items "item1", "item2" to the cart
    And I proceed to checkout
    And I enter checkout information "John", "Doe", "12345"
    Then the checkout should be complete

  Scenario: Handle multiple quantity transaction
    Given I am logged in as "standard_user" with password "secret_sauce"
    When I add "item1" with quantity 3 to the cart
    And I proceed to checkout
    And I enter checkout information "John", "Doe", "12345"
    Then the checkout should be complete
