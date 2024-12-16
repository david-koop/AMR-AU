const UsersSettingsLocators = {
    usersTab: 'a[ui-sref="settings.users"]',
    rolesSubTab: 'a[ui-sref="settings.users.roles"]',
    usersListSubTab: 'a[ui-sref="settings.users.list"]',
    addNewRoleButton: 'button[title="Add new role"]',
    roleNameField: '#formSettingsEditRole_name',
    permissionsCheckBox: '.checkbox_icon.control-label.ng-binding',
    okButton: 'button[ng-click="ok()"]',
    addNewUserButton:'button[ng-click="openUserModal()"]',
    firstNameField:'#id_first_name',
    lastNameField:'#id_last_name',
    emailUserField:'#id_email',
    personalZoomLinkField:'#id_personal_zoom_link',
    selectRoleDropdown: 'input[placeholder="Select role..."]',
    rolesList: '.nvc-sl-popover-item-name.ng-binding',
    resetNotRequiredCheckBox: 'label[for="reset_not_required"]',
    activateWithoutConfirmationCheckBox: 'label[for="manually"]',
    newPasswordField:'#id_password',
    confirmPasswordField:'#id_password_confirm',
    saveUserButton: 'button[ng-click="save()"]',
    usersOrRolesNameRow:'.settingsListItem.ng-scope',
    successMessage:'div[role="alert"][type="success"]',
    duplicateEmail:'.ng-binding.ng-scope',



}
export default UsersSettingsLocators