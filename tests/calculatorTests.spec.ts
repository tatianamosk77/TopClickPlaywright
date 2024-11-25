import { test, expect } from '@playwright/test';
import {MainPage} from '../pages/mainPage';
import { CalculatorPage } from '../pages/calculatorPage';
import { Severity } from "allure-js-commons";

const allure = require("allure-js-commons");

const login = 'tester@inzhenerka.tech';
const password = 'LetsTest!';


test.describe("Тесты на расчет кухни", async () => {
  test.beforeEach("Авторизоваться", async ({ page }) => {
    await allure.description("Тесты, проверяющие возможность работы со столешницей",);
    await allure.owner("Владыка тестов");
    await allure.tags("калькулятор", "столешница");
    await allure.severity(Severity.CRITICAL);
    await allure.link("https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_659d235d16f1ad2e3975abca_659e574eeb35721ecb8e912b/scale_1200", "Требование");


    const mainPage = new MainPage(page);
    await mainPage.openPage();
    await mainPage.fillCredentials(login, password);
    await mainPage.clickSignInButton();
  });

test('Столешница скрывается при нажатии на [Скрыть столешницу]', async ({ page }) => {
const calcPage = new CalculatorPage(page);

 await calcPage.clickToHideCountertop();
 await calcPage.checkHiddenCountertop();

    
});

test('Переключение на П-образную столешницу', async ({ page }) => {
    const calcPage = new CalculatorPage(page);

await calcPage.clickToUCountertop();
await calcPage.checkUShapedCountertop(); 
       
   });
  });