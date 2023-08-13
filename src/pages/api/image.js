import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// export default async function handler(req, res) {
//   // console.log({openai})
//   const response = await openai?.listEngines();
//   // console.log({response});
//   res.status(200).json({ data: response?.data?.data })
// }

export default async function handler(req, res) {  
  let response = null
  let e = null;
  const mock_data = {
    "data": [
      {
        "url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-hRGYDciQCbYSuxSPB1kTegps/user-Sq64hbawDbWxFWtiFkxVh91v/img-r0VUcWOVIeU9K0YhJ3qR8knX.png?st=2023-08-13T20%3A11%3A43Z&se=2023-08-13T22%3A11%3A43Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-13T04%3A50%3A46Z&ske=2023-08-14T04%3A50%3A46Z&sks=b&skv=2021-08-06&sig=l%2BnKBRDGmkcOTlpjNQiWpO7paPsz3I8Ak1vYgtVnjmE%3D"
      }
    ]
  }
  try {
    response = await openai.createImage({
      prompt: 'an egg in space',
      n: 1,
      size: '512x512'
    });

    res.status(200).json({
      data: mock_data.data
    })
  } catch (exception) {
    console.log({ exception })
    e = exception
  }
  res.status(200).json({
    data: mock_data.data,
    e
  })
}