import {Page, Locator} from "@playwright/test";
import { expect } from '@playwright/test';

export class ReportPage{
    page: Page;
    material: Locator;
    countertopType: Locator;
    options: Locator;
    finalCost: Locator
  
    constructor(page){ 
        this.page = page; 
        this.material = page.locator("//td[text()='Материал']/following-sibling::*").first();
        this.countertopType = page.locator("//td[text()='Тип столешницы']/following-sibling::*").first();
        this.options = page.locator("//td[text()='Опции']/following-sibling::*").first();
        this.finalCost = page.locator("//td[text()='Стоимость итоговая']/following-sibling::*").nth(2);

      }
      async checkMaterial(){
        await expect(this.material).toContainText("acryl:Neomarm:N-103 Gray Onix");
       
      }
      async checkCountertopType(){
        await expect(this.countertopType).toContainText("П-образная");
        
      }

      async checkOptions(){
        await expect(this.options).toContainText("Проточки для стока воды");
        
      }

      async checkFinalCost(){
        await expect(this.finalCost).toContainText("451500.00 ₽");
   
      }
}
