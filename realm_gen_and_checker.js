const axios = require('axios');
const c = require('ansi-colors');
const cheerio = require('cheerio');

const baseUrl = 'https://open.minecraft.net/pocket/realms/invite';

function generateRandomCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomCode = '';
  const codeLength = 12;

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomCode += characters.charAt(randomIndex);
  }

  return randomCode;
}

function runCode() {
  const randomCode = generateRandomCode();
  const urlWithRandomCode = `${baseUrl}/${randomCode}`;

  axios.get(urlWithRandomCode)
    .then((response) => {
      const htmlContent = response.data;
      const $ = cheerio.load(htmlContent);

      // <meta> (open minecraft button) :)
      $('meta[property="minecraft:deeplink"]').each((index, element) => {
        console.log(c.green(`Realm bulundu! ${urlWithRandomCode}`));
      });

      if ($('meta[property="minecraft:deeplink"]').length === 0) {
        console.log(c.red(`minecraft:deeplink bulunamadı. ${urlWithRandomCode}`));
      }

      runCode();
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        console.log(c.red(`404: Sayfa bulunamadı. ${urlWithRandomCode}`));
      } else {
        console.error('Hata:', error);
      }

      runCode();
    });
}

runCode();
