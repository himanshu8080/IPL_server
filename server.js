const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require('cors');
const resource = {

  address: 'https://indianexpress.com/section/sports/cricket/',
  base: 'https://indianexpress.com/section/sports/cricket/'
};

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));

async function fetchNews() {
  try {
    const response = await axios.get(resource.address);
    const html = response.data;
    const $ = cheerio.load(html);
    const latestNews = [];

    $('.articles').each((index, element) => {
      const article = $(element);
      const title = article.find('h2.title a').attr('title');
      const titleLink = article.find('h2.title a').attr('href');
      const imgSrcset = article.find('div.snaps a img').attr('srcset');
      const imgURL = imgSrcset ? imgSrcset.split(',').pop().split(' 1200w').shift() : '';
      const timestamp = article.find('div.date').text();
      const content = article.find('div.img-context p').text();

      const data = {
        title,
        titleLink,
        imgURL,
        timestamp,
        content,
      };

      latestNews.push(data);
    });

    return latestNews;
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error('An error occurred while fetching data.');
  }
}

app.get('/fetch', async (req, res) => {
  try {
    const latestNews = await fetchNews();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(latestNews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
