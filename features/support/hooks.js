const { chromium } = require('playwright');
const { Before, After, AfterStep, Status, setWorldConstructor, setDefaultTimeout } = require('@cucumber/cucumber');
const { POManager } = require('../../page_object/POManager');

class CustomWorld {

  constructor() {
    this.uploadedMaterials = [];
    this.actualascorder = [];
    this.actualdescorder = [];
    this.originalMaterialList = [];
    this.expectedascorder = [];
    this.expecteddescorder = [];
    this.materialpage = null;
    this.certificatespage = null;
    this.projectphotospage = null;
    this.opsportalpage = null;
    this.allprojectsdashboardpage = null;
    this.projectdashboardpage = null;


  }


  async launchBrowser() {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.POManager = new POManager(this.page);
    this.materialpage = this.POManager.getMaterialPage();
    this.certificatespage = this.POManager.getCertificatesPage();
    this.projectphotospage = this.POManager.getProjectPhotosPage();
    this.opsportalpage = this.POManager.getOpsPortalPage();
    this.allprojectsdashboardpage = this.POManager.getAllProjectsDashboardPage();
    this.projectdashboardpage = this.POManager.getProjectDashboardPage();

  }
}

setDefaultTimeout(60 * 1000);

setWorldConstructor(CustomWorld);

Before(async function () {

  await this.launchBrowser(); // now every scenario gets page
});

AfterStep(async function ({ result }) {
  if (result.status === Status.FAILED) {
    await this.page.screenshot({ path: 'Failedscreenshot.png' });
  }
});

After(async function () {
 // await this.browser.close();
});

module.exports = { CustomWorld };
