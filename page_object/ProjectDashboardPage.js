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
}

module.exports = {ProjectDashboardPage}
