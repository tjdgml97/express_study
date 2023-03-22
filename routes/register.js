const express = require('express');

const userDB = require('../controllers/userController');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('register');
}
);

router.post('/', async (req,res)=> {

  const duplicatedUser = await userDB.userCheck(req.body.id);
  if(!duplicatedUser) {
    const registerResult = await userDB.registerUser(req.body);
    if(registerResult) {
      res.status(200);
      res.send('회원 가입 성공!<br><a href="/login">로그인으로 이동</a>');
    } else {
                res.status(500);
          res.send('회원 가입 실패! 알수없는 문제 발생 <br><a href="/register">로그인으로 이동</a>');
    }
  }





  // userDB.userCheck(req.body.id, (data) => {
  //   if(data.length === 0 ) {
  //     // 회원가입 진행
  //     userDB.registerUser(req.body , (data) => {
  //       if (data.affectedRows >= 1) {
  //         res.status(200);
  //         res.send('회원 가입 성공!<br><a href="/login">로그인으로 이동</a>');
  //       } else {
  //         res.status(500);
  //         res.send('회원 가입 실패! 알수없는 문제 발생 <br><a href="/register">로그인으로 이동</a>');
  //       }
  //     })
  //   }else {
  //     res.status(400);
  //     res.send(
  //       '동일한 ID를 가진 회원이 존재합니다!.<br><a href="/register">로그인으로 이동 </a>'
  //     );
  //   }
  // }
  // );
});

module.exports = router; 
