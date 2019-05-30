const puppeteer = require('puppeteer');

const scrapeUrl = 'https://www.gumtree.com.au/s-jobs/sydney/internship/k0c9302l3003435r50?ad=offering';


(async function main(){
    try{
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        //page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1');

        await page.goto(scrapeUrl);

        //await page.waitForNavigation();
        await page.waitForSelector('a.user-ad-row'); //waits till a listing is loaded
        const listings = await page.$$('a.user-ad-row');  //document.querySelectorAll
        console.log(listings.length);
        var index = 1;
        for (let i = 0; i < listings.length-1; i++){
            try{
                const button = await listings[i];
                //console.log(button);
                //console.log(button.)
                console.log(i);
                button.click();
                console.log('button clicked: ' + i);
            }catch(e){
                console.log('rezcatch error: ' + e);
                break;
            }
            
        }

        console.log('its showing');

    } catch (e){
        console.log('catch error: ' + e);
    }
})();