import axios from "axios";
import { useState } from "react";

function App() {
  const [userType, setUserType] = useState("")
  const [userTopic, setUserTopic] = useState("")
  const [chatGptAnswer, setChatGptAnswer] = useState("Output will appear here");
  const [isLoading, setIsLoading] = useState(false);
  const generateJoke = async (topic, type) => {
    let userPrompt = `Generate a ${type} about ${topic}`;
    console.log(userPrompt);
    setIsLoading(true);
    try {


      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-3.5-turbo",
          messages: [{
            role: "user",
            content: userPrompt
          }]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
          },
        }
      );
      console.log(response.data)
      let data = response.data.choices[0].message.content;
      setChatGptAnswer(data);
      setIsLoading(false);
    }
    catch (err) {
      console.log(err)
      setIsLoading(false);
      setChatGptAnswer("Something went Wrong");
    }
  };
  return (
    <main className="w-[80%] m-auto flex items-center justify-center flex-col mt-5">
      <h1 className="text-4xl font-mono">ChatGPT Joke/Quote/Shayari Generator</h1>
      <div className="flex w-full justify-center gap-3 mt-4">
        <input className="input input-bordered w-full max-w-xs" type="text" placeholder="Enter the topic" onChange={(e) => setUserTopic(e.target.value)} />
        <select className="select select-bordered w-full max-w-xs" onChange={(e) => setUserType(e.target.value)}>
          <option disabled selected value="">Select Type</option>
          <option value="joke">Joke</option>
          <option value="poem">Poem</option>
          <option value="quote">Quote</option>
        </select>
      </div>
      <button className="btn btn-primary mt-4" onClick={() => generateJoke(userTopic, userType)}>GENERATE</button>
      {isLoading ? <span className="loading loading-dots loading-lg mt-5"></span> :
        <p className="text-xl mt-4 shadow-xl border-2 rounded-lg p-5">{chatGptAnswer}</p>
      }

    </main>
  )
}

export default App
