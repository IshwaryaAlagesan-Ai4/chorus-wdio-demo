@TreatyFeature @E2E
Feature: SS&C Validate Treaty Details

  Background: Login to SSC Portal
    Given I login to the SSC Portal
    
  @T0
  Scenario: clean up
    Given I clean up old record

  @T1
  Scenario: User log in to SSC Portal and create a Worklist
    Given I create a "PACLIFE" worklist
    Then I wait for 5 seconds

  @T2
  Scenario: User opens the first worklist item and fill the details
    Given I Open the first case from the worklist
    When I select Owner as Yes and continue without client list
    And I fill the Underwriting Create case details
    And I click view data

  @T3
  Scenario: User view SAP Results and Chorus Results
    Given I Open the first case from the worklist
    When I click view SAP Results
    And I click view Chorus Results

  @T4
  Scenario: User click Create Link Folder form and Upload File
    Given I Open the first case from the worklist
    When I click create Link Folder
    And I click Send for Referral
    Then I upload a File in Underwriting screen

  @T5
  Scenario: User click Proceed and fill benefits
    Given I Open the first case from the worklist
    When I proceed and fill treaty details
      | CI- Benefit 1 | 140000 |
    And I verify the treaty details in the ReInsurance Calculation
      | Benefit       | SumInsured | SumReinsured | SumReinsuredCalculated |
      | CI- Benefit 1 | 140000.00  | 140350.00    | 140350.00              |
    Then I proceed to Review case creation page and finish it
