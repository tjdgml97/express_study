const connection = require('./dbConnect');
const mongoClient = require('./mongoConnect');

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