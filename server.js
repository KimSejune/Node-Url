const express = require('express')
const morgan = require('morgan')
const basicAuth = require('express-basic-auth')

// http://localhost:3000/58dx37 이런식으로 shortUrl이 생성
// 접속시 302가오고 
const data = [
  {
    longUrl: 'http://google.com', id: '58DX37'
  }
]


const app = express()

app.set('view engine', 'ejs')
// public안에 있는 파일들을 서버에서 static으로 제공하겠다.
app.use('/static', express.static('public'))
app.use(morgan('tiny'))



app.use(basicAuth({
  users: { 'admin': 'admin' },
  challenge: true,
  realm: 'Imb4T3st4pp'
}))

app.get('/', (req, res) => {
  // res.send('hi~~ 수현 and 세준 eating 닭발')
  res.render('index.ejs', {data})
  
})


// 서버를 3000 port로 구동
app.listen(3000, () => {
  console.log('listening...')
})