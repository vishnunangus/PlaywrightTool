
const { Given, When, Then, } = require('@cucumber/cucumber');
const { expect } = require('playwright/test');
const { POManager } = require('../../page_object/POManager');
const { ProjectPhotosPage } = require('../../page_object/ProjectPhotosPage');
const path = require('path');
const fs = require('fs');
const { OpsPortalPage } = require('../../page_object/OpsPortalPage');
const DOWNLOAD_DIR = path.resolve(__dirname, '../../downloads');
let downloadedFilePath;

Then('switch to ops portal on clicking switch button', async function () {

    await this.projectphotospage.clickOnOpsPortalButton();
});


Then('select first project from the list', async function () {

    await this.projectphotospage.selectFirstProject();
});

Then('Click on photos button for the selected project', async function () {

    await this.projectphotospage.clickOnProjectPhotosTab();

});

Then('validate photo gallery page is displayed', async function () {

    await expect(this.page.getByText('Photo Gallery')).toBeVisible();

});

Then('click on upload photo button', async function () {

    await this.projectphotospage.clickOnUploadPhotoButton();

});


Then('upload a photo from local system', async function () {

    await this.projectphotospage.uploadPhoto();

});

Then('validate the photo is uploaded successfully and success message is displayed', async function () {

    await this.projectphotospage.validatephotosSuccessMessage();
});

Then('delete the first photo from the gallery', async function () {

    await this.projectphotospage.deleteFirstPhoto();

});

Then('validate the photo is deleted successfully and success message is displayed', async function () {

    await this.projectphotospage.validatedeletephotosSuccessMessage();

});

Then('fetch the count for the existing photos in the gallery', async function () {

    this.actualcount = await this.projectphotospage.fetchPhotoCount();
    console.log("Actual Photo Count: ", this.actualcount);

});

Then('validate the photo gallery count is incremented by one', async function () {

    this.incrementedcount = await this.projectphotospage.fetchPhotoCount();
    console.log("Incremented Photo Count: ", this.incrementedcount);
    expect(this.incrementedcount).toBe(this.actualcount + 1);
    console.log("Photo count is incremented by one");

});

Then('validate the photo gallery count is decremented by one', async function () {

    this.decrementedcount = await this.projectphotospage.fetchPhotoCount();
    console.log("Decremented Photo Count: ", this.decrementedcount);
    expect(this.decrementedcount).toBe(this.incrementedcount - 1);
    console.log("Photo count is decremented by one");
});

Then('download the first photo from the gallery', async function () {

    const [download] = await Promise.all([
        this.page.waitForEvent('download'),
        this.projectphotospage.downloadFirstPhoto()
    ]);

    const suggestedFilename = download.suggestedFilename();
    this.downloadedFilePath = path.join(DOWNLOAD_DIR, suggestedFilename);

    if (!fs.existsSync(DOWNLOAD_DIR)) {
        fs.mkdirSync(DOWNLOAD_DIR);
    }
    await download.saveAs(this.downloadedFilePath);

});

Then('validate the photo is downloaded successfully', async function () {

    expect(fs.existsSync(this.downloadedFilePath)).toBeTruthy();
    const stats = fs.statSync(this.downloadedFilePath);
    expect(stats.size).toBeGreaterThan(0);
    console.log(`File downloaded to: ${this.downloadedFilePath}`);
    fs.unlinkSync(this.downloadedFilePath);
    console.log('Downloaded file deleted successfully');

});

Then('click on the preview button of the first photo from the gallery', async function () {

    await this.projectphotospage.preview_firstphoto();

});

Then('Validate user is on the preview mode', async function () {

    const previewmode = await this.projectphotospage.validateUserIsOnPreviewMode();
    await previewmode.waitFor({ state: 'visible', timeout: 10000 });

});

Then('click on download button in the preview mode', async function () {


    const [previewdownload] = await Promise.all([
        this.page.waitForEvent('download'),
        this.projectphotospage.clickOnDownloadButtonInPreviewMode()

    ])

    const suggestedpreviewFilename = previewdownload.suggestedFilename();
    this.previewdownloadedFilePath = path.join(DOWNLOAD_DIR, suggestedpreviewFilename);
    if (!fs.existsSync(DOWNLOAD_DIR)) {
        fs.mkdirSync(DOWNLOAD_DIR);
    }
    await previewdownload.saveAs(this.previewdownloadedFilePath);
});

Then('validate the first photo is downloaded successfully from preview mode', async function () {

    expect(fs.existsSync(this.previewdownloadedFilePath)).toBeTruthy();
    const stats = fs.statSync(this.previewdownloadedFilePath);
    expect(stats.size).toBeGreaterThan(0);
    console.log(`File downloaded to: ${this.previewdownloadedFilePath}`);
    fs.unlinkSync(this.previewdownloadedFilePath);
    console.log('Downloaded file deleted successfully');

});

Then('delete all photos from the gallery one by one', async function () {

    await this.projectphotospage.deleteallphotos();

});


Then('fetch the count for the existing photos in the gallery and validate it is zero', async function () {

    this.finalcount = await this.projectphotospage.fetchPhotoCount();
    console.log("Final Photo Count: ", this.finalcount);
    expect(this.finalcount).toBe(0);
    console.log("All photos are deleted and photo count is zero");

});


Then('Validate no data is present in the gallery', async function () {

    await this.projectphotospage.validateNoDataInGallery();

});

Then('click on delete button in the preview mode', async function () {

    await this.projectphotospage.clickOnDeleteButtonInPreviewMode();

});

Then('Validate the date and time for the uploaded photo is current date time', async function () {

    const actualdatetime = await this.projectphotospage.fetchcreateddatetimeinpreviewmode();
    console.log("Actual Date Time in Preview Mode: ", actualdatetime);
    const now = new Date();

    const formattedTime = now.toLocaleString('en-US', {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true
    });

    const expecteddatetime = formattedTime.replace(",", " @");

    console.log("Expected Date Time: ", expecteddatetime);
    expect(actualdatetime).toBe(expecteddatetime);
    console.log("Date and Time for the uploaded photo is current date time");

    const expectedDateObj = new Date(expecteddatetime);
    const actualDateObj = new Date(actualdatetime);

    const timeDiffMs = Math.abs(expectedDateObj.getTime() - actualDateObj.getTime());
    const timeDiffMinutes = timeDiffMs / (1000 * 60);

    console.log('Time Difference in Minutes:', timeDiffMinutes);

    expect(timeDiffMinutes).toBeLessThanOrEqual(1);


});

Then('Validate the uploaded photo is uploaded by the logged in user', async function () {

    const actualusername = await this.projectphotospage.fetchcreatedbyinpreviewmode();
    console.log("Actual User Name in Preview Mode: ", actualusername);
    const expectedusername = "Vishnu Nangunuri";
    console.log("Expected User Name: ", expectedusername);
    expect(actualusername, `Expected '${expectedusername}' but found '${actualusername}'`)
        .toBe(expectedusername);
    console.log("Uploaded photo is uploaded by the logged in user");

});

Then('validate the project name is displayed correctly in the preview mode', async function () {

    this.projectnameindashboard = await this.projectphotospage.fetchprojectnameindashboard();
    console.log("Project Name in Dashboard: ", this.projectnameindashboard);
    const projectnameinpreviewmode = await this.projectphotospage.fetchprojectnameinpreviewmode();
    console.log("Project Name in Preview Mode: ", projectnameinpreviewmode);
    expect(projectnameinpreviewmode).toBe(this.projectnameindashboard);
    console.log("Project name is displayed correctly in the preview mode");



});

Then('Validate the user is logged in with Tennessee Dot', async function () {

    await this.opsportalpage.hoverOnOpsPortalIcon();
    const Actualdotname = await this.opsportalpage.fetchDOT();
    console.log("Actual DOT Name: ", Actualdotname);
    const Expecteddotname = "Tennessee Department of Transportation";

    if (Actualdotname == Expecteddotname) {
        console.log("User is logged in with Tennessee Dot");

    }
    else {
        await this.opsportalpage.clickonmyaccount();
        await this.opsportalpage.clickonswitchagency();
        const alldotnames = await this.opsportalpage.fetchalldotnames();
        if (alldotnames.includes(Expecteddotname)) {

            console.log("Tennessee DOT is available in the list of DOTs");
            for (const dotname of alldotnames) {
                if (dotname === Expecteddotname) {
                    await this.page.getByText(dotname).click();
                    console.log("Clicked on Tennessee DOT to switch the agency");
                    await this.opsportalpage.switchdotsuccessmessage();
                    console.log("Switch DOT success message is displayed");
                    await this.page.waitForLoadState('networkidle');
                    await this.opsportalpage.waitforswitching();
                    await this.opsportalpage.validateCreateProjectButtonIsVisible();
                    await this.opsportalpage.hoverOnOpsPortalIcon();
                    const switcheddotname = await this.opsportalpage.fetchDOT();
                    console.log("Switched DOT Name: ", switcheddotname);
                    expect(switcheddotname).toBe(Expecteddotname);
                    console.log("User is logged in with Tennessee Dot after switching the agency");
                    break;
                }
            }
        } else {
            throw new Error("Tennessee DOT is not available in the list of DOTs");
        }

    }
});

Then('Validate the date and time for the uploaded photo is current date time in the card view', async function () {

    const cardviewactualdatetime = await this.projectphotospage.fetchcreateddatetimecardview();
    console.log("Actual Date Time in cardview : ", cardviewactualdatetime);
    const now = new Date();

    const cardviewformattedTime = now.toLocaleString('en-US', {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true
    });

    const cardviewexpecteddatetime = cardviewformattedTime.replace(",", " @");
    console.log("Expected Date Time card view : ", cardviewexpecteddatetime);
    expect(cardviewactualdatetime).toBe(cardviewexpecteddatetime);
    console.log("Date and Time for the uploaded photo is current date time");
    const expectedDateObj = new Date(cardviewexpecteddatetime);
    const actualDateObj = new Date(cardviewactualdatetime);
    const timeDiffMs = Math.abs(expectedDateObj.getTime() - actualDateObj.getTime());
    const timeDiffMinutes = timeDiffMs / (1000 * 60);
    console.log('Time Difference in Minutes:', timeDiffMinutes);
    expect(timeDiffMinutes).toBeLessThanOrEqual(1);
    console.log("Date and time in card view mathces");
});


Then('Validate the uploaded photo is uploaded by the logged in user in the card view', async function () {

    const cardviewactualusername = await this.projectphotospage.fetchcreatedbycardview();
    const cardviewexpectedusername = "Vishnu Nangunuri";
    expect(cardviewactualusername).toBe(cardviewexpectedusername);
    console.log("username in card view mathces");
});


Then('validate the project name is displayed correctly in the preview mode in the card view', async function () {
    const projectnameindashboard = await this.projectphotospage.fetchprojectnameindashboard();
    const cardviewactualprojectname = await this.projectphotospage.fetchprojectnameincardview();
    console.log("projectname in card view :", cardviewactualprojectname);
    expect(cardviewactualprojectname).toBe(projectnameindashboard);
    console.log("project name in card view mathces")

});


Then('click on hide summary button', async function () {

    await this.projectphotospage.clickhidesummary();

});

Then('Validate show summary button is visible', async function () {

    await this.projectphotospage.btnshowsummarytext();

});

Then('validate summary for the uploaded photo is hidden', async function () {

    await this.projectphotospage.hidesummarytext();

});

Then('click on show summary button', async function () {

    await this.projectphotospage.clickshowsummary();

});

Then('Validate hide summary button is visible', async function () {

    await this.projectphotospage.btnhidesummarytext();

});

Then('validate summary for the uploaded photo is visible', async function () {


    await this.projectphotospage.showsummarytext();

});

Then('fetch the first project name and first project photo count', async function () {

    this.firstprojectname = await this.allprojectsdashboardpage.fetch_projectname();
    console.log("First project name is fetched: ", this.firstprojectname);
    this.firstprojectphotocount = await this.allprojectsdashboardpage.fetch_project_photoscount();
    console.log("First project photo count is fetched: ", this.firstprojectphotocount);


});


Then('fetch the photo count on the project dashboard', async function () {

    this.dashboardprojectphotocount = await this.projectdashboardpage.fetch_project_dashboard_photocount();
    console.log("Project dashboard photo count:" , this.dashboardprojectphotocount);


});


Then('fetch the photo gallery count', async function () {

this.projectphotogallerycount = await this.projectphotospage.fetchPhotoCount();
console.log("Project  photo gallery count:" , this.projectphotogallerycount);

});


Then('validate the photo gallery count got incremented by one', async function () {


this.finalgallerycount = await this.projectphotospage.fetchPhotoCount();
expect(this.finalgallerycount).toBe(this.projectphotogallerycount+1)
console.log("Final gallery count:",this.finalgallerycount);

});


Then('click on back button', async function () {

    await this.projectphotospage.click_on_back_button();

});


Then('validate the photo count on the project dashboard page incremented by one', async  function () {

 this.finaldashboardprojectphotocount = await this.projectdashboardpage.fetch_project_dashboard_photocount();
expect(this.finaldashboardprojectphotocount).toBe(this.dashboardprojectphotocount+1)
console.log("Final project count:",this.finaldashboardprojectphotocount);

});


Then('click on back button from project dashboard page', async function () {

    await this.projectdashboardpage.clickonbackbutton();

});


Then('Enter the fetched first project name in the search bar', async function () {

    await this.allprojectsdashboardpage.enterprojectname(this.firstprojectname);


});

Then('Validate the photos count on project card page got incremented by one', async function ()

{
    this.finalprojectphotocount = await this.allprojectsdashboardpage.fetch_project_photoscount();
    expect(this.finalprojectphotocount).toBe(this.firstprojectphotocount+1)
console.log("Final all projects dashboard count:",this.finalprojectphotocount);


});
