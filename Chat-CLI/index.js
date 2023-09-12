const openai = require('openai');
const dotenv = require('dotenv');
dotenv.config();
const apiKey = process.env.OPENAI_API_KEY;
const openaiClient = new openai({ key: apiKey });
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.question('Ask a question: ', (userInput) => {
    openaiClient.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: 'You are a helpful assistant.',
            },
            {
                role: 'user',
                content: userInput,
            },
        ],
    })
        .then((response) => {
            const message = response.choices[0].message.content;
            console.log('AI Response:', message);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
        .finally(() => {
            rl.close();
        });
});