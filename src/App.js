
import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'



function App() {

  const [pullRequests, setPullRequests] = useState([])

  useEffect(() => {
    async function getDateFromApi() {
      let dataGetRequest = await axios.get("http://localhost:8000/getPullRequest")
      setPullRequests(dataGetRequest.data)
    }
    getDateFromApi()
    const interval = setInterval(() => getDateFromApi(), 10000)
    return () => {
      clearInterval(interval);
    }
  }, [])


  const convertTodate = function (date) {
    let year = date.split("T")
    console.log(year)
    return year[0]
  }




  return (
    <div class="App">
      <h3>pull requests list</h3>
      {
        pullRequests.map(x => {
          return <div id="pullRequest" key={x.id}>
            <p>title: {x.title}</p>
            <p>body: {x.body}</p>
            <p>created date: {convertTodate(x.created_at)}</p>
            <p>url: {x.url}</p>
          </div>
        })
      }
    </div>
  );
}

export default App;
