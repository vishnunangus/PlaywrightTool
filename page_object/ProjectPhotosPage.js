const { expect } = require("playwright/test");
const path = require('path');




class ProjectPhotosPage {

    /**
 * @param {import('@playwright/test').Page} page
 */
    constructor(page) {

        /** @type {import('@playwright/test').Page} */

        this.page = page;
        this.btn_switchopsportal = page.locator("svg[data-testid='PortalAdminSwitcherIcon']");
        this.select__first_project = page.locator("h5[data-testid='projectsViewHeaderTitle']");
        this.btn_project_photos = page.locator("button[id='photos-button-id']");
        this.btn_uploadphoto = page.locator("button[data-testid='uploadImageButtonTestId']");
        this.fileInput = page.locator("section:has-text('Photo Gallery') input[type='file']");
        this.delete_photo_icon = page.locator('span', { hasText: 'Delete' });
        this.download_photo_icon = page.locator('span', { hasText: 'Download' });
        this.confirm_delete_button = page.locator("button[data-testid='accessButtonTestId']");
        this.preview_photo_icon = page.locator('span', { hasText: 'Preview' });
        this.photocount = page.locator('h2 span span');
        this.preview_page = page.locator('button[data-testid="screenNextButtonTestId"]');
        this.btn_preview_download = page.locator('button[data-testid="screenDownloadImageButtonTestId"]');
        this.btn_preview_delete = page.locator('button[data-testid="screenRemoveImageButtonTestId"]');
        this.dashboard_project_name = page.locator('div[id="project-name-id"]');
        this.preview_project_name = page.locator('span[data-testid="screenProjectNameTestId"]');
        this.preview_created_date_time = page.locator('span[data-testid="screenCreatedAtTestId"]');
        this.preview_created_by = page.locator('span[data-testid="screenCreatedByTestId"]');
        this.cardview_projectname = page.locator("span[data-testid='projectNameTestId']");
        this.cardview_created_date_time = page.locator("span[data-testid='createdAtTestId']");
        this.cardview_created_by = page.locator("span[data-testid='createdByTestId']");
        this.summary_button = page.locator("button[data-testid='imageSummaryButtonTestId']");
        this.summarylocator = page.locator("svg[data-testid='DWRAIIcon']");
        this.back_btn = page.locator("button[data-testid='backButtonTestId']");





    }

    async clickOnOpsPortalButton() {
        await this.btn_switchopsportal.click();
        await this.page.waitForLoadState('networkidle');

    }

    async selectFirstProject() {
        await this.select__first_project.first().click();
        await this.page.waitForLoadState('networkidle');

    }

    async clickOnProjectPhotosTab() {
        await this.btn_project_photos.click();
        await this.page.waitForLoadState('networkidle');
    }

    async clickOnUploadPhotoButton() {

        await this.page.waitForLoadState('networkidle');

    }

    async uploadPhoto(photoPath) {

        const filepath = path.join(__dirname, '../test-data/Photos/Photo1.jpeg')
        await this.fileInput.setInputFiles(filepath);
        await this.page.waitForLoadState('networkidle');


    }

    async deleteFirstPhoto() {

        await this.delete_photo_icon.first().click();
        await this.confirm_delete_button.click();
        await this.page.waitForLoadState('networkidle');

    }

    async downloadFirstPhoto() {

        await this.download_photo_icon.first().click();
        await this.page.waitForLoadState('networkidle');
    }

    async preview_firstphoto() {

        await this.preview_photo_icon.first().click();
        await this.page.waitForLoadState('networkidle');
    }

    async validateUserIsOnPreviewMode() {

        return this.preview_page

    }

    async clickOnDownloadButtonInPreviewMode() {

        await this.btn_preview_download.click();
        await this.page.waitForLoadState('networkidle');

    }

    async clickOnDeleteButtonInPreviewMode() {

        await this.btn_preview_delete.first().click();
        await this.confirm_delete_button.click();
        await this.page.waitForLoadState('networkidle');

    }

    async deleteallphotos() {
        const deleteicons = await this.delete_photo_icon.count();
        for (let i = 0; i < deleteicons; i++) {
            await this.delete_photo_icon.first().click();
            await this.confirm_delete_button.click();
        }

        await this.page.waitForLoadState('networkidle');
    }

    async validatephotosSuccessMessage() {

        const snackbar = this.page.locator('div[aria-describedby="notistack-snackbar"]').first();
        await expect(snackbar).toHaveText('The photo has been uploaded successfully', { timeout: 10000 });
        await expect(snackbar).toBeVisible();
    }

    async validatedeletephotosSuccessMessage() {

        const snackbar = this.page.locator('div[aria-describedby="notistack-snackbar"]').first();
        await expect(snackbar).toHaveText('The photo has been removed successfully', { timeout: 10000 });
        await expect(snackbar).toBeVisible();
    }

    async fetchPhotoCount() {
        await this.page.locator('span.MuiSkeleton-root.MuiSkeleton-pulse').first().waitFor({ state: 'hidden', timeout: 10000 });
        const countText = await this.photocount.first().innerText();
        const actualcount = parseInt(countText, 10);
        return actualcount;

    }

    async validateNoDataInGallery() {
        const nodata = this.page.locator('h3', { hasText: 'No data available' });
        await expect(nodata).toBeVisible({ timeout: 10000 });

    }

    async fetchprojectnameindashboard() {
        const projectname = await this.dashboard_project_name.innerText();
        return projectname;
    }

    async fetchprojectnameinpreviewmode() {
        const previewprojectname = await this.preview_project_name.innerText();
        return previewprojectname;
    }

    async fetchcreateddatetimeinpreviewmode() {
        const previewcreateddatetime = await this.preview_created_date_time.innerText();
        return previewcreateddatetime;
    }

    async fetchcreatedbyinpreviewmode() {
        const previewcreatedby = await this.preview_created_by.innerText();
        return previewcreatedby;
    }

    async fetchprojectnameincardview() {
        const cardviewprojectname = await this.cardview_projectname.first().innerText();
        return cardviewprojectname;
    }

    async fetchcreatedbycardview() {

        const cardviewcreateduser = await this.cardview_created_by.first().innerText();
        return cardviewcreateduser;

    }

    async fetchcreateddatetimecardview() {
        const cardviewdatetime = await this.cardview_created_date_time.first().innerText();
        return cardviewdatetime;
    }

    async clickhidesummary()
    {
        await this.summary_button.click();
    }

    async clickshowsummary()
    {
        await this.summary_button.click();
    }

    async btnhidesummarytext()
    {
        await expect(this.page.getByText("Hide Summary")).toBeVisible();
    }

     async btnshowsummarytext()
    {
        await expect(this.page.getByText("Show Summary")).toBeVisible();
    }

    async showsummarytext()
    {
      const summaryVisible = await this.summarylocator.first().isVisible();
      expect(summaryVisible).toBeTruthy();
      console.log("summary is visible");
    }

     async hidesummarytext()
    {
       const summaryinVisible = await this.summarylocator.first().isVisible();
       expect(summaryinVisible).toBeFalsy();
       console.log("summary is not visible")

    }

    async click_on_back_button()

    {
        await this.back_btn.click();

    }
}
module.exports = { ProjectPhotosPage };
