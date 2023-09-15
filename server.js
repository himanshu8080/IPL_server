const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require('cors');
const resource = { address: 'https://www.skysports.com/cricket/competitions/indian-premier-league' };

let latestNews = [];
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,DELETE,PATCH,POST',
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));

app.get('/fetch', async (req, res) => {
  try {
    const response = await axios.get(resource.address);
    const html = response.data;
    const $ = cheerio.load(html);
    let item = [];

    $('div.news-list div.box.news-item').each((index, element) => {
      const $element = $(element);
      const title = $element.find('h2.title.text-h2').text().trim();
      const titleLink = $element.find('div.body a').eq(1).attr('href').trim();
      const content = $element.find('div.body p').text().trim();
      const imgURL = $element.find('div.figure img').attr('data-src') || $element.find('div.figure img').attr('src');


      const data = {
        title,
        titleLink,
        content,
        imgURL
      };
      item.push(data);
    });

    latestNews =item ;

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(latestNews);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
