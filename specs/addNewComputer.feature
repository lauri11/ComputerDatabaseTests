Feature: As a user of Computer Database application
  I should be able to add a new computer
  with the given data

  Background: Navigating to main page
    Given I navigate to Computers main page

  Scenario: Check for adding a new computer
    Given I navigate to Add a computer page
    When I create a new computer with the following details
      | Computer name | Introduced date | Discontinued date | Company |
      | ABC           | today           | 2018-12-12        | Sony    |
    Then I am on computers main page
    And notification message saying Done! Computer ABC has been created is displayed
    And ABC computer appears in the computers table with the following data
      | Computer name | Introduced date | Discontinued date | Company |
      | ABC           | today           | 12 Dec 2018       | Sony    |

  Scenario: Check for deleting a previously-created computer
    Given I search computer with ABC name
    When I select computer with ABC name
    Then I am on Edit computer page
    And I delete the selected computer

  Scenario: Check for cancelling computer's save
    Given I navigate to Add a computer page
    When I create a new computer but cancel saving
      | Computer name | Introduced date | Discontinued date | Company |
      | AAATest       | today           | 2018-12-12        | Sony    |
    Then I am on computers main page
    And there is no notification message about a new computer's creation

  Scenario: Check that computer without name can't be added
    Given I navigate to Add a computer page
    When I create a computer without a required name filled in
    Then computer name input gets highlighted
    And I am on Add computer page