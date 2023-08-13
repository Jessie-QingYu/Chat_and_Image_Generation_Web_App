import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
    const { prompt } = JSON.parse(req.body)
    const mock_data = {
        "data": [
          {
            "result": "This is the mock_data, need a valid OPENAI_API_KEY and OPENAI_ORGANIZATION to generate the real data"
          }
        ]
    }
    let completion = null
    let e = null;
    try {
        completion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'user',
                content: prompt
              }
            ]
        });
        
        res.status(200).json({
            // data: completion.data
            // data: completion.data.choices[0].message.content
            data: mock_data.data
        })
        
    } catch (exception) {
    console.log({ exception })
    e = exception
    }
    res.status(200).json({
        // data: completion.data
        data: mock_data.data
    })
}