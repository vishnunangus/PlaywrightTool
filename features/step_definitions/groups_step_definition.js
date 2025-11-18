const { Given, When, Then, } = require('@cucumber/cucumber');
const { POManager } = require('../../page_object/POManager');
const { GroupsPage } = require('../../page_object/GroupsPage');
const { expect } = require('playwright/test');
Then('I click on the Groups tab', async function () {

    await this.groupspage.click_on_groups_tab();
});


Then('Validate that I am on the groups page', async function () {

    await this.groupspage.Validate_user_on_groups_page();
});

Then('I click on create group button', async function () {

  await this.groupspage.click_on_Create_group_btn();
});

 Then('I enter the Group name as {string}', async function (GroupName) {

    const UniqueGroupName = `${GroupName}_${Date.now()}`;
    this.UniqueGroupName = UniqueGroupName;
    await this.groupspage.enter_group_name(UniqueGroupName)

});


  Then('I enter the Group description as {string}', async function (GroupDescription) {

    const UniqueGroupDescription = `${GroupDescription}_${Date.now()}`;
    this.UniqueGroupDescription = UniqueGroupDescription;
    await this.groupspage.enter_group_description(UniqueGroupDescription)
});

Then('I click on save button while group creation', async function () {

    await this.groupspage.click_on_save_creation_btn();
});

Then('I validate the success message for the group creation', async function () {

    await this.groupspage.validate_group_creation_SuccessMessage();
});

Then('I click on back button', async function () {

    await this.groupspage.click_on_back_btn();
});

Then('Validate the created is present in the list of groups', async function () {

    const Allgroupnames = await this.groupspage.list_group_names();
    await expect(Allgroupnames).toContain(this.UniqueGroupName);

});
