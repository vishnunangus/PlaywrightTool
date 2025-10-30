const { Given, When, Then, } = require('@cucumber/cucumber');
const { expect } = require('playwright/test');
const { POManager } = require('../../page_object/POManager');
const { CertificatesPage } = require('../../page_object/CertificatesPage')


When('Click on certificates button', async function () {

    await this.certificatespage.click_on_certificatetab();

});


Then('I click on add button', async function () {

    await this.certificatespage.click_on_addbtn();

});

Then('I enter the certificate name as {string}', async function (certificateName) {

    const UniqueCertificateName = `${certificateName}_${Date.now()}`;
    this.uniquecertificatename = UniqueCertificateName;
    await this.certificatespage.Enter_certificate_name(UniqueCertificateName);

});

Then('I enter the description as {string}', async function (certificateDescription) {

    const UniqueCertificateDescription = `${certificateDescription}_${Date.now()}`;
    this.certificatedescription = UniqueCertificateDescription;
    await this.certificatespage.Enter_certificate_description(UniqueCertificateDescription);

});

Then('I click on submit button', async function () {

    await this.certificatespage.click_on_submit();

});


Then('Validate certificate creation message is fired successfully', async function () {

    await this.certificatespage.validateSuccessMessage();

});

Then('I validate created certificate is in the table', async function () {

    await this.certificatespage.waitForLoadingToComplete();

    await expect(this.page.getByText(this.uniquecertificatename)).toBeVisible();

});

Then('Click on Hamberger menu of the created certificate', async function () {

    await this.certificatespage.clickhamberger(this.uniquecertificatename);

});

When('I click on Delete button', async function () {

    await this.certificatespage.clickdeletebutton();

});

Then('I click on confirm delete button', async function () {

    await this.certificatespage.clickconfirmdeletebutton();

});

Then('Validate certificate deleted message if fired successfully', async function () {

    await this.certificatespage.validateDeleteSuccessMessage();

});

When('I click on edit button for the created certificate', async function () {

    await this.certificatespage.clickhambergeredit(this.uniquecertificatename);

});


Then('I edit the name as {string}', async function (suffix) {

    const EditedCertificateName = `${this.uniquecertificatename}${suffix}`;
    this.EditedCertificateName = EditedCertificateName;
    await this.certificatespage.Enter_certificate_name(EditedCertificateName);

});


Then('I edit the certifcate description as {string}', async function (suffixdesc) {

    const EditedCertificateDescription = `${this.uniquecertificatename}${suffixdesc}`;
    this.EditedCertificateDescription = EditedCertificateDescription;
    await this.certificatespage.Enter_certificate_description(EditedCertificateDescription);


});


Then('I click on save button', function () {

    this.certificatespage.clickonsavebtn();

});

Then('I validate certificate edited message is fired', async function () {

    await this.certificatespage.validateEditedSuccessMessage();

});

Then('I validate edited certificate is in the table', async function () {

    await expect(this.page.getByText(this.EditedCertificateName)).toBeVisible();

});


Then('Click on Hamberger menu of the edited certificate', async function () {

    await this.certificatespage.clickhamberger(this.EditedCertificateName);
});


Then('Get the count for the certificates Before creating', async function () {

    this.count = await this.certificatespage.getCertificatesCount();
    console.log("original count is: ", this.count);

});


Then('Validate the count got increased by one', async function () {

    const incrementedCount = await this.certificatespage.getCertificatesCount();
    this.incrementedCount = incrementedCount;
    console.log("Incremented count is: ", incrementedCount);
    expect(incrementedCount).toBe(this.count + 1)
    console.log("Count incremented correctly")

});

Then('I validate the count is decremented by one', async function () {

    expect(this.count).toBe(this.incrementedCount - 1)
    console.log("Count decremented correctly")

});

Then('Ensure that no certificates are present in the table', async function () {

    this.startcount = await this.certificatespage.getCertificatesCount();


    if (this.startcount > 0) {
        const originalcertificatelist = await this.certificatespage.fetch_all_certificates();
        for (existingcertificate of originalcertificatelist) {
            await this.certificatespage.clickhamberger(existingcertificate);
            await this.certificatespage.clickdeletebutton();
            await this.certificatespage.clickconfirmdeletebutton();
        }

        await this.page.waitForTimeout(5000);
        const finalcount = await this.certificatespage.getCertificatesCount();
        expect(finalcount).toBe(0);
    }
    else {
        console.log('No materials found, proceeding...');

    }
});

Then('Click on add new certificate button nux', async function () {

    await this.certificatespage.clickonnux();
});



Then('click on search bar and Enter the name of the created certficate', async function () {

    await this.certificatespage.EntersearchText(this.uniquecertificatename);
});

Then('Validate the in the table only one record is present', async function () {

    const filteredcertificatelist = await this.certificatespage.fetch_all_certificates();
    this.filteredcertificatelist = filteredcertificatelist;
    expect(filteredcertificatelist).toContain(this.uniquecertificatename);


});

Then('Validate the count after searching the certificate is one', async function () {


    expect(this.filteredcertificatelist.length).toBe(1);
    console.log("Filtered list count is: ", this.filteredcertificatelist.length);
    await this.certificatespage.detachprogressbar();
    this.count = await this.certificatespage.getCertificatesCount();
    console.log("searched count is: ", this.count);

});

Then('Validate certificate name in the grid', async function () {

    const actualCertificateName = await this.certificatespage.getCertificateName(this.uniquecertificatename);
    await expect(actualCertificateName).toBe(this.uniquecertificatename);


});

Then('Validate certificate creted time in the grid', async function () {

    const now = new Date();

    const expectedTime = now.toLocaleString('en-US', {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",

    }).replace(',', '');

    const actualTime = await this.certificatespage.getCertificatecreateddate(this.uniquecertificatename);

    const expectedDateObj = new Date(expectedTime);
    const actualDateObj = new Date(actualTime);

    const timeDiffMs = Math.abs(expectedDateObj.getTime() - actualDateObj.getTime());
    const timeDiffMinutes = timeDiffMs / (1000 * 60);

    console.log('Time Difference in Minutes:', timeDiffMinutes);

    expect(timeDiffMinutes).toBeLessThanOrEqual(1);

});


Then('Validate Added by name is {string} in the grid', async function (actualCreatedName) {

    const expectedCreatedName = await this.certificatespage.getCertificatecreatedname(this.uniquecertificatename);
    await expect(actualCreatedName).toBe(expectedCreatedName);
});

Then('Get all the certificate types from the grid', async function () {

    await this.certificatespage.waitForLoadingToComplete();

    this.originalCertificatesList = await this.certificatespage.fetch_all_certificates();

    await this.certificatespage.sortascendingbutton();
    await this.certificatespage.waitForLoadingToComplete();

    this.actualascorder = await this.certificatespage.fetch_all_certificates();
    console.log('Actual Ascending List (UI):', this.actualascorder);

    this.expectedascorder = [...this.originalCertificatesList].sort((a, b) =>
        a.localeCompare(b, 'en', { sensitivity: 'variant', caseFirst: 'upper' })
    );
});
Then('click on ascending sort and validate the order', function () {

    expect(this.actualascorder).toEqual(this.expectedascorder);
    console.log('Ascending order validation passed ✅');
});

Then('click on descending sort and validate the order', async function () {

    await this.certificatespage.sortdescendingbutton();
    await this.certificatespage.waitForLoadingToComplete();

    this.actualdescorder = await this.certificatespage.fetch_all_certificates();
    this.expecteddescorder = [...this.actualdescorder].sort((a, b) =>
        b.localeCompare(a, 'en', { sensitivity: 'base' })
    );
    console.log('Expected Descending Order:', this.expecteddescorder);
    console.log('Actual Descending List (UI):', this.actualdescorder);

    expect(this.actualdescorder).toEqual(this.expecteddescorder);
    console.log('✅ Descending order validation passed');

});

Then('I fetch all the dates for the created materials', async function () {

    await this.certificatespage.waitForLoadingToComplete();
    this.originalDatesList = await this.certificatespage.fetch_all_dates();
    console.log('Original Dates List:', this.originalDatesList);

});

Then('Click on ascending order button for the date created at column', async function () {

    await this.certificatespage.dateascendingbutton();
    await this.certificatespage.waitForLoadingToComplete();



});

Then('Validate the ascending order for the dates', async function () {

    this.actualDateascorder = await this.certificatespage.fetch_all_dates();
    console.log('Actual Ascending Dates List (UI):', this.actualDateascorder);
    this.expectedDateascorder = [...this.originalDatesList].sort((a, b) => new Date(a) - new Date(b));
    console.log('Expected Ascending Dates List:', this.expectedDateascorder);
    expect(this.actualDateascorder).toEqual(this.expectedDateascorder);
    console.log('Ascending date order validation passed ✅')
});

Then('Click on descending order button for the date created at column', async function () {

    await this.certificatespage.datedescendingbutton();
    await this.certificatespage.waitForLoadingToComplete();


});

Then('Validate the descending order for the dates', async function () {

    this.actualDatedescorder = await this.certificatespage.fetch_all_dates();
    console.log('Actual Descending Dates List (UI):', this.actualDatedescorder);
    this.expectedDatedescorder = [...this.actualDatedescorder].sort((a, b) => new Date(b) - new Date(a));
    console.log('Expected Descending Dates List:', this.expectedDatedescorder);
    expect(this.actualDatedescorder).toEqual(this.expectedDatedescorder);
    console.log('✅ Descending date order validation passed');

});


Then('I fetch all the names for the created materials', async function () {

    await this.certificatespage.waitForLoadingToComplete();
    this.originalNamesList = await this.certificatespage.fetch_all_createdbynames();
    console.log('Original Names List:', this.originalNamesList);
    
         });


 Then('Click on ascending order button for the Added By column', async function () {

    await this.certificatespage.nameascendingbutton();
    await this.certificatespage.waitForLoadingToComplete();
          
         });
         
 Then('Validate the ascending order for the names', async function () {

    this.actualascorder = await this.certificatespage.fetch_all_createdbynames();
    this.expetedascorder = [...this.originalNamesList].sort();
    console.log('Expected Ascending Order:', this.expetedascorder);
    console.log('Actual Ascending List (UI):', this.actualascorder);
    await expect(this.actualascorder).toEqual(this.expetedascorder);
    console.log('Ascending order validation passed ✅ for names')

           
         });
         
Then('Click on descending order button for the Added By column',async  function () {

    await this.certificatespage.namedescendingbutton();
    await this.certificatespage.waitForLoadingToComplete();
          
         });
         
Then('Validate the descending order for the names', async function () {

    this.actualdescorder = await this.certificatespage.fetch_all_createdbynames();
    this.expecteddescorder = [...this.actualdescorder].sort().reverse();
    console.log('Expected Descending Order:', this.expecteddescorder);
    console.log('Actual Descending List (UI):', this.actualdescorder);
    await expect(this.actualdescorder).toEqual(this.expecteddescorder);
    console.log('✅ Descending order validation passed for names');
          

         });