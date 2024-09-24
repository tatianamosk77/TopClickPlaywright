import { test, expect } from '@playwright/test';
import {MainPage} from '../pages/mainPage';
import { CalculatorPage } from '../pages/calculatorPage';

const login = "tester@inzhenerka.tech";
const password = "LetsTest!";


test('Сообщение о необходимости авторизоваться отображается на главной странице', async ({ page }) => {
  const mainPage = new MainPage(page);

  await mainPage.openPage();
  await mainPage.checkInformationText();

});

test('Авторизация. Логин и пароль корректны', {
  tag: ["@Позитивный", "@smoke"], 
  annotation: [
    { type: "Priority", description: "critical" },
    { type: "Description", description: "Пользователь может авторизоваться в системе" }
  ],
}, async ({ page }) => {
const mainPage = new MainPage(page);
const calcPage = new CalculatorPage(page);

await mainPage.openPage();
await mainPage.fillCredentials(login, password);
await mainPage.clickSignInButton();


await calcPage.checkUserName();


});

test('Авторизация. Логин и пароль пусты',  {
  tag: ["@Negative"], 
  annotation: [
    { type: "Priority", description: "major" },
    { type: "Description", description: "Нельзя авторизоваться без логина и пароля" }
  ],
}, async ({ page }) => {
  
  const mainPage = new MainPage(page);

await mainPage.openPage();
await mainPage.fillCredentials("", "");
await mainPage.clickSignInButton();

await mainPage.checkInformationText();
await mainPage.checkSignInButton();

});

test('Авторизация. Логин заполнен, пароль пуст',  {
  tag: ["@Negative"], 
  annotation: [
    { type: "Priority", description: "medium" },
    { type: "Description", description: "Пользователь не может авторизоваться без пароля" }
  ],
}, async ({ page }) => {
  
  const mainPage = new MainPage(page);
  await mainPage.openPage();
  await mainPage.fillCredentials(login, "");
  await mainPage.clickSignInButton();

  await mainPage.checkInformationText();
  await mainPage.checkSignInButton();

});

test('Авторизация. Логин пуст, пароль заполнен', {
  tag: ["@Negative"], 
  annotation: [
    { type: "Priority", description: "medium" },
    { type: "Description", description: "Пользователь не может авторизоваться без логина" }
  ],
}, async ({ page }) => {
  
  const mainPage = new MainPage(page);
  await mainPage.openPage();
  await mainPage.fillCredentials("", password);
  await mainPage.clickSignInButton();

  await mainPage.checkInformationText();
  await mainPage.checkSignInButton();
});

test('Авторизация. Пользователя не существует', {
  tag: ["@Negative"], 
  annotation: [
    { type: "Priority", description: "medium" },
    { type: "Description", description: "Пользователя не существует" }
  ],
}, async ({ page }) => {

  const responsePromise = page.waitForResponse(
    (response) => response.url().endsWith("/login")
  );

  const mainPage = new MainPage(page);
  await mainPage.openPage();
  await mainPage.fillCredentials(login + "1", password);
  await mainPage.clickSignInButton();

  const response = await responsePromise;

  const responseBody = await response.json();

  await expect(responseBody['message']).toEqual("Unauthorized");
  await expect(response.status()).toBe(401);  
});

test('Авторизация. Некорректный пароль', {
  tag: ["@Negative"], 
  annotation: [
    { type: "Priority", description: "critical" },
    { type: "Description", description: "Проверка пароля пользователя" }
  ],
}, async ({ page }) => {

  const responsePromise = page.waitForResponse(
    (response) => response.url().endsWith("/login")
  );

  
  const mainPage = new MainPage(page);
  await mainPage.openPage();
  await mainPage.fillCredentials(login, password + "1");
  await mainPage.clickSignInButton();

  const response = await responsePromise;

  const responseBody = await response.json();

  await expect(responseBody['message']).toEqual("Unauthorized");
  await expect(response.status()).toBe(401);  
});

test('Авторизация. Пробелы вместо логина/пароля', {
  tag: ["@Negative"], 
  annotation: [
    { type: "Priority", description: "medium" },
    { type: "Description", description: "Нельзя авторизоваться с пробелами в логине/пароле" }
  ],
}, async ({ page }) => {

  const responsePromise = page.waitForResponse(
    (response) => response.url().endsWith("/login")
  );

  
  const mainPage = new MainPage(page);
  await mainPage.openPage();
  await mainPage.fillCredentials("   ", "   ");
  await mainPage.clickSignInButton();

  const response = await responsePromise;

  const responseBody = await response.json();

  await expect(responseBody['message']).toEqual("Unauthorized");
  await expect(response.status()).toBe(401);  
});