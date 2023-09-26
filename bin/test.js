// const express = require('express');
// const axios = require('axios');
// const cheerio = require('cheerio');
// const PORT = process.env.PORT || 5000;
// const app = express();
// const cors = require('cors');
// const resource = {
//   name: 'example',
//   address: 'https://www.espncricinfo.com/cricket-news',
//   base:'https://www.espncricinfo.com/'
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

//     $('.ds-border-b.ds-border-line.ds-p-4').each((index, element) => {
//       const title = $(element).find('h2.ds-text-title-s').text();
//       const titleLink = $(element).find('a').attr('href');
//       const img = $(element).find('img');
//       const url = img.attr('src');
//       const imgAlt = img.attr('alt');
//       const imgURL = imgAlt === title ? url : null; // Check if alt matches title

//       const timestamp = $(element).find('span.ds-text-compact-xs').first().text();
//       const content = $(element).find('p.ds-text-compact-s > div').text();

//       const data = {
//         title,
//         titleLink:resource.base +titleLink,
//         imgURL:resource.base + imgURL,
//         timestamp,
//         content,
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
// const express = require('express');
// const axios = require('axios');
// const cheerio = require('cheerio');
// const PORT = process.env.PORT || 5000;
// const app = express();
// const cors = require('cors');
// const resource = {
//   name: 'example',
//   address: 'https://www.espncricinfo.com/cricket-news',
//   base: 'https://www.espncricinfo.com/',
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

//     $('.ds-border-b.ds-border-line.ds-p-4').each((index, element) => {
//       const title = $(element).find('h2.ds-text-title-s').text();
//       const titleLink = $(element).find('a').attr('href');
//       const img = $(element).find('img');
//       const imgAlt = $(element).find('img').attr('src');
//       const url = imgAlt
//       ; // Check if alt matches title

//       const timestamp = $(element).find('span.ds-text-compact-xs').first().text();
//       const content = $(element).find('p.ds-text-compact-s > div').text().trim();

//       const data = {
//         title,
//         titleLink: resource.base + titleLink,
//         imgURL: url ? resource.base + url : null, // Only add if url is not null
//         timestamp,
//         content,
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
//!v1
// const express = require('express');
// const axios = require('axios');
// const cheerio = require('cheerio');
// const PORT = process.env.PORT || 5000;
// const app = express();
// const cors = require('cors');
// const resource = {
//   name: 'example',
//   address: 'https://www.espncricinfo.com/cricket-news',
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

//     $('.ds-border-b.ds-border-line.ds-p-4').each((index, element) => {
//       const title = $(element).find('h2.ds-text-title-s').text();
//       const titleLink = $(element).find('a').attr('href');
//       const imgURL = $(element).find('a div div div img').attr('src');

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
//!v2
// const express = require('express');
// const axios = require('axios');
// const cheerio = require('cheerio');
// const PORT = process.env.PORT || 5000;
// const app = express();
// const cors = require('cors');
// const resource = {
//   name: 'example',
//   address: 'https://www.espncricinfo.com/cricket-news',
//   base:'https://www.espncricinfo.com/'
// };

// app.use(cors({
//   origin: '*',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
// }));

// // Function to fetch the image URL from titleLink
// async function fetchImgURL(titleLink) {
//   try {
//     const response = await axios.get(resource.base+titleLink);
//     const titleLinkHtml = response.data;
//     const titleLink$ = cheerio.load(titleLinkHtml);
    
//     // Traverse to the img tag within the titleLink HTML
//     const imgTag = titleLink$('figure div div div div div img');
    
//     // Get the src attribute of the img tag
//     const src = imgTag.attr('src');
    
//     return src;
//   } catch (error) {
//     console.error('Error fetching titleLink:', error);
//     throw new Error('An error occurred while fetching titleLink.');
//   }
// }

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
//       const imgURL = await fetchImgURL(titleLink); // Call fetchImgURL to get the imgURL

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
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require('cors');
const resource = {
  name: 'example',
  address: 'https://sports.ndtv.com/cricket/news',
  base: 'https://sports.ndtv.com'
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

    // Check if the page content is loaded by waiting for a specific element
    const waitForElement = async (selector) => {
      while ($(selector).length === 0) {
        await new Promise(resolve => setTimeout(resolve, 100)); // Wait for 100 milliseconds
      }
    };

    await waitForElement('.ds-border-b.ds-border-line.ds-p-4');

    $('.ds-border-b.ds-border-line.ds-p-4').each(async (index, element) => {
      const title = $(element).find('h2.ds-text-title-s').text();
      const titleLink = $(element).find('a').attr('href');
      const imgURL = $(element).find('img').attr('src'); // Call fetchImgURL to get the imgURL

      const timestamp = $(element).find('span.ds-text-compact-xs').first().text();
      const content = $(element).find('p.ds-text-compact-s.ds-text-typo-mid2.ds-mt-1 div').text();

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
