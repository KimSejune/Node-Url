const express = require('express')
const morgan = require('morgan')
const basicAuth = require('express-basic-auth')
const randomstring = require("randomstring");
const bodyParser = require("body-parser")


// http://localhost:3000/58dx37 이런식으로 shortUrl이 생성
// 접속시 302가오고 
const data = [
  {
    longUrl: 'http://google.com', id: randomstring.generate(6)
  }
]


const app = express()

app.set('view engine', 'ejs')
// public안에 있는 파일들을 서버에서 static으로 제공하겠다.
app.use('/static', express.static('public'))
app.use(morgan('tiny'))
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))

app.use(basicAuth({
  users: { 'admin': 'admin' },
  challenge: true,
  realm: 'Imb4T3st4pp'
}))
 
app.get('/', (req, res) => {
  // res.send('hi~~ 수현 and 세준 eating 닭발')
  res.render('index.ejs', {data})
  
})

app.get('/:id', (req, res) => {
  const id = req.params.id
  const matched = data.find(item => item.id === id)
  if(matched){
    // longUrl로 보내준다.
    res.redirect(301, matched.longUrl)
  }else {
    res.status(404)
    res.send('404 not found')
  }

})

app.post('/', (req, res) => {
  // 값의 제출을 누르면 이곳에 모인다.
  const longUrl = req.body.longUrl
  let id
  while(true){
    const candidate = randomstring.generate(6)
    const matched = data.find(item => item.id === candidate)
    if(!matched){
      id = candidate
      break
    }
  }
  data.push({id, longUrl})
  res.redirect('/')
})

// 서버를 3000 port로 구동
app.listen(3000, () => {
  console.log('listening...')
})

