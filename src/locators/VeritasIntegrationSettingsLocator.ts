const VeritasIntegrationSettingsLocators = {
    VeritasIntegrationTab: 'a[ui-sref="settings.integrations"]',
    OrgUnitIdField: '#veritas_org_unit_id',
    SecretKeyField: '#veritas_secret_key',
    testConnectionButton: 'button[ng-click="testConnection()"]',
    saveButton: 'button[ng-click="save()"]',
    connectionSuccessfulMessage: 'div[ng-if="connected === true"]',
    successSaveMessage:'div[role="alert"][type="success"]',

}
export default VeritasIntegrationSettingsLocators