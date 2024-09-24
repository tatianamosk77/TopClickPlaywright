import { test, expect } from '@playwright/test';
import {Page, Locator} from "@playwright/test";

export class CalculatorPage{
    page: Page;
    userName: Locator;
    hideCountertopButton: Locator;
    addEdgeOrPlintButton: Locator;
    changeEdgeOrPlintButton: Locator;
    uShapedButton: Locator;
    leftLengthCountertop: Locator;
    leftWidthtCountertop: Locator;
    thickness: Locator;
    titleFour: Locator;
    plinthButton: Locator;
    island: Locator;
    waterDrainage: Locator;
    acrylic: Locator;
    allColours: Locator;
    neomarm: Locator;
    onyxColour: Locator;
    calcButton: Locator;
  
    constructor(page){ 
        this.page = page; 
        this.userName = page.locator("//div[@id='root']//h2").first();
        this.hideCountertopButton = page.getByTestId('hide-countertop');        
        this.addEdgeOrPlintButton = page.getByTestId("add-edge-or-plinth");   
        this.changeEdgeOrPlintButton = page.getByTestId("edge-or-plinth");
        this.uShapedButton =  page.getByTestId('countertop-type-u');
        this.leftLengthCountertop = page.locator('[style="top: 50%; left: 14%;"]');
        this.leftWidthtCountertop = page.locator('[style="top: 72.6%; left: 20%;"]');         
        this.thickness = page.getByTestId('select-thickness').first();
        this.titleFour = page.locator('.selectTitle');
        this.plinthButton = page.getByTestId('top-button').nth(2);
        this.island = page.getByText('Остров');
        this.waterDrainage = page.getByText('Проточки для стока воды');
        this.acrylic = page.getByText('Акрил').first();
        this.allColours = page.locator("[alt='all']");
        this.neomarm = page.getByText('Neomarm').first();
        this.onyxColour = page.getByText('N-103 Gray Onix');
        this.calcButton = page.getByTestId('calc-button');    
    
    }

    async selectThicknessFour(){
        await this.thickness.click();
        await this.titleFour.click();
    }

    async selectPlinth(){
        await this.plinthButton.click();
    }

    async selectAcrylic(){
        await this.acrylic.click();
    }

    async selectKitchenIsland(){
        await this.island.click();
    }
    async selectWaterDrainage(){
        await this.waterDrainage.click();

    }

    async selectNeomarmOnyxColour(){
        await this.allColours.click();
        await this.neomarm.click();
        await this.onyxColour.click();
    }

    async clickCalcButton(){
        await this.calcButton.click();
    }
    async checkUserName(){
        await expect(this.userName).toHaveText('Tester');
    }
   async clickToHideCountertop(){
    await this.hideCountertopButton.click();
   }

   async checkHiddenCountertop(){
    await expect(this.addEdgeOrPlintButton).toBeHidden();
    await expect(this.changeEdgeOrPlintButton).toBeHidden();
   }

   async clickToUCountertop(){
    await this.uShapedButton.click();
   }

   async checkUShapedCountertop(){
await expect(this.leftLengthCountertop).toBeVisible();
await expect(this.leftWidthtCountertop).toBeVisible();
   }
}