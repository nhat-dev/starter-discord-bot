const { IncomingWebhook } = require("@slack/webhook");
require("dotenv").config();

// Read a url from the environment variables
const url = process.env.SLACK_BOT;

// Initialize
const webhook = new IncomingWebhook(url);

const sendSlack = async (title, description) => {
  await webhook.send({
    attachments: [
      {
        color: "#27ae60",
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: title,
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: description,
            },
          },
        ],
      },
    ],
  });
};

module.exports = {
  sendSlack,
};
