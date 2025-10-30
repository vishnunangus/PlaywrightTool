Feature: Materials Module

    @Regression

    Scenario Outline: Create a new material
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        And Validate the user is logged in with Tennessee Dot
        Then Click on Material certificates page
        When Ensure no materials are present in the table 
        Then Click on plus icon
        And Click on Add new material button
        Then Enter the Material Name as "Test Material"
        Then Click on Submit button
        And Validate the sucess mesaage for material creation
        Then Validate the created material is in the table
        And Click on hamberger button for the created material
        Then Click on Delete button
        And Validate the deleted message is fired sucessfully
        Then Validate the material is not present in the table after the deletion




        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |


    @Regression

    Scenario Outline: Create a new material and delete the material
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        And Validate the user is logged in with Tennessee Dot
        Then Click on Material certificates page
        When Ensure no materials are present in the table
        Then Click on plus icon
        And Click on Add new material button
        Then Enter the Material Name as "Test Material"
        Then Click on Submit button
        And Validate the sucess mesaage for material creation
        Then Validate the created material is in the table
        And Click on hamberger button for the created material
        Then Click on Delete button
        And Validate the deleted message is fired sucessfully
        Then Validate the material is not present in the table after the deletion



        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |


    @Regression

    Scenario Outline: Create a new material, edit material and delete the material
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        And Validate the user is logged in with Tennessee Dot
        Then Click on Material certificates page
        When Ensure no materials are present in the table
        Then Click on plus icon
        And Click on Add new material button
        Then Enter the Material Name as "Test Material"
        Then Click on Submit button
        And Validate the sucess mesaage for material creation
        Then Validate the created material is in the table
        And Click on hamberger button for the created material
        Then Click on edit button
        And Enter the updated material name as "12345"
        Then Click on save button
        And Validate the edited message fired sucessfully
        Then Validate the updated name of material is present in the table
        Then Click on Delete button of the updated material
        And Validate the deleted message is fired sucessfully for updated material
        Then Validate the updated material is not present in the table after the deletion

        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |

    @Regression

    Scenario Outline: Validate details of the material created
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        And Validate the user is logged in with Tennessee Dot
        Then Click on Material certificates page
        When Ensure no materials are present in the table
        Then Click on plus icon
        And Click on Add new material button
        Then Enter the Material Name as "Test Material"
        Then Click on Submit button
        And Validate the sucess mesaage for material creation
        Then Validate the material name
        And Validate the material creation date
        Then Validate the material created by field is "Vishnu Nangunuri"
        And Click on hamberger button for the created material
        Then Click on Delete button
        And Validate the deleted message is fired sucessfully
        Then Validate the material is not present in the table after the deletion


        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |


    @Regression

    Scenario Outline: Validate the search functionality of the material module
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        And Validate the user is logged in with Tennessee Dot
        Then Click on Material certificates page
        When Ensure no materials are present in the table
        Then Click on plus icon
        And Click on Add new material button
        Then Enter the Material Name as "Test Material"
        Then Click on Submit button
        And Validate the sucess mesaage for material creation
        Then Validate the created material is in the table
        And Click on search bar and enter the created material
        Then Validate the search results are filtered based on search text
        Then Validate the material name
        And Validate the material creation date
        Then Validate the material created by field is "Vishnu Nangunuri"
        And Click on hamberger button for the created material
        Then Click on Delete button
        And Validate the deleted message is fired sucessfully
        Then Validate the material is not present in the table after the deletion


        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |

    @Regression

    Scenario Outline: Validate the count after creating and deleting a material
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        And Validate the user is logged in with Tennessee Dot
        Then Click on Material certificates page
        When Ensure no materials are present in the table
        And get the count before the material creation
        Then Click on plus icon
        And Click on Add new material button
        Then Enter the Material Name as "Test Material"
        Then Click on Submit button
        And Validate the sucess mesaage for material creation
        Then Validate the created material is in the table
        And Validate the material count is incremented by one
        And Click on hamberger button for the created material
        Then Click on Delete button
        And Validate the material count is decremented by one


        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |


    @Regression

    Scenario Outline: Validate functionality of Bulk upload materials with csv file
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        And Validate the user is logged in with Tennessee Dot
        Then Click on Material certificates page
        When Ensure no materials are present in the table
        Then Click on plus icon
        And click on button bulk upload material list
        Then upload a csv file which contains the list of materials
        And Click on savebutton from the csv upload modal
        Then Validate the success message is fired sucessfully
        And compare the details from csv file with the material data in the UI
        When I delete all the materials uploaded using csv bulk upload
        Then Validate materials are not present in the table


        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |



    @Regression

    Scenario Outline: Validate functionality of sorting the columns material names
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        And Validate the user is logged in with Tennessee Dot
        Then Click on Material certificates page
        When Ensure no materials are present in the table
        Then Click on plus icon
        And click on button bulk upload material list
        Then upload a csv file which contains the list of materials
        And Click on savebutton from the csv upload modal
        Then Validate the success message is fired sucessfully
        And compare the details from csv file with the material data in the UI
        When Materials are uploaded click on sort button and fetch the material list
        Then Validate the materials are sorted in ascending order
        When Materials are uploaded click on sort button
        And Validate material names are sorted in descending order
        When I delete all the materials uploaded using csv bulk upload
        Then Validate materials are not present in the table


        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |



    @Regression

    Scenario Outline: Validate functionality of adding a new material form NUX screen 
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        And Validate the user is logged in with Tennessee Dot
        Then Click on Material certificates page
        When Ensure no materials are present in the table
        Then click on add new material text from the table 
        Then Enter the Material Name as "Test Material"
        Then Click on Submit button
        And Validate the sucess mesaage for material creation
        Then Validate the created material is in the table
        And Click on hamberger button for the created material
        Then Click on Delete button
        And Validate the deleted message is fired sucessfully
        Then Validate the material is not present in the table after the deletion

        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |



@Regression 

    Scenario Outline: Validate Error message is thrown adding an existing material 
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        And Validate the user is logged in with Tennessee Dot
        Then Click on Material certificates page
        When Ensure no materials are present in the table
        Then Click on plus icon
        And Click on Add new material button
        Then Enter the Material Name as "Test Material"
        Then Click on Submit button
        And Validate the sucess mesaage for material creation
        Then Validate the created material is in the table
        Then Click on plus icon
        And Click on Add new material button
        Then Enter the same Material Name again in the text box
        Then Click on Submit button
        And Validate the error mesaage for duplicated material creation
        And Click on hamberger button for the created material
        Then Click on Delete button
        And Validate the deleted message is fired sucessfully
        Then Validate the material is not present in the table after the deletion


        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |


    @Regression 

    Scenario Outline: Validate the functionality of sorting for Date added column
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        And Validate the user is logged in with Tennessee Dot
        Then Click on Material certificates page
        Then Click on plus icon
        And Click on Add new material button
        Then Enter the Material Name as "Test Material"
        Then Click on Submit button
        And Validate the sucess mesaage for material creation
        Then Validate the created material is in the table
        Then fetch all the dates for the created materials 
        Then click on ascending order button for the date column 
        And Validate the materials are sorted in ascending order based on the date
        Then click on descending order button for the date column
        And Validate the materials are sorted in descending order based on the date
        And Click on hamberger button for the created material
        Then Click on Delete button

        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |


 @Regression

    Scenario Outline: Validate the functionality of sorting for Added By column
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        And Validate the user is logged in with Tennessee Dot
        Then Click on Material certificates page
        Then Click on plus icon
        And Click on Add new material button
        Then Enter the Material Name as "Test Material"
        Then Click on Submit button
        And Validate the sucess mesaage for material creation
        Then Validate the created material is in the table
        Then fetch all the names for the  created materials 
        Then click on ascending order button for the Added by column 
        And Validate the names are sorted in ascending order
        Then click on descending order button for the Added by column
        And Validate the names are sorted in descending order
        And Click on hamberger button for the created material
        Then Click on Delete button

        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |

        
        