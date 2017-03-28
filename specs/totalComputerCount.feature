#@run
Feature: As a user of Computer Database application
  I should see a correct total number of computers

  Background: Navigating to Computers main page
    Given I navigate to Computers main page

  Scenario: Check computer total count changes correctly when adding/deleting a computer
    Given I save the total number of computers for later use
    And I navigate to Add a computer page
    When I create a new computer with the following details
      | Computer name | Introduced date | Discontinued date | Company |
      | ABC           | today           | 2018-12-12        | Sony    |
    And I am on computers main page
    Then total number of computers should be increased by 1
    And I navigate to ABC computer Edit page
    And I delete the selected computer
    Then total number of computers should be equal to the one previously-saved

  Scenario: Check that total computer count does not change when computer data is not saved
    Given I save the total number of computers for later use
    And I navigate to Add a computer page
    When I create a new computer but cancel saving
      | Computer name | Introduced date | Discontinued date | Company |
      | ABC           | today           | 2018-12-12        | Sony    |
    And I am on computers main page
    Then total number of computers should be equal to the one previously-saved