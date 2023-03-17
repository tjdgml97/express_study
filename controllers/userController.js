const connection = require('./dbConnect');

const userDB = {
  
  // router 에서 전달  
  // 중복회원찾기
  userCheck : (userId, cb) => {
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
  registerUser : (newUser , cb) => {
    connection.query(`insert into mydb1.user (USERID, PASSWORD) VALUES ('${newUser.id}','${newUser.password}');`, 
    (err,data) => {
      if(err) throw err ;
      cb(data);
    },
    );
  }
};

module.exports = userDB;