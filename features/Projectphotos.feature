Feature: project photos Module

    The user should be able to manage project photos by uploading, previewing, downloading, and deleting them.

    @Regression

    Scenario Outline: Upload a new photo to the project photos gallery
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        And Validate the user is logged in with Tennessee Dot
        And switch to ops portal on clicking switch button
        Then select first project from the list
        And Click on photos button for the selected project
        And validate photo gallery page is displayed
        Then click on upload photo button
        And upload a photo from local system
        Then validate the photo is uploaded successfully and success message is displayed

        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |


    @Regression

    Scenario Outline: Delete first photo form the  project photos gallery
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        And Validate the user is logged in with Tennessee Dot
        And switch to ops portal on clicking switch button
        Then select first project from the list
        And Click on photos button for the selected project
        And validate photo gallery page is displayed
        Then click on upload photo button
        And upload a photo from local system
        Then validate the photo is uploaded successfully and success message is displayed
        And delete the first photo from the gallery
        Then validate the photo is deleted successfully and success message is displayed

        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |


    @Regression

    Scenario Outline: Validate the count of photos in the project photos gallery after upload and delete operations
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        And Validate the user is logged in with Tennessee Dot
        And switch to ops portal on clicking switch button
        Then select first project from the list
        And Click on photos button for the selected project
        And validate photo gallery page is displayed
        Then fetch the count for the existing photos in the gallery
        Then click on upload photo button
        And upload a photo from local system
        Then validate the photo is uploaded successfully and success message is displayed
        Then validate the photo gallery count is incremented by one
        And delete the first photo from the gallery
        Then validate the photo is deleted successfully and success message is displayed
        Then validate the photo gallery count is decremented by one

        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |



    @Regression

    Scenario Outline: Validate first photo can be downloaded from the project photos gallery
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        And Validate the user is logged in with Tennessee Dot
        And switch to ops portal on clicking switch button
        Then select first project from the list
        And Click on photos button for the selected project
        And validate photo gallery page is displayed
        Then click on upload photo button
        And upload a photo from local system
        Then validate the photo is uploaded successfully and success message is displayed
        And download the first photo from the gallery
        Then validate the photo is downloaded successfully

        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |



    @Regression

    Scenario Outline: Validate first photo can be downloaded from the project photos gallery preview mode
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        And Validate the user is logged in with Tennessee Dot
        And switch to ops portal on clicking switch button
        Then select first project from the list
        And Click on photos button for the selected project
        And validate photo gallery page is displayed
        Then click on upload photo button
        And upload a photo from local system
        Then validate the photo is uploaded successfully and success message is displayed
        And click on the preview button of the first photo from the gallery
        And Validate user is on the preview mode
        Then click on download button in the preview mode
        Then validate the first photo is downloaded successfully from preview mode

        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |


    @Regression

    Scenario Outline: Delete all photos from the project photos gallery
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        And Validate the user is logged in with Tennessee Dot
        And switch to ops portal on clicking switch button
        Then select first project from the list
        And Click on photos button for the selected project
        And validate photo gallery page is displayed
        Then click on upload photo button
        Then fetch the count for the existing photos in the gallery
        And upload a photo from local system
        Then validate the photo is uploaded successfully and success message is displayed
        Then delete all photos from the gallery one by one
        Then Validate no data is present in the gallery
        Then fetch the count for the existing photos in the gallery and validate it is zero


        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |


    @Regression

    Scenario Outline: Validate first photo can be deleted from the project photos gallery preview mode
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        And Validate the user is logged in with Tennessee Dot
        And switch to ops portal on clicking switch button
        Then select first project from the list
        And Click on photos button for the selected project
        And validate photo gallery page is displayed
        Then click on upload photo button
        And upload a photo from local system
        Then validate the photo is uploaded successfully and success message is displayed
        And click on the preview button of the first photo from the gallery
        And Validate user is on the preview mode
        Then click on delete button in the preview mode
        Then validate the photo is deleted successfully and success message is displayed

        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |



    @Regression

    Scenario Outline: Validate created details for the uploaded photo in photos gallery preview mode
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        And Validate the user is logged in with Tennessee Dot
        And switch to ops portal on clicking switch button
        Then select first project from the list
        And Click on photos button for the selected project
        And validate photo gallery page is displayed
        Then click on upload photo button
        And upload a photo from local system
        Then validate the photo is uploaded successfully and success message is displayed
        And click on the preview button of the first photo from the gallery
        Then Validate the date and time for the uploaded photo is current date time
        Then Validate the uploaded photo is uploaded by the logged in user
        Then validate the project name is displayed correctly in the preview mode
        And Validate user is on the preview mode
        Then click on delete button in the preview mode
        Then validate the photo is deleted successfully and success message is displayed

        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |



    @Regression

    Scenario Outline: Validate created details for the uploaded photo card view
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        And Validate the user is logged in with Tennessee Dot
        And switch to ops portal on clicking switch button
        Then select first project from the list
        And Click on photos button for the selected project
        And validate photo gallery page is displayed
        Then click on upload photo button
        And upload a photo from local system
        Then validate the photo is uploaded successfully and success message is displayed
        Then Validate the date and time for the uploaded photo is current date time in the card view
        Then Validate the uploaded photo is uploaded by the logged in user in the card view
        Then validate the project name is displayed correctly in the preview mode in the card view
        And delete the first photo from the gallery
        Then validate the photo is deleted successfully and success message is displayed


        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |



    @Regression

    Scenario Outline: Validate summary hide and unhide functionality for an uploaded photo
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        And Validate the user is logged in with Tennessee Dot
        And switch to ops portal on clicking switch button
        Then select first project from the list
        And Click on photos button for the selected project
        And validate photo gallery page is displayed
        Then click on upload photo button
        And upload a photo from local system
        Then validate the photo is uploaded successfully and success message is displayed
        Then click on hide summary button
        And Validate show summary button is visible
        Then validate summary for the uploaded photo is hidden
        And click on show summary button
        And Validate hide summary button is visible
        Then validate summary for the uploaded photo is visible



        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |



@Regression

    Scenario Outline: Validate the photo count matches on project card, project dashboard, project gallery after uploading a photo

        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        And Validate the user is logged in with Tennessee Dot
        And switch to ops portal on clicking switch button
        Then fetch the first project name and first project photo count
        Then select first project from the list
        And fetch the photo count on the project dashboard
        And Click on photos button for the selected project
        And validate photo gallery page is displayed
        And fetch the photo gallery count
        Then click on upload photo button
        And upload a photo from local system
        Then validate the photo is uploaded successfully and success message is displayed
        Then validate the photo gallery count got incremented by one
        And click on back button
        Then validate the photo count on the project dashboard page incremented by one
        Then click on back button from project dashboard page
        And Enter the fetched first project name in the search bar
        Then Validate the photos count on project card page got incremented by one


        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |



@Regression

    Scenario Outline: Validate user can upload photo from project global level using NUX

        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        And Validate the user is logged in with Tennessee Dot
        And switch to ops portal on clicking switch button
        Then fetch the project which has zero photos
        Then click on that project
        And scroll down to the global photos view
        And Click on upload photos button on global view
        Then upload a photo from loacal system
        Then validate the photo is uploaded successfully globally and success message is displayed
        


        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |
