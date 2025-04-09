import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $, browser } from '@wdio/globals';
// import allure from 'allure-commandline';
// const allureReporter = require('@wdio/allure-reporter').default;
import allureReporter from '@wdio/allure-reporter'
import path from 'node:path'

var GB_AccountNumber;

Given(/^I login to the SSC Portal$/, async () => {
    // await browser.setWindowSize(1365, 945)
    await browser.maximizeWindow();
    let browserTitle = await browser.getUrl();
    if (browserTitle.includes("about:blank")) {
    await browser.url("https://awddev.trialclient1.awdcloud.co.uk/awd/portal/login.html")
        await expect(browser).toHaveUrl("https://awddev.trialclient1.awdcloud.co.uk/awd/portal/login.html")
        await $("#user-name").setValue("AUTOTEST")
        await $("#password").setValue("TestAutomation3!")
        await $("#sign-on").click()
        await $("//div[@class='ui-card-main-text'][contains(text(),'Worklist')]").waitForDisplayed(5000);
    }
    // await allureReporter.addAttachment("screenshot", Buffer.from(await browser.takeScreenshot(), 'base64'),"image/png")
});

When('I create a {string} worklist', async (businessAreaDropdown) => {
    await $("#create-btn").click()
    await $("//div[@class='ui-card-main-text'][normalize-space()='Create']").waitForDisplayed(3000);
    await $("//app-create-work//select[contains(@id,'work-businessArea')]").selectByVisibleText(businessAreaDropdown)
    await $("//app-create-work//select[contains(@id,'work-status')]").selectByVisibleText("TOCREATE")
    await saveCurrentPageScreenshot();
    await $("//app-create-work[@createworkresource='CRTWORK']//button[@type='submit'][normalize-space()='Create']").click();
    await $("//span[@class='p-accordion-header-text'][contains(text(),'Created Items')]").waitForDisplayed(3000);
    await $("//div[@class='ui-card focused-card']//button//svg-icon[contains(@src,'close')]").click();
});


When('I Open the first case from the worklist', async () => {
    // Check if case already opened
    let caseOpenedState = await $("//div[contains(text(),'PACLIFE - UNDERWRITE')]").isExisting();
    console.log("------------------>",caseOpenedState)
    if(caseOpenedState!=true)
    {
        // ------Open the first item: by double click
        await browser.pause(2000);

        await $("//button[normalize-space()='Refresh']").click();
        await saveCurrentPageScreenshot();
        await $("//div[@class='awd-item selected default-size']//span[@class='awd-ba-type-data'][normalize-space()='PACLIFE - UNDERWRITE']/..").doubleClick();
        // await $("//div[@class='awd-item selected default-size']//span[@class='awd-ba-type-data'][normalize-space()='PACLIFE - UNDERWRITE']/..").click();
        
    }
})

When('I select Owner as Yes and continue without client list', async()=>{
    // ------Owner-Page-Filling
    await $("//div[@class='ui-card focused-card']//div[contains(text(),'PACLIFE - UNDERWRITE')]").waitForDisplayed(5000);
    await $("//input[@value='Yes']").click();
    await saveCurrentPageScreenshot();
    // await $("//select[@name='response']").selectByVisibleText("Yes - Keep me as owner")
    await $("//button[contains(text(),'Next')]").click();

    // ------Continue without client list
    await $("//input[@value='Continue without client list']").waitForDisplayed()
    await $("//input[@value='Continue without client list']").click();
    await saveCurrentPageScreenshot();
    await $("//button[contains(text(),'Next')]").click();
    await $("//h2[contains(text(),'Underwriting Create Case')]").waitForDisplayed();
})

When('I fill the Underwriting Create case details', async()=>{
    // ------ Underwriting case details
    await $("//h2[contains(text(),'Underwriting Create Case')]").waitForDisplayed();
    await $("//select[@awdname='ECAS']").selectByVisibleText("Underwriter");
    await $("//input[@title='Client Reference']").setValue("Test");
    await $("//select[@awdname='CLNM']").selectByVisibleText("ACME Ltd");
    await $("//select[@awdname='RFRN']").selectByVisibleText("Above CAL");
    await $("//input[@awdname='CCNM']").setValue("Joseph Barbara")
    await $("//input[@awdname='EFRM']").setValue("josaeph4.barbara12@outlook.com")
    await $("//input[@awdname='SALU']").setValue("Mr")
    // Insure Person details on same page
    await $("//input[@awdname='FNAM']").setValue("Minnie")
    await $("//input[@awdname='LNAM']").setValue("Rosh")
    await $("//input[@awdname='DOB']").setValue("04-04-1978")
    await $("//select[@awdname='GEND']").selectByVisibleText("FEMALE")
    await $("//select[@awdname='SMKR']").selectByVisibleText("No")
    await $("//input[@awdname='OCCU']").setValue("Chef")
    await $("//select[@awdname='LIFE']").selectByVisibleText("Single")
    await $("//input[@awdname='CRCK']").click()
     await saveCurrentPageScreenshot();
    await $("//button[@name='Save']").click()
    await $("//span[@class='ui-dialog-title'][text()='Notice']").waitForDisplayed(2000);
    await $("//button[normalize-space()='Continue']").click();
    await $("//span[@class='ui-dialog-title'][text()='Notice']").waitForDisplayed({ reverse: true });
})

When('I click view data', async()=>{
    // View Data Underwriting Create Case Page
    await $("//div[@class='ui-card focused-card']//div[@class='ui-card-header']//button[@class='icon-btn']").click()
    await $("//li//span[normalize-space()='View Data']").click();
    await $("//th[normalize-space()='Data Dictionary Name']").waitForDisplayed();
    await $("//app-view-data[@class='ng-star-inserted']//button[3]").click()
    await $("//th[normalize-space()='Data Dictionary Name']").waitForDisplayed({ reverse: true });
})

When('I click view SAP Results', async()=>{
    await $("//button[@name='SAPSearch']").waitForDisplayed(3000);
    await $("//button[@name='SAPSearch']").click();
    await $("//legend[normalize-space()='SAP Search Criteria']").waitForDisplayed(5000);
    await saveCurrentPageScreenshot();
    await $("//button[@name='Back']").click();
})

When('I click view Chorus Results', async()=>{
    await $("//button[@name='ChorusSearch']").waitForDisplayed(3000)
    await $("//button[@name='ChorusSearch']").click();
    await $("//legend[normalize-space()='Chorus Search Criteria']").waitForDisplayed(5000);
    await saveCurrentPageScreenshot();
    await $("//button[@name='Back']").click();

})

When('I click create Link Folder', async()=>{
    await $("//button[@name='fLinkFolder']").waitForDisplayed()
    await $("//button[@name='fLinkFolder']").click();
    await $("//h3[normalize-space()='Reason for creating Link Folder?']").waitForDisplayed(5000);
    await saveCurrentPageScreenshot();
    await $("//button[contains(text(),'Back')]").click();
    // await $("//h3[normalize-space()='Reason for creating Link Folder?']").waitForDisplayed({reverse: true});
    await $("//button[@name='fLinkFolder']").waitForDisplayed()

})

When('I click Send for Referral', async()=>{
    await $("//button[@name='referral']").waitForDisplayed(5000);
    await $("//button[@name='referral']").click();
    await $("//h2[normalize-space()='Select Referral Team']").waitForDisplayed(3000);
    await saveCurrentPageScreenshot();    await saveCurrentPageScreenshot();
    await $("//button[@name='Back']").click();
    await $("//button[@name='referral']").waitForDisplayed();

})

When('I upload a File in Underwriting screen', async()=>{
    await $("//button[@name='fileUploader']").click();
    await $("//h2[normalize-space()='Create & Link Attachment']").waitForDisplayed();
    await $("//select[@id='sourceBusAreaInput-']").selectByVisibleText("PACLIFE")
    await $("//select[@id='sourceFileTypeInput-']").selectByVisibleText("EMAILOUT")
    const filePath = 'DrivingLicense.pdf';
    const remoteFilePath = await browser.uploadFile(filePath);
    await browser.$("#fileBrowse-").setValue(remoteFilePath);
})

When('I proceed and fill treaty details', async()=>{
    await $("//button[@name='NextStep']").waitForDisplayed();
    await $("//button[@name='NextStep']").click();
    await $("//legend[normalize-space()='Capture Treaty & Benefits']").waitForDisplayed();
    await $("//select[@name='fTreaty']").selectByVisibleText("Treaty 1");
    await $("//select[@name='fDefaultBenefits']").selectByVisibleText("CI- Benefit 1");
    await $("//input[@awdname='TTYP'][@value='AGE']").click();
    await $("//select[@name='TERM']").selectByVisibleText("10");
    await $("//input[@name='fSumInsured']").setValue("140000")
    await $("//select[@name='DPER']").selectByVisibleText("4 Weeks");
    await $("//select[@name='DDIS']").selectByVisibleText("Any");
    await $("//button[@name='fAdd']").click();
    await $("//td//div[contains(text(),'Treaty 1')]").waitForDisplayed(5000);
    await saveCurrentPageScreenshot();
    await $("//button[@name='NextStep']").click();
    // await $("//button[normalize-space()='Proceed']").click();
    await $("//legend[normalize-space()='Sum Reinsurance - Current Application']").waitForDisplayed(5000);
  

})

When('I verify the treaty details in the ReInsurance Calculation', async(dataTable)=>{
    await $("//legend[normalize-space()='Sum Reinsurance - Current Application']").waitForDisplayed(5000);
    await $("//legend[normalize-space()='Sum Reinsurance - Current Application']").scrollIntoView();
    const rawTableData = await dataTable.raw();
    // console.log(rawTableData)
    // console.log(rawTableData[0].length)

    var index=0;
    for await(const i of rawTableData[0]){
        console.log(rawTableData[0][index], ":::",rawTableData[1][index]);
        await expect($("//td[contains(@headers,'"+rawTableData[0][index]+"')]/div")).toHaveText(rawTableData[1][index]);
        index++;
    }
    await browser.pause(1000);
    await saveCurrentPageScreenshot();
    await $("//button[@name='NextStep']").click();
    await $("//h2[normalize-space()='Limit Check Alerts']").waitForDisplayed(5000);
})

When('I proceed to Review case creation page and finish it', async()=>{
    await $("//button[@name='NextStep']").click();
    await $("//h3[normalize-space()='Review Case Creation']").waitForDisplayed();
    await saveCurrentPageScreenshot();
    await $("//button[contains(text(),'Next')]").click();
    await browser.pause(2000);
    await saveCurrentPageScreenshot();
    // await $("//button[contains(text(),'Next')]").waitForDisplayed({reverse: true});
})

When('I select keep me as owner and continue to next step', async()=>{
    await $("//h3[contains(text(),'You are the current owner of this case')]").waitForDisplayed(5000);
    await $("//select[@name='response']").selectByVisibleText("Yes - Keep me as owner");
    await saveCurrentPageScreenshot();
    await $("//button[contains(text(),'Next')]").click();
    await $("//h2[normalize-space()='Underwriting Assessment Form']").waitForDisplayed(2000);
    await saveCurrentPageScreenshot();


})

When('I click view data and verify the status is {string}', async(verifyText)=>{

    await $("//div[@class='ui-card focused-card']//div[@class='ui-card-header']//button[@class='icon-btn']").click()
    await $("//li//span[normalize-space()='View Data']").click();
    await $("//th[normalize-space()='Data Dictionary Name']").waitForDisplayed();
    await expect($("//td[normalize-space()='Status Code']/../td[3]")).toHaveText(verifyText);
    await saveCurrentPageScreenshot();
    await $("//app-view-data[@class='ng-star-inserted']//button[3]").click()
    await $("//th[normalize-space()='Data Dictionary Name']").waitForDisplayed({ reverse: true });

})

When('I click view data and capture {string} details', async(referenceTextField)=>{
    await $("//div[@class='ui-card focused-card']//div[@class='ui-card-header']//button[@class='icon-btn']").click()
    await $("//li//span[normalize-space()='View Data']").click();
    await $("//th[normalize-space()='Data Dictionary Name']").waitForDisplayed();
    GB_AccountNumber = await $("//td[normalize-space()='"+referenceTextField+"']/../td[3]").getText();
    await saveCurrentPageScreenshot();
    await $("//app-view-data[@class='ng-star-inserted']//button[3]").click()
    await $("//th[normalize-space()='Data Dictionary Name']").waitForDisplayed({ reverse: true });
})

When('test', async()=>{
    //button[normalize-space()='Proceed']
})

When('I click Send Email button and chk Email window opens', async()=>{
    
    // Click Email Button
    // await $("//div[@class='ui-accordion-content']").waitForDisplayed();
    await $("//button[@name='fComposeEmail']").waitForDisplayed()
    await $("//button[@name='fComposeEmail']").click();
    await $("//div[@class='ui-accordion-content']").waitForDisplayed();
    await $("//div[contains(text(),'PACLIFE - UNDERWRITE')]").moveTo();
    await saveCurrentPageScreenshot();
    await browser.switchFrame($("//iframe[@seamless='seamless']"));
    await expect($("//input[@id='toAddressList']")).toHaveValue("josaeph4.barbara12@outlook.com");
    await expect($("//input[@id='subjectLine']")).toHaveValue("Your Ref: Test, Case Ref: "+GB_AccountNumber);
    await browser.switchFrame($("//iframe['#emailbody_ifr']"));
    await expect($("//p[normalize-space()='test tester']")).toBeExisting();

    await browser.switchToParentFrame()
    await $("//button[@id='send']").waitForDisplayed(2000)
    await $("//button[@id='send']").click();
    // await $("//button[@id='send']").waitForDisplayed({reverse:true})
    await browser.pause(2000)
    await browser.switchToParentFrame();
    // $("//div[@id='attachmentUploader']//input[@type='file']").addValue("C:\\automation\\test.pdf.bmp")
    // browser.switchFrame($("#emailDoc"))
    await $("//button[contains(@name,'NextStep')]").waitForDisplayed();
    await $("//button[contains(@name,'NextStep')]").click();
    await $("//h3[normalize-space()='Offer of terms:']").waitForDisplayed();
    await $("//input[@value='accept']").click();
    await saveCurrentPageScreenshot();
    await $("//button[normalize-space()='Next']").click();

})

When('I proceed next steps', async () => {
    
})





// --------------------- End of Step File for SSC Portal

Then(/^I should see a flash message saying (.*)$/, async (message) => {
    await expect($('#flash')).toBeExisting();
    await expect($('#flash')).toHaveText(expect.stringContaining(message));
    
});


Then('I wait for {int} seconds', async (secondsToWait) => {
    await browser.pause(secondsToWait)
})

async function saveCurrentPageScreenshot(){
    await allureReporter.addAttachment("screenshot", Buffer.from(await browser.takeScreenshot(), 'base64'),"image/png")
}