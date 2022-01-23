const express = require("express");
const fs = require("fs");
const app = express();
const puppeteer = require('puppeteer');
const compareImages = require("resemblejs/compareImages");
const tld = require('tld-extract');
const cors = require('cors');
app.use(cors())

const fmtURL = u => u.replace(/\W/g, "_");
const sleep = n => new Promise(r => setTimeout(r, n))
const d = url => `${__dirname}/cache/${fmtURL(url)}.png`

const SAFE_URLS = ["https://discord.com/login"
    // , "https://www.walmart.com/account/login", "https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin", "https://www.target.com/login"
];

const cache = {};
app.get("/compare", async (req, res) => {
    // get safe urls

    const {url, c} = req.query;
    if (!url) return res.json({});
    if (cache[d(url)] && !c) return res.json({...cache[d(url)], cached: true});
    // check if we have the url cached:
    const data = await cmp(url);
    const result = {data, tld: tld(url).domain, url};
    result.alert = data[0].match < 38 && tld(url).domain !== data[0].domain;
    cache[d(url)] = result;
    return res.json(result);
})

app.get("/scamtest", async (req, res) => {
    const {url} = req.query;
    if (["teamviewer.com"].includes(tld(url).domain)) {
        return res.json({alert: true});
    } else {
        return res.json({alert: false});
    }
})

app.get("/text", async (req, res) => {
    const {to, msg} = req.query;
    const accountSid = 'AC4f9931b039c5a9b2a11e039e5f73e926';
    const authToken = '32347e42f451195120da2088b2a51fd2';
    const client = require('twilio')(accountSid, authToken);

    client.messages
        .create({
            to: '+1' + to,
            body: msg,
            messagingServiceSid: 'MGf6543a2d9ce250d5bb3d8500ddf7eff9',
        })
        .then(message => {
            console.log(message.sid)
            res.json(message)
        })
});

const Screenshot = async (url) => {                // Define Screenshot function

    const browser = await puppeteer.launch();    // Launch a "browser"

    const page = await browser.newPage();        // Open a new page

    await page.goto(url);                        // Go to the website


    const dir = `${__dirname}/cache/`;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive: true});

    await sleep(1000);

    await page.screenshot({                      // Screenshot the website using defined options
        path: `${__dirname}/cache/${fmtURL(url)}.png`,                   // Save the screenshot in current directory
        fullPage: false                              // take a fullpage screenshot
    });

    await page.close();                           // Close the website

    await browser.close();                        // Close the browser

}
app.listen(2199, () => {
    console.log("http://localhost:2199")
});

async function cmp(url) {
    await addToCache(url);
    const fl = fs.readFileSync(d(url));
    const rslt = [];
    for (let i = 0; i < SAFE_URLS.length; i++) {
        const start = Date.now();
        const obj = {
            domain: tld(SAFE_URLS[i]).domain,
            match: (await compareImages(fl, fs.readFileSync(d(SAFE_URLS[i])))).rawMisMatchPercentage
        };
        obj.time = Date.now() - start;
        rslt.push(obj);
    }
    return rslt.sort((a, b) => a.match > b.match ? 1 : -1)
}

async function addToCache(url) {
    for (let i = 0; i < SAFE_URLS.length; i++) {
        const u = SAFE_URLS[i];
        if (!fs.existsSync(d(u))) await Screenshot(u);
    }
    if (!fs.existsSync(d(url))) await Screenshot(url);
}
