const puppeteer = require('puppeteer');

const scrapeUrl = 'https://www.gumtree.com.au/s-jobs/sydney/internship/k0c9302l3003435r50?ad=offering';

//============Keywords object has a priority (how important it is to me) and the actual word. These are stored in arrKeywords==============
var keyWord = function(priority, word){
    this.priority = priority,
    this.word = word
};
var arrKeywords = [];


(async function main() {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(scrapeUrl, { waitUntil: 'networkidle2' });
        await page.waitForSelector('.user-ad-row'); 
        const listings = await page.$$('a.user-ad-row');  
        console.log(listings.length);
        //This for loop iterates through each listing on the scrapeUrl page
        for (let i = 0; i < listings.length; i++) {
            console.log(i + '\n');
            await page.goto(scrapeUrl, { waitUntil: 'networkidle2' });
            await page.waitForSelector('.user-ad-row'); 
            const listings = await page.$$('a.user-ad-row');  
            const button = await listings[i];
            
            button.click();
            await page.waitForSelector('.vip-ad-description__content');
            var adInfo = await page.$('.vip-ad-description__content');
            var adText = await adInfo.$$('p,  #text, li');
            //This for loop iterates through all the text in a given listing
            var alltextString = '';
            for (let i = 0; i < adText.length; i++) {
                var text = await (await adText[i].getProperty('innerHTML')).jsonValue();
                alltextString += text;
                alltextString += ' ';
            }
            //console.log(alltextString);
            await analyseListing(alltextString);
        }
        console.log('its showing');
        await browser.close();

    } catch (e) {
        console.log('catch error: ' + e);
    }
})();

function analyseListing(content){
    console.log(content.toLowerCase());
}


// arrKeywords.push(new keyWord(10, 'developer'));
// arrKeywords.push(new keyWord(10, 'software'));
// arrKeywords.push(new keyWord(10, 'engineer'));
// arrKeywords.push(new keyWord(8, 'web'));
// arrKeywords.push(new keyWord(3, 'design'));
// arrKeywords.push(new keyWord(10, 'CSS'));
// arrKeywords.push(new keyWord(10, 'Node'));
// arrKeywords.push(new keyWord(10, 'React'));

arrKeywords.push(new keyWord(10, 'developer'));
