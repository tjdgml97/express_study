const express = require('express');   // express package 프레임 불러옴
const cors = require('cors');

const app = express();
const PORT = 4000;

// 서버설정 
app.use(cors()); // 서버에 필요한 패키지 넣어줌 (사용 설정 ) 
app.set('view engine', 'ejs');
app.use(express.static('public'));
// public 을 static 폴더로 지정 (접근가능하게 )
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mainRouter = require('./routes/index.js')
// const mainRouter = require('./routes') 생략도 가능 
const userRouter = require('./routes/users');
const boardRouter = require('./routes/board');
const dbRouter = require('./routes/db');
const dbBoardRouter = require('./routes/dbBoard');

// 이주소로 들어올 경우 - 처리할 라우터 설정  , 담당 지정  //연결 
app.use('/', mainRouter);
app.use('/users',userRouter);
app.use('/board',boardRouter);
app.use('/db', dbRouter);
app.use('/dbBoard',dbBoardRouter);

app.use(( err,req,res,next )=> {
  console.log(err.stack);
  res.status(err.statusCode);
  res.send(err.message);
})



// 요청 -> / (기본주소 )  주소로 들어올때 처리 방법 

app.listen(PORT ,()=>{
  console.log(`서버는 ${PORT}번 포트에서 실행 중입니다!`);
})
// 서버를 연결 - 최초 '실행'시켜줌 : port번호 , 콜백함수 //밑에있는이유 : 오류최소화 
// 서버 실행- nodemon 


// 특정주소에 대해 - 담당할 파일을 설정함 
// 특정폴더만 있을 경우- index 임 