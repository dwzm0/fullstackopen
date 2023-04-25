import { useState, useEffect } from "react";
import { Diary } from "./types";
import { getAllDiaries, createDiary } from "./services/diaryService";
import axios from "axios";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([])
  const [date, setDate] = useState('')
  const [weather, setWeather] = useState('')
  const [visibility, setVisibility] = useState('')
  const [comment, setComment] = useState('')
  const [notif, setNotif] = useState('')

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    try {
      const response = await  createDiary( {
        date,
        weather,
        visibility,
        comment,
      })
      setDiaries(diaries.concat(response))
      setDate('')
      setWeather('')
      setVisibility('')
      setComment('')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setNotif(error.response?.data)
        setTimeout(() => {
          setNotif("")
        }, 5000) 
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])

  return (
    <div>
      <div>{notif}</div>
      <form onSubmit={diaryCreation}>
       <p>date: <input type="date" value={date} onChange={(event) => setDate(event.target.value)} /> </p> 
       <div> weather: sunny<input type="radio" name="weather"  onChange={() => setWeather("sunny")} />
       rainy<input type="radio" name="weather"  onClick={() => setWeather("rainy")} />
       cloudy<input type="radio"  name="weather" onClick={() => setWeather("cloudy")} />
       stormy<input type="radio"  name="weather" onClick={() => setWeather("stormy")} />
       windy<input type="radio"  name="weather" onClick={() => setWeather("windy")} />
       </div>
       <div>visibility: great<input type="radio" name="visibillity" onChange={() => setVisibility("great")} />
       good<input type="radio" name="visibillity" onChange={() => setVisibility("good")} />
       ok<input type="radio" name="visibillity" onChange={() => setVisibility("ok")} />
       poor<input type="radio" name="visibillity" onChange={() => setVisibility("poor")} />
       </div>
      
       <p>comment: <input value={comment} onChange={(event) => setComment(event.target.value)} /></p> 
        <button type='submit'>add</button>
      </form>
      <h1>Diary entries</h1>
      <div>
        {diaries.map(diary =>
          <div key={diary.id}>
            <h2>{diary.date}</h2>
            <p>weather: {diary.weather}</p>
            <p>visibility: {diary.visibility}</p>
              </div>
        )}
      </div>
    </div>
  )
}

export default App