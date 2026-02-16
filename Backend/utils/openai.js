import "dotenv/config";

const getOpenAIAPIResponse = async (userMessage) => {
  let options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    }),
  };

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options,
    );
    let data = await response.json();
    let openAIResponse = data.choices[0].message.content;
    return openAIResponse; //reply
  } catch (error) {
    console.log(error);
  }
};

export default getOpenAIAPIResponse;
