const axios = require("axios");
const { get, lowerCase, upperCase } = require("lodash");
const coins = require("./symbol.json");
const mxc = require("./mxc");

const getPrice = async (symbol, market = "binance") => {
  if (market === mxc) return mxc.getMXCPrice(symbol);
  const res = await axios.default(
    `https://api.binance.com/api/v3/avgPrice?symbol=${upperCase(symbol)}USDT`
  );
  const value = get(res.data, "price", 0);
  return value;
};

module.exports = {
  getPrice,
};
