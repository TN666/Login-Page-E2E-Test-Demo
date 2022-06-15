import Page from './Login.page.js'
import { SITE, ACCOUNT, PASSWORD } from '../configuration.js'

const page = new Page()

fixture`LoginPage`
  .page`${SITE}`
  .beforeEach(async t => {
    await t.click(page.navToLoginPage)
  })

test('[Functional] a user will be able to login with a valid account and valid password', async t => {
  await t
    .typeText(page.textBox.account, ACCOUNT)
    .click(page.button.continue)
    .typeText(page.textBox.password, PASSWORD)
    .click(page.button.signIn)
    .expect(page.navToLoginPage.attributes).contains({ 'data-csa-c-content-id': 'nav_youraccount_btn' })
})

test('[Functional] a user won\'t be able to login with a valid account and invalid password', async t => {
  await t
    .typeText(page.textBox.account, ACCOUNT)
    .click(page.button.continue)
    .typeText(page.textBox.password, 'invalidPassword')
    .click(page.button.signIn)
    .expect(page.button.signIn.exists).ok()
})

test('[Functional] Enter key of the keyboard is working correctly on the Login page', async t => {
  await t
    .typeText(page.textBox.account, ACCOUNT)
    .pressKey('enter')
    .typeText(page.textBox.password, PASSWORD)
    .pressKey('enter')
    .expect(page.navToLoginPage.attributes).contains({ 'data-csa-c-content-id': 'nav_youraccount_btn' })
})

test('[Functional] the password field appears only if the account is correct', async t => {
  await t
    .expect(page.textBox.password.exists).notOk()
    .typeText(page.textBox.account, ACCOUNT)
    .click(page.button.continue)
    .expect(page.textBox.password.exists).ok()
})

test('[Functional] the data in password field is either visible as asterisk or bullet signs', async t => {
  await t
    .typeText(page.textBox.account, ACCOUNT)
    .click(page.button.continue)
    .expect(page.textBox.password.attributes).contains({ type: 'password' })
})

test('[Security] an error message appears when clicking on the continue button with an empty account field', async t => {
  await t
    .click(page.button.continue)
    .expect(page.alertField.account.visible).ok()
})

test('[Security] an error message appears when clicking on the sign in button with an empty password field', async t => {
  await t
    .typeText(page.textBox.account, ACCOUNT)
    .click(page.button.continue)
    .click(page.button.signIn)
    .expect(page.alertField.password.visible).ok()
})

test('[Security] an alert box appears when clicking on the continue button with an invalid account in account field', async t => {
  await t
    .typeText(page.textBox.account, 'invalidAccount')
    .click(page.button.continue)
    .expect(page.authAlertBox.exists).ok()
})

test('[Security] an alert box appears when clicking on the sign in button with an invalid password in password field', async t => {
  await t
    .typeText(page.textBox.account, ACCOUNT)
    .click(page.button.continue)
    .typeText(page.textBox.password, 'invalidPassword')
    .click(page.button.signIn)
    .expect(page.authAlertBox.exists).ok()
})

test('[Security] the Login page against SQL injection attack', async t => {
  await t
    .typeText(page.textBox.account, '\'OR 1=1 --')
    .pressKey('enter')
    .expect(page.authAlertBox.exists).ok()
    .typeText(page.textBox.account, ACCOUNT, { replace: true })
    .pressKey('enter')
    .typeText(page.textBox.password, '\'OR 1=1 --')
    .pressKey('enter')
    .expect(page.authAlertBox.exists).ok()
})
