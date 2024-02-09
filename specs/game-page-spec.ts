import { test } from "@playwright/test";
const { RiotGamesPage } = require("../pages/RiotGamesPage");

const testCases = [
  { game: "VALORANT" },
  { game: "LEAGUE OF LEGENDS" }
  // Add more test cases as needed
];

for (const testCase of testCases) {
  test(`Go to the ${testCase.game} home page`, async function ({ page }) {
    const riotGamesPage = new RiotGamesPage(page);
    await riotGamesPage.goToRiotGamesSite();
    await riotGamesPage.clickRiotLogo();
    await riotGamesPage.clickGameButton(testCase.game);
  });
}
