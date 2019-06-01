//Create by Rao Zoraiz Mahmood
/*This Program scrapes information from Gumtree jobs and searches for keywords in each listing and then stores all
  the listings of interest in a excel document*/
  
const puppeteer = require('puppeteer');


//TODO: Input search query and location into gumtree search
const scrapeUrl = 'https://www.gumtree.com.au/s-jobs/sydney/internship/page-1/k0c9302l3003435r50?ad=offering';


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
        await page.goto(scrapeUrl, { waitUntil: 'networkidle2', timeout: 0 });
        await page.waitForSelector('.user-ad-row'); 
        const listings = await page.$$('a.user-ad-row');  

        //totalListingsText give information about the number of listings on page and total listings
        const totalListingsInfo = await page.$('.breadcrumbs__summary');
        const totalListingsText = await (await totalListingsInfo.getProperty('innerHTML')).jsonValue();
        await parseTotalListingsText(totalListingsText);

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
//Checks if string contains keywords
function analyseListing(content){
    console.log(content.toLowerCase());
    if (content.includes('accountant')){
        console.log('\n=======================Contains Accountant============\n');
    }
}
//Parse info from the page pertaining to number of listings on page and total number of listings and stores it in pageState
function parseTotalListingsText(info){
    var terms = info.split(' ');
    console.log(info, '\n');
    pageState.numListings = (terms[2] - terms[0]) + 1;
    pageState.totalListings = terms[4];
    console.log(pageState.numListings, ' Is number of listings-====');
    console.log(pageState.totalListings, ' total number of listings ============');
}

var pageState = {
    numListings: -1,
    totalListings: -1,
}

// arrKeywords.push(new keyWord(10, 'developer'));
// arrKeywords.push(new keyWord(10, 'software'));
// arrKeywords.push(new keyWord(10, 'engineer'));
// arrKeywords.push(new keyWord(8, 'web'));
// arrKeywords.push(new keyWord(3, 'design'));
// arrKeywords.push(new keyWord(10, 'CSS'));
// arrKeywords.push(new keyWord(10, 'Node'));
// arrKeywords.push(new keyWord(10, 'React'));
//arrKeywords.push(new keyWord(10, 'developer'));
