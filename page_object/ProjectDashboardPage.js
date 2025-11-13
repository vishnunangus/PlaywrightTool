const path = require("path");
const { expect } = require("playwright/test");


class ProjectDashboardPage{

     /**
 * @param {import('@playwright/test').Page} page
 */

    constructor(page)
    {
         /** @type {import('@playwright/test').Page} */

        this.page = page;
        this.project_dashboard_photocount = page.locator("button[id='photos-button-id'] span div");
        this.back_btn = page.locator("span[id='back-button-id']");
        this.uploadphotobtn = page.getByRole('button', { name: 'Upload Photos' });




    }


    async fetch_project_dashboard_photocount()
    {
        const count = await this.project_dashboard_photocount.innerText();
        const actualcount = parseInt(count, 10);
        return actualcount;
    }

    async clickonbackbutton()

    {
        await this.back_btn.click();

    }
    async clickuploadphotobtn()
    {

        await this.uploadphotobtn.waitFor({state:'visible'});
        await expect(this.uploadphotobtn).toBeEnabled();
        await expect(this.uploadphotobtn).toBeVisible();
        await this.uploadphotobtn.scrollIntoViewIfNeeded();
        const filepath = path.join(__dirname, '../test-data/Photos/Photo3.jpeg')
        await this.page.setInputFiles("#contained-button-file-empty",filepath);

    }

     async validatephotosSuccessMessage() {

        const snackbar = this.page.locator('div[aria-describedby="notistack-snackbar"]').first();
        await expect(snackbar).toHaveText('The photo has been uploaded successfully', { timeout: 10000 });
        await expect(snackbar).toBeVisible();
    }
}

module.exports = {ProjectDashboardPage}
