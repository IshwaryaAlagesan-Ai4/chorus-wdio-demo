@E2E @Pass
Feature: SS&C E2E Feature Testing
# UAT
# pre-prod

  Background: Login to SSC Portal
    Given I login to the SSC Portal


  @create @step1
  Scenario: User log in to SSC Portal and create a Worklist
    Given I create a "PACLIFE" worklist
    Then I wait for 5 seconds

  @fillform1 @step2
  Scenario: User opens the first worklist item and fill the details
    Given I Open the first case from the worklist
    When I select Owner as Yes and continue without client list
    And I fill the Underwriting Create case details
    And I click view data

  @fillform1 @step3
  Scenario: User view SAP Results and Chorus Results
    Given I Open the first case from the worklist
    When I click view SAP Results
    And I click view Chorus Results

  @fillform1 @step4
  Scenario: User click Create Link Folder form and Upload File
    Given I Open the first case from the worklist
    When I click create Link Folder
    And I click Send for Referral
    Then I upload a File in Underwriting screen

  @fillform1 @step5
  Scenario: User click Proceed and fill benefits
    Given I Open the first case from the worklist
    When I proceed and fill treaty details
      | CI- Benefit 1 | 140000 |
    And I verify the treaty details in the ReInsurance Calculation
      | Benefit       | SumInsured | SumReinsured | SumReinsuredCalculated |
      | CI- Benefit 1 | 140000.00  | 140325.00    | 140325.00              |
    Then I proceed to Review case creation page and finish it

  @fillform1 @step6
  Scenario: User reopens the case from worklist and continue
    Given I Open the first case from the worklist
    When I select keep me as owner and continue to next step
    Then I click view data and verify the status is "TOASSESS"


  @fillform1 @step7
  Scenario: User click send email, verify the details and submit
    Given I Open the first case from the worklist
    When I click view data and capture "Case Reference" details
    When I click Send Email button and chk Email window opens
    Then I verify the below details in the Email window and submit
      | josaeph4.barbara12@outlook.com | test tester | ishwarya.alagesan@ai4process.com|
    And I accept offer of terms and complete

# @debug
# Scenario: dummy
# Given I verify the below details in the Email window and submit
#   |josaeph4.barbara12@outlook.com|test tester|