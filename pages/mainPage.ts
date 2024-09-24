import { test, expect } from '@playwright/test';
import {Page, Locator} from "@playwright/test";
export class MainPage{
    page: Page;
    loginField: Locator;
    passwordField: Locator;
    signInButton: Locator;
    informationText: Locator;
    
    constructor(page){ 
        this.page = page; 
        this.informationText = page.locator("//div[@id='root']//h2");
        this.loginField = page.getByPlaceholder('логин');
        this.passwordField = page.getByPlaceholder('пароль');
        this.signInButton = page.locator("//button[@type='button']");
    }

    async openPage() {
        await this.page.goto("https://dev.topklik.online/");
    }

    async checkInformationText(){
        await expect(this.informationText).toHaveText("Войдите в личный кабинет, чтобы начать расчет.");
    }
    async clickSignInButton(){
        await this.signInButton.click();
    }

    async checkSignInButton(){
        await expect(this.signInButton).toBeVisible();
    }

    async fillCredentials(login, password) {
        await this.loginField.fill(login);
        await this.passwordField.fill(password);
    }

}