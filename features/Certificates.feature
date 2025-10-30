Feature: Certificates Module

    @Regression

    Scenario Outline: Create a new certificate
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        And Validate the user is logged in with Tennessee Dot
        Then Click on Material certificates page
        When Click on certificates button
        And Ensure that no certificates are present in the table
        Then I click on add button
        Then I enter the certificate name as "Test Certificate"
        Then I enter the description as "Test Description"
        Then I click on submit button
        And Validate certificate creation message is fired successfully
        Then I validate created certificate is in the table
        Then Click on Hamberger menu of the created certificate
        When I click on Delete button
        Then I click on confirm delete button
        And Validate certificate deleted message if fired successfully

        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |



    @Regression

    Scenario Outline: Create and edit a certificate
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        And Validate the user is logged in with Tennessee Dot
        Then Click on Material certificates page
        When Click on certificates button
        And Ensure that no certificates are present in the table
        Then I click on add button
        Then I enter the certificate name as "Test Certificate"
        Then I enter the description as "Test Description"
        Then I click on submit button
        Then Click on Hamberger menu of the created certificate
        When I click on edit button for the created certificate
        Then I edit the name as "Edited Certificate"
        Then I edit the certifcate description as "Edited Description"
        And I click on save button
        And I validate certificate edited message is fired
        Then I validate edited certificate is in the table
        Then Click on Hamberger menu of the edited certificate
        When I click on Delete button
        Then I click on confirm delete button


        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |


    @Regression

    Scenario Outline: Validate the count after creation and deletion of a certificate
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        And Validate the user is logged in with Tennessee Dot
        Then Click on Material certificates page
        When Click on certificates button
        And Ensure that no certificates are present in the table
        Then Get the count for the certificates Before creating
        Then I click on add button
        Then I enter the certificate name as "Test Certificate"
        Then I enter the description as "Test Description"
        Then I click on submit button
        And Validate certificate creation message is fired successfully
        Then I validate created certificate is in the table
        And Validate the count got increased by one
        Then Click on Hamberger menu of the created certificate
        When I click on Delete button
        Then I click on confirm delete button
        Then I validate the count is decremented by one

        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |


    @Regression

    Scenario Outline: Validate certificate creation on a NUX page
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        And Validate the user is logged in with Tennessee Dot
        Then Click on Material certificates page
        When Click on certificates button
        And Ensure that no certificates are present in the table
        Then Click on add new certificate button nux
        Then I enter the certificate name as "Test Certificate"
        Then I enter the description as "Test Description"
        Then I click on submit button
        And Validate certificate creation message is fired successfully

        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |



    @Regression

    Scenario Outline: Validate search functionality
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        And Validate the user is logged in with Tennessee Dot
        Then Click on Material certificates page
        When Click on certificates button
        And Ensure that no certificates are present in the table
        Then I click on add button
        Then I enter the certificate name as "Test Certificate"
        Then I enter the description as "Test Description"
        Then I click on submit button
        And click on search bar and Enter the name of the created certficate
        Then Validate the in the table only one record is present
        And Validate the count after searching the certificate is one
        Then Click on Hamberger menu of the created certificate
        When I click on Delete button
        Then I click on confirm delete button

        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |


    @Regression

    Scenario Outline: Validate details of the created certificate
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        And Validate the user is logged in with Tennessee Dot
        Then Click on Material certificates page
        When Click on certificates button
        And Ensure that no certificates are present in the table
        Then I click on add button
        Then I enter the certificate name as "Test Certificate"
        Then I enter the description as "Test Description"
        Then I click on submit button
        And Validate certificate name in the grid
        And Validate certificate creted time in the grid
        Then Validate Added by name is "Vishnu Nangunuri" in the grid
        Then Click on Hamberger menu of the created certificate
        When I click on Delete button
        Then I click on confirm delete button

        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |


    @Regression

    Scenario Outline: Validate sorting for column certificate type
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        Then Click on Material certificates page
        And Validate the user is logged in with Tennessee Dot
        When Click on certificates button
        Then I click on add button
        Then I enter the certificate name as "Test Certificate"
        Then I enter the description as "Test Description"
        Then I click on submit button
        Then Get all the certificate types from the grid
        Then click on ascending sort and validate the order
        Then click on descending sort and validate the order
        Then Click on Hamberger menu of the created certificate
        When I click on Delete button
        Then I click on confirm delete button

        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |


    @Regression

    Scenario Outline: Validate sorting for column Date Added column
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        Then Click on Material certificates page
        And Validate the user is logged in with Tennessee Dot
        When Click on certificates button
        Then I click on add button
        Then I enter the certificate name as "Test Certificate"
        Then I enter the description as "Test Description"
        Then I click on submit button
        Then I fetch all the dates for the created materials
        And Click on ascending order button for the date created at column
        Then Validate the ascending order for the dates
        And Click on descending order button for the date created at column
        Then Validate the descending order for the dates
        Then Click on Hamberger menu of the created certificate
        When I click on Delete button
        Then I click on confirm delete button

        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |

@Regression

    Scenario Outline: Validate sorting for column Added By column
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        And Validate the user is logged in with Tennessee Dot
        Then Click on Material certificates page
        When Click on certificates button
        Then I click on add button
        Then I enter the certificate name as "Test Certificate"
        Then I enter the description as "Test Description"
        Then I click on submit button
        Then I fetch all the names for the created materials
        And Click on ascending order button for the Added By column
        Then Validate the ascending order for the names
        And Click on descending order button for the Added By column
        Then Validate the descending order for the names
        Then Click on Hamberger menu of the created certificate
        When I click on Delete button
        Then I click on confirm delete button

        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |

