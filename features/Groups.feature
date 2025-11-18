Feature: Groups Module

    @Regression @Now

    Scenario Outline: Validate a group can be created

        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        And Validate the user is logged in with Tennessee Dot
        Then I click on the Groups tab
        And Validate that I am on the groups page
        Then I click on create group button
        And I enter the Group name as "Group Name"
        Then I enter the Group description as "Group Description"
        And I click on save button while group creation
        Then I validate the success message for the group creation
        And I click on back button
        Then Validate the created is present in the list of groups

        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |




