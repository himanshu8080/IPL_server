const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require('cors');
const resource = {
  name: 'example',
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

//!v2
// const express = require('express');
// const axios = require('axios');
// const cheerio = require('cheerio');
// const PORT = process.env.PORT || 5000;
// const app = express();
// const cors = require('cors');
// const resource = {
//   name: 'example',
//   address: 'https://indianexpress.com/section/sports/cricket/',
//   base: 'https://indianexpress.com/section/sports/cricket/'
// };

// app.use(cors({
//   origin: '*',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
// }));

// async function fetchNews() {
//   try {
//     const response = await axios.get(resource.address);
//     const html = response.data;
//     const $ = cheerio.load(html);
//     const latestNews = [];

//     // Find the parent container with class 'nation'
//     const nationContainer = $('.nation');

//     // Iterate through each 'articles' div within the 'nation' container
//     nationContainer.find('.articles').each((index, element) => {
//       const article = $(element);

//       // Extract title, titleLink, and imgURL
//       const title = article.find('h2.title a').attr('title');
//       const titleLink = article.find('h2.title a').attr('href');
//       const imgURL = article.find('.snaps a img').attr('srcset').split(' ').pop();

//       // Extract timestamp and content
//       const timestamp = article.find('.date').text();
//       const content = article.find('.img-context p').text();

//       const data = {
//         title,
//         titleLink,
//         imgURL,
//         timestamp,
//         content,
//       };

//       latestNews.push(data);
//     });

//     return latestNews;
//   } catch (error) {
//     console.error('Error:', error.message);
//     throw new Error('An error occurred while fetching data.');
//   }
// }

// app.get('/fetch', async (req, res) => {
//   try {
//     const latestNews = await fetchNews();
//     res.setHeader('Content-Type', 'application/json');
//     res.status(200).json(latestNews);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server started at ${PORT}`);
// });

// const express = require('express');
// const axios = require('axios');
// const cheerio = require('cheerio');
// const PORT = process.env.PORT || 5000;
// const app = express();
// const cors = require('cors');
// const resource = {
//   name: 'example',
//   address: 'https://indianexpress.com/section/sports/cricket/',
//   base: 'https://indianexpress.com/section/sports/cricket/'
// };

// app.use(cors({
//   origin: '*',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
// }));



// async function fetchNews() {
//   try {
//     const response = await axios.get(resource.address);
//     const html = response.data;
//     const $ = cheerio.load(html);
//     const latestNews = [];

//     // Check if the page content is loaded by waiting for a specific element
//     const waitForElement = async (selector) => {
//       while ($(selector).length === 0) {
//         await new Promise(resolve => setTimeout(resolve, 100)); // Wait for 100 milliseconds
//       }
//     };

//     await waitForElement('.ds-border-b.ds-border-line.ds-p-4');

//     $('.ds-border-b.ds-border-line.ds-p-4').each(async (index, element) => {
//       const title = $(element).find('h2.ds-text-title-s').text();
//       const titleLink = $(element).find('a').attr('href');
//       const imgURL = $(element).find('img').attr('src'); // Call fetchImgURL to get the imgURL

//       const timestamp = $(element).find('span.ds-text-compact-xs').first().text();
//       const content = $(element).find('p.ds-text-compact-s.ds-text-typo-mid2.ds-mt-1 div').text();

//       const data = {
//         title,
//         titleLink,
//         imgURL,
//         timestamp,
//         content,
//       };

//       latestNews.push(data);
//     });

//     return latestNews;
//   } catch (error) {
//     console.error('Error:', error.message);
//     throw new Error('An error occurred while fetching data.');
//   }
// }

// app.get('/fetch', async (req, res) => {
//   try {
//     const latestNews = await fetchNews();
//     res.setHeader('Content-Type', 'application/json');
//     res.status(200).json(latestNews);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server started at ${PORT}`);
// });
//!v1