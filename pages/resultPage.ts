import {Page, Locator} from "@playwright/test";

export class ResultPage{
    page: Page;
    openReportButton: Locator;
  
    constructor(page){ 
        this.page = page; 
        this.openReportButton = page.getByTestId('open-report-button');
      }

      async clickOpenReport(){
        await this.openReportButton.click();
      }
}
