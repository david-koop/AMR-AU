const GeneralDetailsSettingsLocators = {
    editButton: 'button[type="button"][ng-click="editOrg()"]',
    imageLogo: '[class="upload-file-blc formEditOrg-upload-file text-center"]',
    inputImageLogo: 'input[type="file"]',
    testSMTPButton: 'button[class="btn btn-default"]',
    emailAddressField: '#setFocus',
    OKSendButton: 'button[type="submit"]',
    successSendMessage:'.success',
    saveButton: 'button[ng-click="ok()"]',
    successSaveMessage:'div[role="alert"][type="success"]',
    branchesTab: 'a[ui-sref="settings.general.branches"]',
    addBranchButton: 'button[type="button"][ng-click="openBranchModal()"]',
    branchNameField: '#id_name',
    saveBranchButton: '.btn.btn-blue-border',
    turnOnBranchesButton: 'label[for="id_branches_enabled"]',
    branchNameRow:'.textEl.ng-binding',
    XButton: '[aria-hidden="true"]',


}
export default GeneralDetailsSettingsLocators