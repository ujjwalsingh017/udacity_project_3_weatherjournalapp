/* Global Project Variables */
const appid = '49b9b809e566d9d0cb35f31930cdff2e'
const baseURL = 'api.openweathermap.org/data/2.5/weather?'
const zipInput = document.getElementById('zip');
const userInput = document.getElementById('feelings')
const dateHolder = document.getElementById('date')
const tempHolder = document.getElementById('temp')
const contentHolder = document.getElementById('content')
const postURL = 'http://localhost:8000'
const getURL = 'http://localhost:8000/all'

let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

const getWeather = async (baseURL, zip = '94712,us', api) => {
  const url = `http://${baseURL}zip=${zip}&appid=${api}`
  const response = await fetch(url)
  let jsonResponse = await response.json()
  return jsonResponse
}

const postData = async (path, data = {}) => {
  const response = await fetch(path, {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow', 
    body: JSON.stringify(data), 
  })
}

const updateUI = async () => {
  const response = await fetch(getURL)
  const jsonResponse = await response.json()
  dateHolder.innerHTML = `<span class="entry-item">Date: </span>${jsonResponse.date}`
  contentHolder.innerHTML = `<span class="entry-item">You feel: </span>${jsonResponse.userResponse}`
  tempHolder.innerHTML = `<span class="entry-item">Temperature: </span>${jsonResponse.temperature}`
}

const handleClick = async () => {
  const weatherData = await getWeather(baseURL, zipInput.value, appid)
  const data = {
    temperature: weatherData.main.temp,
    date: newDate,
    userresponse: userInput.value
  }
  await postData(postURL, data)
  updateUI()
}

const ele = document.getElementById('generate')
ele.addEventListener('click', handleClick)
