@run
Feature: As a user of Computer Database application
  I need to have table ordering functionality
  working as expected

  Background: Navigating to main page
    Given I navigate to Computers main page

  Scenario: test
    Given I navigate to Add a computer page
    And I create a new computer with the following details
      | Computer name | Introduced date | Discontinued date | Company |
      | AA            | today           | 2018-12-12        | Sony    |
    And AA computer appears in the computers table with the following data
      | Computer name | Introduced date | Discontinued date | Company |
      | AA            | today           | 12 Dec 2018       | Sony    |
    And I navigate to Add a computer page
    When I create a new computer with the following details
      | Computer name | Introduced date | Discontinued date | Company |
      | A             | today           | 2019-12-12        | Sony    |
    Then A computer is shown in the table before computer AA
    Given I navigate to Add a computer page
    When I create a new computer with the following details
      | Computer name | Introduced date | Discontinued date | Company |
      | AAA           | today           | 2019-11-11        | Sony    |
    Then AAA computer is shown in the table after computer AA
