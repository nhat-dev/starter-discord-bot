const axios = require("axios");

const apikey = "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";

const generateText = async (prompt) => {
  const url = `https://api.openai.com/v1/engines/davinci-codex/completions`;
  const data = {
    prompt: prompt,
    max_tokens: 60,
    n: 1,
    stop: "\n",
  };

  try {
    const response = await axios.post(url, data, {
      headers: { Authorization: `Bearer ${apikey}` },
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.error(error);
    return "";
  }
};

// example usage
generateText("Hello, my name is ChatGPT.").then((response) =>
  console.log(response)
);
