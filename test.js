const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require('cors');
const resource = {
  name: 'example',
  address: 'https://www.espncricinfo.com/cricket-news',
  base:'https://www.espncricinfo.com/cricket-news'
};

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));

app.get('/fetch', async (req, res) => {
  try {
    const response = await axios.get(resource.address);
    const html = response.data;
    const $ = cheerio.load(html);
    const latestNews = [];

    $('.ds-border-b.ds-border-line.ds-p-4').each((index, element) => {
      const title = $(element).find('h2.ds-text-title-s').text();
      const titleLink = $(element).find('a').attr('href');
      const img = $(element).find('img');
      const imgAlt = img.attr('alt');
      const imgURL = imgAlt === title ? titleLink : null; // Check if alt matches title

      const timestamp = $(element).find('span.ds-text-compact-xs').first().text();
      const content = $(element).find('p.ds-text-compact-s.ds-text-typo-mid2.ds-mt-1 div').text();

      const data = {
        title,
        titleLink,
        imgURL:resource.base + imgURL,
        timestamp,
        content,
      };

      latestNews.push(data);
    });

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
