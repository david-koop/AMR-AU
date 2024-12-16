const LoginLocators = {
    languageDropDown: 'button[type="button"]',
    selectLanguage: 'li[option-id="lang.id"] span[class="ng-binding ng-scope"]',
    userNameField: '#login',
    passwordField: '#password',
    loginButton: 'form[ng-submit="ok()"] button[type="submit"]',
    forgotPasswordButton: 'a[ng-click="showForgot()"]',
    emailForgotField: '#forgot-login',
    sendResetLinkButton: 'form[ng-submit="forgotOk()"] span[class="ng-scope"]',
    logoutButton:'.navbar-link.cursor-pointer',
    successSendMessage:'div[ng-bind="$local.pwdSuccess.forgotText"]',




}
export default LoginLocators