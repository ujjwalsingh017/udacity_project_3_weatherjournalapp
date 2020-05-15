projectData = {};

const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

const cors = require('cors')
app.use(cors())

app.use(express.static('website'));

const server = app.listen(8000, () => {
  console.log('server is listening on port:', 8000)
})

app.get('/all', (req, res) => {
  res.send(JSON.stringify(projectData))
})

app.post('/', (req, res) => {
  projectData.temperature = req.body.temperature
  projectData.date = req.body.date
  projectData.userResponse = req.body.userresponse
  res.end()
})