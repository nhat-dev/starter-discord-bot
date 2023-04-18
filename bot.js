const Eris = require("eris");

const Constants = Eris.Constants;

const bot = new Eris(process.env.BOT_TOKEN, {
  intents: [], //No intents are needed for interactions, but you still need to specify either an empty array or 0
});

bot.on("ready", async () => {
  console.log("Ready!"); // Log "Ready!"
  const commands = await bot.getCommands();

  if (!commands.length) {
    bot.createCommand({
      name: "Price",
      description: "Gets price coin in Binance market",
      options: [
        {
          name: "symbol",
          description: "The type of symbol",
          type: Constants.ApplicationCommandOptionTypes.STRING,
          required: true,
          choices: [
            {
              name: "BTC",
              value: "btc",
            },
            {
              name: "ETH",
              value: "eth",
            },
            {
              name: "BNB",
              value: "bnb",
            },
            {
              name: "ID",
              value: "id",
            },
            {
              name: "Arb",
              value: "arb",
            },
          ],
        },
      ],
      type: Constants.ApplicationCommandTypes.CHAT_INPUT,
    });
  }
});

bot.on("interactionCreate", (interaction) => {
  if (interaction instanceof Eris.CommandInteraction) {
    switch (interaction.data.name) {
      case "Price":
        return interaction.createMessage({
          embeds: [
            {
              title: "I'm an embed!", // Title of the embed
              description:
                "Here is some more info, with **awesome** formatting.\nPretty *neat*, huh?",
              author: {
                // Author property
                name: "Nhat",
                icon_url:
                  "https://images.unsplash.com/photo-1546146830-2cca9512c68e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2960&q=80",
              },
              color: 0x008000, // Color, either in hex (show), or a base-10 integer
              footer: {
                text: "Binance",
              },
            },
          ],
        });
      default: {
        return interaction.createMessage("interaction recieved");
      }
    }
  }
});

bot.on("error", (err) => {
  console.log(err);
});

module.exports = () => {
  bot.connect();
};
