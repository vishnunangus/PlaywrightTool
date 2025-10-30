const { expect } = require("playwright/test");

class AllProjectsDashboardPage{

     /**
 * @param {import('@playwright/test').Page} page
 */

    constructor(page)
    {
         /** @type {import('@playwright/test').Page} */

        this.page = page;
        this.searchbar = page.getByPlaceholder("Search Project Name or Supplier...");
        this.projectname = page.locator("h5[data-testid='projectsViewHeaderTitle'] div");
        this.project_card_photocount = page.locator("div[data-testid='projectsViewHeaderImage'] span");

    }

    async enterprojectname(ProjectName)
    {
        await this.searchbar.fill(ProjectName);
    }

    async fetch_projectname()
    {
        await this.page.waitForLoadState('networkidle')
        const projectname = await this.projectname.first().innerText();
        return projectname

    }

    async fetch_project_photoscount()
    {
        await this.page.waitForLoadState('networkidle')
        const count = await this.project_card_photocount.first().innerText();
        const actualcount = parseInt(count, 10);
        return actualcount;
    }

}

module.exports = {AllProjectsDashboardPage}
