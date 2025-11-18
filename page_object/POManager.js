const { LoginPage } = require('../page_object/LoginPage')
const { MaterialPage } = require('../page_object/MaterialPage')
const { CertificatesPage } = require('../page_object/CertificatesPage')
const { ProjectPhotosPage } = require('../page_object/ProjectPhotosPage')
const { OpsPortalPage } = require('../page_object/OpsPortalPage')
const { AllProjectsDashboardPage } = require('../page_object/AllProjectsDashboardPage')
const { ProjectDashboardPage } = require('../page_object/ProjectDashboardPage')
const { GroupsPage } = require('../page_object/GroupsPage')

class POManager {

    constructor(page) {
        this.page = page;
        this.loginpage = new LoginPage(page);
        this.materialpage = new MaterialPage(page);
        this.certificatespage = new CertificatesPage(page)
        this.projectphotospage = new ProjectPhotosPage(page)
        this.opsportalpage = new OpsPortalPage(page)
        this.allprojectsdashboardpage = new AllProjectsDashboardPage(page)
        this.projectdashboardpage = new ProjectDashboardPage(page)
        this.groupspage = new GroupsPage(page)
    }


    getLoginPage() {

        return this.loginpage;
    }

    getMaterialPage() {

        return this.materialpage;
    }

    getCertificatesPage() {
        return this.certificatespage;

    }

    getProjectPhotosPage() {
        return this.projectphotospage;
    }

    getOpsPortalPage() {
        return this.opsportalpage;
    }

    getAllProjectsDashboardPage() {
        return this.allprojectsdashboardpage;
    }

    getProjectDashboardPage() {
        return this.projectdashboardpage;
    }

    getGroupsPage() {
        return this.groupspage;
    }
}

module.exports = { POManager };
