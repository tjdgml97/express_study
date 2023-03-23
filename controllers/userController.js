// const mongooseConnect = require('./mongooseConnect');
require('./mongooseConnect');

// mongooseConnect();

const User = require('../models/user');


const UNEXPECTED_MSG = 
  '알 수 없는 문제 발생<br><a href="/register">회원 가입으로 이동<a>';
const DUPLICATED_MSG = 
  '동일한 ID를 가지는 회원이 존재합니다.<br><a href="/register">회원 가입으로 이동<a>';

const SUCCESS_MSG = 
'회원가입 성공!.<br><a href="/register">로그인으로 이동<a>';

const UNEXPECTED_MSG_LOGIN = 
'알 수 없는 문제 발생<br><a href="/login">로그인으로 이동<a>';

const LOGIN_NOT_REGISTERED_MSG = 
'동일한 ID를 가지는 회원이 존재하지않습니다.<br><a href="/register">회원 가입으로 이동<a>';

const LOGIN_WRONG_PASSWORD_MSG = '비밀번호가 틀렸습니다.<br><a href="login">로그인으로 이동</a> ';




const registerUser = async (req, res) => {
  try{
    // const duplicatedUser = await User.findOne({ id: req.body.id});
    // if(duplicatedUser) return res.status(400).send(DUPLICATED_MSG);

    await User.create(req.body);
    res.status(200).send(SUCCESS_MSG);
  }catch(err) {
    console.error(err);
    res.status(500).send(UNEXPECTED_MSG,);
  }
}


const loginUser = async (req,res ) => {
  try{
    // const client = await mongoClient.connect();
    // const user = client.db('kdt5').collection('user');

    const duplicatedUser = await User.findOne({ id: req.body.id});

    if(!duplicatedUser) return res.status(400).send(LOGIN_NOT_REGISTERED_MSG);

    if(duplicatedUser.password !== req.body.password) return  res.status(400).send(LOGIN_WRONG_PASSWORD_MSG);

    req.session.login = true;  
    req.session.userId = req.body.id;
    
    res.cookie('user', req.body.id, {
      maxAge : 1000*30 ,
      httpOnly : true, 
      signed : true,
    });

    res.status(200);
    res.redirect('/dbBoard');
  }catch(err) {
    console.error(err);
    res.status(500).send(UNEXPECTED_MSG_LOGIN);
  }
}

module.exports = {
  registerUser, loginUser
};

    // if(duplicatedUser) {
    //   if(duplicatedUser.password === req.body.password) {
        
    //     req.session.login = true;
    //     req.session.userId = req.body.id;

    //     // 로그인 쿠키 발행
    //     res.cookie('user', req.body.id, {
    //       maxAge: 1000 * 10,
    //       httpOnly: true,
    //       signed: true,
    //     });

    //     // res.status(200);
    //    return  res.send("로그인성공")
    //   }
    //   res.status(400); //사용자 error
    //   return res.send(
    //     '비밀번호가 다릅니다.<br><a href="login">로그인으로 이동</a> ',
    //   ); 
    // } 
    // res.status(400);
    // return res.send(
    //   '해당 id가 존재하지 않습니다.<br><a ref="/register">회원가입 페이지로 이동</a>',
    // )

// const userDB = {

//     // 중복회원찾기
//   userCheck : async (userId) => {
//     try{
//       const client = await mongoClient.connect();
//       const user = client.db('kdt5').collection('user');
//       console.log(user);
//       const findUser = await user.findOne({id:userId}); 
//       // if(!findUser) return false;
//       return findUser;
//     }catch(err){
//       console.error(err);
//     }
//   },
//   // router 에서 전달  
//   userCheckSQL : (userId, cb) => {
//     connection.query(
//       `SELECT * FROM mydb1.user WHERE USERID='${userId}';`,
//       (err,data) => {
//         if(err) throw err;
//         console.log(data);
//         cb(data);
//       },
//     );
//   },

//   // 회원가입하기
//   registerUser : async (newUser) => {
//     try{
//       const client = await mongoClient.connect();
//       const user = client.db('kdt5').collection('user');

//       await user.insertOne(newUser);
//       return true;
//     }catch(err){
//       console.error(err);
//     }
//   }
// };

// module.exports = userDB;

