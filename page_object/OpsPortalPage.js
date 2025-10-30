const { expect } = require("playwright/test");

class OpsPortalPage {
    constructor(page) {

        this.page = page;
        this.title = page.locator('a[href="/"] div:nth-of-type(2) > span > span:nth-child(3)[title]');
        this.dot_list = page.locator("span[class='dot-name']");
        this.loadingspinner = page.locator("div[data-testid='backdropLoadingTestId']");
        this.hover_icon = page.locator('a[href="/"]');
        this.createproject = page.locator('button[data-testid="createProjectButtonId"]');
    }

    async fetchDOT() {

        await this.title.waitFor({ state: 'visible', timeout: 15000 });
        return await this.title.innerText();
    }

    async clickonmyaccount()
    {
        await this.page.getByText('My Account').click();
    }

    async clickonswitchagency()
    {
        await this.page.getByText('Switch Agency').click();
    }

    async fetchalldotnames()
    {
        const dotnames = [];
        const count = await this.dot_list.count();      
        for (let i = 0; i < count; i++) {
            const dotname = await this.dot_list.nth(i).innerText();
            dotnames.push(dotname);
        }   

        console.log("List of all DOT names: ", dotnames);
        return dotnames;
    }

    async waitforswitching()
    {
        await this.loadingspinner.waitFor({ state: 'detached', timeout: 60000 });
        await this.page.waitForLoadState('networkidle');

    }

    async switchdotsuccessmessage()
    {
        return this.page.getByText('Switched DOT Account successfully').isVisible();
    }

    async hoverOnOpsPortalIcon()
    {
        await this.hover_icon.hover();
    }

    async validateCreateProjectButtonIsVisible()
    {
        await this.createproject.waitFor({ state: 'visible',});
    }
}




module.exports = { OpsPortalPage };