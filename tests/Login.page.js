import { Selector } from 'testcafe'

export default class Page {
  constructor () {
    this.navToLoginPage = Selector('#nav-link-accountList')
    this.textBox = {
      account: Selector('#ap_email'),
      password: Selector('#ap_password')
    }
    this.button = {
      continue: Selector('#continue'),
      signIn: Selector('#signInSubmit')
    }
    this.authAlertBox = Selector('#auth-error-message-box')
    this.alertField = {
      account: Selector('#auth-email-missing-alert'),
      password: Selector('#auth-password-missing-alert')
    }
  }
}
