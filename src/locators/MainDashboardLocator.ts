const MainDashboardLocators = {
    openChangePassword: 'span[ng-bind="states.identity.name"]',
    yesButton: '.btn.btn-blue-border',
    openOrganizationsListIcon: '.icon-triangle-down',
    organizationsName: '.cn-main-menu__link',
    addCandidateButton: 'a[ng-click="createCandidate()"]',
    candidateButton: 'a[href="#/candidates_in_process"]',
    calendarButton: 'a[href="#/schedule"]',
    settingsButton: 'a[ui-sref="settings"]',
    addPositionButton: 'a[href="#/position/0/general"]',
    searchField: 'input[ng-change="search();"]',
    successSendMessage:'div[role="alert"][type="success"]',




}
export default MainDashboardLocators