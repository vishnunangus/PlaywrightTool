
const { Given, When, Then, } = require('@cucumber/cucumber');
const { expect } = require('playwright/test');
const { POManager } = require('../../page_object/POManager');
const { MaterialPage } = require('../../page_object/MaterialPage')
const path = require('path');
const ExcelUtils = require('../../utils/excelUtils');



Then('Click on Material certificates page', async function () {

    // @ts-ignore

    await this.materialpage.clickonMaterialsbutton();


});


Then('Click on plus icon', async function () {

    await this.materialpage.clickaddIcon();
});

Then('Click on Add new material button', async function () {

    await this.materialpage.clickonaddmaterialbutton();
});

Then('Enter the Material Name as {string}', async function (MaterialName) {

    const uniqueName = `${MaterialName}_${Date.now()}`;
    this.uniqueMaterialName = uniqueName;

    await this.materialpage.Entermaterialname(uniqueName);

});

Then('Click on Submit button', async function () {

    await this.materialpage.clicksubmit();

});


Then('Validate the sucess mesaage for material creation', async function () {

    await this.materialpage.validatecreatedSuccessMessage();


});

Then('Validate the created material is in the table', async function () {

    await expect(this.page.getByText(this.uniqueMaterialName)).toBeVisible();

});

Then('Click on hamberger button for the created material', async function () {

    await this.materialpage.clickhamberger(this.uniqueMaterialName);


});


Then('Click on Delete button', async function () {

    await this.materialpage.clickdeletebutton();
    await this.materialpage.clickconfirmdeletebutton();
});


Then('Validate the deleted message is fired sucessfully', async function () {


    await this.materialpage.validateDeleteSuccessMessage();
});

Then('Validate the material is not present in the table after the deletion', async function () {

    await expect(this.page.getByText(this.uniqueMaterialName)).not.toBeVisible();

});



Then('Click on hamberger button for the updated material', async function () {
    await this.materialpage.clickhamberger(this.uniqueupdatedMaterialName);
});


Then('Click on edit button', async function () {
    await this.materialpage.clickeditbutton();
});


Then('Enter the updated material name as {string}', async function (suffix) {

    const uniqueupdatedMaterialName = `${this.uniqueMaterialName}${suffix}`;
    this.uniqueupdatedMaterialName = uniqueupdatedMaterialName;

    await this.materialpage.Enterupdatedmaterialname(uniqueupdatedMaterialName);
});


Then('Click on save button', async function () {

    await this.materialpage.clicksavebutton();
});

Then('Validate the edited message fired sucessfully', async function () {

    await this.materialpage.validateEditedSuccessMessage();
});

Then('Validate the updated name of material is present in the table', async function () {

    await expect(this.page.getByText(this.uniqueupdatedMaterialName)).toBeVisible();
});

Then('Click on Delete button of the updated material', async function () {

    await this.materialpage.clickhamberger(this.uniqueupdatedMaterialName);
    await this.materialpage.clickdeletebutton();
    await this.materialpage.clickconfirmdeletebutton();


});

Then('Validate the deleted message is fired sucessfully for updated material', async function () {

    await this.materialpage.validateDeleteSuccessMessage();
});

Then('Validate the updated material is not present in the table after the deletion', async function () {

    await expect(this.page.getByText(this.uniqueupdatedMaterialName)).not.toBeVisible();

});


Then('Validate the material name', async function () {


    const actualMaterialName = await this.materialpage.getMaterialName(this.uniqueMaterialName);
    await expect(actualMaterialName).toBe(this.uniqueMaterialName);

});

Then('Validate the material creation date', async function () {
    const now = new Date();

    const expectedTime = now.toLocaleString('en-US', {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",

    }).replace(',', '');

    const actualTime = await this.materialpage.getMaterialCreatedDate(this.uniqueMaterialName);

    const expectedDateObj = new Date(expectedTime);
    const actualDateObj = new Date(actualTime);

    const timeDiffMs = Math.abs(expectedDateObj.getTime() - actualDateObj.getTime());
    const timeDiffMinutes = timeDiffMs / (1000 * 60);

    console.log('Time Difference in Minutes:', timeDiffMinutes);

    expect(timeDiffMinutes).toBeLessThanOrEqual(1);

});

;

Then('Validate the material created by field is {string}', async function (actualCreatedName) {

    const expectedCreatedName = await this.materialpage.getMaterialCreatedName(this.uniqueMaterialName);
    await expect(actualCreatedName).toBe(expectedCreatedName);

});

Then('Click on search bar and enter the created material', async function () {

    await this.materialpage.enterSearchText(this.uniqueMaterialName);
});


Then('Validate the search results are filtered based on search text', async function () {

    const rows = await this.materialpage.validateSearchResults(this.uniqueMaterialName);
    await expect(rows).toHaveCount(1);
    await expect(rows).toContainText(this.uniqueMaterialName);

});

Then('get the count before the material creation', async function () {

    this.count = await this.materialpage.getMaterialCount();
    console.log(this.count);
});


Then('Validate the material count is incremented by one', async function () {

    const incrementedCount = await this.materialpage.getMaterialCount();
    this.incrementedCount = incrementedCount;
    console.log(incrementedCount);
    expect(incrementedCount).toBe(this.count + 1);
    console.log("Count incremented correctly");


});

Then('Validate the material count is decremented by one', async function () {

    expect(this.count).toBe(this.incrementedCount - 1);
    console.log("Count decremented correctly");


});

Then('click on button bulk upload material list', async function () {

    await this.materialpage.bulkoptionclick();

});


Then('upload a csv file which contains the list of materials', async function () {

    const filePath = path.resolve(__dirname, '../../test-data/Material.csv');
    this.uploadedMaterials = await ExcelUtils.readCsv(filePath);
    console.log('Parsed Materials:', this.uploadedMaterials);
    await this.materialpage.uploadCsvFile(filePath);

});


Then('Click on savebutton from the csv upload modal', async function () {

    await this.materialpage.clickSaveButton();

});


Then('Validate the success message is fired sucessfully', async function () {

    await expect(this.materialpage.bulksuccess_msg).toHaveText("Upload Successful!");

    await this.materialpage.close();


});

Then('compare the details from csv file with the material data in the UI', async function () {

    for (const materialName of this.uploadedMaterials) {
        const materialRow = this.page.locator(`tr:has(td[title="${materialName}"])`);
        await expect(materialRow).toBeVisible();
    }

});


When('I delete all the materials uploaded using csv bulk upload', async function () {

    await this.materialpage.deleteUploadedMaterials(this.uploadedMaterials)

});

Then('Validate materials are not present in the table', async function () {

    for (const Validatedeletedmaterial of this.uploadedMaterials) {
        await expect(this.page.getByText(Validatedeletedmaterial)).not.toBeVisible();


    };
});


When('Materials are uploaded click on sort button and fetch the material list', async function () {


    await this.materialpage.waitForLoadingToComplete();

    this.originalMaterialList = await this.materialpage.fetch_all_materials();
    console.log('Original Material List:', this.originalMaterialList);

    await this.materialpage.sortascendingbutton();

    await this.materialpage.waitForLoadingToComplete();

    this.actualascorder = await this.materialpage.fetch_all_materials();
    console.log('Sorted Material List:', this.actualascorder);
    this.expectedascorder = [...this.originalMaterialList].sort((a, b) => {
        const lowerA = a.toLowerCase();
        const lowerB = b.toLowerCase();

        if (lowerA === lowerB) {
            return a > b ? -1 : 1;
        }

        return lowerA.localeCompare(lowerB);
    });

    console.log('Expected Sorted Order:', this.expectedascorder);



});

Then('Validate the materials are sorted in ascending order', async function () {

    await expect(this.actualascorder).toEqual(this.expectedascorder);

});

When('Materials are uploaded click on sort button', async function () {


    await this.materialpage.waitForLoadingToComplete();
    this.originalMaterialList = await this.materialpage.fetch_all_materials();
    console.log('Original Material List:', this.originalMaterialList);


    await this.materialpage.sortdescendingbutton();

    await this.materialpage.waitForLoadingToComplete();



    this.actualdescorder = await this.materialpage.fetch_all_materials();
    console.log('Sorted Descending Material List:', this.actualdescorder);

    this.expecteddescorder = [...this.originalMaterialList].sort((a, b) => {
        const lowerA = a.toLowerCase();
        const lowerB = b.toLowerCase();

        if (lowerA === lowerB) {
            return a < b ? -1 : 1;
        }

        return lowerB.localeCompare(lowerA);
    });

    console.log('Expected Descending Sorted Order:', this.expecteddescorder);
});


When('Validate material names are sorted in descending order', async function () {

    await expect(this.actualdescorder).toEqual(this.expecteddescorder);

});

When('Ensure no materials are present in the table', async function () {
    await this.materialpage.clickonMaterialsbutton();
    const count = await this.materialpage.getMaterialCount();
    console.log('Current Material Count:', count);

    if (count > 0) {
        const allMaterials = await this.materialpage.fetch_all_materials();
        console.log('Existing materials:', allMaterials);

        for (const materialName of allMaterials) {
            await this.materialpage.clickhamberger(materialName);
            await this.materialpage.clickdeletebutton();
            await this.materialpage.clickconfirmdeletebutton();

            await this.page.waitForTimeout(5000); // small wait for delete completion
        }

        // Validate list is empty now
        await this.page.waitForTimeout(10000)
        const finalCount = await this.materialpage.getMaterialCount();

        console.log('Material Count after cleanup:', finalCount);
        expect(finalCount).toBe(0);
    } else {
        console.log('No materials found, proceeding...');
    }
});

Then('click on add new material text from the table', async function () {

    await this.materialpage.clickoncreatematerialNux();
});

Then('Enter the same Material Name again in the text box', async function () {

    await this.materialpage.Entermaterialname(this.uniqueMaterialName);

});


Then('Validate the error mesaage for duplicated material creation', async function () {

    await expect(this.page.getByText("Validation failed: Name has already been taken")).toBeVisible();


});

Then('fetch all the dates for the created materials', async function () {

    await this.materialpage.waitForLoadingToComplete();
    this.originalDateList = await this.materialpage.fetch_all_dates();
    console.log('Original Date List:', this.originalDateList);

});

Then('click on ascending order button for the date column', async function () {

    await this.materialpage.dateascendingorder();
    await this.materialpage.waitForLoadingToComplete();
    this.actualdateascorder = await this.materialpage.fetch_all_dates();
    console.log('Sorted Date Ascending List:', this.actualdateascorder);
    this.expecteddateascorder = [...this.originalDateList].sort((a, b) => new Date(a) - new Date(b));
    console.log('Expected Date Ascending Sorted Order:', this.expecteddateascorder);

});

Then('Validate the materials are sorted in ascending order based on the date', async function () {

    await expect(this.actualdateascorder).toEqual(this.expecteddateascorder);
    console.log('Dates are sorted in ascending order as expected');

});

Then('click on descending order button for the date column', async function () {

    await this.materialpage.datedescendingorder();
    await this.materialpage.waitForLoadingToComplete();
});

Then('Validate the materials are sorted in descending order based on the date', async function () {

    this.actualdatedescorder = await this.materialpage.fetch_all_dates();
    console.log('Sorted Date Descending List:', this.actualdatedescorder);
    this.expecteddatedescorder = [...this.originalDateList].sort((a, b) => new Date(b) - new Date(a));
    console.log('Expected Date Descending Sorted Order:', this.expecteddatedescorder);
    await expect(this.actualdatedescorder).toEqual(this.expecteddatedescorder);
    console.log('Dates are sorted in descending order as expected');
});

Then('fetch all the names for the  created materials', async function () {

    await this.materialpage.waitForLoadingToComplete();
    this.originalAddedByList = await this.materialpage.fetch_all_addedbynames();
    console.log('Original Added By List:', this.originalAddedByList);

});

Then('click on ascending order button for the Added by column', async function () {

    await this.materialpage.addedbyascendingorder();
    await this.materialpage.waitForLoadingToComplete();
    this.actualaddedbyascorder = await this.materialpage.fetch_all_addedbynames();
    console.log('Sorted Added By Ascending List:', this.actualaddedbyascorder);


});

Then('Validate the names are sorted in ascending order', async function () {
    this.expectedaddedbyascorder = [...this.originalAddedByList].sort();
    console.log('Expected Added By Ascending Sorted Order:', this.expectedaddedbyascorder);
    await expect(this.actualaddedbyascorder).toEqual(this.expectedaddedbyascorder);
    console.log('Names are sorted in ascending order as expected');

});

Then('click on descending order button for the Added by column', async function () {

    await this.materialpage.addedbydescendingorder();
    await this.materialpage.waitForLoadingToComplete();

});

Then('Validate the names are sorted in descending order', async function () {

    this.actualaddedbydescorder = await this.materialpage.fetch_all_addedbynames();
    console.log('Sorted Added By Descending List:', this.actualaddedbydescorder);
    this.expectedaddedbydescorder = [...this.originalAddedByList].sort().reverse();
    console.log('Expected Added By Descending Sorted Order:', this.expectedaddedbydescorder);
    await expect(this.actualaddedbydescorder).toEqual(this.expectedaddedbydescorder);
    console.log('Names are sorted in descending order as expected');

});
