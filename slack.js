const { IncomingWebhook } = require("@slack/webhook");
require("dotenv").config();

// Read a url from the environment variables
const url = process.env.SLACK_BOT;

// Initialize
const webhook = new IncomingWebhook(url);

// Send the notification
(async () => {
  await webhook.send({
    attachments: [
      {
        color: "#27ae60",
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "This text is <span style='color:#ff0000;'>red</span>, this text is <span style='color:#00ff00;'>green</span>, and this text is <span style='color:#0000ff;'>blue</span>.",
            },
          },
        ],
      },
    ],
  });
})();

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
