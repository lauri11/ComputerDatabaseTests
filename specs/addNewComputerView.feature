Feature: As a user of of Computer Database application
  I should be able to add a new computer
  Via Add a computer form

  Background: Navigating to main page
    Given I navigate to Computers main page

  Scenario:
    Given I navigate to Add a computer page
    Then I should see Play sample application — Computer database app name in the header
    And I should see "Add a computer" header
    And I should see the following inputs displayed
      | Computer name | Introduced date | Discontinued date |
    And I should see the following inputs with the following labels
      | Computer name | Introduced date | Discontinued date |
    And I should see Company select
    And I should see Create this computer button
    And I should see Cancel button