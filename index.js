require("dotenv").config();
const express = require("express");
const app = express();
const eris = require("eris");
const {
  startsWith,
  toUpper,
  upperCase,
  get,
  assign,
  toNumber,
} = require("lodash");
const { getPrice } = require("./crawl");
const { sendSlack } = require("./slack");
const bot = new eris.Client(process.env.BOT_TOKEN);
const prices = {};
const channelId = "1076529411689562135";

const ensureCommand = (content) => {
  if (!content) return "";
  if (startsWith(content, "!")) return `${content}`.substring(1);
  return "";
};

bot.on("ready", () => {
  console.log("Connected and ready.");
});

bot.on("messageCreate", async (msg) => {
  const symbol = ensureCommand(msg.content);
  console.log("msg.channel.id", msg.channel.id);

  if (symbol) {
    try {
      const price = await getPrice(upperCase(symbol));
      bot.createMessage(msg.channel.id, `${upperCase(symbol)}/USDT : ${price}`);
    } catch (error) {
      bot.createMessage(
        msg.channel.id,
        `${upperCase(symbol)}/USDT : ${error.toString()}`
      );
    }
  }
});

bot.on("error", (err) => {
  console.log("Connected error", err);
});

const PORT = 8999;

app.get("/status", async (req, res) => {
  return res.status(200).json({ status: "OK" });
});

app.get("/job", async (req, res) => {
  try {
    const symbol = req.query.symbol ?? "";
    const market = req.query.market || "binance";
    const quantity = toNumber(req.query.quantity || 0);
    if (symbol) {
      const current_price = await getPrice(upperCase(symbol), market);
      const last_price = get(prices, symbol, 0);
      const div = last_price ? current_price / last_price : 2;
      assign(prices, { [symbol]: current_price });
      const percent = ((div - 1) * 100).toFixed(2);
      console.log("percent", percent);
      bot.createMessage(
        channelId,
        {
          embeds: [
            {
              title: `${upperCase(symbol)}/USDT`, // Title of the embed
              description: `Giá hiện tại **${current_price}**\nTổng giá trị **${toNumber(
                current_price * quantity
              ).toFixed(2)}** USDT`,
              color: 0x000000,
            },
          ],
        }
        // `${upperCase(symbol)}/USDT : ${current_price} ${
        //   percent > 0 ? `↗↗↗ ${percent}` : `↘↘↘ ${percent}`
        // }%`
      );
      await sendSlack(
        `*${upperCase(symbol)}/USDT*`,
        `Giá hiện tại *${current_price}*\nTổng giá trị *${toNumber(
          current_price * quantity
        ).toFixed(2)}* USDT`
      );
      return res
        .status(200)
        .json({ status: "OK", price: current_price, change: percent });
    }
    return res.status(200).json({ status: "Fail" });
  } catch (error) {
    // console.log("error", error);
    return res.status(500).json({ status: "Fail", message: error.message });
  }
});

app.get("/test", (req, res) => {
  bot.createMessage(channelId, {
    embeds: [
      {
        title: "AIDOGE/USDT", // Title of the embed
        description: "Giá hiện tại **0.00000000011328**",
        color: 0x000000,
      },
    ],
  });

  return res.json("ok");
});

// require("./bot")();

app.listen(PORT, async () => {
  await bot.connect();
  console.log("Server is started in " + PORT);
});
