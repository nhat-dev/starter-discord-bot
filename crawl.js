const axios = require("axios");
const { get, lowerCase, upperCase } = require("lodash");
const coins = require("./symbol.json");

const getPrice = async (symbol) => {
  // const coin = coins.find((x) => x.symbol === lowerCase(symbol));
  // if (!coin) throw Error("coin is not found");
  const res = await axios.default(
    `https://api.binance.com/api/v3/avgPrice?symbol=${upperCase(symbol)}USDT`
  );

  const value = get(res.data, "price", 0);
  return value;
};

module.exports = {
  getPrice,
};
