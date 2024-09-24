import type {FullResult, Reporter, TestCase, TestResult} from '@playwright/test/reporter';
import axios from 'axios';
  
  class TelegramReporter implements Reporter {
    
   
    async onTestEnd(test: TestCase, result: TestResult) {
        console.log(`The test finished ${test.title}: ${result.status}`);
        const response = await axios.get(`https://api.telegram.org/bot1085237023:AAHAgm1JldCCECT4jNUYy-D_DGGStQ78v6o/sendMessage?chat_id=-1001160262850&text= ${test.title}:  ${result.status}`);

      }
    
  }

  
  export default TelegramReporter;