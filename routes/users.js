const express = require('express');
const router = express.Router();
// 익스프레스 프레임워크에 있는 라우터를 사용함 
// 라우터에 익스프레스 불러서 - 미들웨어들을 선언 - > 모듈로 빼줌 

// 필요한 기능 넣어줌
router.get('/', (req,res) => {
  res.render('users',{msg: '박성희'})
  // res.send('여기는 유저 라우터 입니다! ');
})

module.exports = router;