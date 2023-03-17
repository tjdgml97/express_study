const express = require('express');

const router = express.Router();

router.get('/',(req,res)=> {
  res.render('cookie');
});

router.get('/cook',(req,res) => {
  res.cookie('alert', true, {
    //옵션 설정 
    maxAge : 1000 * 5, 
    httpOnly : false,
  });
  res.status(200).json('쿠키 굽기 성공!');
  console.log(req.cookies);
  res.send('cookie');
});

module.exports = router;