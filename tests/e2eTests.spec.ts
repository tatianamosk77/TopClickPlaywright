import { test, expect } from '@playwright/test';
import {MainPage} from '../pages/mainPage';
import { CalculatorPage } from '../pages/calculatorPage';
import { ResultPage } from '../pages/resultPage';
import { ReportPage } from '../pages/reportPage';

const allure = require("allure-js-commons");

const login = "tester@inzhenerka.tech";
const password = "LetsTest!";

async function authorization(page) {
  const mainPage = new MainPage(page);
  await mainPage.openPage();
  await mainPage.fillCredentials(login, password);
  await mainPage.clickSignInButton();
}

test('E2E-сценарий. Расчет столешницы', async ({ page }) => {
  const calcPage = new CalculatorPage(page);
  const resultPage = new ResultPage(page);
  const reportPage = new ReportPage(page);

    const responsePromise = page.waitForResponse(
        (response) => response.url().endsWith("/calculation_report")
      );

      await allure.step("Авторизоваться", async () => {
    await authorization(page);
      })
      await allure.step("Переключить на П-образную столешницу", async () => {
    await calcPage.clickToUCountertop();
      })
      await allure.step("Выбрать ширину = 4", async () => {
    await calcPage.selectThicknessFour();
      })
      await allure.step("Выключить плинтус", async () => {
    await calcPage.selectPlinth();
      })
      await allure.step("Добавить кухонный остров", async () => {
    await calcPage.selectKitchenIsland();
      })
      await allure.step("Добавить проточки для стока воды", async () => {
    await calcPage.selectWaterDrainage(); })

    await allure.step("Выбрать цвет N-103 Gray Onix", async () => {
    await calcPage.selectAcrylic();
    await calcPage.selectNeomarmOnyxColour();
    })
    await allure.step("Нажать [Рассчитать]", async () => {
     await calcPage.clickCalcButton();
    })
    await allure.step("Сгенерировать отчет", async () => {
    await resultPage.clickOpenReport();
    })
      const response = await responsePromise;

      const responseBody = await response.json();
       
      await page.goto(responseBody['6']['report_url']);

      await allure.step("Проверить отчет на соответствие выбранным деталям", async () => {
      await reportPage.checkMaterial();
      await reportPage.checkCountertopType();
      await reportPage.checkOptions();
      await reportPage.checkFinalCost();
      })

   });