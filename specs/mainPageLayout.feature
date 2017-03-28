Feature: As a user of of Computer Database application
  I should be able to see all expected UI elements
  on application's main page

  Background: Navigating to main page
    Given I navigate to Computers main page

  Scenario: Main page layout check
    Then I should see Play sample application — Computer database app name in the header
    And I should see a positive number as total number of computers
    And I should see Filter input
    And I should see Filter button
    And I should see Add new computer button
    And I should see a computers table with 4 columns
    And computers table should have the following header titles
      | Computer name | Introduced | Discontinued | Company |