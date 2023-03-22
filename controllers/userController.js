const connection = require('./dbConnect');
const mongoClient = require('./mongoConnect');

const UNEXPECTED_MSG = 
  '알 수 없는 문제 발생<br><a href="/register">회원 가입으로 이동<a>';

const DUPLICATED_MSG = 
  '동일한 ID를 가지는 회원이 존재합니다.<br><a href="/register">회원 가입으로 이동<a>';

const SUCCESS_MSG = 
'회원가입 성공!.<br><a href="/register">로그인으로 이동<a>';



const registerUser = async (req, res) => {
  try{
    const client = await mongoClient.connect();
    const user = client.db('kdt5').collection('user');

    const duplicatedUser = await user.findOne({ id: req.body.id});
    if(duplicatedUser) return res.status(400).send(DUPLICATED_MSG);

    await user.insertOne(req.body);
    res.status(200).send(SUCCESS_MSG)
  }catch(err) {
    console.error(err);
    res.status(500).send(UNEXPECTED_MSG,);
  }
}

module.exports = {
  registerUser,
};

const userDB = {

    // 중복회원찾기
  userCheck : async (userId) => {
    try{
      const client = await mongoClient.connect();
      const user = client.db('kdt5').collection('user');
      console.log(user);
      const findUser = await user.findOne({id:userId}); 
      // if(!findUser) return false;
      return findUser;
    }catch(err){
      console.error(err);
    }
  },
  // router 에서 전달  
  userCheckSQL : (userId, cb) => {
    connection.query(
      `SELECT * FROM mydb1.user WHERE USERID='${userId}';`,
      (err,data) => {
        if(err) throw err;
        console.log(data);
        cb(data);
      },
    );
  },

  // 회원가입하기
  registerUser : async (newUser) => {
    try{
      const client = await mongoClient.connect();
      const user = client.db('kdt5').collection('user');

      await user.insertOne(newUser);
      return true;
    }catch(err){
      console.error(err);
    }
  }
};

module.exports = userDB;