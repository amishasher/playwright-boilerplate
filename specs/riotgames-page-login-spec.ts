import { expect, test } from "@playwright/test";
import { assert } from "chai";
const { RiotGamesPage } = require("../pages/RiotGamesPage");

test.describe("Login tests", () => {
  let riotGamesPage;

  test.beforeEach(async ({ page }) => {
    riotGamesPage = new RiotGamesPage(page);
    await riotGamesPage.goToRiotGamesSite();
  });
  test.skip("Login with valid credentials", async () => {
    await riotGamesPage.clickLogin();
    await riotGamesPage.signInWithCredentials("LolGERProd03", "+'wkZcD@s5!$qpn");
    assert.isTrue(await riotGamesPage.sucessfullLogin("ZeeGerman03"));
  });

  test("Login with incorrect credentials", async () => {
    await riotGamesPage.clickLogin();
    await riotGamesPage.signInWithCredentials("invalidUsername", "invalidPassword");
  });

});
