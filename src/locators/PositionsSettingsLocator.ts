const PositionsSettingsLocators = {
    positionsTab: 'a[ui-sref="settings.positions"]',
    formTemplatesSubTab: 'a[ui-sref="settings.positions.form_templates"]',
    pendingReasonsSubTab: 'a[ui-sref="settings.positions.pending_reasons"]',
    declineReasonsSubTab: 'a[ui-sref="settings.positions.decline_reasons"]',
    approveReasonsSubTab: 'a[ui-sref="settings.positions.approve_reasons"]',
    waiveReasonsSubTab: 'a[ui-sref="settings.positions.waive_reasons"]',
    closeReasonsSubTab: 'a[ui-sref="settings.positions.position_close_reasons"]',
    noteTypesSubTab: 'a[ui-sref="settings.positions.communication_note_types"]',
    veritasEvaluationTypesSubTab: 'a[ui-sref="settings.positions.veritas_evaluation_types"]',
    addTemplateButton: 'div[ng-click="addQ()"]',
    templateNameField: '.form-control.ng-pristine.ng-untouched.ng-valid',
    saveTemplateName: '.glyphicon.glyphicon-ok',
    addQuestionButton: '[ng-click="addQuestion(q)"]',
    selectTypeQuestionDropDown:'input[placeholder="Select type ..."]',
    questionType:'.nvc-sl-popover-item-name.ng-binding',
    questionNameField:'.form-control.resize-vertical.form-description.ng-pristine.ng-untouched.ng-invalid.ng-invalid-required',
    listRatingValueField_BeforeFilter:'div[class="cn-questionare-steps clearfix ng-scope"]',
    listRatingValueField_AfterFilter:'input[ng-model="tagName"]',
    plusAddIcon:'.icon16.icon-add',
    saveChangesButton: '[ng-click="saveQ(q)"]',
    templateRowName: '.ng-binding.ng-scope',
 

}
export default PositionsSettingsLocators