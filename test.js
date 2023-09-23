const express = require('express');
const puppeteer = require('puppeteer');
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require('cors');

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));

app.get('/fetch', async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.cricketlineguru.com/cricket-news');
    await page.waitForSelector('div.item.small-card');

    const latestNews = await page.evaluate(() => {
      const newsElements = Array.from(document.querySelectorAll('div.item.small-card'));
      return newsElements.map((element) => {
        const titleElement = element.querySelector('h3 a');
        const title = titleElement ? titleElement.getAttribute('title') : '';
        const titleLink = titleElement ? titleElement.getAttribute('href') : '';
        const imgElement = element.querySelector('img');
        const imgURL = imgElement ? imgElement.getAttribute('src') : '';
        const infoElement = element.querySelector('div.info span:nth-child(2)');
        const timestamp = infoElement ? infoElement.textContent.trim() : '';
        const contentElement = element.querySelector('div.content p');
        const content = contentElement ? contentElement.textContent.trim() : '';

        return {
          title,
          titleLink,
          imgURL,
          timestamp,
          content,
        };
      });
    });

    await browser.close();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(latestNews);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});


//!v1
// const express = require('express');
// const axios = require('axios');
// const cheerio = require('cheerio');
// const PORT = process.env.PORT || 5000;
// const app = express();
// const cors = require('cors');
// const resource = {
//   name: 'example',
//   address: 'https://www.cricketlineguru.com/cricket-news',
// };

// app.use(cors({
//   origin: '*',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
// }));

// app.get('/fetch', async (req, res) => {
//   try {
//     const response = await axios.get(resource.address);
//     const html = response.data;
//     const $ = cheerio.load(html);
//     const latestNews = [];

//     $('div.news-list div.box.news-item').each((index, element) => {
//       const $element = $(element);
//       const title = $element.find('h2.title.text-h2').text().trim();
//       const titleLink = $element.find('div.body a').eq(1).attr('href').trim();
//       const content = $element.find('div.body p').text().trim();

//       // Extract date and time from <div class="info"> element
//       const infoElement = $element.find('div.info.ng-star-inserted');
//       const dateString = infoElement.contents().first().text().trim();
//       const timeString = infoElement.find('span').last().text().trim();

//       // Combine date and time into a single timestamp
//       const timestamp = new Date(`${dateString} ${timeString}`).toISOString();

//       // Extract image URL from <div class="figure"> element
//       const imgURL = $element.find('div.figure img').attr('data-src') || $element.find('div.figure img').attr('src');

//       const data = {
//         title,
//         titleLink,
//         content,
//         timestamp,
//         imgURL,
//       };

//       latestNews.push(data);
//     });

//     res.setHeader('Content-Type', 'application/json');
//     res.status(200).json(latestNews);
//   } catch (error) {
//     console.error('Error:', error.message);
//     res.status(500).json({ error: 'An error occurred while fetching data.' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server started at ${PORT}`);
// });
