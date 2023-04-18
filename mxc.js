const axios = require("axios");
const { get, lowerCase, upperCase, toNumber } = require("lodash");
const cheerio = require("cheerio");

const getMXCPrice = async (symbol) => {
  const res = await axios.default(
    `https://www.mexc.com/vi-VN/exchange/${upperCase(
      symbol
    )}_USDT?_from=search_spot_trade&timestampe=${new Date().getTime()}`,
    {
      headers: {
        "Cache-Control": "no-cache",
        Prama: "no-cache",
        Expries: "0",
      },
    }
  );

  const $ = cheerio.load(res.data);

  return $("span[class^='headline_title']").text() || 0;
};

module.exports = {
  getMXCPrice,
};
