const puppeteer = require('puppeteer');

const scrapeUrl = 'https://www.gumtree.com.au/s-jobs/sydney/internship/k0c9302l3003435r50?ad=offering';


(async function main() {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        //page.setViewport({width: 1800, height: 800});
        //page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1');

        await page.goto(scrapeUrl, { waitUntil: 'networkidle2' });

        //await page.waitForNavigation({timeout: 0});
        await page.waitForSelector('.user-ad-row'); //waits till a listing is loaded
        const listings = await page.$$('a.user-ad-row');  //document.querySelectorAll
        console.log(listings.length);
        
        // for (let i = 0; i < listings.length - 5; i++) {
        //     try {
        //         const button = await listings[i];
        //         //console.log(button);
        //         //console.log(button.)
        //         console.log(i);
        //         button.click();
        //         console.log('button clicked: ' + i);
        //     } catch (e) {
        //         console.log('rezcatch error: ' + e);
        //         break;
        //     }

        // }
        try {
            var button = await listings[0];
            //console.log(button);
            //console.log(button.)
            //console.log(i);
            button.click();
            await page.waitForSelector('.vip-ad-description__content');
            var adInfo = await page.$('.vip-ad-description__content');
            var adText = await adInfo.$$('p');
            //console.log(adText.length + ' is num of para elements');
            // const para = await adText.$eval('p', (p)=>{
            //     console.log(p.innerHTML);
            // });
            for (let i = 0; i < adText.length; i++){
                var text = await (await adText[i].getProperty('innerHTML')).jsonValue();
                console.log(text);
            }
            //console.log('button clicked: ' + i);
        } catch (e) {
            console.log('rezcatch error: ' + e);
        }


        console.log('its showing');
        //await browser.close();

    } catch (e) {
        console.log('catch error: ' + e);
    }
})();