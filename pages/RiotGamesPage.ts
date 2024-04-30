import { Page } from "@playwright/test";
export class RiotGamesPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  get riotLogo() {
    return "div[class*='riotbar-fist-logo']";
  }

  getGameButton(game: string) {
    let locator: string = "div[data-testid='riotbar:appswitcher2:product-title-<game>']";
    return locator.replace("<game>", game);
  }

  get loginButton() {
    return "a[data-testid*='button-login']";
  }
  get signInButton() {
    return "button[data-testid='btn-signin-submit']";
  }

  get sumnerNameButton() {
    return "div[data-testid*='summonername']";
  }
  get usernameField() {
    return "input[name='username']";
  }

  get passwordField() {
    return "input[name='password']";
  }
  get riotGamesURL() {
    return "https://www.riotgames.com/en";
  }

  async goToRiotGamesSite() {
    await this.page.goto(this.riotGamesURL);
  }
  async clickRiotLogo() {
    await this.page.locator(this.riotLogo).waitFor({ state: "visible" });
    await this.page.locator(this.riotLogo).click();
  }

  async clickGameButton(game: string) {
    await this.page.locator(this.getGameButton(game)).waitFor({ state: "visible" });
    await this.page.locator(this.getGameButton(game)).click();
  }

  async clickLogin() {
    await this.page.locator(this.loginButton).waitFor({ state: "visible" });
    await this.page.locator(this.loginButton).click();
  }

  async signInWithCredentials(username: string, password: string) {
    await this.page.locator(this.usernameField).waitFor({ state: "visible" });
    await this.page.locator(this.usernameField).fill(username);
    await this.page.locator(this.passwordField).fill(password);
    await this.page.locator(this.signInButton).waitFor({ state: "attached" });
    await this.page.locator(this.signInButton).click();
  }

  async successfulLogin(sumner: string) {
    await this.page.locator(this.sumnerNameButton).waitFor({ state: "visible" });
    let sumnerName = await this.page.locator(this.sumnerNameButton).textContent();
    return sumnerName.includes(sumner);
  }
}
