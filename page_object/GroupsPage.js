
const { expect } = require('playwright/test');

class GroupsPage {

    /**
* @param {import('@playwright/test').Page} page
*/

    constructor(page) {
        /** @type {import('@playwright/test').Page} */

        this.page = page;
        this.groups_btn = page.locator('svg[data-testid="GroupsIcon"]');
        this.recently_deleted_grps_btn = page.getByText("View Recently Deleted Groups");
        this.create_grp_btn = page.getByRole('button', { name: "Create Group" });
        this.input_groupname = page.getByLabel("Group Name");
        this.input_group_description = page.getByLabel("Group Description");
        this.creation_save_btn = page.getByRole('button', { name: 'Save' });
        this.back_btn = page.locator('div:has(p:has-text("Edit Group")) a[role="button"]');
        this.list_grpnames = page.locator("div.MuiGrid2-grid-xs-6 p");
    
    }

    async click_on_groups_tab() {
        await this.groups_btn.click();
    }

    async Validate_user_on_groups_page() {
        await expect(this.recently_deleted_grps_btn).toBeVisible();
    }

    async click_on_Create_group_btn() {
        await this.create_grp_btn.click();
    }

    async enter_group_name(GroupName) {
        await this.input_groupname.fill(GroupName);
    }

    async enter_group_description(GroupDescription) {

        await this.input_group_description.fill(GroupDescription);
    }

    async click_on_save_creation_btn() {
        await this.creation_save_btn.click();
    }

    async validate_group_creation_SuccessMessage() {
        const snackbar = this.page.locator('div[aria-describedby="notistack-snackbar"]').first();
        await expect(snackbar).toHaveText('Group created', { timeout: 10000 });
        await expect(snackbar).toBeVisible();
    }

    async click_on_back_btn() {
        await this.back_btn.click();
    }

    async list_group_names() {

        await this.page.waitForLoadState('networkidle');
        const nameslist = await this.list_grpnames.allTextContents();
        console.log("nameslist is:", nameslist);
        return nameslist;
    }

}

module.exports = { GroupsPage }
