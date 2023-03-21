require("dotenv").config();
const express = require("express");
const app = express();
require("dotenv").config();
const eris = require("eris");
const { startsWith, toUpper, upperCase } = require("lodash");
const { getPrice } = require("./crawl");
const bot = new eris.Client(process.env.BOT_TOKEN);

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

app.listen(PORT, () => {
  bot.connect();
  console.log("Server is started in " + PORT);
});
