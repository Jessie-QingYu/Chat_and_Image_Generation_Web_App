import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { prompt } = JSON.parse(req.body);
  // let response = null
  // let e = null;
  // const mock_data = {
  //   "data": [
  //     {
  //       // "url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-hRGYDciQCbYSuxSPB1kTegps/user-Sq64hbawDbWxFWtiFkxVh91v/img-r0VUcWOVIeU9K0YhJ3qR8knX.png?st=2023-08-13T20%3A11%3A43Z&se=2023-08-13T22%3A11%3A43Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-13T04%3A50%3A46Z&ske=2023-08-14T04%3A50%3A46Z&sks=b&skv=2021-08-06&sig=l%2BnKBRDGmkcOTlpjNQiWpO7paPsz3I8Ak1vYgtVnjmE%3D"
  //       "url": "https://www.dailypaws.com/thmb/MGYnlOlOgW-14ZBI0ouXKJuQWeE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/pomeranian-white-puppy-921029690-2000-3ca2fdb56d144450a05c6990efdfd40e.jpg"
  //     }
  //   ]
  // }
  // try {
  const response = await openai.createImage({
    prompt,
    n: 1,
    size: '512x512'
  });

  res.status(200).json({
    // data: mock_data.data
    image: response.data.data[0].url
    // image: mock_data.data[0].url
  })
  // } catch (exception) {
  //   console.log({ exception })
  //   e = exception
  // }
  // res.status(200).json({
  //   // data: mock_data.data,
  //   // image: response.data.data[0].url
  //   image: mock_data.data[0].url,
  // })
}