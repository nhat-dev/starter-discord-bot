const axios = require("axios");
const { get, lowerCase } = require("lodash");
const coins = require("./symbol.json");

const getPrice = async (symbol) => {
  const coin = coins.find((x) => x.symbol === lowerCase(symbol));
  if (!coin) throw Error("coin is not found");
  const res = await axios.default(
    `https://api.coingecko.com/api/v3/coins/${coin.id}`
  );
  const value = get(res.data, "market_data.current_price.usd", 0);
  return value;
};

module.exports = {
  getPrice,
};
