
const { expect } = require('playwright/test');



class CertificatesPage {
    /**
  * @param {import('@playwright/test').Page} page
  */
    constructor(page) {
        /** @type {import('@playwright/test').Page} */

        this.page = page;
        this.certificatebtn = page.getByText("Certificate Types");
        this.addIconbtn = page.locator("svg[data-testid='AddIcon']");
        this.name_field = page.getByPlaceholder("Enter Certificate Type Name");
        this.description_field = page.locator("textarea");
        this.submit_tbn = page.locator("div[class='sc-enBMOK jRFXRw'] button:nth-child(2)");
        this.delete_Btn = page.locator("ul[role='menu'] li:has-text('Delete')");
        this.confirmdelete = page.locator('button[data-testid="accessButtonTestId"]');
        this.certificateslist = page.locator("tr td:nth-child(1)");
        this.save_btn = page.getByText('Save');
        this.nux = page.getByText('Click here to add a certificate type');
        this.search = page.getByPlaceholder('Search by Certificate Type...');
        this.btn_ascorder = page.locator("button[title='Certificate Type'] svg:nth-child(1)");
        this.btn_descorder = page.locator("button[title='Certificate Type'] svg")
        this.certificatesDateslist = page.locator("tr td:nth-child(2)");
        this.certificatesCreatedBylist = page.locator("tr td:nth-child(3)");
        this.dateascorder = page.locator("button[title='Date Added'] svg:nth-child(1)");
        this.datedescorder = page.locator("button[title='Date Added'] svg");
        this.nameascorder = page.locator("button[title='Added By'] svg:nth-child(1)");
        this.namedescorder = page.locator("button[title='Added By'] svg");


    }

    async click_on_certificatetab() {
        await this.certificatebtn.click();

    }

    async click_on_addbtn() {
        await this.addIconbtn.click();
    }

    async Enter_certificate_name(certificateName) {
        await this.name_field.fill(certificateName);
    }


    async Enter_certificate_description(certificateDescription) {
        await this.description_field.fill(certificateDescription);
    }

    async click_on_submit() {
        await this.submit_tbn.click();
    }

    async validateSuccessMessage() {

        const snackbar = this.page.locator('div[aria-describedby="notistack-snackbar"]').first();
        await expect(snackbar).toHaveText('Certificate added successfully', { timeout: 10000 });
        await expect(snackbar).toBeVisible();
    }

    async clickhamberger(certificateName) {
        const hamberger_btn = this.page.locator(`tr:has(td[title="${certificateName}"]) td:nth-child(4) button`);
        await hamberger_btn.click();
    }

    async clickhambergeredit(certificateName) {
        const hamberger_btn = this.page.locator(`tr:has(td[title="${certificateName}"]) td:nth-child(4) button:has-text('Edit')`);
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
        await expect(snackbar).toHaveText('Certificate type deleted successfully', { timeout: 10000 });
        await expect(snackbar).toBeVisible();
    }

    async waitForLoadingToComplete() {

        await this.page.waitForSelector('tr[data-testid="skeletonRow"]', { state: 'detached' });
    }

    async clickoneditbutton() {
        await this.page.locator('tr:has(td[title="Test Certificate_1758620850108"])').getByRole('button', { name: 'Edit' }).click();

    }

    async clickonsavebtn() {
        await this.save_btn.click();
    }

    async validateEditedSuccessMessage() {
        const snackbar = this.page.locator('div[aria-describedby="notistack-snackbar"]').first();
        await expect(snackbar).toHaveText('Certificate edited successfully', { timeout: 10000 });
        await expect(snackbar).toBeVisible();
    }

    async getCertificatesCount() {

        await this.page.getByRole('progressbar').waitFor({ state: 'hidden' });
        const countText = await this.page.locator("a[href='/admin/material-certificates/certificate-types'] span:nth-of-type(2)").innerText();
        return Number(countText.replace(/[() ]/g, ''));


    }

    async fetch_all_certificates() {
        return this.certificateslist.allTextContents();
    }

    async fetch_all_dates()
    {
        return this.certificatesDateslist.allTextContents();
    }

    async fetch_all_createdbynames()
    {
        return this.certificatesCreatedBylist.allTextContents();
    }

    async clickonnux()
    {
        await this.nux.click();
    }

    async EntersearchText(CertificateName) {
    {
        await this.search.fill(CertificateName);
    }
    }
    async detachprogressbar() {

        await this.page.getByRole('progressbar').waitFor({ state: 'hidden' });
    }

    async getCertificateName(CertificateName)
    {
        return this.page.locator(`tr:has(td[title="${CertificateName}"]) td:nth-child(1)`).textContent();
    }

     async getCertificatecreateddate(CertificateName)
    {
        return this.page.locator(`tr:has(td[title="${CertificateName}"]) td:nth-child(2)`).textContent();
    }

     async getCertificatecreatedname(CertificateName)
    {
        return this.page.locator(`tr:has(td[title="${CertificateName}"]) td:nth-child(3)`).textContent();
    }

    async sortascendingbutton() {
        await this.btn_ascorder.click();
    }

    async sortdescendingbutton() {
        await this.btn_descorder.click();
    }

    async dateascendingbutton() {
        await this.dateascorder.click();
    }                                   

    async datedescendingbutton() {
        await this.datedescorder.click();
    }

    async nameascendingbutton() {
        await this.nameascorder.click();
    }   

    async namedescendingbutton() {
        await this.namedescorder.click();
    }

     
}

module.exports = { CertificatesPage };