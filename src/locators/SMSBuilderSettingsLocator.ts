const SMSBuilderSettingsLocators = {
    SMSTab: 'a[ui-sref="settings.sms"]',
    SMSSendingRulesSubTab: 'a[ui-sref="settings.sms.builder"]',
    SMSTemplateSubTab: 'a[ui-sref="settings.sms.templates"]',
    SMSQueueSubTab: 'a[ui-sref="settings.sms.queue"]',
    addSMSTemplateButton: 'button[ng-click="addSmsTemplate()"]',
    templateNameField: '#tpl-name',
    templateContentField: '#tpl-content',
    addTagDropdown: '#add-tag-dropdown',
    saveTemplateButton: '[ng-click="save()"]',
    successSaveMessage:'div[role="alert"][type="success"]',
    templateRowName: '.cn-accordion-title.ng-binding',
    addEmailRule: '.fa.fa-plus',
    ruleNameField: '#tpl-name',
    selectTagsDropDown:'input[placeholder="Select tags..."]',
    tagsName:'.nvc-ms-popover-tab-item-name',
    selectStatusesDropDown:'input[placeholder="Select status..."]',
    statusName:'.nvc-sl-popover-item-name.ng-binding',
    selectTemplateDropDown:'input[placeholder="Select template..."]',
    templateName:'.nvc-sl-popover-item-name.ng-binding',
    saveRuleButton: '[ng-click="save()"]',
    ruleNameRow:'[ng-repeat="rule in rules"]',
    cancelRuleButton: '[ng-click="cancel()"]',
    alreadyExistingRuleMessage: 'div[role="alert"][type="danger"]',
    XButton: '[aria-hidden="true"]',


 
}
export default SMSBuilderSettingsLocators