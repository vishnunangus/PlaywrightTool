const { expect } = require("playwright/test");



class MaterialPage {
    constructor(page) {

        this.page = page;
        this.material_certificates_btn = page.locator("li a[href='/admin/material-certificates/materials']");
        this.addIconbtn = page.locator("svg[data-testid='AddIcon']");
        this.addMaterialbtn = page.getByText('Manually add new materials one at a time.');
        this.materialname_txtbox = page.locator("input[placeholder='Enter Material Name...']");
        this.submit_btn = page.locator('footer button:has-text("Submit")');
        this.delete_Btn = page.locator("ul[role='menu'] li:has-text('Delete')");
        this.confirmdelete = page.locator('button[data-testid="accessButtonTestId"]');
        this.edit_btn = page.getByText('Edit');
        this.save_btn = page.getByText('Save');
        this.searchMaterialTextbox = page.locator("input[placeholder='Search by Material...']");
        this.bulkUploadbtn = page.getByText('Bulk Upload Material List');
        this.uploadFilebtn = page.locator("input[type='file']");
        this.uploadsavebtn = page.getByText("Save");
        this.closebtn = page.locator("footer[class='footer'] button");
        this.bulksuccess_msg = page.locator("div[aria-describedby='notistack-snackbar']");
        this.sortascending = page.locator("button[title='Material'] svg:nth-child(1)");
        this.sortdescending = page.locator("button[title='Material'] svg");
        this.materiallist = page.locator("tr td:nth-child(1)");
        this.materialdatelist = page.locator("tr td:nth-child(2)");
        this.materialaddedbylist = page.locator("tr td:nth-child(3)");
        this.nux = page.getByText('Click here to add a new material');
        this.dateascorder = page.locator("button[title='Date Added'] svg:nth-child(1)");
        this.datedescorder = page.locator("button[title='Date Added'] svg");
        this.addedbyascorder = page.locator("button[title='Added By'] svg:nth-child(1)");
        this.addedbydescorder = page.locator("button[title='Added By'] svg");


    }

    async clickonMaterialsbutton() {
        await this.material_certificates_btn.click();
    }


    async clickaddIcon() {
        await this.addIconbtn.click();
    }


    async clickonaddmaterialbutton() {
        await this.addMaterialbtn.click();
    }

    async Entermaterialname(MaterialName) {
        await this.materialname_txtbox.type(MaterialName)
    }

    async clicksubmit() {
        await this.submit_btn.click();
    }

    async clickhamberger(MaterialName) {
        const hamberger_btn = this.page.locator(`tr:has(td[title="${MaterialName}"]) td:nth-child(4) button`);
        await hamberger_btn.click();
    }

    async clickdeletebutton() {
        await this.delete_Btn.click();
    }

    async clickconfirmdeletebutton() {
        await this.confirmdelete.click();
    }

    async validateDeleteSuccessMessage() {
    const snackbar = this.page.locator('div[aria-describedby="notistack-snackbar"]').first();
    await expect(snackbar).toHaveText('Material deleted successfully', { timeout: 10000 });
    await expect(snackbar).toBeVisible();
}

 async validateEditedSuccessMessage() {
    const snackbar = this.page.locator('div[aria-describedby="notistack-snackbar"]').first();
    await expect(snackbar).toHaveText('Material edited successfully', { timeout: 10000 });
    await expect(snackbar).toBeVisible();
}

async validatecreatedSuccessMessage() {
    const snackbar = this.page.locator('div[aria-describedby="notistack-snackbar"]').first();
    await expect(snackbar).toHaveText('Material created successfully', { timeout: 10000 });
    await expect(snackbar).toBeVisible();
}
    async clickeditbutton() {
        await this.edit_btn.click();
    }

    async clicksavebutton() {
        await this.save_btn.click();
    }

    async Enterupdatedmaterialname(UpdatedMaterialName) {
        await this.materialname_txtbox.fill(UpdatedMaterialName)
    }

    async getMaterialName(MaterialName) {

        return this.page.locator(`tr:has(td[title="${MaterialName}"]) td:nth-child(1)`).textContent();


    }

    async getMaterialCreatedDate(MaterialName) {

        return this.page.locator(`tr:has(td[title="${MaterialName}"]) td:nth-child(2)`).textContent();
    }

    async getMaterialCreatedName(MaterialName) {
        return this.page.locator(`tr:has(td[title="${MaterialName}"]) td:nth-child(3)`).textContent();
    }

    async enterSearchText(MaterialName) {

        await this.searchMaterialTextbox.type(MaterialName);
    }

    async validateSearchResults(MaterialName) {
        return this.page.locator(`tr:has(td[title='${MaterialName}'])`);

    }

    async getMaterialCount() {

        await this.page.getByRole('progressbar').waitFor({ state: 'hidden' });
        const countText = await this.page.locator("a[href='/admin/material-certificates/materials'] span:nth-of-type(2)").innerText();
        return Number(countText.replace(/[() ]/g, ''));


    }

    async bulkoptionclick() {
        await this.bulkUploadbtn.click();

    }

    async uploadCsvFile(filePath) {


        await this.uploadFilebtn.setInputFiles(filePath);
    }

    async clickSaveButton() {
        await this.uploadsavebtn.click();
    }

    async close() {
        await this.closebtn.click();
    }

    async deleteUploadedMaterials(materialNamesArray) {
        for (const uploadedMaterialName of materialNamesArray) {

            const rowLocator = this.page.locator(`tr:has(td[title="${uploadedMaterialName}"])`);
            await this.clickhamberger(uploadedMaterialName);
            await this.delete_Btn.click();
            await this.confirmdelete.click();
            await rowLocator.waitFor({ state: 'detached', timeout: 5000 });

        }
    }

    async fetch_all_materials() {
        return this.materiallist.allTextContents();
    }

    async fetch_all_dates() {
        return this.materialdatelist.allTextContents();
    }

    async fetch_all_addedbynames() {
        return this.materialaddedbylist.allTextContents();
    }

    async dateascendingorder() {
        await this.dateascorder.click();
    }   

    async datedescendingorder() {
        await this.datedescorder.click();
    }   

    async addedbyascendingorder() {
        await this.addedbyascorder.click();
    }   

    async addedbydescendingorder() {
        await this.addedbydescorder.click();
    }   

    async sortascendingbutton() {
        await this.sortascending.click();
    }

    async sortdescendingbutton() {
        await this.sortdescending.click();
    }

    async waitForLoadingToComplete() {

        await this.page.waitForSelector('tr[data-testid="skeletonRow"]', { state: 'detached' });
    }

    async clickoncreatematerialNux()
    {
        await this.nux.click();
    }
}

module.exports = { MaterialPage };
